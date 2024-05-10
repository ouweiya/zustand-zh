---
title: TypeScript 指南
nav: 8
---

## 基本用法 {#basic-usage}

使用 TypeScript 的区别在于，你需要写 `create<T>()(...)` 而不是 `create(...)`（注意额外的括号 `()` 和类型参数），其中 `T` 是用来注解状态的类型。例如：

```ts
import { create } from 'zustand'

interface BearState {
    bears: number
    increase: (by: number) => void
}

const useBearStore = create<BearState>()((set) => ({
    bears: 0,
    increase: (by) => set((state) => ({ bears: state.bears + by })),
}))
```

<details>
    <summary>为什么我们不能简单地从初始状态推断类型？</summary>

    <br/>

**简而言之**：因为状态泛型 `T` 是不变的。

考虑这个最小版本的 `create`：

```ts
declare const create: <T>(f: (get: () => T) => T) => T

const x = create((get) => ({
    foo: 0,
    bar: () => get(),
}))
// `x` 被推断为 `unknown` 而不是
// interface X {
//   foo: number,
//   bar: () => X
// }
```

在这里，如果你看 `create` 中 `f` 的类型，即 `(get: () => T) => T`，它通过返回 "给出" `T`（使其协变），但它也通过 `get` "接收" `T`（使其逆变）。"那么 `T` 从哪里来呢？" TypeScript 感到困惑。这就像鸡和蛋的问题。最后 TypeScript 放弃了，推断 `T` 为 `unknown`。

所以，只要要推断的泛型是不变的（即既是协变的又是逆变的），TypeScript 就无法推断它。另一个简单的例子是这样的：

```ts
const createFoo = {} as <T>(f: (t: T) => T) => T
const x = createFoo((_) => 'hello')
```

在这里，`x` 又是 `unknown` 而不是 `string`。

    <details>
        <summary>关于推断的更多信息（仅供对 TypeScript 感兴趣的人）</summary>

在某种意义上，这种推断失败并不是问题，因为不能写出类型为 `<T>(f: (t: T) => T) => T` 的值。也就是说，你不能写出 `createFoo` 的真实运行时实现。我们试试看：

```js
const createFoo = (f) => f(/* ? */)
```

`createFoo` 需要返回 `f` 的返回值。为了做到这一点，我们首先必须调用 `f`。为了调用它，我们必须传递一个类型为 `T` 的值。为了传递一个类型为 `T` 的值，我们首先必须产生它。但是，当我们甚至不知道 `T` 是什么时，我们如何产生一个类型为 `T` 的值呢？产生类型为 `T` 的值的唯一方法是调用 `f`，但是，为了调用 `f` 本身，我们需要一个类型为 `T` 的值。所以你看，实际上是无法写出 `createFoo` 的。

所以我们在说，`createFoo` 的推断失败实际上并不是问题，因为无法实现 `createFoo`。但是 `create` 的推断失败又怎么样呢？那也并不真正是问题，因为 `create` 也无法实现。等一下，如果无法实现 `create`，那么 Zustand 是如何实现它的呢？答案是，它没有。

Zustand 假装实现了 `create` 的类型，它只实现了大部分。下面是一个通过显示不合理性来证明的简单例子：

```ts
import { create } from 'zustand'

const useBoundStore = create<{ foo: number }>()((_, get) => ({
    foo: get().foo,
}))
```

这段代码可以编译。但如果我们运行它，我们会得到一个异常："Uncaught TypeError: Cannot read properties of undefined (reading 'foo')"。这是因为在创建初始状态之前，`get` 会返回 `undefined`（因此你在创建初始状态时不应该调用 `get`）。类型承诺 `get` 永远不会返回 `undefined`，但它最初确实是这样，这意味着 Zustand 没有实现它。

当然 Zustand 失败了，因为无法按照类型的承诺实现 `create`（就像无法实现 `createFoo` 一样）。换句话说，我们没有一个类型来表达我们实际实现的 `create`。我们不能把 `get` 类型化为 `() => T | undefined`，因为这会导致不便，而且它仍然不正确，因为 `get` 最终确实是 `() => T`，只是如果同步调用，它会是 `() => undefined`。我们需要的是一种 TypeScript 功能，允许我们把 `get` 类型化为 `(() => T) & WhenSync<() => undefined>`，这当然是极其遥不可及的。

