---
title: 比较
description: Zustand 与类似库的对比
nav: 1
---

Zustand 是 React 的众多状态管理库之一。
在这个页面上，我们将讨论 Zustand，
并将其与一些其他库进行比较，
包括 Redux，Valtio，Jotai 和 Recoil。

每个库都有自己的优点和缺点，
我们将比较每个库之间的关键差异和相似之处。

## Redux {#redux}

### 状态模型（与 Redux 的比较） {#状态模型（与-redux-的比较）}

从概念上讲，Zustand 和 Redux 非常相似，
它们都基于不可变的状态模型。
然而，Redux 要求你的应用被包裹
在上下文提供者中；Zustand 则不需要。

**Zustand**

```ts
import { create } from 'zustand'

type State = {
  count: number
}

type Actions = {
  increment: (qty: number) => void
  decrement: (qty: number) => void
}

const useCountStore = create<State & Actions>((set) => ({
  count: 0,
  increment: (qty: number) => set((state) => ({ count: state.count + qty })),
  decrement: (qty: number) => set((state) => ({ count: state.count - qty })),
}))
```

```ts
import { create } from 'zustand'

type State = {
  count: number
}

type Actions = {
  increment: (qty: number) => void
  decrement: (qty: number) => void
}

type Action = {
  type: keyof Actions
  qty: number
}

const countReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.qty }
    case 'decrement':
      return { count: state.count - action.qty }
    default:
      return state
  }
}

const useCountStore = create<State & Actions>((set) => ({
  count: 0,
  dispatch: (action: Action) => set((state) => countReducer(state, action)),
}))
```

**Redux**

```ts
import { createStore } from 'redux'
import { useSelector, useDispatch } from 'react-redux'

type State = {
  count: number
}

type Action = {
  type: 'increment' | 'decrement'
  qty: number
}

const countReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.qty }
    case 'decrement':
      return { count: state.count - action.qty }
    default:
      return state
  }
}

const countStore = createStore(countReducer)
```

```ts
import { createSlice, configureStore } from '@reduxjs/toolkit'

const countSlice = createSlice({
  name: 'count',
  initialState: { value: 0 },
  reducers: {
    incremented: (state, qty: number) => {
      // Redux Toolkit 不会改变状态，它在幕后使用 Immer 库，
      // 允许我们拥有所谓的 "草稿状态"。
      state.value += qty
    },
    decremented: (state, qty: number) => {
      state.value -= qty
    },
  },
})

const countStore = configureStore({ reducer: countSlice.reducer })
```

### 渲染优化（与 Redux 的比较）

在你的应用程序内进行渲染优化时，
Zustand 和 Redux 之间在方法上没有主要的差异。
在这两个库中，都建议你通过使用选择器手动应用渲染优化。

**Zustand**

```ts
import { create } from 'zustand'

type State = {
  count: number
}

type Actions = {
  increment: (qty: number) => void
  decrement: (qty: number) => void
}

const useCountStore = create<State & Actions>((set) => ({
  count: 0,
  increment: (qty: number) => set((state) => ({ count: state.count + qty })),
  decrement: (qty: number) => set((state) => ({ count: state.count - qty })),
}))

const Component = () => {
  const count = useCountStore((state) => state.count)
  const increment = useCountStore((state) => state.increment)
  const decrement = useCountStore((state) => state.decrement)
  // ...
}
```

**Redux**

```ts
import { createStore } from 'redux'
import { useSelector, useDispatch } from 'react-redux'

type State = {
  count: number
}

type Action = {
  type: 'increment' | 'decrement'
  qty: number
}

const countReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.qty }
    case 'decrement':
      return { count: state.count - action.qty }
    default:
      return state
  }
}

const countStore = createStore(countReducer)

const Component = () => {
  const count = useSelector((state) => state.count)
  const dispatch = useDispatch()
  // ...
}
```

```ts
import { useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { createSlice, configureStore } from '@reduxjs/toolkit'

const countSlice = createSlice({
  name: 'count',
  initialState: { value: 0 },
  reducers: {
    incremented: (state, qty: number) => {
      // Redux Toolkit 不会改变状态，它在幕后使用 Immer 库，
      // 允许我们拥有所谓的 "草稿状态"。
      state.value += qty
    },
    decremented: (state, qty: number) => {
      state.value -= qty
    },
  },
})

const countStore = configureStore({ reducer: countSlice.reducer })

const useAppSelector: TypedUseSelectorHook<typeof countStore.getState> =
  useSelector

const useAppDispatch: () => typeof countStore.dispatch = useDispatch

const Component = () => {
  const count = useAppSelector((state) => state.count.value)
  const dispatch = useAppDispatch()
  // ...
}
```

## Valtio {#valtio}

### 状态模型（与 Valtio 的比较）

Zustand 和 Valtio 在状态管理上的方法
有着根本的不同。
Zustand 基于**不可变**的状态模型，
而 Valtio 基于**可变**的状态模型。

