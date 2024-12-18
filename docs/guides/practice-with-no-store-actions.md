---
title: 不带 store actions 的实践方式
nav: 7
---

推荐的用法是将 actions 和状态放在 store 内部(让 actions 与状态放在一起)。

例如:

```js
export const useBoundStore = create((set) => ({
  count: 0,
  text: 'hello', 
  inc: () => set((state) => ({ count: state.count + 1 })),
  setText: (text) => set({ text }),
}))
```

这创建了一个包含数据和 actions 的自包含 store。

---

另一种方法是在模块级别定义 actions,将其放在 store 外部。

```js
export const useBoundStore = create(() => ({
  count: 0,
  text: 'hello',
}))

export const inc = () =>
  useBoundStore.setState((state) => ({ count: state.count + 1 }))

export const setText = (text) => useBoundStore.setState({ text })
```

这有几个优点:

- 不需要 hook 就可以调用 action
- 便于代码分割

虽然这种模式没有任何缺点,但有些人可能更喜欢将它们放在一起,因为这更符合封装的特性。
