---
title: 与 Next.js 的设置
nav: 21
---

[Next.js](https://nextjs.org) 是一个流行的 React 服务器端渲染框架，它对 Zustand 的使用提出了一些独特的挑战。请记住，Zustand 存储是一个全局变量（也称为模块状态），使得使用 `Context` 变得可选。这些挑战包括：

- **每请求一次创建一个存储**：Next.js 服务器可以同时处理多个请求。这意味着应该为每个请求创建存储，而不应该在请求之间共享存储。
- **支持 SSR**：Next.js 应用程序会被渲染两次，首先在服务器上，然后在客户端上。如果客户端和服务器上的输出不同，将会导致 "hydration errors"。为了避免这种情况，需要在服务器上初始化存储，然后在客户端上用相同的数据重新初始化存储。请在我们的 [SSR 和 Hydration](./ssr-and-hydration) 指南中阅读更多相关内容。
- **支持 SPA 路由**：Next.js 支持客户端路由的混合模型，这意味着为了重置存储，我们需要在组件级别使用 `Context` 来初始化它。
- **支持服务器缓存**：最近版本的 Next.js（特别是使用 App Router 架构的应用程序）支持积极的服务器缓存。由于我们的存储是一个 **模块状态**，所以它完全兼容这种缓存。

我们对 Zustand 的适当使用有以下一般建议：

- **不使用全局存储** - 因为存储不应该在请求之间共享，所以不应该将其定义为全局变量。相反，应该为每个请求创建存储。
- **React 服务器组件不应该从存储中读取或写入** - RSCs 不能使用钩子或上下文。他们不应该有状态。让 RSC 从全局存储中读取或写入值违反了 Next.js 的架构。

### 每请求一次创建一个存储 {#creating-a-store-per-request}

让我们编写我们的存储工厂函数，为每个请求创建一个新的存储。

```json
// tsconfig.json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

> **注意：**不要忘记从你的 `tsconfig.json` 文件中删除所有的注释。

```ts
// src/stores/counter-store.ts
import { createStore } from 'zustand/vanilla'

export type CounterState = {
  count: number
}

export type CounterActions = {
  decrementCount: () => void
  incrementCount: () => void
}

export type CounterStore = CounterState & CounterActions

export const defaultInitState: CounterState = {
  count: 0,
}

export const createCounterStore = (
  initState: CounterState = defaultInitState,
) => {
  return createStore<CounterStore>()((set) => ({
    ...initState,
    decrementCount: () => set((state) => ({ count: state.count - 1 })),
    incrementCount: () => set((state) => ({ count: state.count + 1 })),
  }))
}
```

### 提供存储 {#providing-the-store}

让我们在组件中使用 `createCounterStore` 并通过上下文提供器共享它。

```tsx
// src/providers/counter-store-provider.tsx
'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type CounterStore, createCounterStore } from '@/stores/counter-store'

export type CounterStoreApi = ReturnType<typeof createCounterStore>

export const CounterStoreContext = createContext<CounterStoreApi | undefined>(
  undefined,
)

export interface CounterStoreProviderProps {
  children: ReactNode
}

export const CounterStoreProvider = ({
  children,
}: CounterStoreProviderProps) => {
  const storeRef = useRef<CounterStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createCounterStore()
  }

  return (
    <CounterStoreContext.Provider value={storeRef.current}>
      {children}
    </CounterStoreContext.Provider>
  )
}

