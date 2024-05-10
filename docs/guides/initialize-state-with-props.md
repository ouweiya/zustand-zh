---
title: 使用 props 初始化状态
nav: 14
---

在需要[依赖注入](https://zh.wikipedia.org/wiki/%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5)的情况下，例如当一个存储应该用组件的 props 进行初始化时，推荐的方法是使用带有 React.context 的原生存储。

## 使用 `createStore` 的存储创建器 {#store-creator-with-`createstore`}

```ts
import { createStore } from 'zustand'

interface BearProps {
    bears: number
}

interface BearState extends BearProps {
    addBear: () => void
}

type BearStore = ReturnType<typeof createBearStore>

const createBearStore = (initProps?: Partial<BearProps>) => {
    const DEFAULT_PROPS: BearProps = {
        bears: 0,
    }
    return createStore<BearState>()((set) => ({
        ...DEFAULT_PROPS,
        ...initProps,
        addBear: () => set((state) => ({ bears: ++state.bears })),
    }))
}
```

## 使用 `React.createContext` 创建上下文 {#creating-a-context-with-`react.createcontext`}

```ts
import { createContext } from 'react'

export const BearContext = createContext<BearStore | null>(null)
```

## 基本组件使用 {#basic-component-usage}

```tsx
// Provider 实现
import { useRef } from 'react'

function App() {
    const store = useRef(createBearStore()).current
    return (
        <BearContext.Provider value={store}>
            <BasicConsumer />
        </BearContext.Provider>
    )
}
```

```tsx
// Consumer 组件
import { useContext } from 'react'
import { useStore } from 'zustand'

function BasicConsumer() {
    const store = useContext(BearContext)
    if (!store) throw new Error('树中缺少 BearContext.Provider')
    const bears = useStore(store, (s) => s.bears)
    const addBear = useStore(store, (s) => s.addBear)
    return (
        <>
            <div>{bears} 熊。</div>
            <button onClick={addBear}>添加熊</button>
        </>
    )
}
```

## 常见模式 {#common-patterns}

### 包装上下文提供者 {#wrapping-the-context-provider}

```tsx
// Provider 包装器
import { useRef } from 'react'

type BearProviderProps = React.PropsWithChildren<BearProps>

function BearProvider({ children, ...props }: BearProviderProps) {
    const storeRef = useRef<BearStore>()
    if (!storeRef.current) {
        storeRef.current = createBearStore(props)
    }
    return (
        <BearContext.Provider value={storeRef.current}>
            {children}
        </BearContext.Provider>
    )
}
```

### 将上下文逻辑提取到自定义钩子中 {#extracting-context-logic-into-a-custom-hook}

```tsx
// 模仿 `create` 返回的钩子
import { useContext } from 'react'
import { useStore } from 'zustand'

function useBearContext<T>(selector: (state: BearState) => T): T {
    const store = useContext(BearContext)
    if (!store) throw new Error('树中缺少 BearContext.Provider')
    return useStore(store, selector)
}
```

```tsx
// 自定义钩子的 Consumer 使用
function CommonConsumer() {
    const bears = useBearContext((s) => s.bears)
    const addBear = useBearContext((s) => s.addBear)
    return (
        <>
            <div>{bears} 熊。</div>
            <button onClick={addBear}>添加熊</button>
        </>
    )
}
```

### 可选地允许使用自定义等式函数 {#optionally-allow-using-a-custom-equality-function}

```tsx
// 通过使用 useStoreWithEqualityFn 而不是 useStore 允许自定义等式函数
import { useContext } from 'react'
import { useStoreWithEqualityFn } from 'zustand/traditional'

function useBearContext<T>(
    selector: (state: BearState) => T,
    equalityFn?: (left: T, right: T) => boolean,
): T {
    const store = useContext(BearContext)
    if (!store) throw new Error('树中缺少 BearContext.Provider')
    return useStoreWithEqualityFn(store, selector, equalityFn)
}
```

### 完整示例 {#complete-example}

```tsx
// 提供者包装器和自定义钩子消费者
function App2() {
  return (
    <BearProvider bears={2}>
      <HookConsumer />
    </BearProvider>
  )
}
```
