---
title: TypeScript 指南
nav: 8
---

## 基础用法

使用 TypeScript 时的区别在于,你需要写成 `create<T>()(...)`(注意额外的括号 `()` 和类型参数)而不是 `create(...)`,其中 `T` 是要标注的状态类型。例如:

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
  <summary>为什么我们不能简单地从初始状态推断类型?</summary>

  <br/>

**简而言之**: 因为状态泛型 `T` 是不变的。

考虑这个最小版本的 `create`:

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

在这里,如果你观察 `create` 中 `f` 的类型,即 `(get: () => T) => T`,它通过返回"给出" `T`(使其协变),但也通过 `get` "接受" `T`(使其逆变)。TypeScript 会想"那么 `T` 从何而来?"。这就像先有鸡还是先有蛋的问题。最后 TypeScript 放弃了,将 `T` 推断为 `unknown`。

因此,只要要推断的泛型是不变的(即既是协变又是逆变),TypeScript 就无法推断它。另一个简单的例子是:

```ts
const createFoo = {} as <T>(f: (t: T) => T) => T
const x = createFoo((_) => 'hello')
```

这里 `x` 同样是 `unknown` 而不是 `string`。

  <details>
    <summary>更多关于类型推断的内容(仅供对 TypeScript 感兴趣的人参考)</summary>

从某种意义上说,这种推断失败并不是问题,因为类型为 `<T>(f: (t: T) => T) => T` 的值是不可能写出的。换句话说,你无法编写 `createFoo` 的真正运行时实现。让我们试一试:

```js
const createFoo = (f) => f(/* ? */)
```

`createFoo` 需要返回 `f` 的返回值。为此我们必须首先调用 `f`。要调用它我们必须传递一个类型为 `T` 的值。要传递类型为 `T` 的值我们必须首先生成它。但是当我们甚至不知道 `T` 是什么时,如何生成类型为 `T` 的值呢?生成类型为 `T` 的值的唯一方法是调用 `f`,但要调用 `f` 本身我们需要一个类型为 `T` 的值。所以你看这是不可能的。

所以我们说,`createFoo` 的推断失败不是真正的问题,因为实现 `createFoo` 是不可能的。但 `create` 的推断失败又如何呢?这也不是真正的问题,因为实现 `create` 也是不可能的。等一下,如果实现 `create` 是不可能的,那么 Zustand 是如何实现它的呢?答案是,它没有。

Zustand 说谎说它实现了 `create` 的类型,它只实现了大部分。这里有一个简单的证明,展示不完整性。考虑以下代码:

```ts
import { create } from 'zustand'

const useBoundStore = create<{ foo: number }>()((_, get) => ({
  foo: get().foo,
}))
```

这段代码能编译。但如果我们运行它,会得到一个异常:"Uncaught TypeError: Cannot read properties of undefined (reading 'foo')"。这是因为在创建初始状态之前 `get` 会返回 `undefined`(因此你不应该在创建初始状态时调用 `get`)。类型承诺 `get` 永远不会返回 `undefined`,但它最初确实返回了,这意味着 Zustand 未能实现它。

当然 Zustand 失败了,因为按照类型承诺的方式实现 `create` 是不可能的(就像实现 `createFoo` 是不可能的一样)。换句话说,我们没有类型来表达我们实际实现的 `create`。我们不能将 `get` 类型化为 `() => T | undefined`,因为这会造成不便,而且仍然不正确,因为 `get` 确实最终是 `() => T`,只是如果同步调用它就会是 `() => undefined`。我们需要的是某种 TypeScript 功能,允许我们将 `get` 类型化为 `(() => T) & WhenSync<() => undefined>`,这当然是非常牵强的。

所以我们有两个问题:缺乏推断和不完整性。如果 TypeScript 可以改进其对不变量的推断,就可以解决缺乏推断的问题。如果 TypeScript 引入类似 `WhenSync` 的东西,就可以解决不完整性问题。为了解决缺乏推断的问题,我们手动标注状态类型。而且我们无法解决不完整性问题,但这不是什么大问题,因为问题不大,反正同步调用 `get` 也没有意义。

</details>

</details>

<details>
  <summary>为什么要使用柯里化的 `()(...)`?</summary>

  <br/>

