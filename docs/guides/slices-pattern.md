---
title: 切片模式
nav: 15
---

## 将存储切分为更小的存储 {#slicing-the-store-into-smaller-stores}

随着你添加更多的功能，你的存储可能会变得越来越大，越来越难以维护。

你可以将你的主存储切分为更小的个体存储，以实现模块化。在 Zustand 中实现这一点非常简单！

第一个个体存储：

```js
export const createFishSlice = (set) => ({
    fishes: 0,
    addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
})
```

另一个个体存储：

```js
export const createBearSlice = (set) => ({
    bears: 0,
    addBear: () => set((state) => ({ bears: state.bears + 1 })),
    eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
})
```

你现在可以将这两个存储合并为**一个有边界的存储**：

```js
import { create } from 'zustand'
import { createBearSlice } from './bearSlice'
import { createFishSlice } from './fishSlice'

export const useBoundStore = create((...a) => ({
    ...createBearSlice(...a),
    ...createFishSlice(...a),
}))
```

### 在 React 组件中的使用 {#usage-in-a-react-component}

```jsx
import { useBoundStore } from './stores/useBoundStore'

function App() {
    const bears = useBoundStore((state) => state.bears)
    const fishes = useBoundStore((state) => state.fishes)
    const addBear = useBoundStore((state) => state.addBear)
    return (
        <div>
            <h2>熊的数量：{bears}</h2>
            <h2>鱼的数量：{fishes}</h2>
            <button onClick={() => addBear()}>添加一只熊</button>
        </div>
    )
}

export default App
```

### 更新多个存储 {#updating-multiple-stores}

你可以在一个函数中同时更新多个存储。

```js
export const createBearFishSlice = (set, get) => ({
    addBearAndFish: () => {
        get().addBear()
        get().addFish()
    },
})
```

将所有的存储组合在一起的方式与之前相同。

```js
import { create } from 'zustand'
import { createBearSlice } from './bearSlice'
import { createFishSlice } from './fishSlice'
import { createBearFishSlice } from './createBearFishSlice'

export const useBoundStore = create((...a) => ({
    ...createBearSlice(...a),
    ...createFishSlice(...a),
    ...createBearFishSlice(...a),
}))
```

## 添加中间件 {#adding-middlewares}

向组合存储添加中间件与向其他普通存储添加中间件相同。

向我们的 `useBoundStore` 添加 `persist` 中间件：

```js
import { create } from 'zustand'
import { createBearSlice } from './bearSlice'
import { createFishSlice } from './fishSlice'
import { persist } from 'zustand/middleware'

export const useBoundStore = create(
    persist(
        (...a) => ({
            ...createBearSlice(...a),
            ...createFishSlice(...a),
        }),
        { name: 'bound-store' },
    ),
)
```

请记住，你应该只在组合存储中应用中间件。在个体切片内部应用它们可能会导致意外的问题。

## 与 TypeScript 的使用 {#usage-with-typescript}

关于如何在 Zustand 中使用 TypeScript 使用切片模式的详细指南可以在[这里](./typescript.md#slices-pattern)找到。
