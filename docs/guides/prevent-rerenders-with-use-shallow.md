---
title: 使用 useShallow 防止重新渲染
nav: 16
---

当你需要从存储中订阅一个计算状态时，推荐的方式是使用选择器。

计算选择器将在输出根据 [Object.is](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 改变时导致重新渲染。

在这种情况下，你可能希望使用 `useShallow` 来避免如果计算值总是浅相等于前一个值时的重新渲染。

## 示例 {#example}

我们有一个存储，它将每只熊与一顿饭关联起来，我们想要渲染他们的名字。

```js
import { create } from 'zustand'

const useMeals = create(() => ({
    papaBear: 'large porridge-pot',
    mamaBear: 'middle-size porridge pot',
    littleBear: 'A little, small, wee pot',
}))

export const BearNames = () => {
    const names = useMeals((state) => Object.keys(state))

    return <div>{names.join(', ')}</div>
}
```

现在爸爸熊想要一块披萨：

```js
useMeals.setState({
    papaBear: 'a large pizza',
})
```

这个改变导致 `BearNames` 重新渲染，尽管 `names` 的实际输出根据浅相等并没有改变。

我们可以使用 `useShallow` 来修复这个问题！

```js
import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

const useMeals = create(() => ({
    papaBear: 'large porridge-pot',
    mamaBear: 'middle-size porridge pot',
    littleBear: 'A little, small, wee pot',
}))

export const BearNames = () => {
    const names = useMeals(useShallow((state) => Object.keys(state)))

    return <div>{names.join(', ')}</div>
}
```

现在他们都可以点其他的餐，而不会导致我们的 `BearNames` 组件不必要的重新渲染。
