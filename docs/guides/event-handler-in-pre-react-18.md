---
title: 在 React 18 之前的版本中，如何在 React 事件处理器外部调用操作
nav: 10
---

因为 React 在事件处理器外部同步处理 `setState`，如果在事件处理器外部更新状态，将强制 React 同步更新组件。因此，存在遇到僵尸子进程效应的风险。
为了解决这个问题，需要将操作包装在 `unstable_batchedUpdates` 中，如下所示：

```jsx
import { unstable_batchedUpdates } from 'react-dom' // 或 'react-native'

const useFishStore = create((set) => ({
    fishes: 0,
    increaseFishes: () => set((prev) => ({ fishes: prev.fishes + 1 })),
}))

const nonReactCallback = () => {
    unstable_batchedUpdates(() => {
        useFishStore.getState().increaseFishes()
    })
}
```

更多细节：https://github.com/pmndrs/zustand/issues/302
