---
title: 迁移到v4
nav: 19
---

唯一的破坏性变化在于类型。
如果你在使用TypeScript或者JSDoc类型注解的Zustand，
那么这个指南就适用于你。
否则，无需进行迁移。

此外，建议你首先阅读
新的[TypeScript指南](../guides/typescript.md)，
这样可以更容易理解迁移过程。

除了这个迁移指南，
你还可以查看
[差异](https://github.com/pmndrs/zustand/compare/v3.7.2...v4.0.0?short_path=37e5b4c#diff-c21e24854115b390eccde717da83f91feb2d5927a76c1485e5f0fdd0135c2afa)
在Zustand仓库中，从v3到v4的测试文件的差异。

## `create` {#create}

**适用的导入**

```ts
import create from 'zustand'
import create from 'zustand/vanilla'
```

**变更**

```diff
- create:
-   < State
-   , StoreSetState = StoreApi<State>["set"]
-   , StoreGetState = StoreApi<State>["get"]
-   , Store = StoreApi<State>
-   >
-     (f: ...) => ...
+ create:
+   { <State>(): (f: ...) => ...
+   , <State, Mutators>(f: ...) => ...
+   }
```

**迁移**

如果你没有向 `create` 传递任何类型参数，那么不需要进行迁移。

如果你正在使用像 `combine` 或 `redux` 这样的 "叶子" 中间件，那么从 `create` 中移除所有类型参数。

否则，将 `create<T, ...>(...)` 替换为 `create<T>()(...)`。

## `StateCreator` {#statecreator}

**适用的导入**

```ts
import type { StateCreator } from 'zustand'
import type { StateCreator } from 'zustand/vanilla'
```

**变更**

```diff
- type StateCreator
-   < State
-   , StoreSetState = StoreApi<State>["set"]
-   , StoreGetState = StoreApi<State>["get"]
-   , Store = StoreApi<State>
-   > =
-     ...
+ type StateCreator
+   < State
+   , InMutators extends [StoreMutatorIdentifier, unknown][] = []
+   , OutMutators extends [StoreMutatorIdentifier, unknown][] = []
+   , Return = State
+   > =
+     ...
```

**迁移**

如果你正在使用 `StateCreator`，你可能正在编写一个中间件或使用 "slices" 模式。对此，请查看 TypeScript 指南中的 [编写中间件和高级用法](../guides/typescript.md#authoring-middlewares-and-advanced-usage) 和 [常见配方](../guides/typescript.md#common-recipes) 部分。

## `PartialState` {#partialstate}

**适用的导入**

```ts
import type { PartialState } from 'zustand'
import type { PartialState } from 'zustand/vanilla'
```

**变更**

```diff
- type PartialState
-   < T extends State
-   , K1 extends keyof T = keyof T
-   , K2 extends keyof T = K1
-   , K3 extends keyof T = K2
-   , K4 extends keyof T = K3
-   > =
-   | (Pick<T, K1> | Pick<T, K2> | Pick<T, K3> | Pick<T, K4> | T)
-   | ((state: T) => Pick<T, K1> | Pick<T, K2> | Pick<T, K3> | Pick<T, K4> | T)
+ type PartialState<T> =
+   | Partial<T>
+   | ((state: T) => Partial<T>)
```

**迁移**

将 `PartialState<T, ...>` 替换为 `PartialState<T>`，并且最好在你的 `tsconfig.json` 中开启 [`exactOptionalPropertyTypes`](https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes)：

```json
{
  "compilerOptions": {
    "exactOptionalPropertyTypes": true
  }
}
```

我们不再使用这个技巧来禁止 `{ foo: undefined }` 被赋值给 `Partial<{ foo: string }>`。相反，我们依赖用户开启 `exactOptionalPropertyTypes`。

## `useStore` {#usestore}

**适用的导入**

```ts
import { useStore } from 'zustand'
import { useStore } from 'zustand/react'
```

**变更**

```diff
- useStore:
-   { <State>(store: StoreApi<State>): State
-   , <State, StateSlice>
-       ( store: StoreApi<State>
-       , selector: StateSelector<State, StateSlice>,
-       , equals?: EqualityChecker<StateSlice>
-       ): StateSlice
-   }
+ useStore:
+   <Store, StateSlice = ExtractState<Store>>
+     ( store: Store
+     , selector?: StateSelector<State, StateSlice>,
+     , equals?: EqualityChecker<StateSlice>
+     )
+       => StateSlice
```

**迁移**

如果你没有向 `useStore` 传递任何类型参数，那么不需要进行迁移。

如果你有，建议移除所有类型参数，或者将 **store** 类型而不是 **state** 类型作为第一个参数传递。

## `UseBoundStore` {#useboundstore}

**适用的导入**

```ts
import type { UseBoundStore } from 'zustand'
import type { UseBoundStore } from 'zustand/react'
```

**变更**

```diff
- type UseBoundStore<
-   State,
-   Store = StoreApi<State>
- > =
-   & { (): T
-     , <StateSlice>
-         ( selector: StateSelector<State, StateSlice>
-         , equals?: EqualityChecker<StateSlice>
-         ): U
-     }
-   & Store
+ type UseBoundStore<Store> =
+   & (<StateSlice = ExtractState<S>>
+       ( selector?: (state: ExtractState<S>) => StateSlice
+       , equals?: (a: StateSlice, b: StateSlice) => boolean
+       ) => StateSlice
+     )
+   & S
```

**迁移**

将 `UseBoundStore<T>` 替换为 `UseBoundStore<StoreApi<T>>`，将 `UseBoundStore<T, S>` 替换为 `UseBoundStore<S>`。

## `UseContextStore` {#usecontextstore}

**适用的导入**

```ts
import type { UseContextStore } from 'zustand/context'
```

**变更**

```diff
- type UseContextStore
```

**迁移**

使用 `typeof MyContext.useStore` 替代。

## `createContext` {#createcontext}

**适用的导入**

```ts
import createContext from 'zustand/context'
```

**变更**

```diff
  createContext:
-   <State, Store = StoreApi<State>>() => ...
+   <Store>() => ...
```

**迁移**

Replace `createContext<T>()` with `createContext<StoreApi<T>>()`,
and `createContext<T, S>()` with `createContext<S>()`.

## `combine`, `devtools`, `subscribeWithSelector` {#combine-devtools-subscribewithselector}

**适用的导入**

```ts
import { combine } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'
import { subscribeWithSelector } from 'zustand/middleware'
```

**变更**

```diff
- combine:
-   <T, U>(...) => ...
+ combine:
+   <T, U, Mps, Mcs>(...) => ...

- devtools:
-   <T>(...) => ...
+ devtools:
+   <T, Mps, Mcs>(...) => ...

- subscribeWithSelector:
-   <T>(...) => ...
+ subscribeWithSelector:
+   <T, Mps, Mcs>(...) => ...
```

**迁移**

如果你没有向 `combine`，`devtools` 或 `subscribeWithSelector` 传递任何类型参数，那么不需要进行迁移。

如果你有，移除所有类型参数，因为它们会被自动推断。

## `persist` {#persist}

**适用的导入**

```ts
import { persist } from 'zustand/middleware'
```

**变更**

```diff
- persist:
-   <T, U = Partial<T>>(...) => ...
+ persist:
+   <T, Mps, Mcs, U = T>(...) => ...
```

**迁移**

如果你正在传递任何类型参数，移除它们，因为它们会被自动推断。

接下来，如果你正在传递 `partialize` 选项，那么不需要进行进一步的迁移。

如果你**没有**传递 `partialize` 选项，你可能会看到一些编译错误。如果你没有看到任何错误，那么不需要进行进一步的迁移。

现在，部分化状态的类型是 `T` 而不是 `Partial<T>`，这与默认 `partialize` 的运行时行为一致，即身份函数（`s => s`）。

如果你看到一些编译错误，你需要自己找到并修复这些错误，因为它们可能表示代码有问题。另一种解决方法是将 `s => s as Partial<typeof s>` 传递给 `partialize`。如果你的部分化状态确实是 `Partial<T>`，你不应该遇到任何错误。

运行时行为没有改变，只是现在的类型更准确了。

## `redux` {#redux}

**适用的导入**

```ts
import { redux } from 'zustand/middleware'
```

**变更**

```diff
- redux:
-   <T, A>(...) => ...
+ redux:
+   <T, A, Mps, Mcs>(...) => ...
```

**迁移**

如果你没有向 `redux` 传递任何类型参数，那么不需要进行迁移。

如果你有，移除所有类型参数，并且只注解第二个（动作）参数。也就是说，将 `redux<T, A>((state, action) => ..., ...)` 替换为 `redux((state, action: A) => ..., ...)`。