**简而言之**: 这是 [microsoft/TypeScript#10571](https://github.com/microsoft/TypeScript/issues/10571) 的一个解决方案。

想象一个这样的场景:

```ts
declare const withError: <T, E>(
  p: Promise<T>,
) => Promise<[error: undefined, value: T] | [error: E, value: undefined]>
declare const doSomething: () => Promise<string>

const main = async () => {
  let [error, value] = await withError(doSomething())
}
```

这里,`T` 被推断为 `string`,`E` 被推断为 `unknown`。你可能想将 `E` 标注为 `Foo`,因为你确定 `doSomething()` 会抛出什么样的错误。但是你不能这样做。你要么传递所有泛型,要么一个都不传。除了将 `E` 标注为 `Foo`,你还必须将 `T` 标注为 `string`,即使它本来就可以推断出来。解决方案是制作一个柯里化版本的 `withError`,它在运行时什么都不做。它的目的只是允许你标注 `E`。

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

这样,`T` 得到推断而你可以标注 `E`。Zustand 有相同的用例,当我们想要标注状态(第一个类型参数)但允许其他参数被推断时。

</details>

或者,你也可以使用 `combine`,它会推断状态,因此你不需要为其编写类型。

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
  <summary>请稍加注意</summary>

  <br/>

我们通过在 `set`、`get` 和 `store` 的类型上稍微撒谎来实现推断。谎言是它们被类型化为状态是第一个参数,而实际上状态是第一个参数和第二个参数返回的浅合并(`{ ...a, ...b }`)。例如,第二个参数的 `get` 类型为 `() => { bears: number }`,这是一个谎言,因为它应该是 `() => { bears: number, increase: (by: number) => void }`。而 `useBearStore` 仍然具有正确的类型;例如,`useBearStore.getState` 类型为 `() => { bears: number, increase: (by: number) => void }`。

这并不是真正的谎言,因为 `{ bears: number }` 仍然是 `{ bears: number, increase: (by: number) => void }` 的子类型。因此,在大多数情况下不会有问题。你只需在使用替换时小心。例如,`set({ bears: 0 }, true)` 会编译,但会不完整,因为它会删除 `increase` 函数。另一个需要小心的实例是如果你使用 `Object.keys`。`Object.keys(get())` 将返回 `["bears", "increase"]` 而不是 `["bears"]`。`get` 的返回类型可能会让你犯这些错误。

`combine` 以牺牲一些类型安全性为代价,换取不必编写状态类型的便利。因此,你应该根据需要使用 `combine`。在大多数情况下是可以的,你可以方便地使用它。

</details>

请注意,在使用 `combine` 时我们不使用柯里化版本,因为 `combine` "创建" 状态。当使用创建状态的中间件时,不需要使用柯里化版本,因为状态现在可以被推断。另一个创建状态的中间件是 `redux`。因此,当使用 `combine`、`redux` 或任何其他创建状态的自定义中间件时,我们不建议使用柯里化版本。

## 使用中间件

在 TypeScript 中使用中间件不需要做任何特殊处理。

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

只需确保你立即在 `create` 内部使用它们,以使上下文推断工作。做一些即使是稍微复杂的事情,比如以下 `myMiddlewares`,将需要更高级的类型。

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

此外,我们建议尽可能将 `devtools` 中间件放在最后。例如,当你将它与 `immer` 作为中间件一起使用时,应该是 `devtools(immer(...))` 而不是 `immer(devtools(...))`。这是因为 `devtools` 会修改 `setState` 并在其上添加一个类型参数,如果其他中间件(如 `immer`)在 `devtools` 之前也修改了 `setState`,则可能会丢失。因此,将 `devtools` 放在最后可以确保在它之前没有中间件修改 `setState`。

## 编写中间件和高级用法

假设你必须编写这个假设的中间件。

```ts
import { create } from 'zustand'

const foo = (f, bar) => (set, get, store) => {
  store.foo = bar
  return f(set, get, store)
}

const useBearStore = create(foo(() => ({ bears: 0 }), 'hello'))
console.log(useBearStore.foo.toUpperCase())
```

Zustand 中间件可以修改存储。但是我们如何在类型级别上编码这种修改呢?也就是说,我们如何类型化 `foo` 以使这段代码编译?

对于通常的静态类型语言,这是不可能的。但感谢 TypeScript,Zustand 有一种称为"高阶变换器"的东西,使这成为可能。如果你正在处理复杂的类型问题,如类型化中间件或使用 `StateCreator` 类型,你将不得不理解这个实现细节。为此,你可以[查看 #710](https://github.com/pmndrs/zustand/issues/710)。

如果你急于知道这个特定问题的答案,你可以[在这里看到](#middleware-that-changes-the-store-type)。

### 处理动态 `replace` 标志

如果 `replace` 标志的值在编译时未知并且是动态确定的,你可能会遇到问题。为了解决这个问题,你可以通过将 `replace` 参数注释为 `setState` 函数的参数来使用一种解决方法:

```ts
const replaceFlag = Math.random() > 0.5
const args = [{ bears: 5 }, replaceFlag] as Parameters<
  typeof useBearStore.setState
>
store.setState(...args)
```

#### 使用 `as Parameters` 解决方法的示例

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

const replaceFlag = Math.random() > 0.5
const args = [{ bears: 5 }, replaceFlag] as Parameters<
  typeof useBearStore.setState
>
useBearStore.setState(...args) // 使用解决方法
```

通过遵循这种方法,你可以确保代码在处理动态 `replace` 标志时不会遇到类型问题。

## 常见配方

### 不改变存储类型的中间件

```ts
import { create, StateCreator, StoreMutatorIdentifier } from 'zustand'

type Logger = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string,
) => StateCreator<T, Mps, Mcs>

type LoggerImpl = <T>(
  f: StateCreator<T, [], []>,
  name?: string,
) => StateCreator<T, [], []>

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  const loggedSet: typeof set = (...a) => {
    set(...(a as Parameters<typeof set>))
    console.log(...(name ? [`${name}:`] : []), get())
  }
  const setState = store.setState
  store.setState = (...a) => {
    setState(...(a as Parameters<typeof setState>))
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

### 改变存储类型的中间件

```ts
import {
  create,
  StateCreator,
  StoreMutatorIdentifier,
  Mutate,
  StoreApi,
} from 'zustand'

type Foo = <
  T,
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

type FooImpl = <T, A>(
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

type Cast<T, U> = T extends U ? T : never

// ---

const useBearStore = create(foo(() => ({ bears: 0 }), 'hello'))
console.log(useBearStore.foo.toUpperCase())
```

### 没有柯里化解决方法的 `create`

推荐的使用 `create` 的方式是使用柯里化解决方法,如: `create<T>()(...)`。这是因为它允许你推断存储类型。但如果出于某种原因你不想使用解决方法,你可以像下面这样传递类型参数。请注意,在某些情况下,这会作为断言而不是注释,因此我们不推荐这样做。

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

### 切片模式

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
    // 你可以重用以前的方法
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

如果你有一些中间件,那么将 `StateCreator<MyState, [], [], MySlice>` 替换为 `StateCreator<MyState, Mutators, [], MySlice>`。例如,如果你正在使用 `devtools`,那么它将是 `StateCreator<MyState, [["zustand/devtools", never]], [], MySlice>`。请参阅["中间件及其变换器参考"](#middlewares-and-their-mutators-reference)部分以获取所有变换器的列表。

### 适用于原生存储的有界 `useStore` 钩子

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

如果你经常需要创建有界 `useStore` 钩子并且想要 DRY 代码,你也可以制作一个抽象的 `createBoundedUseStore` 函数...

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

const createBoundedUseStore = ((store) => (selector) =>
  useStore(store, selector)) as <S extends StoreApi<unknown>>(
  store: S,
) => {
  (): ExtractState<S>
  <T>(selector: (state: ExtractState<S>) => T): T
}

type ExtractState<S> = S extends { getState: () => infer X } ? X : never

const useBearStore = createBoundedUseStore(bearStore)
```

## 中间件及其变换器参考

- `devtools` — `["zustand/devtools", never]`
- `persist` — `["zustand/persist", YourPersistedState]`<br/>
  `YourPersistedState` 是你要持久化的状态类型,即 `options.partialize` 的返回类型,如果你没有传递 `partialize` 选项,则 `YourPersistedState` 变为 `Partial<YourState>`。此外,在某些情况下,传递实际的 `PersistedState` 不会起作用。在这些情况下,尝试传递 `unknown`。
- `immer` — `["zustand/immer", never]`
- `subscribeWithSelector` — `["zustand/subscribeWithSelector", never]`
- `redux` — `["zustand/redux", YourAction]`
- `combine` — 没有变换器,因为 `combine` 不会修改存储
