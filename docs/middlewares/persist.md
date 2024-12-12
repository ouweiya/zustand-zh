---
title: persist
description: 如何持久化存储
nav: 207
---

# persist

`persist` 中间件允许你在页面重新加载或应用程序重启时持久化存储的状态。

```js
const nextStateCreatorFn = persist(stateCreatorFn, persistOptions)
```

- [类型](#类型)
  - [签名](#签名)
  - [变换器](#变换器)
- [参考](#参考)
- [用法](#用法)
  - [持久化状态](#持久化状态)
  - [部分持久化状态](#部分持久化状态)
  - [使用自定义存储持久化状态](#使用自定义存储持久化状态)
  - [通过版本控制和迁移持久化状态](#通过版本控制和迁移持久化状态)
  - [持久化嵌套对象的状态](#持久化嵌套对象的状态)
  - [持久化状态并手动水合](#持久化状态并手动水合)
- [故障排除](#故障排除)

## 类型

### 签名

```ts
persist<T, U>(stateCreatorFn: StateCreator<T, [], []>, persistOptions?: PersistOptions<T, U>): StateCreator<T, [['zustand/persist', U]], []>
```

### 变换器

<!-- prettier-ignore-start -->
```ts
['zustand/persist', U]
```
<!-- prettier-ignore-end -->

## 参考

### `persist(stateCreatorFn)`

#### 参数

- `stateCreatorFn`: 一个函数，接受 `set` 函数、`get` 函数和 `store` 作为参数。通常，你会返回一个包含你想要暴露的方法的对象。
- `persistOptions`: 一个定义存储选项的对象。
  - `name`: 存储中项目的唯一名称。
  - **可选** `storage`: 默认为 `createJSONStorage(() => localStorage)`。
  - **可选** `partialize`: 一个在持久化之前过滤状态字段的函数。
  - **可选** `onRehydrateStorage`: 一个函数或返回函数的函数，允许在状态再水合之前和之后进行自定义逻辑。
  - **可选** `version`: 持久化状态的版本号。如果存储的状态版本不匹配，则不会使用。
  - **可选** `migrate`: 如果版本不匹配时迁移持久化状态的函数。
  - **可选** `merge`: 在再水合期间将持久化状态与当前状态合并时的自定义逻辑函数。默认为浅合并。
  - **可选** `skipHydration`: 默认为 `false`。如果为 `true`，中间件不会在初始化时自动再水合状态。在这种情况下，请手动使用 `rehydrate` 函数。这对于服务器端渲染 (SSR) 应用程序很有用。

#### 返回值

`persist` 返回一个状态创建函数。

## 用法

### 持久化状态

在本教程中，我们将使用 vanilla store 和 `persist` 中间件创建一个简单的位置跟踪器。该示例跟踪鼠标在容器内移动时的位置（`position`），并将位置存储在本地存储中，因此即使页面重新加载也能持久化。

我们首先设置一个 vanilla store 来保存位置（一个包含 `x` 和 `y` 坐标的对象）和一个更新它的操作。我们还将使用 `persist` 中间件将位置存储在 `localStorage` 中。

```ts
import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'

type PositionStoreState = { position: { x: number; y: number } }

type PositionStoreActions = {
  setPosition: (nextPosition: PositionStoreState['position']) => void
}

type PositionStore = PositionStoreState & PositionStoreActions

const positionStore = createStore<PositionStore>()(
  persist(
    (set) => ({
      position: { x: 0, y: 0 },
      setPosition: (position) => set({ position }),
    }),
    { name: 'position-storage' },
  ),
)
```

接下来，我们将在一个 div 内跟踪鼠标移动并使用新位置更新存储。

```ts
const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
const $dot = document.getElementById('dot') as HTMLDivElement

$dotContainer.addEventListener('pointermove', (event) => {
  positionStore.getState().setPosition({
    x: event.clientX,
    y: event.clientY,
  })
})
```

我们希望通过将一个 div 元素（表示点）移动到新坐标来反映位置更新。

```ts
const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
  $dot.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`
}

render(positionStore.getState(), positionStore.getState())

positionStore.subscribe(render)
```

以下是完整代码。

```ts
import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'

type PositionStoreState = { position: { x: number; y: number } }

type PositionStoreActions = {
  setPosition: (nextPosition: PositionStoreState['position']) => void
}

type PositionStore = PositionStoreState & PositionStoreActions

const positionStore = createStore<PositionStore>()(
  persist(
    (set) => ({
      position: { x: 0, y: 0 },
      setPosition: (position) => set({ position }),
    }),
    { name: 'position-storage' },
  ),
)

const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
const $dot = document.getElementById('dot') as HTMLDivElement

$dotContainer.addEventListener('pointermove', (event) => {
  positionStore.getState().setPosition({
    x: event.clientX,
    y: event.clientY,
  })
})

const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
  $dot.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`
}

render(positionStore.getState(), positionStore.getState())

positionStore.subscribe(render)
```

以下是 `html` 代码

```html
<div
  id="dot-container"
  style="position: relative; width: 100vw; height: 100vh;"
>
  <div
    id="dot"
    style="position: absolute; background-color: red; border-radius: 50%; left: -10px; top: -10px; width: 20px; height: 20px;"
  ></div>
</div>
```

### 部分持久化状态

在本教程中，我们将使用 vanilla store 和 `persist` 中间件创建一个简单的位置跟踪器。此外，我们将展示如何仅部分持久化状态（部分持久化），这在你不想将整个状态存储在 `localStorage` 时非常有用。

我们首先创建一个 vanilla store 来保存位置状态和更新它的操作。我们将使用 `persist` 中间件仅持久化状态的相关部分（在本例中为包含位置的上下文）。

```ts
import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'

type PositionStoreState = {
  context: {
    position: { x: number; y: number }
  }
}

type PositionStoreActions = {
  actions: {
    setPosition: (
      nextPosition: PositionStoreState['context']['position'],
    ) => void
  }
}

type PositionStore = PositionStoreState & PositionStoreActions

const positionStore = createStore<PositionStore>()(
  persist(
    (set) => ({
      context: {
        position: { x: 0, y: 0 },
      },
      actions: {
        setPosition: (position) => set({ context: { position } }),
      },
    }),
    {
      name: 'position-storage',
      partialize: (state) => ({ context: state.context }),
    },
  ),
)
```

接下来，我们将在一个 div 内跟踪鼠标移动并使用新位置更新存储。

```ts
const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
const $dot = document.getElementById('dot') as HTMLDivElement

$dotContainer.addEventListener('pointermove', (event) => {
  positionStore.getState().actions.setPosition({
    x: event.clientX,
    y: event.clientY,
  })
})
```

我们希望通过将一个 div 元素（表示点）移动到新坐标来反映位置更新。

```ts
const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
  $dot.style.transform = `translate(${state.context.position.x}px, ${state.context.position.y}px)`
}

render(positionStore.getState(), positionStore.getState())

positionStore.subscribe(render)
```

以下是完整代码，用于创建一个在容器内跟随鼠标移动的点，并将 `context` 持久化到 `localStorage` 中。

```ts
import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'

type PositionStoreState = {
  context: {
    position: { x: number; y: number }
  }
}

type PositionStoreActions = {
  actions: {
    setPosition: (
      nextPosition: PositionStoreState['context']['position'],
    ) => void
  }
}

type PositionStore = PositionStoreState & PositionStoreActions

const positionStore = createStore<PositionStore>()(
  persist(
    (set) => ({
      context: {
        position: { x: 0, y: 0 },
      },
      actions: {
        setPosition: (position) => set({ context: { position } }),
      },
    }),
    {
      name: 'position-storage',
      partialize: (state) => ({ context: state.context }),
    },
  ),
)

const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
const $dot = document.getElementById('dot') as HTMLDivElement

$dotContainer.addEventListener('pointermove', (event) => {
  positionStore.getState().actions.setPosition({
    x: event.clientX,
    y: event.clientY,
  })
})

const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
  $dot.style.transform = `translate(${state.context.position.x}px, ${state.context.position.y}px)`
}

render(positionStore.getState(), positionStore.getState())

positionStore.subscribe(render)
```

以下是 `html` 代码

```html
<div
  id="dot-container"
  style="position: relative; width: 100vw; height: 100vh;"
>
  <div
    id="dot"
    style="position: absolute; background-color: red; border-radius: 50%; left: -10px; top: -10px; width: 20px; height: 20px;"
  ></div>
</div>
```

### 使用自定义存储持久化状态

在本迷你教程中，我们将使用 vanilla store 创建一个简单的位置跟踪系统，其中位置状态持久化在 URL 的查询参数中。这种方法允许状态直接在浏览器的 URL 中持久化，这对于在页面重新加载时保持状态或嵌入状态的共享链接非常有用。

我们需要实现操作 URL 查询参数的函数，就像它们是存储机制一样。这包括检索、设置和删除参数。

```ts
const getSearchParams = () => {
  return new URL(location.href).searchParams
}

const updateSearchParams = (searchParams: URLSearchParams) => {
  window.history.replaceState(
    {},
    '',
    `${location.pathname}?${searchParams.toString()}`,
  )
}

const getSearchParam = (key: string) => {
  const searchParams = getSearchParams()
  return searchParams.get(key)
}

const updateSearchParam = (key: string, value: string) => {
  const searchParams = getSearchParams()
  searchParams.set(key, value)

  updateSearchParams(searchParams)
}

const removeSearchParam = (key: string) => {
  const searchParams = getSearchParams()
  searchParams.delete(key)

  updateSearchParams(searchParams)
}
```

要使用 URL 查询参数作为存储，我们定义一个 `searchParamsStorage` 对象，具有 `getItem`、`setItem` 和 `removeItem` 方法。这些方法映射到我们自定义的操作查询参数的函数。

```ts
const searchParamsStorage = {
  getItem: (key: string) => getSearchParam(key),
  setItem: (key: string, value: string) => updateSearchParam(key, value),
  removeItem: (key: string) => removeSearchParam(key),
}
```

现在，我们使用 `persist` 中间件初始化 vanilla store，指定我们要使用自定义存储。我们将位置数据持久化在 URL 查询参数中，而不是默认的 `localStorage` 或 `sessionStorage`。

```ts
import { createStore } from 'zustand/vanilla'
import { persist, createJSONStorage } from 'zustand/middleware'

type PositionStoreState = { position: { x: number; y: number } }

type PositionStoreActions = {
  setPosition: (nextPosition: PositionStoreState['position']) => void
}

type PositionStore = PositionStoreState & PositionStoreActions

const positionStore = createStore<PositionStore>()(
  persist(
    (set) => ({
      position: { x: 0, y: 0 },
      setPosition: (position) => set({ position }),
    }),
    {
      name: 'position-storage',
      storage: createJSONStorage(() => searchParamsStorage),
    },
  ),
)
```

接下来，我们将在一个 div 内跟踪鼠标移动并使用新位置更新存储。

```ts
const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
const $dot = document.getElementById('dot') as HTMLDivElement

$dotContainer.addEventListener('pointermove', (event) => {
  positionStore.getState().setPosition({
    x: event.clientX,
    y: event.clientY,
  })
})
```

我们希望通过将一个 div 元素（表示点）移动到新坐标来反映位置更新。

```ts
const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
  $dot.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`
}

render(positionStore.getState(), positionStore.getState())

positionStore.subscribe(render)
```

以下是完整代码，用于创建一个在容器内跟随鼠标移动的点，并将位置持久化到 URL 的查询参数中。

```ts
import { createStore } from 'zustand/vanilla'
import { persist, createJSONStorage } from 'zustand/middleware'

type PositionStoreState = { position: { x: number; y: number } }

type PositionStoreActions = {
  setPosition: (nextPosition: PositionStoreState['position']) => void
}

type PositionStore = PositionStoreState & PositionStoreActions

const getSearchParams = () => {
  return new URL(location.href).searchParams
}

const updateSearchParams = (searchParams: URLSearchParams) => {
  window.history.replaceState(
    {},
    '',
    `${location.pathname}?${searchParams.toString()}`,
  )
}

const getSearchParam = (key: string) => {
  const searchParams = getSearchParams()
  return searchParams.get(key)
}

const updateSearchParam = (key: string, value: string) => {
  const searchParams = getSearchParams()
  searchParams.set(key, value)

  updateSearchParams(searchParams)
}

const removeSearchParam = (key: string) => {
  const searchParams = getSearchParams()
  searchParams.delete(key)

  updateSearchParams(searchParams)
}

const searchParamsStorage = {
  getItem: (key: string) => getSearchParam(key),
  setItem: (key: string, value: string) => updateSearchParam(key, value),
  removeItem: (key: string) => removeSearchParam(key),
}

const positionStore = createStore<PositionStore>()(
  persist(
    (set) => ({
      position: { x: 0, y: 0 },
      setPosition: (position) => set({ position }),
    }),
    {
      name: 'position-storage',
      storage: createJSONStorage(() => searchParamsStorage),
    },
  ),
)

const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
const $dot = document.getElementById('dot') as HTMLDivElement

$dotContainer.addEventListener('pointermove', (event) => {
  positionStore.getState().setPosition({
    x: event.clientX,
    y: event.clientY,
  })
})

const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
  $dot.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`
}

render(positionStore.getState(), positionStore.getState())

positionStore.subscribe(render)
```

以下是 `html` 代码

```html
<div
  id="dot-container"
  style="position: relative; width: 100vw; height: 100vh;"
>
  <div
    id="dot"
    style="position: absolute; background-color: red; border-radius: 50%; left: -10px; top: -10px; width: 20px; height: 20px;"
  ></div>
</div>
```

### 通过版本控制和迁移持久化状态

在本教程中，我们将探索如何使用版本控制和迁移来管理状态持久化。我们将演示如何在不破坏现有持久化数据的情况下演变状态架构。

在转向版本化状态管理之前，我们模拟一个初始状态为 `version` 0。通过手动设置 `version` 0 状态到 `localStorage` 中（如果它不存在）。`version` 0 状态将坐标保存为 `x` 和 `y` 字段。

```ts
// 仅用于教程目的
if (!localStorage.getItem('position-storage')) {
  localStorage.setItem(
    'position-storage',
    JSON.stringify({
      state: { x: 100, y: 100 }, // version 0 结构
      version: 0,
    }),
  )
}
```

接下来，我们使用 `persist` 中间件来处理状态持久化。我们还添加了一个迁移函数来处理版本之间的更改。在本例中，我们将状态从 `version` 0（`x` 和 `y` 分开）迁移到 `version` 1，其中它们被合并到一个 `position` 对象中。

```ts
migrate: (persisted: any, version) => {
  if (version === 0) {
    persisted.position = { x: persisted.x, y: persisted.y }
    delete persisted.x
    delete persisted.y
  }

  return persisted
}
```

接下来，我们将在一个 div 内跟踪鼠标移动并使用新位置更新存储。

```ts
const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
const $dot = document.getElementById('dot') as HTMLDivElement

$dotContainer.addEventListener('pointermove', (event) => {
  positionStore.getState().setPosition({
    x: event.clientX,
    y: event.clientY,
  })
})
```

我们希望通过将一个 div 元素（表示点）移动到新坐标来反映位置更新。

```ts
const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
  $dot.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`
}

render(positionStore.getState(), positionStore.getState())

positionStore.subscribe(render)
```

以下是完整代码。

```ts
import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'

// 仅用于教程目的
if (!localStorage.getItem('position-storage')) {
  localStorage.setItem(
    'position-storage',
    JSON.stringify({
      state: { x: 100, y: 100 },
      version: 0,
    }),
  )
}

type PositionStoreState = { position: { x: number; y: number } }

type PositionStoreActions = {
  setPosition: (nextPosition: PositionStoreState['position']) => void
}

type PositionStore = PositionStoreState & PositionStoreActions

const positionStore = createStore<PositionStore>()(
  persist(
    (set) => ({
      position: { x: 0, y: 0 }, // version 0: 仅 x: 0, y: 0
      setPosition: (position) => set({ position }),
    }),
    {
      name: 'position-storage',
      version: 1,
      migrate: (persisted: any, version) => {
        if (version === 0) {
          persisted.position = { x: persisted.x, y: persisted.y }
          delete persisted.x
          delete persisted.y
        }

        return persisted
      },
    },
  ),
)

const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
const $dot = document.getElementById('dot') as HTMLDivElement

$dotContainer.addEventListener('pointermove', (event) => {
  positionStore.getState().setPosition({
    x: event.clientX,
    y: event.clientY,
  })
})

const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
  $dot.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`
}

render(positionStore.getState(), positionStore.getState())

positionStore.subscribe(render)
```

以下是 `html` 代码

```html
<div
  id="dot-container"
  style="position: relative; width: 100vw; height: 100vh;"
>
  <div
    id="dot"
    style="position: absolute; background-color: red; border-radius: 50%; left: -10px; top: -10px; width: 20px; height: 20px;"
  ></div>
</div>
```

### 持久化嵌套对象的状态

在本教程中，我们将创建一个 vanilla store 来跟踪由 `x` 和 `y` 坐标表示的位置。我们还将实现使用 `localStorage` 的持久化，并演示如何处理可能缺少字段的状态合并。

为了模拟教程的初始状态，我们将检查我们的位置信息是否存在于 `localStorage` 中。如果不存在，我们将设置它。

```ts
if (!localStorage.getItem('position-storage')) {
  localStorage.setItem(
    'position-storage',
    JSON.stringify({
      state: { position: { y: 100 } }, // 缺少 `x` 字段
      version: 0,
    }),
  )
}
```

现在，我们将创建 store 并配置它以使用持久化和深度合并。

```ts
import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'
import createDeepMerge from '@fastify/deepmerge'

const deepMerge = createDeepMerge({ all: true })

type PositionStoreState = { position: { x: number; y: number } }

type PositionStoreActions = {
  setPosition: (nextPosition: PositionStoreState['position']) => void
}

type PositionStore = PositionStoreState & PositionStoreActions

const positionStore = createStore<PositionStore>()(
  persist(
    (set) => ({
      position: { x: 0, y: 0 },
      setPosition: (position) => set({ position }),
    }),
    {
      name: 'position-storage',
      merge: (persisted, current) => deepMerge(current, persisted) as never,
    },
  ),
)
```

接下来，我们将在一个 div 内跟踪鼠标移动并使用新位置更新存储。

```ts
const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
const $dot = document.getElementById('dot') as HTMLDivElement

$dotContainer.addEventListener('pointermove', (event) => {
  positionStore.getState().setPosition({
    x: event.clientX,
    y: event.clientY,
  })
})
```

我们希望通过将一个 div 元素（表示点）移动到新坐标来反映位置更新。

```ts
const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
  $dot.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`
}

render(positionStore.getState(), positionStore.getState())

positionStore.subscribe(render)
```

以下是完整代码。

```ts
import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'
import createDeepMerge from '@fastify/deepmerge'

const deepMerge = createDeepMerge({ all: true })

// 仅用于教程目的
if (!localStorage.getItem('position-storage')) {
  localStorage.setItem(
    'position-storage',
    JSON.stringify({
      state: { position: { y: 100 } }, // 缺少 `x` 字段
      version: 0,
    }),
  )
}

type PositionStoreState = { position: { x: number; y: number } }

type PositionStoreActions = {
  setPosition: (nextPosition: PositionStoreState['position']) => void
}

type PositionStore = PositionStoreState & PositionStoreActions

const positionStore = createStore<PositionStore>()(
  persist(
    (set) => ({
      position: { x: 0, y: 0 },
      setPosition: (position) => set({ position }),
    }),
    {
      name: 'position-storage',
      merge: (persisted, current) => deepMerge(current, persisted) as never,
    },
  ),
)

const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
const $dot = document.getElementById('dot') as HTMLDivElement

$dotContainer.addEventListener('pointermove', (event) => {
  positionStore.getState().setPosition({
    x: event.clientX,
    y: event.clientY,
  })
})

const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
  console.log({ state })
  $dot.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`
}

render(positionStore.getState(), positionStore.getState())

positionStore.subscribe(render)
```

以下是 `html` 代码

```html
<div
  id="dot-container"
  style="position: relative; width: 100vw; height: 100vh;"
>
  <div
    id="dot"
    style="position: absolute; background-color: red; border-radius: 50%; left: -10px; top: -10px; width: 20px; height: 20px;"
  ></div>
</div>
```

### 持久化状态并手动水合

在本教程中，我们将创建一个 vanilla store 来跟踪由 `x` 和 `y` 坐标表示的位置。我们还将实现使用 `localStorage` 的持久化，并探索如何跳过水合过程并在延迟后手动触发再水合。

我们首先设置一个 vanilla store 来保存位置（一个包含 `x` 和 `y` 坐标的对象）和一个更新它的操作。我们还将使用 `persist` 中间件将位置存储在 `localStorage` 中，但跳过水合。

```ts
import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'

type PositionStoreState = { position: { x: number; y: number } }

type PositionStoreActions = {
  setPosition: (nextPosition: PositionStoreState['position']) => void
}

type PositionStore = PositionStoreState & PositionStoreActions

const positionStore = createStore<PositionStore>()(
  persist(
    (set) => ({
      position: { x: 0, y: 0 },
      setPosition: (position) => set({ position }),
    }),
    {
      name: 'position-storage',
      skipHydration: true,
    },
  ),
)
```

由于我们在初始设置中跳过了水合，我们将手动再水合状态。在这里，我们使用 `setTimeout` 来模拟延迟再水合。

```ts
setTimeout(() => {
  positionStore.persist.rehydrate()
}, 2000)
```

接下来，我们将在一个 div 内跟踪鼠标移动并使用新位置更新存储。

```ts
const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
const $dot = document.getElementById('dot') as HTMLDivElement

$dotContainer.addEventListener('pointermove', (event) => {
  positionStore.getState().setPosition({
    x: event.clientX,
    y: event.clientY,
  })
})
```

我们希望通过将一个 div 元素（表示点）移动到新坐标来反映位置更新。

```ts
const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
  $dot.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`
}

render(positionStore.getState(), positionStore.getState())

positionStore.subscribe(render)
```

以下是完整代码。

```ts
import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'

type PositionStoreState = { position: { x: number; y: number } }

type PositionStoreActions = {
  setPosition: (nextPosition: PositionStoreState['position']) => void
}

type PositionStore = PositionStoreState & PositionStoreActions

const positionStore = createStore<PositionStore>()(
  persist(
    (set) => ({
      position: { x: 0, y: 0 },
      setPosition: (position) => set({ position }),
    }),
    {
      name: 'position-storage',
      skipHydration: true,
    },
  ),
)

const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
const $dot = document.getElementById('dot') as HTMLDivElement

$dotContainer.addEventListener('pointermove', (event) => {
  positionStore.getState().setPosition({
    x: event.clientX,
    y: event.clientY,
  })
})

const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
  $dot.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`
}

setTimeout(() => {
  positionStore.persist.rehydrate()
}, 2000)

render(positionStore.getState(), positionStore.getState())

positionStore.subscribe(render)
```

以下是 `html` 代码

```html
<div
  id="dot-container"
  style="position: relative; width: 100vw; height: 100vh;"
>
  <div
    id="dot"
    style="position: absolute; background-color: red; border-radius: 50%; left: -10px; top: -10px; width: 20px; height: 20px;"
  ></div>
</div>
```

## 故障排除

TBD
