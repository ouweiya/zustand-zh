---
title: 持久化存储数据
nav: 17
---

Persist 中间件使您能够在存储中（例如，`localStorage`，`AsyncStorage`，`IndexedDB`等）存储您的 Zustand 状态，从而持久化其数据。

请注意，此中间件支持同步存储，如 `localStorage`，和异步存储，如 `AsyncStorage`，但使用异步存储确实有一定的代价。有关更多详细信息，请参阅[Hydration 和异步存储](#hydration-and-asynchronous-storages)。

## 简单示例 {#simple-example}

```ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useBearStore = create(
    persist(
        (set, get) => ({
            bears: 0,
            addABear: () => set({ bears: get().bears + 1 }),
        }),
        {
            name: 'food-storage', // 存储中的项目名称（必须唯一）
            storage: createJSONStorage(() => sessionStorage), // (可选) 默认情况下，使用 'localStorage'
        },
    ),
)
```

## 选项 {#options}

### `name` {#name}

这是唯一需要的选项。
给定的名称将用作存储您的 Zustand 状态的键，因此它必须是唯一的。

### `storage` {#storage}

> 类型：`() => StateStorage`

可以通过以下方式导入 `StateStorage`：

```ts
import { StateStorage } from 'zustand/middleware'
```

> 默认值：`createJSONStorage(() => localStorage)`

使您能够使用自己的存储。只需传递一个返回您想要使用的存储的函数即可。建议使用 [`createJSONStorage`](#createjsonstorage) 辅助函数创建符合 `StateStorage` 接口的 `storage` 对象。

示例：

```ts
import { persist, createJSONStorage } from 'zustand/middleware'

export const useBoundStore = create(
    persist(
        (set, get) => ({
            // ...
        }),
        {
            // ...
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
)
```

### `partialize` {#partialize}

> 类型：`(state: Object) => Object`

> 默认值：`(state) => state`

使您能够选择一些要存储在存储中的状态字段。

您可以使用以下方式省略多个字段：

```ts
export const useBoundStore = create(
    persist(
        (set, get) => ({
            foo: 0,
            bar: 1,
        }),
        {
            // ...
            partialize: (state) =>
                Object.fromEntries(
                    Object.entries(state).filter(([key]) => !['foo'].includes(key)),
                ),
        },
    ),
)
```

或者，您可以只允许特定字段使用以下方式：

```ts
export const useBoundStore = create(
    persist(
        (set, get) => ({
            foo: 0,
            bar: 1,
        }),
        {
            // ...
            partialize: (state) => ({ foo: state.foo }),
        },
    ),
)
```

### `onRehydrateStorage` {#onrehydratestorage}

> 类型：`(state: Object) => ((state?: Object, error?: Error) => void) | void`

此选项使您能够传递一个监听器函数，当存储被重新注入时，该函数将被调用。

示例：

```ts
export const useBoundStore = create(
    persist(
        (set, get) => ({
            // ...
        }),
        {
            // ...
            onRehydrateStorage: (state) => {
                console.log('hydration starts')

                // 可选
                return (state, error) => {
                    if (error) {
                        console.log('an error happened during hydration', error)
                    } else {
                        console.log('hydration finished')
                    }
                }
            },
        },
    ),
)
```

### `version` {#version}

> 类型：`number`

> 默认值：`0`

如果您想在存储中引入破坏性更改（例如，重命名字段），您可以指定一个新的版本号。默认情况下，如果存储中的版本与代码中的版本不匹配，则不会使用存储的值。您可以使用下面的 [migrate](#migrate) 函数来处理破坏性更改，以便持久化以前存储的数据。

### `migrate` {#migrate}

> 类型：`(persistedState: Object, version: number) => Object | Promise<Object>`

> 默认值：`(persistedState) => persistedState`

您可以使用此选项来处理版本迁移。
迁移函数接收持久化的状态和版本号作为参数。
它必须返回一个符合最新版本（代码中的版本）的状态。

例如，如果您想重命名一个字段，可以使用以下方法：

```ts
export const useBoundStore = create(
    persist(
        (set, get) => ({
            newField: 0, // 假设此字段在版本0中有其他名称
        }),
        {
            // ...
            version: 1, // 如果存储中的版本与此版本不匹配，将触发迁移
            migrate: (persistedState, version) => {
                if (version === 0) {
                    // 如果存储的值是版本0，我们将字段重命名为新名称
                    persistedState.newField = persistedState.oldField
                    delete persistedState.oldField
                }

                return persistedState
            },
        },
    ),
)
```

### `merge` {#merge}

> 类型：`(persistedState: Object, currentState: Object) => Object`

> 默认值：`(persistedState, currentState) => ({ ...currentState, ...persistedState })`

在某些情况下，您可能希望使用自定义合并函数
将持久化的值与当前状态合并。

默认情况下，中间件执行浅合并。
如果您部分持久化了嵌套对象，浅合并可能不够。
例如，如果存储包含以下内容：

```ts
{
    foo: {
        bar: 0,
    }
}
```

但是您的 Zustand 存储包含：

```ts
{
    foo: {
        bar: 0,
        baz: 1,
    }
}
```

浅合并将从 `foo` 对象中擦除 `baz` 字段。
解决这个问题的一种方法是提供一个自定义的深度合并函数：

```ts
export const useBoundStore = create(
    persist(
        (set, get) => ({
            foo: {
                bar: 0,
                baz: 1,
            },
        }),
        {
            // ...
            merge: (persistedState, currentState) =>
                deepMerge(currentState, persistedState),
        },
    ),
)
```

### `skipHydration` {#skiphydration}

> 类型：`boolean | undefined`

> 默认值：`undefined`

默认情况下，存储将在初始化时进行填充。

在某些应用程序中，您可能需要控制第一次填充何时发生。
例如，在服务器渲染的应用程序中。

如果您设置了 `skipHydration`，则不会调用初始的填充调用，
并且您需要手动调用 `rehydrate()`。

```ts
export const useBoundStore = create(
    persist(
        () => ({
            count: 0,
            // ...
        }),
        {
            // ...
            skipHydration: true,
        },
    ),
)
```

```tsx
import { useBoundStore } from './path-to-store';

export function StoreConsumer() {
    // 在挂载后填充持久化的存储
    useEffect(() => {
        useBoundStore.persist.rehydrate();
    }, [])

    return (
        //...
    )
}
```

## API {#api}

> 版本：>=3.6.3

Persist API 使您能够与 Persist 中间件进行多种交互
无论是在 React 组件内部还是外部。

### `getOptions` {#getoptions}

> 类型：`() => Partial<PersistOptions>`

> 返回值：Persist 中间件的选项

例如，它可以用来获取存储名称：

```ts
useBoundStore.persist.getOptions().name
```

### `setOptions` {#setoptions}

> 类型：`(newOptions: Partial<PersistOptions>) => void`

更改中间件选项。
请注意，新选项将与当前选项合并。

例如，这可以用来更改存储名称：

```ts
useBoundStore.persist.setOptions({
    name: 'new-name',
})
```

或者甚至更改存储引擎：

```ts
useBoundStore.persist.setOptions({
    storage: createJSONStorage(() => sessionStorage),
})
```

### `clearStorage` {#clearstorage}

> 类型：`() => void`

清除存储在 [name](#name) 键下的所有内容。

```ts
useBoundStore.persist.clearStorage()
```

### `rehydrate` {#rehydrate}

> 类型：`() => Promise<void>`

在某些情况下，您可能希望手动触发重新水合过程。
这可以通过调用 `rehydrate` 方法来完成。

```ts
await useBoundStore.persist.rehydrate()
```

### `hasHydrated` {#hashydrated}

> 类型：`() => boolean`

这是一个非反应性的 getter，用于检查
存储是否已经水合
（注意，当调用 [`rehydrate`](#rehydrate) 时，它会更新）。

```ts
useBoundStore.persist.hasHydrated()
```

### `onHydrate` {#onhydrate}

> 类型：`(listener: (state) => void) => () => void`

> 返回值：取消订阅函数

当水合过程开始时，将调用此监听器。

```ts
const unsub = useBoundStore.persist.onHydrate((state) => {
    console.log('hydration starts')
})

// 稍后...
unsub()
```

### `onFinishHydration` {#onfinishhydration}

> 类型：`(listener: (state) => void) => () => void`

> 返回值：取消订阅函数

当水合过程结束时，将调用此监听器。

```ts
const unsub = useBoundStore.persist.onFinishHydration((state) => {
    console.log('hydration finished')
})

// 稍后...
unsub()
```

### `createJSONStorage` {#createjsonstorage}

> 类型：`(getStorage: () => StateStorage, options?: JsonStorageOptions) => StateStorage`

> 返回值：`PersistStorage`

此辅助函数使您能够创建一个 [`storage`](#storage) 对象，这在您想要使用自定义存储引擎时非常有用。

`getStorage` 是一个返回具有 `getItem`、`setItem` 和 `removeItem` 属性的存储引擎的函数。

`options` 是一个可选对象，可用于自定义数据的序列化和反序列化。`options.reviver` 是传递给 `JSON.parse` 以反序列化数据的函数。`options.replacer` 是传递给 `JSON.stringify` 以序列化数据的函数。

```ts
import { createJSONStorage } from 'zustand/middleware'

const storage = createJSONStorage(() => sessionStorage, {
    reviver: (key, value) => {
        if (value && value.type === 'date') {
            return new Date(value)
        }
        return value
    },
    replacer: (key, value) => {
        if (value instanceof Date) {
            return { type: 'date', value: value.toISOString() }
        }
        return value
    },
})
```

## 水合和异步存储 {#hydration-and-asynchronous-storages}

要解释异步存储的"成本"是什么，
您需要理解什么是水合。

简而言之，水合是一个过程，
从存储中检索持久化状态
并将其与当前状态合并。

Persist 中间件执行两种类型的水合：
同步和异步。
如果给定的存储是同步的（例如，`localStorage`），
水合将同步完成。
另一方面，如果给定的存储是异步的（例如，`AsyncStorage`），
水合将异步完成（令人震惊，我知道！）。

但是有什么问题呢？
对于同步水合，
Zustand 存储在创建时已经被水合。
相反，对于异步水合，
Zustand 存储将在稍后的微任务中被水合。

这有什么关系呢？
异步水合可能会导致一些意外的行为。
例如，如果您在 React 应用程序中使用 Zustand，
存储在初始渲染时**不会**被水合。
在您的应用程序在页面加载时依赖于持久化值的情况下，
您可能希望等到
存储已经被水合后再显示任何内容。
例如，您的应用程序可能认为用户
因为这是默认的，所以没有登录，
但实际上存储还没有被水合。

如果您的应用程序确实依赖于页面加载时的持久化状态，
请参见下面的 [FAQ](#faq) 部分中的 [_如何检查我的存储是否已被水合_](#how-can-i-check-if-my-store-has-been-hydrated)。

### 在 Next.js 中的使用 {#usage-in-next.js}

NextJS 使用服务器端渲染，并将在服务器上渲染的组件与在客户端渲染的组件进行比较。
但是由于您正在使用来自浏览器的数据来更改您的组件，所以两次渲染将有所不同，Next 将向您发出警告。

错误通常是：

- 文本内容与服务器渲染的 HTML 不匹配
- 水合失败，因为初始 UI 与服务器上渲染的内容不匹配
- 在水合过程中出现错误。因为错误发生在 Suspense 边界之外，整个根将切换到客户端渲染

为了解决这些错误，创建一个自定义钩子，以便 Zustand 在更改您的组件之前稍微等待一下。

创建一个文件，内容如下：

```ts
// useStore.ts
import { useState, useEffect } from 'react'

const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
) => {
  const result = store(callback) as F
  const [data, setData] = useState<F>()

  useEffect(() => {
    setData(result)
  }, [result])

  return data
}

export default useStore
```

现在在你的页面中，你将会以稍微不同的方式使用这个 hook：

```ts
// useBearStore.ts

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 存储本身不需要任何改变
export const useBearStore = create(
    persist(
        (set, get) => ({
            bears: 0,
            addABear: () => set({ bears: get().bears + 1 }),
        }),
        {
            name: 'food-storage',
        },
    ),
)
```

```ts
// yourComponent.tsx

import useStore from './useStore'
import { useBearStore } from './stores/useBearStore'

const bears = useStore(useBearStore, (state) => state.bears)
```

致谢：[这个问题的回答](https://github.com/pmndrs/zustand/issues/938#issuecomment-1481801942)，它指向了[这篇博客文章](https://dev.to/abdulsamad/how-to-use-zustands-persist-middleware-in-nextjs-4lb5)。

## 常见问题解答 {#faq}

### 我如何检查我的存储是否已经被填充 {#how-can-i-check-if-my-store-has-been-hydrated}

有几种不同的方法可以做到这一点。

你可以使用 [`onRehydrateStorage`](#onrehydratestorage)
监听函数来更新存储中的一个字段：

```ts
const useBoundStore = create(
    persist(
        (set, get) => ({
            // ...
            _hasHydrated: false,
            setHasHydrated: (state) => {
                set({
                    _hasHydrated: state
                });
            }
        }),
        {
            // ...
            onRehydrateStorage: () => (state) => {
                state.setHasHydrated(true)
            }
        }
    )
);

export default function App() {
    const hasHydrated = useBoundStore(state => state._hasHydrated);

    if (!hasHydrated) {
        return <p>Loading...</p>
    }

    return (
        // ...
    );
}
```

你也可以创建一个自定义的 `useHydration` hook：

```ts
const useBoundStore = create(persist(...))

const useHydration = () => {
    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {
        // 注意：这只是为了你想要考虑手动填充的情况。
        // 如果你不需要它，你可以移除下面的这行。
        const unsubHydrate = useBoundStore.persist.onHydrate(() => setHydrated(false))

        const unsubFinishHydration = useBoundStore.persist.onFinishHydration(() => setHydrated(true))

        setHydrated(useBoundStore.persist.hasHydrated())

        return () => {
            unsubHydrate()
            unsubFinishHydration()
        }
    }, [])

    return hydrated
}
```

### 我如何使用自定义的存储引擎 {#how-can-i-use-a-custom-storage-engine}

如果你想要使用的存储并不符合预期的 API，你可以创建你自己的存储：

```ts
import { create } from 'zustand'
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware'
import { get, set, del } from 'idb-keyval' // 可以使用任何东西：IndexedDB，Ionic Storage，等等。

// 自定义存储对象
const storage: StateStorage = {
    getItem: async (name: string): Promise<string | null> => {
        console.log(name, 'has been retrieved')
        return (await get(name)) || null
    },
    setItem: async (name: string, value: string): Promise<void> => {
        console.log(name, 'with value', value, 'has been saved')
        await set(name, value)
    },
    removeItem: async (name: string): Promise<void> => {
        console.log(name, 'has been deleted')
        await del(name)
    },
}

export const useBoundStore = create(
    persist(
        (set, get) => ({
            bears: 0,
            addABear: () => set({ bears: get().bears + 1 }),
        }),
        {
            name: 'food-storage', // 唯一的名字
            storage: createJSONStorage(() => storage),
        },
    ),
)
```

如果你正在使用一个 `JSON.stringify()` 不支持的类型，你需要编写你自己的序列化/反序列化代码。然而，如果这很繁琐，你可以使用第三方库来序列化和反序列化不同类型的数据。

例如，[Superjson](https://github.com/blitz-js/superjson) 可以将数据及其类型一起序列化，允许数据在反序列化时被解析回其原始类型

```ts
import superjson from 'superjson' //  可以使用任何东西：serialize-javascript，devalue，等等。
import { PersistStorage } from 'zustand/middleware'

interface BearState {
    bear: Map<string, string>
    fish: Set<string>
    time: Date
    query: RegExp
}

const storage: PersistStorage<BearState> = {
    getItem: (name) => {
        const str = localStorage.getItem(name)
        if (!str) return null
        return superjson.parse(str)
    },
    setItem: (name, value) => {
        localStorage.setItem(name, superjson.stringify(value))
    },
    removeItem: (name) => localStorage.removeItem(name),
}

const initialState: BearState = {
    bear: new Map(),
    fish: new Set(),
    time: new Date(),
    query: new RegExp(''),
}

export const useBearStore = create<BearState>()(
    persist(
        (set) => ({
            ...initialState,
            // ...
        }),
        {
            name: 'food-storage',
            storage,
        },
    ),
)
```

### 我如何在存储事件上重新填充 {#how-can-i-rehydrate-on-storage-event}

你可以使用 Persist API 来创建你自己的实现，
类似于下面的例子：

```ts
type StoreWithPersist = Mutate<StoreApi<State>, [["zustand/persist", unknown]]>

export const withStorageDOMEvents = (store: StoreWithPersist) => {
  const storageEventCallback = (e: StorageEvent) => {
    if (e.key === store.persist.getOptions().name && e.newValue) {
      store.persist.rehydrate()
    }
  }

  window.addEventListener('storage', storageEventCallback)

  return () => {
    window.removeEventListener('storage', storageEventCallback)
  }
}

const useBoundStore = create(persist(...))
withStorageDOMEvents(useBoundStore)
```

### 如何在 TypeScript 中使用它 {#how-do-i-use-it-with-typescript}

基本的 TypeScript 使用并不需要任何特殊的东西，除了写 `create<State>()(...)` 而不是 `create(...)`。

```tsx
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface MyState {
    bears: number
    addABear: () => void
}

export const useBearStore = create<MyState>()(
    persist(
        (set, get) => ({
            bears: 0,
            addABear: () => set({ bears: get().bears + 1 }),
        }),
        {
            name: 'food-storage', // 存储项的名称（必须是唯一的）
            storage: createJSONStorage(() => sessionStorage), // （可选）默认使用 'localStorage'
            partialize: (state) => ({ bears: state.bears }),
        },
    ),
)
```

### 如何与 Map 和 Set 一起使用它 {#how-do-i-use-it-with-map-and-set}

为了持久化诸如 `Map` 和 `Set` 这样的对象类型，它们需要被转换为 JSON 可序列化的类型，如 `Array`，这可以通过定义自定义的 `storage` 引擎来完成。

假设你的状态使用 `Map` 来处理一系列的 `transactions`，那么你可以在 `storage` 属性中将 `Map` 转换为 `Array`，如下所示：

```ts
interface BearState {
    .
    .
    .
    transactions: Map<any>
}

storage: {
    getItem: (name) => {
        const str = localStorage.getItem(name);
        if (!str) return null;
        const { state } = JSON.parse(str);
        return {
            state: {
                ...state,
                transactions: new Map(state.transactions),
            },
        }
    },
    setItem: (name, newValue: StorageValue<BearState>) => {
        // 函数不能被 JSON 编码
        const str = JSON.stringify({
            state: {
                ...newValue.state,
                transactions: Array.from(newValue.state.transactions.entries()),
            },
        })
        localStorage.setItem(name, str)
    },
    removeItem: (name) => localStorage.removeItem(name),
},
```
