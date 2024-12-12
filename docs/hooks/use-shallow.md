---
title: useShallow ⚛️
description: 如何记忆选择器函数
nav: 28
---

`useShallow` 是一个 React Hook，可以让你优化重新渲染。

```js
const memoizedSelector = useShallow(selector)
```

- [类型](#类型)
  - [签名](#签名)
- [参考](#参考)
- [用法](#用法)
  - [编写记忆选择器](#编写记忆选择器)
- [故障排除](#故障排除)

### 签名

```ts
useShallow<T, U = T>(selectorFn: (state: T) => U): (state: T) => U
```

## 参考

### `useShallow(selectorFn)`

#### 参数

- `selectorFn`: 一个函数，允许你返回基于当前状态的数据。

#### 返回值

`useShallow` 返回一个使用浅比较进行记忆的选择器函数的记忆版本。

## 用法

### 编写记忆选择器

首先，我们需要设置一个存储来保存熊家庭的状态。在这个存储中，我们定义了三个属性：`papaBear`、`mamaBear` 和 `babyBear`，每个属性代表熊家庭的不同成员及其各自的粥锅大小。

```tsx
import { create } from 'zustand'

type BearFamilyMealsStore = {
  [key: string]: string
}

const useBearFamilyMealsStore = create<BearFamilyMealsStore>()(() => ({
  papaBear: '大粥锅',
  mamaBear: '中等大小的粥锅',
  babyBear: '一个小小的粥锅',
}))
```

接下来，我们将创建一个 `BearNames` 组件，该组件检索我们状态的键（熊家庭成员）并显示它们。

```tsx
function BearNames() {
  const names = useBearFamilyMealsStore((state) => Object.keys(state))

  return <div>{names.join(', ')}</div>
}
```

接下来，我们将创建一个 `UpdateBabyBearMeal` 组件，该组件定期更新小熊的餐点选择。

```tsx
const meals = [
  '一个小小的碗',
  '一个小巧的锅',
  '一个小小的碗',
  '一个小巧的盘子',
  '一个小小的容器',
  '一个小小的锅',
  '一个小小的杯子',
  '一个小小的罐子',
  '一个小小的平底锅',
  '一个小小的罐子',
]

function UpdateBabyBearMeal() {
  useEffect(() => {
    const timer = setInterval(() => {
      useBearFamilyMealsStore.setState({
        tinyBear: meals[Math.floor(Math.random() * (meals.length - 1))],
      })
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return null
}
```

最后，我们将两个组件组合在 `App` 组件中以查看它们的实际效果。

```tsx
export default function App() {
  return (
    <>
      <UpdateTinyBearPorridge />
      <BearNames />
    </>
  )
}
```

代码应该如下所示：

```tsx
import { useEffect } from 'react'
import { create } from 'zustand'

type BearFamilyMealsStore = {
  [key: string]: string
}

const useBearFamilyMealsStore = create<BearFamilyMealsStore>()(() => ({
  papaBear: '大粥锅',
  mamaBear: '中等大小的粥锅',
  babyBear: '一个小小的粥锅',
}))

const meals = [
  '一个小小的碗',
  '一个小巧的锅',
  '一个小小的碗',
  '一个小巧的盘子',
  '一个小小的容器',
  '一个小小的锅',
  '一个小小的杯子',
  '一个小小的罐子',
  '一个小小的平底锅',
  '一个小小的罐子',
]

function UpdateBabyBearMeal() {
  useEffect(() => {
    const timer = setInterval(() => {
      useBearFamilyMealsStore.setState({
        tinyBear: meals[Math.floor(Math.random() * (meals.length - 1))],
      })
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return null
}

function BearNames() {
  const names = useBearFamilyMealsStore((state) => Object.keys(state))

  return <div>{names.join(', ')}</div>
}

export default function App() {
  return (
    <>
      <UpdateBabyBearMeal />
      <BearNames />
    </>
  )
}
```

一切看起来都很好，但有一个小问题：即使名字没有改变，`BearNames` 组件也会不断重新渲染。这是因为组件在状态的任何部分发生变化时都会重新渲染，即使我们关心的特定部分（名字列表）没有改变。

为了解决这个问题，我们使用 `useShallow` 来确保组件仅在状态的实际键发生变化时重新渲染：

```tsx
function BearNames() {
  const names = useBearFamilyStore(useShallow((state) => Object.keys(state)))

  return <div>{names.join(', ')}</div>
}
```

代码应该如下所示：

```tsx
import { useEffect } from 'react'
import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

type BearFamilyMealsStore = {
  [key: string]: string
}

const useBearFamilyMealsStore = create<BearFamilyMealsStore>()(() => ({
  papaBear: '大粥锅',
  mamaBear: '中等大小的粥锅',
  babyBear: '一个小小的粥锅',
}))

const meals = [
  '一个小小的碗',
  '一个小巧的锅',
  '一个小小的碗',
  '一个小巧的盘子',
  '一个小小的容器',
  '一个小小的锅',
  '一个小小的杯子',
  '一个小小的罐子',
  '一个小小的平底锅',
  '一个小小的罐子',
]

function UpdateBabyBearMeal() {
  useEffect(() => {
    const timer = setInterval(() => {
      useBearFamilyMealsStore.setState({
        tinyBear: meals[Math.floor(Math.random() * (meals.length - 1))],
      })
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return null
}

function BearNames() {
  const names = useBearFamilyMealsStore(
    useShallow((state) => Object.keys(state)),
  )

  return <div>{names.join(', ')}</div>
}

export default function App() {
  return (
    <>
      <UpdateBabyBearMeal />
      <BearNames />
    </>
  )
}
```

通过使用 `useShallow`，我们优化了渲染过程，确保组件仅在必要时重新渲染，从而提高了整体性能。

## 故障排除

待定