所以我们有两个问题：缺乏推断和不合理性。如果 TypeScript 可以改进对不变量的推断，就可以解决缺乏推断的问题。如果 TypeScript 引入了类似 `WhenSync` 的东西，就可以解决不合理性问题。为了解决缺乏推断，我们手动注解状态类型。我们无法解决不合理性，但这没关系，因为它不大，反正同步调用 `get` 没有意义。

</details>

</details>

<details>
    <summary>为什么要使用柯里化 `()(...)`？</summary>

    <br/>

**简而言之**：这是对 [microsoft/TypeScript#10571](https://github.com/microsoft/TypeScript/issues/10571) 的一种解决方法。

假设你有这样一个场景：

```ts
declare const withError: <T, E>(
    p: Promise<T>,
) => Promise<[error: undefined, value: T] | [error: E, value: undefined]>
declare const doSomething: () => Promise<string>

const main = async () => {
    let [error, value] = await withError(doSomething())
}
```

在这里，`T` 被推断为 `string`，`E` 被推断为 `unknown`。你可能想将 `E` 注解为 `Foo`，因为你确定 `doSomething()` 抛出的错误的形状。然而，你不能这样做。你只能传递所有的泛型或者不传。除了将 `E` 注解为 `Foo`，你还必须将 `T` 注解为 `string`，尽管它已经被推断出来了。解决方案是制作一个在运行时不做任何事情的柯里化版本的 `withError`。它的目的就是允许你注解 `E`。

```ts
declare const withError: {
    <E>(): <T>(
        p: Promise<T>,
    ) => Promise<[error: undefined, value: T] | [error: E, value: undefined]>
    <T, E>(
        p: Promise<T>,
    ): Promise<[error: undefined, value: T] | [error: E, value: undefined]>
}
declare const doSomething: () => Promise<string>
interface Foo {
    bar: string
}

const main = async () => {
    let [error, value] = await withError<Foo>()(doSomething())
}
```

这样，`T` 被推断出来，你可以注解 `E`。Zustand 在我们想要注解状态（第一个类型参数）但允许其他参数被推断时有相同的用例。

</details>

另外，你也可以使用 `combine`，它推断出状态，所以你不需要类型化它。

```ts
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const useBearStore = create(
    combine({ bears: 0 }, (set) => ({
        increase: (by: number) => set((state) => ({ bears: state.bears + by })),
    })),
)
```

<details>
    <summary>要小心一点</summary>

    <br/>

我们通过在你接收的 `set`、`get` 和 `store` 的类型中稍微撒个小谎来实现推断。这个谎言是，它们被类型化为状态是第一个参数，实际上状态是第一个参数和第二个参数返回的浅合并（`{ ...a, ...b }`）。例如，第二个参数的 `get` 类型为 `() => { bears: number }`，这是一个谎言，因为它应该是 `() => { bears: number, increase: (by: number) => void }`。而 `useBearStore` 仍然有正确的类型；例如，`useBearStore.getState` 被类型化为 `() => { bears: number, increase: (by: number) => void }`。

这其实并不真的是一个谎言，因为 `{ bears: number }` 仍然是 `{ bears: number, increase: (by: number) => void }` 的子类型。因此，在大多数情况下不会有问题。你只需要在使用替换时小心。例如，`set({ bears: 0 }, true)` 会编译，但会不安全，因为它会删除 `increase` 函数。另一个你需要小心的地方是如果你使用 `Object.keys`。`Object.keys(get())` 将返回 `["bears", "increase"]` 而不是 `["bears"]`。`get` 的返回类型可能会让你犯这些错误。

`combine` 为了不用为状态写类型的便利性，牺牲了一点类型安全性。因此，你应该相应地使用 `combine`。在大多数情况下都没问题，你可以方便地使用它。

</details>

注意，当使用 `combine` 时，我们不使用柯里化版本，因为 `combine` "创建"了状态。当使用创建状态的中间件时，不需要使用柯里化版本，因为现在可以推断出状态。另一个创建状态的中间件是 `redux`。所以，当使用 `combine`、`redux` 或任何其他自定义中间件创建状态时，我们不推荐使用柯里化版本。

## 使用中间件 {#using-middlewares}

在 TypeScript 中使用中间件，你不需要做任何特殊的事情。

```ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface BearState {
    bears: number
    increase: (by: number) => void
}

const useBearStore = create<BearState>()(
    devtools(
        persist(
            (set) => ({
                bears: 0,
                increase: (by) => set((state) => ({ bears: state.bears + by })),
            }),
            { name: 'bearStore' },
        ),
    ),
)
```

只需确保你在 `create` 内部立即使用它们，以使上下文推断工作。做一些稍微复杂的事情，比如下面的 `myMiddlewares`，可能需要更高级的类型。

```ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const myMiddlewares = (f) => devtools(persist(f, { name: 'bearStore' }))

interface BearState {
    bears: number
    increase: (by: number) => void
}

const useBearStore = create<BearState>()(
    myMiddlewares((set) => ({
        bears: 0,
        increase: (by) => set((state) => ({ bears: state.bears + by })),
    })),
)
```

此外，我们建议尽可能在最后使用 `devtools` 中间件。例如，当你将 `immer` 作为中间件使用时，它应该是 `immer(devtools(...))` 而不是 `devtools(immer(...))`。这是因为 `devtools` 改变了 `setState` 并在其上添加了一个类型参数，如果其他中间件（如 `immer`）在 `devtools` 之前也改变了 `setState`，这个类型参数可能会丢失。因此，最后使用 `devtools` 可以确保没有中间件在它之前改变 `setState`。

## 编写中间件和高级使用 {#authoring-middlewares-and-advanced-usage}

假设你需要编写这个假设的中间件。

```ts
import { create } from 'zustand'

const foo = (f, bar) => (set, get, store) => {
    store.foo = bar
    return f(set, get, store)
}

const useBearStore = create(foo(() => ({ bears: 0 }), 'hello'))
console.log(useBearStore.foo.toUpperCase())
```

Zustand 中间件可以改变存储。但是我们如何在类型级别编码这种变化呢？也就是说，我们如何类型化 `foo` 以使这段代码编译？

对于一个通常的静态类型语言，这是不可能的。但是，由于 TypeScript，Zustand 有一个叫做 "高阶变异器" 的东西，使得这成为可能。如果你正在处理复杂的类型问题，比如类型化一个中间件或使用 `StateCreator` 类型，你将需要理解这个实现细节。为此，你可以[查看 #710](https://github.com/pmndrs/zustand/issues/710)。

如果你急于知道这个特定问题的答案，那么你可以[在这里看到](#middleware-that-changes-the-store-type)。

## 常见配方 {#common-recipes}

### 不改变存储类型的中间件 {#middleware-that-doesn't-change-the-store-type}

```ts
import { create, State, StateCreator, StoreMutatorIdentifier } from 'zustand'

type Logger = <
  T extends State,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string,
) => StateCreator<T, Mps, Mcs>

type LoggerImpl = <T extends State>(
  f: StateCreator<T, [], []>,
  name?: string,
) => StateCreator<T, [], []>

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  type T = ReturnType<typeof f>
  const loggedSet: typeof set = (...a) => {
    set(...a)
    console.log(...(name ? [`${name}:`] : []), get())
  }
  const setState = store.setState
  store.setState = (...a) => {
    setState(...a)
    console.log(...(name ? [`${name}:`] : []), store.getState())
  }

  return f(loggedSet, get, store)
}

export const logger = loggerImpl as unknown as Logger

// ---

const useBearStore = create<BearState>()(
  logger(
    (set) => ({
      bears: 0,
      increase: (by) => set((state) => ({ bears: state.bears + by })),
    }),
    'bear-store',
  ),
)
```

### 改变存储类型的中间件 {#middleware-that-changes-the-store-type}

```ts
import {
  create,
  State,
  StateCreator,
  StoreMutatorIdentifier,
  Mutate,
  StoreApi,
} from 'zustand'

type Foo = <
  T extends State,
  A,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<T, [...Mps, ['foo', A]], Mcs>,
  bar: A,
) => StateCreator<T, Mps, [['foo', A], ...Mcs]>

declare module 'zustand' {
  interface StoreMutators<S, A> {
    foo: Write<Cast<S, object>, { foo: A }>
  }
}

type FooImpl = <T extends State, A>(
  f: StateCreator<T, [], []>,
  bar: A,
) => StateCreator<T, [], []>

const fooImpl: FooImpl = (f, bar) => (set, get, _store) => {
  type T = ReturnType<typeof f>
  type A = typeof bar

  const store = _store as Mutate<StoreApi<T>, [['foo', A]]>
  store.foo = bar
  return f(set, get, _store)
}

export const foo = fooImpl as unknown as Foo

type Write<T extends object, U extends object> = Omit<T, keyof U> & U

type Cast<T, U> = T extends U ? T : U

// ---

const useBearStore = create(foo(() => ({ bears: 0 }), 'hello'))
console.log(useBearStore.foo.toUpperCase())
```

### 不使用柯里化解决方案的 `create` {#`create`-without-curried-workaround}

推荐的使用 `create` 的方式是使用柯里化解决方案，如：`create<T>()(...)`。这是因为它可以推断出存储类型。但是，如果出于某种原因你不想使用这种解决方案，你可以像下面这样传递类型参数。请注意，在某些情况下，这作为断言而不是注解，所以我们不推荐这种方式。

```ts
import { create } from "zustand"

interface BearState {
  bears: number
  increase: (by: number) => void
}

const useBearStore = create<
  BearState,
  [
    ['zustand/persist', BearState],
    ['zustand/devtools', never]
  ]
>(devtools(persist((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}), { name: 'bearStore' }))
```

### 切片模式 {#slices-pattern}

```ts
import { create, StateCreator } from 'zustand'

interface BearSlice {
  bears: number
  addBear: () => void
  eatFish: () => void
}

interface FishSlice {
  fishes: number
  addFish: () => void
}

interface SharedSlice {
  addBoth: () => void
  getBoth: () => void
}

const createBearSlice: StateCreator<
  BearSlice & FishSlice,
  [],
  [],
  BearSlice
> = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
  eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
})

const createFishSlice: StateCreator<
  BearSlice & FishSlice,
  [],
  [],
  FishSlice
> = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
})

const createSharedSlice: StateCreator<
  BearSlice & FishSlice,
  [],
  [],
  SharedSlice
> = (set, get) => ({
  addBoth: () => {
    // 你可以复用之前的方法
    get().addBear()
    get().addFish()
    // 或者从头开始
    // set((state) => ({ bears: state.bears + 1, fishes: state.fishes + 1 })
  },
  getBoth: () => get().bears + get().fishes,
})

const useBoundStore = create<BearSlice & FishSlice & SharedSlice>()((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a),
  ...createSharedSlice(...a),
}))
```

关于切片模式的详细解释可以在[这里](./slices-pattern.md)找到。

如果你有一些中间件，那么用 `StateCreator<MyState, Mutators, [], MySlice>` 替换 `StateCreator<MyState, [], [], MySlice>`。例如，如果你正在使用 `devtools`，那么它将是 `StateCreator<MyState, [["zustand/devtools", never]], [], MySlice>`。请参阅["中间件及其变异器引用"](#middlewares-and-their-mutators-reference)部分，查看所有变异器的列表。

### 为 vanilla 存储限定 `useStore` 钩子 {#bounded-`usestore`-hook-for-vanilla-stores}

```ts
import { useStore } from 'zustand'
import { createStore } from 'zustand/vanilla'

interface BearState {
  bears: number
  increase: (by: number) => void
}

const bearStore = createStore<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}))

function useBearStore(): BearState
function useBearStore<T>(selector: (state: BearState) => T): T
function useBearStore<T>(selector?: (state: BearState) => T) {
  return useStore(bearStore, selector!)
}
```

如果你需要经常创建有界的 `useStore` 钩子并希望避免重复，你也可以创建一个抽象的 `createBoundedUseStore` 函数...

```ts
import { useStore, StoreApi } from 'zustand'
import { createStore } from 'zustand/vanilla'

interface BearState {
  bears: number
  increase: (by: number) => void
}

const bearStore = createStore<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}))

const createBoundedUseStore = ((store) => (selector) => useStore(store)) as <
  S extends StoreApi<unknown>,
>(
  store: S,
) => {
  (): ExtractState<S>
  <T>(selector: (state: ExtractState<S>) => T): T
}

type ExtractState<S> = S extends { getState: () => infer X } ? X : never

const useBearStore = createBoundedUseStore(bearStore)
```

## 中间件及其变异器引用 {#middlewares-and-their-mutators-reference}

- `devtools` — `["zustand/devtools", never]`
- `persist` — `["zustand/persist", YourPersistedState]`<br/>
  `YourPersistedState` 是你打算持久化的状态类型，即 `options.partialize` 的返回类型，如果你没有传递 `partialize` 选项，那么 `YourPersistedState` 变为 `Partial<YourState>`。另外，[有时](https://github.com/pmndrs/zustand/issues/980#issuecomment-1162289836) 传递实际的 `PersistedState` 不会起作用。在这些情况下，尝试传递 `unknown`。
- `immer` — `["zustand/immer", never]`
- `subscribeWithSelector` — `["zustand/subscribeWithSelector", never]`
- `redux` — `["zustand/redux", YourAction]`
- `combine` — 没有变异器，因为 `combine` 不会改变存储
