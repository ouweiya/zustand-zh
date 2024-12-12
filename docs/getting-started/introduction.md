---
title: 介绍
description: 如何使用 Zustand
nav: 0
---

![bear.jpg](../../static/img/bear.jpg)

一个小巧，快速，可扩展的基础状态管理解决方案。
Zustand基于hooks的API使用起来非常舒适。
它既不繁琐也不固执己见，
但有足够的约定使其明确且类似于flux。

不要因为它可爱就忽视它，它有爪子！
花了很多时间来处理常见的陷阱，
如令人头疼的[僵尸子问题]，
[React并发]，以及
在混合渲染器之间的[上下文丢失]。
它可能是React领域中唯一正确处理所有这些问题的状态管理器。

你可以在[这里](https://codesandbox.io/s/dazzling-moon-itop4)试用一个实时演示。

[僵尸子问题]: https://react-redux.js.org/api/hooks#stale-props-and-zombie-children
[React并发]: https://github.com/bvaughn/rfcs/blob/useMutableSource/text/0000-use-mutable-source.md
[上下文丢失]: https://github.com/facebook/react/issues/13332

## 安装 {#installation}

Zustand可以在NPM上作为一个包使用：

```bash
npm install zustand
```

## 首先创建一个存储 {#first-create-a-store}

你的存储是一个钩子！
你可以在其中放置任何东西：原始值，对象，函数。
`set`函数会合并状态。

```js
import { create } from 'zustand'

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}))
```

## 然后绑定你的组件，就这样！ {#then-bind-your-components,-and-that's-it!}

你可以在任何地方使用这个钩子，无需提供者。
选择你的状态，当状态改变时，
消费组件将重新渲染。

```jsx
function BearCounter() {
  const bears = useStore((state) => state.bears)
  return <h1>{bears} around here...</h1>
}

function Controls() {
  const increasePopulation = useStore((state) => state.increasePopulation)
  return <button onClick={increasePopulation}>one up</button>
}
```