**Zustand**

```ts
import { create } from 'zustand'

type State = {
  obj: { count: number }
}

const store = create<State>(() => ({ obj: { count: 0 } }))

store.setState((prev) => ({ obj: { count: prev.obj.count + 1 } }))
```

**Valtio**

```ts
import { proxy } from 'valtio'

const state = proxy({ obj: { count: 0 } })

state.obj.count += 1
```

### 渲染优化（与 Valtio 的比较）

Zustand 和 Valtio 的另一个区别是
Valtio 通过属性访问进行渲染优化。
然而，对于 Zustand，建议你
通过使用选择器手动应用渲染优化。

**Zustand**

```ts
import { create } from 'zustand'

type State = {
  count: number
}

const useCountStore = create<State>(() => ({
  count: 0,
}))

const Component = () => {
  const count = useCountStore((state) => state.count)
  // ...
}
```

**Valtio**

```ts
import { proxy, useSnapshot } from 'valtio'

const state = proxy({
  count: 0,
})

const Component = () => {
  const { count } = useSnapshot(state)
  // ...
}
```

## Jotai {#jotai}

### 状态模型（与 Jotai 的比较）

Zustand 和 Jotai 之间有两个主要的区别。
首先，Zustand 是一个单一的存储，
而 Jotai 由可以组合在一起的原子组成。
其次，Zustand 存储是一个外部存储，
当需要在 React 外部访问时，它更适合。

**Zustand**

```ts
import { create } from 'zustand'

type State = {
  count: number
}

type Actions = {
  updateCount: (
    countCallback: (count: State['count']) => State['count'],
  ) => void
}

const useCountStore = create<State & Actions>((set) => ({
  count: 0,
  updateCount: (countCallback) =>
    set((state) => ({ count: countCallback(state.count) })),
}))
```

**Jotai**

```ts
import { atom } from 'jotai'

const countAtom = atom<number>(0)
```

### 渲染优化（与 Jotai 的比较）

Jotai 通过原子依赖实现渲染优化。
然而，对于 Zustand，建议你
通过使用选择器手动应用渲染优化。

**Zustand**

```ts
import { create } from 'zustand'

type State = {
  count: number
}

type Actions = {
  updateCount: (
    countCallback: (count: State['count']) => State['count'],
  ) => void
}

const useCountStore = create<State & Actions>((set) => ({
  count: 0,
  updateCount: (countCallback) =>
    set((state) => ({ count: countCallback(state.count) })),
}))

const Component = () => {
  const count = useCountStore((state) => state.count)
  const updateCount = useCountStore((state) => state.updateCount)
  // ...
}
```

**Jotai**

```ts
import { atom, useAtom } from 'jotai'

const countAtom = atom<number>(0)

const Component = () => {
  const [count, updateCount] = useAtom(countAtom)
  // ...
}
```

## Recoil {#recoil}

### 状态模型（与 Recoil 的比较）

Zustand 和 Recoil 之间的差异
与 Zustand 和 Jotai 之间的差异类似。
Recoil 依赖于原子字符串键，
而不是原子对象的引用身份。
此外，Recoil 需要将你的应用包裹在上下文提供者中。

**Zustand**

```ts
import { create } from 'zustand'

type State = {
  count: number
}

type Actions = {
  setCount: (countCallback: (count: State['count']) => State['count']) => void
}

const useCountStore = create<State & Actions>((set) => ({
  count: 0,
  setCount: (countCallback) =>
    set((state) => ({ count: countCallback(state.count) })),
}))
```

**Recoil**

```ts
import { atom } from 'recoil'

const count = atom({
  key: 'count',
  default: 0,
})
```

### 渲染优化（与 Recoil 的比较）

与之前的优化比较类似，
Recoil 通过原子依赖进行渲染优化。
然而，对于 Zustand，建议你
通过使用选择器手动应用渲染优化。

**Zustand**

```ts
import { create } from 'zustand'

type State = {
  count: number
}

type Actions = {
  setCount: (countCallback: (count: State['count']) => State['count']) => void
}

const useCountStore = create<State & Actions>((set) => ({
  count: 0,
  setCount: (countCallback) =>
    set((state) => ({ count: countCallback(state.count) })),
}))

const Component = () => {
  const count = useCountStore((state) => state.count)
  const setCount = useCountStore((state) => state.setCount)
  // ...
}
```

**Recoil**

```ts
import { atom, useRecoilState } from 'recoil'

const countAtom = atom({
  key: 'count',
  default: 0,
})

const Component = () => {
  const [count, setCount] = useRecoilState(countAtom)
  // ...
}
```

## Npm 下载趋势 {#npm-downloads-trend}

- [React 状态管理库的 Npm 下载趋势](https://npm-compare.com/@reduxjs/toolkit,zustand,recoil,jotai,valtio/#timeRange=THREE_YEARS)