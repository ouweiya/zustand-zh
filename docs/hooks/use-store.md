---
title: useStore ⚛️
description: 如何在 React 中使用 vanilla stores
nav: 30
---

`useStore` 是一个 React Hook，允许你在 React 中使用 vanilla store。

```js
const someState = useStore(store, selectorFn)
```

- [类型](#类型)
  - [签名](#签名)
- [参考](#参考)
- [用法](#用法)
  - [在 React 中使用全局 vanilla store](#在-react-中使用全局-vanilla-store)
  - [在 React 中使用动态全局 vanilla store](#在-react-中使用动态全局-vanilla-store)
  - [在 React 中使用作用域（非全局）vanilla store](#在-react-中使用作用域非全局vanilla-store)
  - [在 React 中使用动态作用域（非全局）vanilla store](#在-react-中使用动态作用域非全局vanilla-store)
- [故障排除](#故障排除)

## 类型

### 签名

```ts
useStore<StoreApi<T>, U = T>(store: StoreApi<T>, selectorFn?: (state: T) => U) => UseBoundStore<StoreApi<T>>
```

## 参考

### `useStore(store, selectorFn)`

#### 参数

- `storeApi`: 允许你访问 store API 工具的实例。
- `selectorFn`: 一个函数，允许你根据当前状态返回数据。

#### 返回值

`useStore` 根据选择器函数返回基于当前状态的任何数据。它应该接受一个 store 和一个选择器函数作为参数。

## 用法

### 在 React 中使用全局 vanilla store

首先，我们设置一个 store 来保存屏幕上点的位置。我们将定义 store 来管理 `x` 和 `y` 坐标，并提供一个操作来更新这些坐标。

```tsx
type PositionStoreState = { position: { x: number; y: number } }

type PositionStoreActions = {
  setPosition: (nextPosition: PositionStoreState['position']) => void
}

type PositionStore = PositionStoreState & PositionStoreActions

const positionStore = createStore<PositionStore>()((set) => ({
  position: { x: 0, y: 0 },
  setPosition: (position) => set({ position }),
}))
```

接下来，我们将创建一个 `MovingDot` 组件，该组件渲染一个表示点的 div。该组件将使用 store 来跟踪和更新点的位置。

```tsx
function MovingDot() {
  const position = useStore(positionStore, (state) => state.position)
  const setPosition = useStore(positionStore, (state) => state.setPosition)

  return (
    <div
      onPointerMove={(e) => {
        setPosition({
          x: e.clientX,
          y: e.clientY,
        })
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}
    >
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'red',
          borderRadius: '50%',
          transform: `translate(${position.x}px, ${position.y}px)`,
          left: -10,
          top: -10,
          width: 20,
          height: 20,
        }}
      />
    </div>
  )
}
```

最后，我们将在 `App` 组件中渲染 `MovingDot` 组件。

```tsx
export default function App() {
  return <MovingDot />
}
```

代码如下所示：

```tsx
import { createStore, useStore } from 'zustand'

type PositionStoreState = { position: { x: number; y: number } }

type PositionStoreActions = {
  setPosition: (nextPosition: PositionStoreState['position']) => void
}

type PositionStore = PositionStoreState & PositionStoreActions

const positionStore = createStore<PositionStore>()((set) => ({
  position: { x: 0, y: 0 },
  setPosition: (position) => set({ position }),
}))

function MovingDot() {
  const position = useStore(positionStore, (state) => state.position)
  const setPosition = useStore(positionStore, (state) => state.setPosition)

  return (
    <div
      onPointerMove={(e) => {
        setPosition({
          x: e.clientX,
          y: e.clientY,
        })
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}
    >
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'red',
          borderRadius: '50%',
          transform: `translate(${position.x}px, ${position.y}px)`,
          left: -10,
          top: -10,
          width: 20,
          height: 20,
        }}
      />
    </div>
  )
}

export default function App() {
  return <MovingDot />
}
```

### 在 React 中使用动态全局 vanilla store

首先，我们将创建一个工厂函数，用于生成管理计数器状态的 store。每个标签页将有自己的 store 实例。

```ts
type CounterState = {
  count: number
}

type CounterActions = { increment: () => void }

type CounterStore = CounterState & CounterActions

const createCounterStore = () => {
  return createStore<CounterStore>()((set) => ({
    count: 0,
    increment: () => {
      set((state) => ({ count: state.count + 1 }))
    },
  }))
}
```

接下来，我们将创建一个工厂函数来管理计数器 stores 的创建和检索。这允许每个标签页都有自己的独立计数器。

```ts
const defaultCounterStores = new Map<
  string,
  ReturnType<typeof createCounterStore>
>()

const createCounterStoreFactory = (
  counterStores: typeof defaultCounterStores,
) => {
  return (counterStoreKey: string) => {
    if (!counterStores.has(counterStoreKey)) {
      counterStores.set(counterStoreKey, createCounterStore())
    }
    return counterStores.get(counterStoreKey)!
  }
}

const getOrCreateCounterStoreByKey =
  createCounterStoreFactory(defaultCounterStores)
```

现在，让我们构建 Tabs 组件，用户可以在其中切换标签页并增加每个标签页的计数器。

```tsx
const [currentTabIndex, setCurrentTabIndex] = useState(0)
const counterState = useStore(
  getOrCreateCounterStoreByKey(`tab-${currentTabIndex}`),
)

return (
  <div style={{ fontFamily: 'monospace' }}>
    <div
      style={{
        display: 'flex',
        gap: '0.5rem',
        borderBottom: '1px solid salmon',
        paddingBottom: 4,
      }}
    >
      <button
        type="button"
        style={{
          border: '1px solid salmon',
          backgroundColor: '#fff',
          cursor: 'pointer',
        }}
        onClick={() => setCurrentTabIndex(0)}
      >
        Tab 1
      </button>
      <button
        type="button"
        style={{
          border: '1px solid salmon',
          backgroundColor: '#fff',
          cursor: 'pointer',
        }}
        onClick={() => setCurrentTabIndex(1)}
      >
        Tab 2
      </button>
      <button
        type="button"
        style={{
          border: '1px solid salmon',
          backgroundColor: '#fff',
          cursor: 'pointer',
        }}
        onClick={() => setCurrentTabIndex(2)}
      >
        Tab 3
      </button>
    </div>
    <div style={{ padding: 4 }}>
      Content of Tab {currentTabIndex + 1}
      <br /> <br />
      <button type="button" onClick={() => counterState.increment()}>
        Count: {counterState.count}
      </button>
    </div>
  </div>
)
```

最后，我们将创建 `App` 组件，该组件渲染标签页及其各自的计数器。计数器状态独立管理每个标签页。

```tsx
export default function App() {
  return <Tabs />
}
```

代码如下所示：

```tsx
import { useState } from 'react'
import { createStore, useStore } from 'zustand'

type CounterState = {
  count: number
}

type CounterActions = { increment: () => void }

type CounterStore = CounterState & CounterActions

const createCounterStore = () => {
  return createStore<CounterStore>()((set) => ({
    count: 0,
    increment: () => {
      set((state) => ({ count: state.count + 1 }))
    },
  }))
}

const defaultCounterStores = new Map<
  string,
  ReturnType<typeof createCounterStore>
>()

const createCounterStoreFactory = (
  counterStores: typeof defaultCounterStores,
) => {
  return (counterStoreKey: string) => {
    if (!counterStores.has(counterStoreKey)) {
      counterStores.set(counterStoreKey, createCounterStore())
    }
    return counterStores.get(counterStoreKey)!
  }
}

const getOrCreateCounterStoreByKey =
  createCounterStoreFactory(defaultCounterStores)

export default function App() {
  const [currentTabIndex, setCurrentTabIndex] = useState(0)
  const counterState = useStore(
    getOrCreateCounterStoreByKey(`tab-${currentTabIndex}`),
  )

  return (
    <div style={{ fontFamily: 'monospace' }}>
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid salmon',
          paddingBottom: 4,
        }}
      >
        <button
          type="button"
          style={{
            border: '1px solid salmon',
            backgroundColor: '#fff',
            cursor: 'pointer',
          }}
          onClick={() => setCurrentTabIndex(0)}
        >
          Tab 1
        </button>
        <button
          type="button"
          style={{
            border: '1px solid salmon',
            backgroundColor: '#fff',
            cursor: 'pointer',
          }}
          onClick={() => setCurrentTabIndex(1)}
        >
          Tab 2
        </button>
        <button
          type="button"
          style={{
            border: '1px solid salmon',
            backgroundColor: '#fff',
            cursor: 'pointer',
          }}
          onClick={() => setCurrentTabIndex(2)}
        >
          Tab 3
        </button>
      </div>
      <div style={{ padding: 4 }}>
        Content of Tab {currentTabIndex + 1}
        <br /> <br />
        <button type="button" onClick={() => counterState.increment()}>
          Count: {counterState.count}
        </button>
      </div>
    </div>
  )
}
```

### 在 React 中使用作用域（非全局）vanilla store

首先，我们设置一个 store 来保存屏幕上点的位置。我们将定义 store 来管理 `x` 和 `y` 坐标，并提供一个操作来更新这些坐标。

```tsx
type PositionStoreState = { position: { x: number; y: number } }

type PositionStoreActions = {
  setPosition: (nextPosition: PositionStoreState['position']) => void
}

type PositionStore = PositionStoreState & PositionStoreActions

const createPositionStore = () => {
  return createStore<PositionStore>()((set) => ({
    position: { x: 0, y: 0 },
    setPosition: (position) => set({ position }),
  }))
}
```

接下来，我们将创建一个上下文和一个提供者组件，通过 React 组件树传递 store。这允许每个 `MovingDot` 组件有自己的独立状态。

```tsx
const PositionStoreContext = createContext<ReturnType<
  typeof createPositionStore
> | null>(null)

function PositionStoreProvider({ children }: { children: ReactNode }) {
  const [positionStore] = useState(createPositionStore)

  return (
    <PositionStoreContext.Provider value={positionStore}>
      {children}
    </PositionStoreContext.Provider>
  )
}
```

为了简化访问 store，我们将创建一个 React 自定义 Hook，`usePositionStore`。这个 Hook 将从上下文中读取 store，并允许我们选择状态的特定部分。

```ts
function usePositionStore<U>(selector: (state: PositionStore) => U) {
  const store = useContext(PositionStoreContext)

  if (store === null) {
    throw new Error(
      'usePositionStore 必须在 PositionStoreProvider 内使用',
    )
  }

  return useStore(store, selector)
}
```

现在，让我们创建 `MovingDot` 组件，该组件将在其容器内渲染一个跟随鼠标光标的点。

```tsx
function MovingDot({ color }: { color: string }) {
  const position = usePositionStore((state) => state.position)
  const setPosition = usePositionStore((state) => state.setPosition)

  return (
    <div
      onPointerMove={(e) => {
        setPosition({
          x:
            e.clientX > e.currentTarget.clientWidth
              ? e.clientX - e.currentTarget.clientWidth
              : e.clientX,
          y: e.clientY,
        })
      }}
      style={{
        position: 'relative',
        width: '50vw',
        height: '100vh',
      }}
    >
      <div
        style={{
          position: 'absolute',
          backgroundColor: color,
          borderRadius: '50%',
          transform: `translate(${position.x}px, ${position.y}px)`,
          left: -10,
          top: -10,
          width: 20,
          height: 20,
        }}
      />
    </div>
  )
}
```

最后，我们将在 `App` 组件中将所有内容结合起来，在其中渲染两个 `MovingDot` 组件，每个组件都有自己的独立状态。

```tsx
export default function App() {
  return (
    <div style={{ display: 'flex' }}>
      <PositionStoreProvider>
        <MovingDot color="red" />
      </PositionStoreProvider>
      <PositionStoreProvider>
        <MovingDot color="blue" />
      </PositionStoreProvider>
    </div>
  )
}
```

代码如下所示：

```tsx
import { type ReactNode, useState, createContext, useContext } from 'react'
import { createStore, useStore } from 'zustand'

type PositionStoreState = { position: { x: number; y: number } }

type PositionStoreActions = {
  setPosition: (nextPosition: PositionStoreState['position']) => void
}

type PositionStore = PositionStoreState & PositionStoreActions

const createPositionStore = () => {
  return createStore<PositionStore>()((set) => ({
    position: { x: 0, y: 0 },
    setPosition: (position) => set({ position }),
  }))
}

const PositionStoreContext = createContext<ReturnType<
  typeof createPositionStore
> | null>(null)

function PositionStoreProvider({ children }: { children: ReactNode }) {
  const [positionStore] = useState(createPositionStore)

  return (
    <PositionStoreContext.Provider value={positionStore}>
      {children}
    </PositionStoreContext.Provider>
  )
}

function usePositionStore<U>(selector: (state: PositionStore) => U) {
  const store = useContext(PositionStoreContext)

  if (store === null) {
    throw new Error(
      'usePositionStore 必须在 PositionStoreProvider 内使用',
    )
  }

  return useStore(store, selector)
}

function MovingDot({ color }: { color: string }) {
  const position = usePositionStore((state) => state.position)
  const setPosition = usePositionStore((state) => state.setPosition)

  return (
    <div
      onPointerMove={(e) => {
        setPosition({
          x:
            e.clientX > e.currentTarget.clientWidth
              ? e.clientX - e.currentTarget.clientWidth
              : e.clientX,
          y: e.clientY,
        })
      }}
      style={{
        position: 'relative',
        width: '50vw',
        height: '100vh',
      }}
    >
      <div
        style={{
          position: 'absolute',
          backgroundColor: color,
          borderRadius: '50%',
          transform: `translate(${position.x}px, ${position.y}px)`,
          left: -10,
          top: -10,
          width: 20,
          height: 20,
        }}
      />
    </div>
  )
}

export default function App() {
  return (
    <div style={{ display: 'flex' }}>
      <PositionStoreProvider>
        <MovingDot color="red" />
      </PositionStoreProvider>
      <PositionStoreProvider>
        <MovingDot color="blue" />
      </PositionStoreProvider>
    </div>
  )
}
```

### 在 React 中使用动态作用域（非全局）vanilla store

首先，我们将创建一个工厂函数，用于生成管理计数器状态的 store。每个标签页将有自己的 store 实例。

```ts
import { createStore } from 'zustand'

type CounterState = {
  count: number
}

type CounterActions = { increment: () => void }

type CounterStore = CounterState & CounterActions

const createCounterStore = () => {
  return createStore<CounterStore>()((set) => ({
    count: 0,
    increment: () => {
      set((state) => ({ count: state.count + 1 }))
    },
  }))
}
```

接下来，我们将创建一个工厂函数来管理计数器 stores 的创建和检索。这允许每个标签页都有自己的独立计数器。

```ts
const createCounterStoreFactory = (
  counterStores: Map<string, ReturnType<typeof createCounterStore>>,
) => {
  return (counterStoreKey: string) => {
    if (!counterStores.has(counterStoreKey)) {
      counterStores.set(counterStoreKey, createCounterStore())
    }
    return counterStores.get(counterStoreKey)!
  }
}
```

接下来，我们需要一种方法来管理和访问整个应用程序中的这些 stores。我们将使用 React 的上下文来实现这一点。

```tsx
const CounterStoresContext = createContext(null)

const CounterStoresProvider = ({ children }) => {
  const [stores] = useState(
    () => new Map<string, ReturnType<typeof createCounterStore>>(),
  )

  return (
    <CounterStoresContext.Provider value={stores}>
      {children}
    </CounterStoresContext.Provider>
  )
}
```

现在，我们将创建一个自定义 Hook，`useCounterStore`，它允许我们访问给定标签页的正确 store。

```tsx
const useCounterStore = <U>(
  currentTabIndex: number,
  selector: (state: CounterStore) => U,
) => {
  const stores = useContext(CounterStoresContext)

  if (stores === undefined) {
    throw new Error('useCounterStore 必须在 CounterStoresProvider 内使用')
  }

  const getOrCreateCounterStoreByKey = useCallback(
    () => createCounterStoreFactory(stores),
    [stores],
  )

  return useStore(getOrCreateCounterStoreByKey(`tab-${currentTabIndex}`))
}
```

现在，让我们构建 Tabs 组件，用户可以在其中切换标签页并增加每个标签页的计数器。

```tsx
function Tabs() {
  const [currentTabIndex, setCurrentTabIndex] = useState(0)
  const counterState = useCounterStore(
    `tab-${currentTabIndex}`,
    (state) => state,
  )

  return (
    <div style={{ fontFamily: 'monospace' }}>
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid salmon',
          paddingBottom: 4,
        }}
      >
        <button
          type="button"
          style={{
            border: '1px solid salmon',
            backgroundColor: '#fff',
            cursor: 'pointer',
          }}
          onClick={() => setCurrentTabIndex(0)}
        >
          Tab 1
        </button>
        <button
          type="button"
          style={{
            border: '1px solid salmon',
            backgroundColor: '#fff',
            cursor: 'pointer',
          }}
          onClick={() => setCurrentTabIndex(1)}
        >
          Tab 2
        </button>
        <button
          type="button"
          style={{
            border: '1px solid salmon',
            backgroundColor: '#fff',
            cursor: 'pointer',
          }}
          onClick={() => setCurrentTabIndex(2)}
        >
          Tab 3
        </button>
      </div>
      <div style={{ padding: 4 }}>
        Content of Tab {currentTabIndex + 1}
        <br /> <br />
        <button type="button" onClick={() => counterState.increment()}>
          Count: {counterState.count}
        </button>
      </div>
    </div>
  )
}
```

最后，我们将创建 `App` 组件，该组件渲染标签页及其各自的计数器。计数器状态独立管理每个标签页。

```tsx
export default function App() {
  return (
    <CounterStoresProvider>
      <Tabs />
    </CounterStoresProvider>
  )
}
```

代码如下所示：

```tsx
import {
  type ReactNode,
  useState,
  useCallback,
  useContext,
  createContext,
} from 'react'
import { createStore, useStore } from 'zustand'

type CounterState = {
  count: number
}

type CounterActions = { increment: () => void }

type CounterStore = CounterState & CounterActions

const createCounterStore = () => {
  return createStore<CounterStore>()((set) => ({
    count: 0,
    increment: () => {
      set((state) => ({ count: state.count + 1 }))
    },
  }))
}

const createCounterStoreFactory = (
  counterStores: Map<string, ReturnType<typeof createCounterStore>>,
) => {
  return (counterStoreKey: string) => {
    if (!counterStores.has(counterStoreKey)) {
      counterStores.set(counterStoreKey, createCounterStore())
    }
    return counterStores.get(counterStoreKey)!
  }
}

const CounterStoresContext = createContext<Map<
  string,
  ReturnType<typeof createCounterStore>
> | null>(null)

const CounterStoresProvider = ({ children }: { children: ReactNode }) => {
  const [stores] = useState(
    () => new Map<string, ReturnType<typeof createCounterStore>>(),
  )

  return (
    <CounterStoresContext.Provider value={stores}>
      {children}
    </CounterStoresContext.Provider>
  )
}

const useCounterStore = <U,>(
  key: string,
  selector: (state: CounterStore) => U,
) => {
  const stores = useContext(CounterStoresContext)

  if (stores === undefined) {
    throw new Error('useCounterStore 必须在 CounterStoresProvider 内使用')
  }

  const getOrCreateCounterStoreByKey = useCallback(
    (key: string) => createCounterStoreFactory(stores!)(key),
    [stores],
  )

  return useStore(getOrCreateCounterStoreByKey(key), selector)
}

function Tabs() {
  const [currentTabIndex, setCurrentTabIndex] = useState(0)
  const counterState = useCounterStore(
    `tab-${currentTabIndex}`,
    (state) => state,
  )

  return (
    <div style={{ fontFamily: 'monospace' }}>
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid salmon',
          paddingBottom: 4,
        }}
      >
        <button
          type="button"
          style={{
            border: '1px solid salmon',
            backgroundColor: '#fff',
            cursor: 'pointer',
          }}
          onClick={() => setCurrentTabIndex(0)}
        >
          Tab 1
        </button>
        <button
          type="button"
          style={{
            border: '1px solid salmon',
            backgroundColor: '#fff',
            cursor: 'pointer',
          }}
          onClick={() => setCurrentTabIndex(1)}
        >
          Tab 2
        </button>
        <button
          type="button"
          style={{
            border: '1px solid salmon',
            backgroundColor: '#fff',
            cursor: 'pointer',
          }}
          onClick={() => setCurrentTabIndex(2)}
        >
          Tab 3
        </button>
      </div>
      <div style={{ padding: 4 }}>
        Content of Tab {currentTabIndex + 1}
        <br /> <br />
        <button type="button" onClick={() => counterState.increment()}>
          Count: {counterState.count}
        </button>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <CounterStoresProvider>
      <Tabs />
    </CounterStoresProvider>
  )
}
```

## 故障排除

TBD
