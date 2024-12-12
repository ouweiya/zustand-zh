---
title: createWithEqualityFn ⚛️
description: 如何创建高效的 stores
nav: 25
---

`createWithEqualityFn` 让你可以创建一个带有 API 工具的 React Hook，就像 `create` 一样。
然而，它提供了一种定义自定义相等性检查的方法。这允许更细粒度地控制组件何时重新渲染，从而提高性能和响应速度。

```js
const useSomeStore = createWithEqualityFn(stateCreatorFn, equalityFn)
```

- [类型](#types)
  - [签名](#createwithequalityfn-signature)
- [参考](#reference)
- [用法](#usage)
  - [基于先前状态更新状态](#updating-state-based-on-previous-state)
  - [更新状态中的基本类型](#updating-primitives-in-state)
  - [更新状态中的对象](#updating-objects-in-state)
  - [更新状态中的数组](#updating-arrays-in-state)
  - [在没有 store actions 的情况下更新状态](#updating-state-with-no-store-actions)
  - [订阅状态更新](#subscribing-to-state-updates)
- [故障排除](#troubleshooting)
  - [我更新了状态，但屏幕没有更新](#ive-updated-the-state-but-the-screen-doesnt-update)

## 类型

### 签名

```ts
createWithEqualityFn<T>()(stateCreatorFn: StateCreator<T, [], []>, equalityFn?: (a: T, b: T) => boolean): UseBoundStore<StoreApi<T>>
```

## 参考

### `createWithEqualityFn(stateCreatorFn)`

#### 参数

- `stateCreatorFn`: 一个函数，接收 `set` 函数、`get` 函数和 `store` 作为参数。通常，你会返回一个包含你想要暴露的方法的对象。
- **可选** `equalityFn`: 默认为 `Object.is`。一个函数，允许你跳过重新渲染。

#### 返回值

`createWithEqualityFn` 返回一个带有 API 工具的 React Hook，就像 `create` 一样。它允许你使用选择器函数返回基于当前状态的数据，并允许你使用相等性函数跳过重新渲染。它应该接收一个选择器函数和一个相等性函数作为参数。

## 用法

### 基于先前状态更新状态

要基于先前状态更新状态，我们应该使用 **更新函数**。阅读更多关于此的信息 [这里](https://react.dev/learn/queueing-a-series-of-state-updates)。

此示例展示了如何在 **actions** 中支持 **更新函数**。

```tsx
import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/vanilla/shallow'

type AgeStoreState = { age: number }

type AgeStoreActions = {
  setAge: (
    nextAge:
      | AgeStoreState['age']
      | ((currentAge: AgeStoreState['age']) => AgeStoreState['age']),
  ) => void
}

type AgeStore = AgeStoreState & AgeStoreActions

const useAgeStore = createWithEqualityFn<AgeStore>()(
  (set) => ({
    age: 42,
    setAge: (nextAge) =>
      set((state) => ({
        age: typeof nextAge === 'function' ? nextAge(state.age) : nextAge,
      })),
  }),
  shallow,
)

export default function App() {
  const age = useAgeStore((state) => state.age)
  const setAge = useAgeStore((state) => state.setAge)

  function increment() {
    setAge((currentAge) => currentAge + 1)
  }

  return (
    <>
      <h1>你的年龄: {age}</h1>
      <button
        type="button"
        onClick={() => {
          increment()
          increment()
          increment()
        }}
      >
        +3
      </button>
      <button
        type="button"
        onClick={() => {
          increment()
        }}
      >
        +1
      </button>
    </>
  )
}
```

### 更新状态中的基本类型

状态可以保存任何类型的 JavaScript 值。当你想要更新内置的基本类型值（如数字、字符串、布尔值等）时，你应该直接分配新值以确保更新正确应用，并避免意外行为。

> [!NOTE]
> 默认情况下，`set` 函数执行浅合并。如果你需要用一个新状态完全替换当前状态，请将 `replace` 参数设置为 `true`

```tsx
import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/vanilla/shallow'

type XStore = number

const useXStore = createWithEqualityFn<XStore>()(() => 0, shallow)

export default function MovingDot() {
  const x = useXStore()
  const setX = (nextX: number) => {
    useXStore.setState(nextX, true)
  }
  const position = { y: 0, x }

  return (
    <div
      onPointerMove={(e) => {
        setX(e.clientX)
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}
    >
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'red',
          borderRadius: '50%',
          transform: `translate(${position.x}px, ${position.y}px)`,
          left: -10,
          top: -10,
          width: 20,
          height: 20,
        }}
      />
    </div>
  )
}
```

### 更新状态中的对象

对象在 JavaScript 中是 **可变的**，但当你将它们存储在状态中时，你应该将它们视为 **不可变的**。相反，当你想要更新一个对象时，你需要创建一个新的对象（或复制一个现有的对象），然后将状态设置为使用新对象。

默认情况下，`set` 函数执行浅合并。对于大多数只需要修改特定属性的更新，默认的浅合并是首选，因为它更高效。要完全用一个新状态替换当前状态，请谨慎使用 `replace` 参数设置为 `true`，因为它会丢弃状态中的任何现有嵌套数据。

```tsx
import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/vanilla/shallow'

type PositionStoreState = { position: { x: number; y: number } }

type PositionStoreActions = {
  setPosition: (nextPosition: PositionStoreState['position']) => void
}

type PositionStore = PositionStoreState & PositionStoreActions

const usePositionStore = createWithEqualityFn<PositionStore>()(
  (set) => ({
    position: { x: 0, y: 0 },
    setPosition: (position) => set({ position }),
  }),
  shallow,
)

export default function MovingDot() {
  const position = usePositionStore((state) => state.position)
  const setPosition = usePositionStore((state) => state.setPosition)

  return (
    <div
      onPointerMove={(e) => {
        setPosition({
          x: e.clientX,
          y: e.clientY,
        })
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}
    >
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'red',
          borderRadius: '50%',
          transform: `translate(${position.x}px, ${position.y}px)`,
          left: -10,
          top: -10,
          width: 20,
          height: 20,
        }}
      />
    </div>
  )
}
```

### 更新状态中的数组

数组在 JavaScript 中是可变的，但当你将它们存储在状态中时，你应该将它们视为不可变的。就像对象一样，当你想要更新存储在状态中的数组时，你需要创建一个新的数组（或复制一个现有的数组），然后将状态设置为使用新数组。

默认情况下，`set` 函数执行浅合并。要更新数组值，我们应该分配新值以确保更新正确应用，并避免意外行为。要完全用一个新状态替换当前状态，请将 `replace` 参数设置为 `true`。

> [!IMPORTANT]
> 我们应该优先使用不可变操作，如：`[...array]`、`concat(...)`、`filter(...)`、`slice(...)`、`map(...)`、`toSpliced(...)`、`toSorted(...)` 和 `toReversed(...)`，并避免使用可变操作，如 `array[arrayIndex] = ...`、`push(...)`、`unshift(...)`、`pop(...)`、`shift(...)、`splice(...)`、`reverse(...)` 和 `sort(...)`。

```tsx
import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/vanilla/shallow'

type PositionStore = [number, number]

const usePositionStore = createWithEqualityFn<PositionStore>()(
  () => [0, 0],
  shallow,
)

export default function MovingDot() {
  const [x, y] = usePositionStore()
  const position = { x, y }
  const setPosition: typeof usePositionStore.setState = (nextPosition) => {
    usePositionStore.setState(nextPosition, true)
  }

  return (
    <div
      onPointerMove={(e) => {
        setPosition([e.clientX, e.clientY])
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}
    >
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'red',
          borderRadius: '50%',
          transform: `translate(${position.x}px, ${position.y}px)`,
          left: -10,
          top: -10,
          width: 20,
          height: 20,
        }}
      />
    </div>
  )
}
```

### 在没有 store actions 的情况下更新状态

在模块级别定义 actions，外部于 store 有一些优势，比如：它不需要一个 hook 来调用 action，并且它有助于代码拆分。

> [!NOTE]
> 推荐的方法是将 actions 和状态放在 store 内部（让你的 actions 与状态放在一起）。

```tsx
import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/vanilla/shallow'

const usePositionStore = createWithEqualityFn<{
  x: number
  y: number
}>()(() => ({ x: 0, y: 0 }), shallow)

const setPosition: typeof usePositionStore.setState = (nextPosition) => {
  usePositionStore.setState(nextPosition)
}

export default function MovingDot() {
  const position = usePositionStore()

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}
    >
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'red',
          borderRadius: '50%',
          transform: `translate(${position.x}px, ${position.y}px)`,
          left: -10,
          top: -10,
          width: 20,
          height: 20,
        }}
        onMouseEnter={(event) => {
          const parent = event.currentTarget.parentElement
          const parentWidth = parent.clientWidth
          const parentHeight = parent.clientHeight

          setPosition({
            x: Math.ceil(Math.random() * parentWidth),
            y: Math.ceil(Math.random() * parentHeight),
          })
        }}
      />
    </div>
  )
}
```

### 订阅状态更新

通过订阅状态更新，你可以注册一个回调函数，每当 store 的状态更新时，该回调函数就会触发。我们可以使用 `subscribe` 进行外部状态管理。

```tsx
import { useEffect } from 'react'
import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/vanilla/shallow'

type PositionStoreState = { position: { x: number; y: number } }

type PositionStoreActions = {
  setPosition: (nextPosition: PositionStoreState['position']) => void
}

type PositionStore = PositionStoreState & PositionStoreActions

const usePositionStore = createWithEqualityFn<PositionStore>()(
  (set) => ({
    position: { x: 0, y: 0 },
    setPosition: (nextPosition) => set(nextPosition),
  }),
  shallow,
)

export default function MovingDot() {
  const position = usePositionStore((state) => state.position)
  const setPosition = usePositionStore((state) => state.setPosition)

  useEffect(() => {
    const unsubscribePositionStore = usePositionStore.subscribe(
      ({ position }) => {
        console.log('new position', { position })
      },
    )

    return () => {
      unsubscribePositionStore()
    }
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}
    >
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'red',
          borderRadius: '50%',
          transform: `translate(${position.x}px, ${position.y}px)`,
          left: -10,
          top: -10,
          width: 20,
          height: 20,
        }}
        onMouseEnter={(event) => {
          const parent = event.currentTarget.parentElement
          const parentWidth = parent.clientWidth
          const parentHeight = parent.clientHeight

          setPosition({
            x: Math.ceil(Math.random() * parentWidth),
            y: Math.ceil(Math.random() * parentHeight),
          })
        }}
      />
    </div>
  )
}
```

## 故障排除

### 我更新了状态，但屏幕没有更新

在前面的示例中，`position` 对象总是从当前光标位置创建。但是通常，你会希望在创建新对象时包含现有数据。例如，你可能只想更新表单中的一个字段，但保留所有其他字段的先前值。

这些输入字段不起作用，因为 `onChange` 处理程序会改变状态：

```tsx
import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/vanilla/shallow'

type PersonStoreState = {
  person: { firstName: string; lastName: string; email: string }
}

type PersonStoreActions = {
  setPerson: (nextPerson: PersonStoreState['person']) => void
}

type PersonStore = PersonStoreState & PersonStoreActions

const usePersonStore = createWithEqualityFn<PersonStore>()(
  (set) => ({
    person: {
      firstName: 'Barbara',
      lastName: 'Hepworth',
      email: 'bhepworth@sculpture.com',
    },
    setPerson: (person) => set({ person }),
  }),
  shallow,
)

export default function Form() {
  const person = usePersonStore((state) => state.person)
  const setPerson = usePersonStore((state) => state.setPerson)

  function handleFirstNameChange(e: ChangeEvent<HTMLInputElement>) {
    person.firstName = e.target.value
  }

  function handleLastNameChange(e: ChangeEvent<HTMLInputElement>) {
    person.lastName = e.target.value
  }

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    person.email = e.target.value
  }

  return (
    <>
      <label style={{ display: 'block' }}>
        名字:
        <input value={person.firstName} onChange={handleFirstNameChange} />
      </label>
      <label style={{ display: 'block' }}>
        姓氏:
        <input value={person.lastName} onChange={handleLastNameChange} />
      </label>
      <label style={{ display: 'block' }}>
        邮箱:
        <input value={person.email} onChange={handleEmailChange} />
      </label>
      <p>
        {person.firstName} {person.lastName} ({person.email})
      </p>
    </>
  )
}
```

例如，这一行改变了过去渲染的状态：

```tsx
person.firstName = e.target.value
```

获得你想要的行为的可靠方法是创建一个新对象并将其传递给 `setPerson`。但在这里你还想将现有数据复制到其中，因为只有一个字段发生了变化：

```ts
setPerson({ ...person, firstName: e.target.value }) // 从输入中获取的新名字
```

> [!NOTE]
> 由于 `set` 函数默认执行浅合并，我们不需要单独复制每个属性。

现在表单可以正常工作了！

注意你没有为每个输入字段声明一个单独的状态变量。对于大型表单，将所有数据分组在一个对象中非常方便——只要你正确更新它！

```tsx {32,36,40}
import { type ChangeEvent } from 'react'
import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/vanilla/shallow'

type PersonStoreState = {
  person: { firstName: string; lastName: string; email: string }
}

type PersonStoreActions = {
  setPerson: (nextPerson: PersonStoreState['person']) => void
}

type PersonStore = PersonStoreState & PersonStoreActions

const usePersonStore = createWithEqualityFn<PersonStore>()(
  (set) => ({
    person: {
      firstName: 'Barbara',
      lastName: 'Hepworth',
      email: 'bhepworth@sculpture.com',
    },
    setPerson: (person) => set({ person }),
  }),
  shallow,
)

export default function Form() {
  const person = usePersonStore((state) => state.person)
  const setPerson = usePersonStore((state) => state.setPerson)

  function handleFirstNameChange(e: ChangeEvent<HTLMInputElement>) {
    setPerson({ ...person, firstName: e.target.value })
  }

  function handleLastNameChange(e: ChangeEvent<HTLMInputElement>) {
    setPerson({ ...person, lastName: e.target.value })
  }

  function handleEmailChange(e: ChangeEvent<HTLMInputElement>) {
    setPerson({ ...person, email: e.target.value })
  }

  return (
    <>
      <label style={{ display: 'block' }}>
        名字:
        <input value={person.firstName} onChange={handleFirstNameChange} />
      </label>
      <label style={{ display: 'block' }}>
        姓氏:
        <input value={person.lastName} onChange={handleLastNameChange} />
      </label>
      <label style={{ display: 'block' }}>
        邮箱:
        <input value={person.email} onChange={handleEmailChange} />
      </label>
      <p>
        {person.firstName} {person.lastName} ({person.email})
      </p>
    </>
  )
}
```
