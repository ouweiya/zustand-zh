---
title: devtools
description: 如何对你的 store 进行时间旅行调试
nav: 205
---

# devtools

`devtools` 中间件让你在没有 Redux 的情况下使用 [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)。阅读更多关于使用 [Redux DevTools 进行调试的好处](https://redux.js.org/style-guide/#use-the-redux-devtools-extension-for-debugging)。

```js
const nextStateCreatorFn = devtools(stateCreatorFn, devtoolsOptions)
```

- [类型](#类型)
  - [签名](#签名)
  - [变异器](#变异器)
- [参考](#参考)
- [用法](#用法)
  - [调试 store](#调试-store)
  - [调试基于 Slices 模式的 store](#调试基于-slices-模式的-store)
- [故障排除](#故障排除)
  - [只显示一个 store](#只显示一个-store)
  - [所有操作名称都标记为“匿名”](#所有操作名称都标记为匿名)

## 类型

### 签名

```ts
devtools<T>(stateCreatorFn: StateCreator<T, [], []>, devtoolsOptions?: DevtoolsOptions): StateCreator<T, [['zustand/devtools', never]], []>
```

### 变换器

<!-- prettier-ignore-start -->
```ts
['zustand/devtools', never]
```
<!-- prettier-ignore-end -->

## 参考

### `devtools(stateCreatorFn, devtoolsOptions)`

#### 参数

- `stateCreatorFn`: 一个函数，接受 `set` 函数、`get` 函数和 `store` 作为参数。通常，你会返回一个包含你想要暴露的方法的对象。
- **可选** `devtoolsOptions`: 一个定义 `Redux Devtools` 选项的对象。
  - **可选** `name`: 在 Redux DevTools 中的自定义标识符。
  - **可选** `enabled`: 在开发模式下默认为 `true`，在生产模式下默认为 `false`。启用或禁用此 store 的 Redux DevTools 集成。
  - **可选** `anonymousActionType`: 默认为 `anonymous`。在 Redux DevTools 中用于匿名变更的操作类型字符串。
  - **可选** `store`: 在 Redux DevTools 中的自定义标识符。

#### 返回值

`devtools` 返回一个状态创建函数。

## 用法

### 调试 store

此示例展示了如何使用 `Redux Devtools` 调试 store

```ts
import { create, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'

type JungleStore = {
  bears: number
  addBear: () => void
  fishes: number
  addFish: () => void
}

const useJungleStore = create<JungleStore>()(
  devtools((...args) => ({
    bears: 0,
    addBear: () =>
      set((state) => ({ bears: state.bears + 1 }), undefined, 'jungle/addBear'),
    fishes: 0,
    addFish: () =>
      set(
        (state) => ({ fishes: state.fishes + 1 }),
        undefined,
        'jungle/addFish',
      ),
  })),
)
```

### 调试基于 Slices 模式的 store

此示例展示了如何使用 `Redux Devtools` 调试基于 Slices 模式的 store

```ts
import { create, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'

type BearSlice = {
  bears: number
  addBear: () => void
}

type FishSlice = {
  fishes: number
  addFish: () => void
}

type JungleStore = BearSlice & FishSlice

const createBearSlice: StateCreator<
  JungleStore,
  [['zustand/devtools', never]],
  [],
  BearSlice
> = (set) => ({
  bears: 0,
  addBear: () =>
    set(
      (state) => ({ bears: state.bears + 1 }),
      undefined,
      'jungle:bear/addBear',
    ),
})

const createFishSlice: StateCreator<
  JungleStore,
  [['zustand/devtools', never]],
  [],
  FishSlice
> = (set) => ({
  fishes: 0,
  addFish: () =>
    set(
      (state) => ({ fishes: state.fishes + 1 }),
      undefined,
      'jungle:fish/addFish',
    ),
})

const useJungleStore = create<JungleStore>()(
  devtools((...args) => ({
    ...createBearSlice(...args),
    ...createFishSlice(...args),
  })),
)
```

## 故障排除

### 只显示一个 store

默认情况下，`Redux Devtools` 只显示一个 store，因此要查看其他 store，你需要使用 store 选择器并选择不同的 store。

### 所有操作名称都标记为“匿名”

如果未提供操作类型名称，则默认为“anonymous”。你可以通过提供 `anonymousActionType` 参数来自定义此默认值：

例如，下一个示例没有操作类型名称：

```ts
import { create, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'

type BearSlice = {
  bears: number
  addBear: () => void
}

type FishSlice = {
  fishes: number
  addFish: () => void
}

type JungleStore = BearSlice & FishSlice

const createBearSlice: StateCreator<
  JungleStore,
  [['zustand/devtools', never]],
  [],
  BearSlice
> = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
  eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
})

const createFishSlice: StateCreator<
  JungleStore,
  [['zustand/devtools', never]],
  [],
  FishSlice
> = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
})

const useJungleStore = create<JungleStore>()(
  devtools((...args) => ({
    ...createBearSlice(...args),
    ...createFishSlice(...args),
  })),
)
```

为了修复上一个示例，我们需要提供一个操作类型名称作为第三个参数。此外，为了保留替换逻辑的默认行为，第二个参数应设置为 `undefined`。

这是修复后的上一个示例

```ts
import { create, StateCreator } from 'zustand'

type BearSlice = {
  bears: number
  addBear: () => void
}

type FishSlice = {
  fishes: number
  addFish: () => void
}

type JungleStore = BearSlice & FishSlice

const createBearSlice: StateCreator<
  JungleStore,
  [['zustand/devtools', never]],
  [],
  BearSlice
> = (set) => ({
  bears: 0,
  addBear: () =>
    set((state) => ({ bears: state.bears + 1 }), undefined, 'bear/addBear'),
})

const createFishSlice: StateCreator<
  JungleStore,
  [['zustand/devtools', never]],
  [],
  FishSlice
> = (set) => ({
  fishes: 0,
  addFish: () =>
    set((state) => ({ fishes: state.fishes + 1 }), undefined, 'fish/addFish'),
})

const useJungleStore = create<JungleStore>()(
  devtools((...args) => ({
    ...createBearSlice(...args),
    ...createFishSlice(...args),
  })),
)
```

> [!IMPORTANT]
> 不要将第二个参数设置为 `true` 或 `false`，除非你想覆盖默认的替换逻辑