export const useCounterStore = <T,>(
  selector: (store: CounterStore) => T,
): T => {
  const counterStoreContext = useContext(CounterStoreContext)

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`)
  }

  return useStore(counterStoreContext, selector)
}
```

> **注意：**在这个例子中，我们通过检查引用的值来确保这个组件是可重新渲染的，所以存储只会被创建一次。这个组件在服务器上每个请求只会被渲染一次，但是如果在这个组件的树上有状态的客户端组件，或者如果这个组件也包含其他导致重新渲染的可变状态，那么这个组件可能会在客户端被重新渲染多次。

### 初始化存储 {#initializing-the-store}

```ts
// src/stores/counter-store.ts
import { createStore } from 'zustand/vanilla'

export type CounterState = {
  count: number
}

export type CounterActions = {
  decrementCount: () => void
  incrementCount: () => void
}

export type CounterStore = CounterState & CounterActions

export const initCounterStore = (): CounterState => {
  return { count: new Date().getFullYear() }
}

export const defaultInitState: CounterState = {
  count: 0,
}

export const createCounterStore = (
  initState: CounterState = defaultInitState,
) => {
  return createStore<CounterStore>()((set) => ({
    ...initState,
    decrementCount: () => set((state) => ({ count: state.count - 1 })),
    incrementCount: () => set((state) => ({ count: state.count + 1 })),
  }))
}
```

```tsx
// src/providers/counter-store-provider.tsx
'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
  type CounterStore,
  createCounterStore,
  initCounterStore,
} from '@/stores/counter-store'

export type CounterStoreApi = ReturnType<typeof createCounterStore>

export const CounterStoreContext = createContext<CounterStoreApi | undefined>(
  undefined,
)

export interface CounterStoreProviderProps {
  children: ReactNode
}

export const CounterStoreProvider = ({
  children,
}: CounterStoreProviderProps) => {
  const storeRef = useRef<CounterStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createCounterStore(initCounterStore())
  }

  return (
    <CounterStoreContext.Provider value={storeRef.current}>
      {children}
    </CounterStoreContext.Provider>
  )
}

export const useCounterStore = <T,>(
  selector: (store: CounterStore) => T,
): T => {
  const counterStoreContext = useContext(CounterStoreContext)

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`)
  }

  return useStore(counterStoreContext, selector)
}
```

### 在不同架构中使用存储 {#using-the-store-with-different-architectures}

Next.js应用有两种架构：[页面路由器](https://nextjs.org/docs/pages/building-your-application/routing)和[应用路由器](https://nextjs.org/docs/app/building-your-application/routing)。在这两种架构上使用Zustand的方式应该是相同的，只是与每种架构相关的细微差别。

#### 页面路由器 {#pages-router}

```tsx
// src/components/pages/home-page.tsx
import { useCounterStore } from '@/providers/counter-store-provider.ts'

export const HomePage = () => {
  const { count, incrementCount, decrementCount } = useCounterStore(
    (state) => state,
  )

  return (
    <div>
      Count: {count}
      <hr />
      <button type="button" onClick={() => void incrementCount()}>
        Increment Count
      </button>
      <button type="button" onClick={() => void decrementCount()}>
        Decrement Count
      </button>
    </div>
  )
}
```

```tsx
// src/_app.tsx
import type { AppProps } from 'next/app'

import { CounterStoreProvider } from '@/providers/counter-store-provider.tsx'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CounterStoreProvider>
      <Component {...pageProps} />
    </CounterStoreProvider>
  )
}
```

```tsx
// src/pages/index.tsx
import { HomePage } from '@/components/pages/home-page.tsx'

export default function Home() {
  return <HomePage />
}
```

> **注意：**每个路由创建一个存储会需要在页面（路由）组件级别创建和共享存储。如果你不需要为每个路由创建一个存储，尽量不要使用这种方式。

```tsx
// src/pages/index.tsx
import { CounterStoreProvider } from '@/providers/counter-store-provider.tsx'
import { HomePage } from '@/components/pages/home-page.tsx'

export default function Home() {
  return (
    <CounterStoreProvider>
      <HomePage />
    </CounterStoreProvider>
  )
}
```

#### App Router {#app-router}

```tsx
// src/components/pages/home-page.tsx
'use client'

import { useCounterStore } from '@/providers/counter-store-provider'

export const HomePage = () => {
  const { count, incrementCount, decrementCount } = useCounterStore(
    (state) => state,
  )

  return (
    <div>
      Count: {count}
      <hr />
      <button type="button" onClick={() => void incrementCount()}>
        Increment Count
      </button>
      <button type="button" onClick={() => void decrementCount()}>
        Decrement Count
      </button>
    </div>
  )
}
```

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { CounterStoreProvider } from '@/providers/counter-store-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CounterStoreProvider>{children}</CounterStoreProvider>
      </body>
    </html>
  )
}
```

```tsx
// src/app/page.tsx
import { HomePage } from '@/components/pages/home-page'

export default function Home() {
  return <HomePage />
}
```

> **注意：**每个路由创建一个存储会需要在页面（路由）组件级别创建和共享存储。如果你不需要为每个路由创建一个存储，尽量不要使用这种方式。

```tsx
// src/app/page.tsx
import { CounterStoreProvider } from '@/providers/counter-store-provider'
import { HomePage } from '@/components/pages/home-page'

export default function Home() {
  return (
    <CounterStoreProvider>
      <HomePage />
    </CounterStoreProvider>
  )
}
```
