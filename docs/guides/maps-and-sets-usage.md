---
title: Map 和 Set 的使用
nav: 11
---

你需要将 Map 和 Set 包装在一个对象内。当你希望它的更新被反映出来（例如，在 React 中），
你可以通过调用 `setState` 来实现：

**你可以在这里查看一个 codesandbox：https://codesandbox.io/s/late-https-bxz9qy**

```js
import { create } from 'zustand'

const useFooBar = create(() => ({ foo: new Map(), bar: new Set() }))

function doSomething() {
    // 做一些事情...

    // 如果你想更新一些使用 `useFooBar` 的 React 组件，你必须调用 setState
    // 来让 React 知道发生了更新。
    // 按照 React 的最佳实践，你应该在更新它们时创建一个新的 Map/Set：
    useFooBar.setState((prev) => ({
        foo: new Map(prev.foo).set('newKey', 'newValue'),
        bar: new Set(prev.bar).add('newKey'),
    }))
}
```
