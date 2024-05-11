![Zustand Cover](./static/img/bear.jpg)

[![Build Status](https://img.shields.io/github/actions/workflow/status/pmndrs/zustand/lint-and-type.yml?branch=main&style=flat&colorA=000000&colorB=000000)](https://github.com/pmndrs/zustand/actions?query=workflow%3ALint)
[![Build Size](https://img.shields.io/bundlephobia/minzip/zustand?label=bundle%20size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=zustand)
[![Version](https://img.shields.io/npm/v/zustand?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/zustand)
[![Downloads](https://img.shields.io/npm/dt/zustand.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/zustand)
[![Discord Shield](https://img.shields.io/discord/740090768164651008?style=flat&colorA=000000&colorB=000000&label=discord&logo=discord&logoColor=ffffff)](https://discord.gg/poimandres)

一个小巧、快速且可扩展的基础状态管理解决方案，使用简化的 flux 原则。它基于 hooks 的 API 使用起来很舒服，没有样板代码，也不带有任何观点。

不要因为它看起来很可爱就忽视它。它有相当锐利的爪子，我们花了很多时间来处理常见的陷阱，比如令人头疼的[僵尸子问题](https://react-redux.js.org/api/hooks#stale-props-and-zombie-children)，[react 并发](https://github.com/bvaughn/rfcs/blob/useMutableSource/text/0000-use-mutable-source.md)，以及在混合渲染器之间的[上下文丢失](https://github.com/facebook/react/issues/13332)。它可能是 React 领域中唯一一个能正确处理所有这些问题的状态管理器。

你可以在[这里](https://githubbox.com/pmndrs/zustand/tree/main/examples/demo)试用一个在线演示。

```bash
npm install zustand # 或者 yarn add zustand 或者 pnpm add zustand
```

:warning: 这个 readme 是为 JavaScript 用户编写的。如果你是 TypeScript 用户，一定要查看我们的 [TypeScript 使用部分](#typescript-使用)。

## 首先创建一个存储

你的存储就是一个 hook！你可以在其中放置任何东西：原始值、对象、函数。状态必须以不可变的方式更新，`set` 函数[合并状态](./docs/guides/immutable-state-and-merging.md)以帮助实现这一点。

```jsx
import { create } from 'zustand';

const useBearStore = create(set => ({
    bears: 0,
    increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
}));
```

## 然后绑定你的组件，就这样！

在任何地方使用这个 hook，不需要提供者。选择你的状态，当状态发生变化时，组件将重新渲染。

```jsx
function BearCounter() {
    const bears = useBearStore(state => state.bears);
    return <h1>{bears} 在这里 ...</h1>;
}

function Controls() {
    const increasePopulation = useBearStore(state => state.increasePopulation);
    return <button onClick={increasePopulation}>增加一只</button>;
}
```

### 为什么选择 zustand 而不是 redux？

-   简单且无观点
-   将 hooks 作为消费状态的主要手段
-   不会在你的应用中包装上下文提供者
-   [可以瞬态地通知组件（不会导致渲染）](#瞬态更新用于经常发生的状态变化)

### 为什么选择 zustand 而不是 context？

-   更少的样板代码
-   只在状态变化时渲染组件
-   集中的，基于操作的状态管理

---

# 食谱

## 获取所有内容

你可以这样做，但请记住，这将导致组件在每次状态变化时都更新！

```jsx
const state = useBearStore();
```

## 选择多个状态切片

默认情况下，它使用严格相等（old === new）来检测变化，这对于原子状态选择非常高效。

```jsx
const nuts = useBearStore(state => state.nuts);
const honey = useBearStore(state => state.honey);
```

如果你想构造一个包含多个状态选择的单一对象，类似于 redux 的 mapStateToProps，你可以使用 [useShallow](./docs/guides/prevent-rerenders-with-use-shallow.md) 来防止选择器输出不变时的不必要重新渲染。

```jsx
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

const useBearStore = create(set => ({
    bears: 0,
    increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
}));

// 对象选择，当 state.nuts 或 state.honey 变化时，重新渲染组件
const { nuts, honey } = useBearStore(useShallow(state => ({ nuts: state.nuts, honey: state.honey })));

// 数组选择，当 state.nuts 或 state.honey 变化时，重新渲染组件
const [nuts, honey] = useBearStore(useShallow(state => [state.nuts, state.honey]));

// 映射选择，当 state.treats 的顺序、数量或键发生变化时，重新渲染组件
const treats = useBearStore(useShallow(state => Object.keys(state.treats)));
```

为了更好地控制重新渲染，你可以提供任何自定义的相等函数。

```jsx
const treats = useBearStore(
    state => state.treats,
    (oldTreats, newTreats) => compare(oldTreats, newTreats)
);
```

## 覆盖状态

`set` 函数有一个第二个参数，默认为 `false`。它不会合并，而是替换状态模型。小心不要擦掉你依赖的部分，比如操作。

```jsx
import omit from 'lodash-es/omit';

const useFishStore = create(set => ({
    salmon: 1,
    tuna: 2,
    deleteEverything: () => set({}, true), // 清除整个存储，包括操作
    deleteTuna: () => set(state => omit(state, ['tuna']), true),
}));
```

## 异步操作

只需在准备好时调用 `set`，zustand 不关心你的操作是异步还是同步的。

```jsx
const useFishStore = create(set => ({
    fishies: {},
    fetch: async pond => {
        const response = await fetch(pond);
        set({ fishies: await response.json() });
    },
}));
```

## 在操作中读取状态

`set` 允许函数更新 `set(state => result)`，但你仍然可以通过 `get` 在其外部访问状态。

```jsx
const useSoundStore = create((set, get) => ({
  sound: 'grunt',
  action: () => {
    const sound = get().sound
    ...
```

## 在组件外部读写状态并对变化做出反应

有时你需要以非响应式的方式访问状态或对存储进行操作。对于这些情况，结果钩子在其原型上附加了实用函数。

:warning: 这种技术不推荐在 [React 服务器组件](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md) 中添加状态（通常在 Next.js 13 及以上版本中）。它可能会导致意外的错误和用户隐私问题。更多详情，请参见 [#2200](https://github.com/pmndrs/zustand/discussions/2200)。

```jsx
const useDogStore = create(() => ({ paw: true, snout: true, fur: true }))

// 获取非响应式的新状态
const paw = useDogStore.getState().paw
// 监听所有变化，每次变化时同步触发
const unsub1 = useDogStore.subscribe(console.log)
// 更新状态，将触发监听器
useDogStore.setState({ paw: false })
// 取消订阅监听器
unsub1()

// 你当然可以像以前一样使用钩子
function Component() {
  const paw = useDogStore((state) => state.paw)
  ...
```

### 使用选择器订阅

如果你需要使用选择器订阅，`subscribeWithSelector` 中间件将会有所帮助。

使用这个中间件，`subscribe` 接受一个额外的签名：

```ts
subscribe(selector, callback, options?: { equalityFn, fireImmediately }): Unsubscribe
```

```js
import { subscribeWithSelector } from 'zustand/middleware';
const useDogStore = create(subscribeWithSelector(() => ({ paw: true, snout: true, fur: true })));

// 监听选定的变化，在这种情况下，当 "paw" 变化时
const unsub2 = useDogStore.subscribe(state => state.paw, console.log);
// Subscribe 还暴露了前一个值
const unsub3 = useDogStore.subscribe(
    state => state.paw,
    (paw, previousPaw) => console.log(paw, previousPaw)
);
// Subscribe 还支持一个可选的等式函数
const unsub4 = useDogStore.subscribe(state => [state.paw, state.fur], console.log, { equalityFn: shallow });
// 立即订阅并触发
const unsub5 = useDogStore.subscribe(state => state.paw, console.log, {
    fireImmediately: true,
});
```

## 不使用 React 使用 zustand

Zustand 核心可以导入并在没有 React 依赖的情况下使用。唯一的区别是 create 函数不返回钩子，而是返回 API 实用程序。

```jsx
import { createStore } from 'zustand/vanilla'

const store = createStore((set) => ...)
const { getState, setState, subscribe, getInitialState } = store

export default store
```

你可以使用 `useStore` 钩子与 vanilla store 一起使用，这个钩子自 v4 版本以来就可用。

```jsx
import { useStore } from 'zustand';
import { vanillaStore } from './vanillaStore';

const useBoundStore = selector => useStore(vanillaStore, selector);
```

:warning: 注意，修改 `set` 或 `get` 的中间件不会应用于 `getState` 和 `setState`。

## 瞬态更新（用于经常发生的状态变化）

subscribe 函数允许组件绑定到一个状态部分，而不强制在变化时重新渲染。最好与 useEffect 结合使用，以在卸载时自动取消订阅。当你被允许直接修改视图时，这可以产生[显著](https://codesandbox.io/s/peaceful-johnson-txtws)的性能影响。

```jsx
const useScratchStore = create((set) => ({ scratches: 0, ... }))

const Component = () => {
  // 获取初始状态
  const scratchRef = useRef(useScratchStore.getState().scratches)
  // 在挂载时连接到存储，在卸载时断开连接，在引用中捕获状态变化
  useEffect(() => useScratchStore.subscribe(
    state => (scratchRef.current = state.scratches)
  ), [])
  ...
```

## 厌倦了 reducers 和改变嵌套状态？试试 Immer！

减少嵌套结构是令人疲倦的。你试过 [immer](https://github.com/mweststrate/immer) 吗？

```jsx
import { produce } from 'immer';

const useLushStore = create(set => ({
    lush: { forest: { contains: { a: 'bear' } } },
    clearForest: () =>
        set(
            produce(state => {
                state.lush.forest.contains = null;
            })
        ),
}));

const clearForest = useLushStore(state => state.clearForest);
clearForest();
```

[另外，还有一些其他的解决方案。](./docs/guides/updating-state.md#with-immer)

## 持久化中间件

你可以使用任何类型的存储来持久化你的存储数据。

```jsx
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useFishStore = create(
    persist(
        (set, get) => ({
            fishes: 0,
            addAFish: () => set({ fishes: get().fishes + 1 }),
        }),
        {
            name: 'food-storage', // 存储项的名称（必须唯一）
            storage: createJSONStorage(() => sessionStorage), // （可选）默认情况下，使用 'localStorage'
        }
    )
);
```

[查看此中间件的完整文档。](./docs/integrations/persisting-store-data.md)

## Immer 中间件

Immer 也可以作为中间件使用。

```jsx
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useBeeStore = create(
    immer(set => ({
        bees: 0,
        addBees: by =>
            set(state => {
                state.bees += by;
            }),
    }))
);
```

## 离不开类似Redux的reducers和action类型吗？

```jsx
const types = { increase: 'INCREASE', decrease: 'DECREASE' };

const reducer = (state, { type, by = 1 }) => {
    switch (type) {
        case types.increase:
            return { grumpiness: state.grumpiness + by };
        case types.decrease:
            return { grumpiness: state.grumpiness - by };
    }
};

const useGrumpyStore = create(set => ({
    grumpiness: 0,
    dispatch: args => set(state => reducer(state, args)),
}));

const dispatch = useGrumpyStore(state => state.dispatch);
dispatch({ type: types.increase, by: 2 });
```

或者，只需使用我们的 redux-middleware。它将连接你的主 reducer，设置初始状态，并将 dispatch 函数添加到状态本身和 vanilla API。

```jsx
import { redux } from 'zustand/middleware';

const useGrumpyStore = create(redux(reducer, initialState));
```

## Redux devtools

```jsx
import { devtools } from 'zustand/middleware'

// 与普通 action store 的使用，它将记录 actions 为 "setState"
const usePlainStore = create(devtools((set) => ...))
// 与 redux store 的使用，它将记录完整的 action types
const useReduxStore = create(devtools(redux(reducer, initialState)))
```

一个 redux devtools 连接多个 stores

```jsx
import { devtools } from 'zustand/middleware'

// 与普通 action store 的使用，它将记录 actions 为 "setState"
const usePlainStore1 = create(devtools((set) => ..., { name, store: storeName1 }))
const usePlainStore2 = create(devtools((set) => ..., { name, store: storeName2 }))
// 与 redux store 的使用，它将记录完整的 action types
const useReduxStore = create(devtools(redux(reducer, initialState)), , { name, store: storeName3 })
const useReduxStore = create(devtools(redux(reducer, initialState)), , { name, store: storeName4 })
```

分配不同的连接名称将在 redux devtools 中分隔 stores。这也有助于将不同的 stores 分组到单独的 redux devtools 连接中。

devtools 将 store 函数作为其第一个参数，你可以选择性地为 store 命名或使用第二个参数配置 [serialize](https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#serialize) 选项。

命名 store：`devtools(..., {name: "MyStore"})`，这将在 devtools 中创建一个名为 "MyStore" 的单独实例。

序列化选项：`devtools(..., { serialize: { options: true } })`。

#### 记录操作

devtools 只会记录每个独立存储的操作，这与典型的 _combined reducers_ redux 存储不同。关于如何合并存储的方法，可以参考 https://github.com/pmndrs/zustand/issues/163

你可以通过传递第三个参数为每个 `set` 函数记录特定的操作类型：

```jsx
const useBearStore = create(devtools((set) => ({
    ...
    eatFish: () => set(
        (prev) => ({ fishes: prev.fishes > 1 ? prev.fishes - 1 : 0 }),
        false,
        'bear/eatFish'
    ),
    ...
```

你也可以记录操作的类型以及其负载：

```jsx
    ...
    addFishes: (count) => set(
        (prev) => ({ fishes: prev.fishes + count }),
        false,
        { type: 'bear/addFishes', count, }
    ),
    ...
```

如果没有提供操作类型，它将默认为 "anonymous"。你可以通过提供 `anonymousActionType` 参数来自定义此默认值：

```jsx
devtools(..., { anonymousActionType: 'unknown', ... })
```

如果你希望禁用 devtools（例如在生产环境中）。你可以通过提供 `enabled` 参数来自定义此设置：

```jsx
devtools(..., { enabled: false, ... })
```

## React 上下文

使用 `create` 创建的存储不需要上下文提供者。在某些情况下，你可能希望使用上下文进行依赖注入，或者如果你想用组件的 props 初始化你的存储。因为普通的存储是一个钩子，将它作为一个普通的上下文值可能会违反钩子的规则。

自 v4 版本开始，推荐的方法是使用 vanilla 存储。

```jsx
import { createContext, useContext } from 'react'
import { createStore, useStore } from 'zustand'

const store = createStore(...) // 不带钩子的 vanilla 存储

const StoreContext = createContext()

const App = () => (
    <StoreContext.Provider value={store}>
        ...
    </StoreContext.Provider>
)

const Component = () => {
    const store = useContext(StoreContext)
    const slice = useStore(store, selector)
    ...
```

## TypeScript 使用

基本的 TypeScript 使用不需要任何特殊的东西，只需要写 `create<State>()(...)` 而不是 `create(...)`...

```ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type {} from '@redux-devtools/extension'; // 需要 devtools 类型

interface BearState {
    bears: number;
    increase: (by: number) => void;
}

const useBearStore = create<BearState>()(
    devtools(
        persist(
            set => ({
                bears: 0,
                increase: by => set(state => ({ bears: state.bears + by })),
            }),
            {
                name: 'bear-storage',
            }
        )
    )
);
```

更完整的 TypeScript 指南在[这里](docs/guides/typescript.md)。

## 最佳实践

-   你可能会想知道如何组织你的代码以便更好的维护：[将存储分割成单独的切片](./docs/guides/slices-pattern.md)。
-   对于这个无偏见的库的推荐使用方式：[Flux 启发的实践](./docs/guides/flux-inspired-practice.md)。
-   [在 pre-React 18 中在 React 事件处理器外部调用操作](./docs/guides/event-handler-in-pre-react-18.md)。
-   [测试](./docs/guides/testing.md)
-   更多内容，请查看[文档文件夹](./docs/)

## 第三方库

一些用户可能希望扩展 Zustand 的功能集，这可以通过使用社区制作的第三方库来完成。有关 Zustand 的第三方库的信息，请访问[文档](./docs/integrations/third-party-libraries.md)。

## 与其他库的比较

-   [zustand 和其他 React 状态管理库的区别](https://docs.pmnd.rs/zustand/getting-started/comparison)
