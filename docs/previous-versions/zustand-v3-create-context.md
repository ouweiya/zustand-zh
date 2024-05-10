---
title: 从zustand/context中创建上下文
nav: 18
---

自v3.5起，提供了特殊的 `createContext`，
这避免了误用存储钩子。

> **注意**：此函数在v4中已被弃用，并将在v5中被移除。参见[迁移](#migration)。

```jsx
import create from 'zustand'
import createContext from 'zustand/context'

const { Provider, useStore } = createContext()

const createStore = () => create(...)

const App = () => (
    <Provider createStore={createStore}>
        ...
    </Provider>
)

const Component = () => {
    const state = useStore()
    const slice = useStore(selector)
    ...
}
```

## 在真实组件中使用 createContext {#createcontext-usage-in-real-components}

```jsx
import create from "zustand";
import createContext from "zustand/context";

// 最佳实践：你可以将下面的 createContext() 和 createStore 移到一个单独的文件(store.js)中，并在这里/你需要的地方导入 Provider，useStore。

const { Provider, useStore } = createContext();

const createStore = () =>
    create((set) => ({
        bears: 0,
        increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
        removeAllBears: () => set({ bears: 0 })
    }));

const Button = () => {
    return (
            {/** store() - 这将为每次使用 Button 组件创建一个存储，而不是为所有组件使用一个存储 **/}
        <Provider createStore={createStore}>
            <ButtonChild />
        </Provider>
    );
};

const ButtonChild = () => {
    const state = useStore();
    return (
        <div>
            {state.bears}
            <button
                onClick={() => {
                    state.increasePopulation();
                }}
            >
                +
            </button>
        </div>
    );
};

export default function App() {
    return (
        <div className="App">
            <Button />
            <Button />
        </div>
    );
}
```

## 使用来自 props 的初始化的 createContext 使用 {#createcontext-usage-with-initialization-from-props}

```tsx
import create from 'zustand'
import createContext from 'zustand/context'

const { Provider, useStore } = createContext()

export default function App({ initialBears }) {
    return (
        <Provider
            createStore={() =>
                create((set) => ({
                    bears: initialBears,
                    increase: () => set((state) => ({ bears: state.bears + 1 })),
                }))
            }
        >
            <Button />
        </Provider>
    )
}
```

## 迁移 {#migration}

讨论：https://github.com/pmndrs/zustand/discussions/1276

这是使用v4 API的新上下文使用方法。

```jsx
import { createContext, useContext, useRef } from 'react'
import { createStore, useStore } from 'zustand'

const StoreContext = createContext(null)

const StoreProvider = ({ children }) => {
    const storeRef = useRef()
    if (!storeRef.current) {
        storeRef.current = createStore((set) => ({
            // ...
        }))
    }
    return (
        <StoreContext.Provider value={storeRef.current}>
            {children}
        </StoreContext.Provider>
    )
}

const useStoreInContext = (selector) => {
    const store = useContext(StoreContext)
    if (!store) {
        throw new Error('Missing StoreProvider')
    }
    return useStore(store, selector)
}
```

或者使用一些提供 Zustand v3-like APIs 的第三方库：

- https://github.com/charkour/zustand-di
- https://github.com/arvinxx/zustand-utils
