---
title: 无 store 操作的实践
nav: 7
---

推荐的用法是将操作和状态放在 store 中（让你的操作与状态放在一起）。

例如：

```js
export const useBoundStore = create((set) => ({
  count: 0,
  text: 'hello',
  inc: () => set((state) => ({ count: state.count + 1 })),
  setText: (text) => set({ text }),
}))
```

这会创建一个包含数据和操作的自包含 store。

---

另一种方法是在模块级别定义操作，store 外部。

```js
export const useBoundStore = create(() => ({
  count: 0,
  text: 'hello',
}))

export const inc = () =>
  useBoundStore.setState((state) => ({ count: state.count + 1 }))

export const setText = (text) => useBoundStore.setState({ text })
```

这有几个优点：

- 不需要钩子来调用操作；
- 便于代码拆分。

虽然这种模式没有任何缺点，但有些人可能更喜欢将操作和状态放在一起，因为它具有封装性。
