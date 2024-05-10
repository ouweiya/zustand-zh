---
title: 将URL连接到状态
nav: 12
---

## 将状态与URL哈希连接 {#connect-state-with-url-hash}

如果你想将存储的状态与URL哈希连接，你可以创建自己的哈希存储。

```ts
import { create } from 'zustand'
import { persist, StateStorage, createJSONStorage } from 'zustand/middleware'

const hashStorage: StateStorage = {
    getItem: (key): string => {
        const searchParams = new URLSearchParams(location.hash.slice(1))
        const storedValue = searchParams.get(key) ?? ''
        return JSON.parse(storedValue)
    },
    setItem: (key, newValue): void => {
        const searchParams = new URLSearchParams(location.hash.slice(1))
        searchParams.set(key, JSON.stringify(newValue))
        location.hash = searchParams.toString()
    },
    removeItem: (key): void => {
        const searchParams = new URLSearchParams(location.hash.slice(1))
        searchParams.delete(key)
        location.hash = searchParams.toString()
    },
}

export const useBoundStore = create(
    persist(
        (set, get) => ({
            fishes: 0,
            addAFish: () => set({ fishes: get().fishes + 1 }),
        }),
        {
            name: 'food-storage', // 唯一名称
            storage: createJSONStorage(() => hashStorage),
        },
    ),
)
```

### CodeSandbox 演示 {#codesandbox-demo}

https://codesandbox.io/s/zustand-state-with-url-hash-demo-f29b88?file=/src/store/index.ts

## 持久化并将状态与URL参数连接（示例：URL查询参数） {#persist-and-connect-state-with-url-parameters-(example:-url-query-parameters)}

有时候，你可能希望条件性地将状态连接到URL。
此示例描述了如何使用URL查询参数，
同时将其与另一种持久化实现（如`localstorage`）保持同步。

如果你希望URL参数始终填充，可以删除对`getUrlSearch()`的条件检查。

下面的实现将在相关状态更改时更新URL，无需刷新。

```ts
import { create } from 'zustand'
import { persist, StateStorage, createJSONStorage } from 'zustand/middleware'

const getUrlSearch = () => {
    return window.location.search.slice(1)
}

const persistentStorage: StateStorage = {
    getItem: (key): string => {
        // 先检查URL
        if (getUrlSearch()) {
            const searchParams = new URLSearchParams(getUrlSearch())
            const storedValue = searchParams.get(key)
            return JSON.parse(storedValue as string)
        } else {
            // 否则，我们应该从localstorage或其他存储中加载
            return JSON.parse(localStorage.getItem(key) as string)
        }
    },
    setItem: (key, newValue): void => {
        // 检查是否存在查询参数，如果始终希望设置URL，可以删除检查
        if (getUrlSearch()) {
            const searchParams = new URLSearchParams(getUrlSearch())
            searchParams.set(key, JSON.stringify(newValue))
            window.history.replaceState(null, '', `?${searchParams.toString()}`)
        }

        localStorage.setItem(key, JSON.stringify(newValue))
    },
    removeItem: (key): void => {
        const searchParams = new URLSearchParams(getUrlSearch())
        searchParams.delete(key)
        window.location.search = searchParams.toString()
    },
}

type LocalAndUrlStore = {
    typesOfFish: string[]
    addTypeOfFish: (fishType: string) => void
    numberOfBears: number
    setNumberOfBears: (newNumber: number) => void
}

const storageOptions = {
    name: 'fishAndBearsStore',
    storage: createJSONStorage<LocalAndUrlStore>(() => persistentStorage),
}

const useLocalAndUrlStore = create(
    persist<LocalAndUrlStore>(
        (set) => ({
            typesOfFish: [],
            addTypeOfFish: (fishType) =>
                set((state) => ({ typesOfFish: [...state.typesOfFish, fishType] })),

            numberOfBears: 0,
            setNumberOfBears: (numberOfBears) => set(() => ({ numberOfBears })),
        }),
        storageOptions,
    ),
)

export default useLocalAndUrlStore
```

在从组件生成URL时，你可以调用buildShareableUrl：

```ts
const buildURLSuffix = (params, version = 0) => {
    const searchParams = new URLSearchParams()

    const zustandStoreParams = {
        state: {
            typesOfFish: params.typesOfFish,
            numberOfBears: params.numberOfBears,
        },
        version: version, // 版本在这里是因为它包含在Zustand设置状态的方式中
    }

    // URL参数键应与存储的名称匹配，如上面的storageOptions中指定的
    searchParams.set('fishAndBearsStore', JSON.stringify(zustandStoreParams))
    return searchParams.toString()
}

export const buildShareableUrl = (params, version) => {
    return `${window.location.origin}?${buildURLSuffix(params, version)}`
}
```

生成的URL看起来像这样（这里没有任何编码，为了易读）：

`https://localhost/search?fishAndBearsStore={"state":{"typesOfFish":["tilapia","salmon"],"numberOfBears":15},"version":0}}`
