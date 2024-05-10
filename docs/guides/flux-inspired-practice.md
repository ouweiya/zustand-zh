---
title: 受Flux启发的实践
nav: 5
---

尽管 Zustand 是一个无偏见的库，但我们确实推荐一些模式。
这些模式受到最初在 [Flux](https://github.com/facebookarchive/flux) 中发现的实践的启发，
以及最近的 [Redux](https://redux.js.org/understanding/thinking-in-redux/three-principles)，
所以如果你来自其他库，你应该感到非常熟悉。

然而，Zustand 在一些基本方式上确实有所不同，
所以一些术语可能不会完全对应其他库。

## 推荐的模式 {#recommended-patterns}

### 单一存储 {#single-store}

你的应用全局状态应该位于单一的 Zustand 存储中。

如果你有一个大型应用，Zustand 支持[将存储分割成切片](./slices-pattern.md)。

### 使用 `set` / `setState` 更新存储 {#use-set-setstate-to-update-the-store}

始终使用 `set`（或 `setState`）来更新你的存储。
`set`（和 `setState`）确保所描述的更新被正确地合并，监听器被适当地通知。

### 将存储操作放在一起 {#colocate-store-actions}

在 Zustand 中，状态可以在没有 Flux 库中找到的分派操作和 reducer 的情况下更新。
这些存储操作可以直接添加到存储中，如下所示。

可选地，通过使用 `setState`，它们可以[位于存储外部](./practice-with-no-store-actions.md)

```js
const useBoundStore = create((set) => ({
    storeSliceA: ...,
    storeSliceB: ...,
    storeSliceC: ...,
    updateX: () => set(...),
    updateY: () => set(...),
}))
```

## 类 Redux 模式 {#redux-like-patterns}

如果你不能没有类 Redux 的 reducer，你可以在存储的根级别定义一个 `dispatch` 函数：

```typescript
const types = { increase: 'INCREASE', decrease: 'DECREASE' }

const reducer = (state, { type, by = 1 }) => {
    switch (type) {
        case types.increase:
            return { grumpiness: state.grumpiness + by }
        case types.decrease:
            return { grumpiness: state.grumpiness - by }
    }
}

const useGrumpyStore = create((set) => ({
    grumpiness: 0,
    dispatch: (args) => set((state) => reducer(state, args)),
}))

const dispatch = useGrumpyStore((state) => state.dispatch)
dispatch({ type: types.increase, by: 2 })
```

你也可以使用我们的 redux-middleware。它连接你的主 reducer，设置初始状态，并将 dispatch 函数添加到状态本身和 vanilla api。

```typescript
import { redux } from 'zustand/middleware'

const useReduxStore = create(redux(reducer, initialState))
```

更新存储的另一种方式可能是通过包装状态函数的函数。这些也可以处理操作的副作用。例如，使用 HTTP 调用。要以非反应方式使用 Zustand，请参阅[自述文件](https://github.com/pmndrs/zustand#readingwriting-state-and-reacting-to-changes-outside-of-components)。
