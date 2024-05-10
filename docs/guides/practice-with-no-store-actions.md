---
title: 无存储操作的实践
nav: 7
---

推荐的用法是将操作和状态放在存储中（让你的操作和你的状态放在一起）。

例如：

```js
export const useBoundStore = create((set) => ({
    count: 0,
    text: 'hello',
    inc: () => set((state) => ({ count: state.count + 1 })),
    setText: (text) => set({ text }),
}))
```

这将创建一个包含数据和操作的自包含存储。

---

另一种方法是在模块级别定义操作，这些操作在存储之外。

```js
export const useBoundStore = create(() => ({
    count: 0,
    text: 'hello',
}))

export const inc = () =>
    useBoundStore.setState((state) => ({ count: state.count + 1 }))

export const setText = (text) => useBoundStore.setState({ text })
```

这有一些优点：

- 调用操作不需要钩子；
- 它有利于代码分割。

虽然这种模式没有任何缺点，但有些人可能更喜欢将其封装在一起，因为它的封装性。
