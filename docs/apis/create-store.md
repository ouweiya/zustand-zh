---
title: createStore
description: 如何创建原生 store
nav: 24
---

`createStore` 允许你创建一个原生 store，并暴露 API 工具。

```js
const someStore = createStore(stateCreatorFn)
```

- [类型](#types)
  - [签名](#createstore-signature)
- [参考](#reference)
- [用法](#usage)
  - [基于先前状态更新状态](#updating-state-based-on-previous-state)
  - [更新状态中的原始值](#updating-primitives-in-state)
  - [更新状态中的对象](#updating-objects-in-state)
  - [更新状态中的数组](#updating-arrays-in-state)
  - [订阅状态更新](#subscribing-to-state-updates)
- [故障排除](#troubleshooting)
  - [我更新了状态，但屏幕没有更新](#ive-updated-the-state-but-the-screen-doesnt-update)

## 类型

### 签名

```ts
createStore<T>()(stateCreatorFn: StateCreator<T, [], []>): StoreApi<T>
```

## 参考

### `createStore(stateCreatorFn)`

#### 参数

- `stateCreatorFn`: 一个函数，接收 `set` 函数、`get` 函数和 `store` 作为参数。通常，你会返回一个包含你想要暴露的方法的对象。

#### 返回值

`createStore` 返回一个原生 store，并暴露 API 工具，`setState`，`getState`，`getInitialState` 和 `subscribe`。

## 用法

### 基于先前状态更新状态

此示例展示了如何在 **actions** 中支持 **更新函数**。

```tsx
import { createStore } from 'zustand/vanilla'

type AgeStoreState = { age: number }

type AgeStoreActions = {
  setAge: (
    nextAge:
      | AgeStoreState['age']
      | ((currentAge: AgeStoreState['age']) => AgeStoreState['age']),
  ) => void
}

type AgeStore = AgeStoreState & AgeStoreActions

const ageStore = createStore<AgeStore>()((set) => ({
  age: 42,
  setAge: (nextAge) =>
    set((state) => ({
      age: typeof nextAge === 'function' ? nextAge(state.age) : nextAge,
    })),
}))

function increment() {
  ageStore.getState().setAge((currentAge) => currentAge + 1)
}

const $yourAgeHeading = document.getElementById(
  'your-age',
) as HTMLHeadingElement
const $incrementBy3Button = document.getElementById(
  'increment-by-3',
) as HTMLButtonElement
const $incrementBy1Button = document.getElementById(
  'increment-by-1',
) as HTMLButtonElement

$incrementBy3Button.addEventListener('click', () => {
  increment()
  increment()
  increment()
})

$incrementBy1Button.addEventListener('click', () => {
  increment()
})

const render: Parameters<typeof ageStore.subscribe>[0] = (state) => {
  $yourAgeHeading.innerHTML = `你的年龄: ${state.age}`
}

render(ageStore.getInitialState(), ageStore.getInitialState())

ageStore.subscribe(render)
```

这是 `html` 代码

```html
<h1 id="your-age"></h1>
<button id="increment-by-3" type="button">+3</button>
<button id="increment-by-1" type="button">+1</button>
```

### 更新状态中的原始值

状态可以保存任何类型的 JavaScript 值。当你想要更新内置的原始值（如数字、字符串、布尔值等）时，你应该直接分配新值以确保更新正确应用，并避免意外行为。

> [!NOTE]
> 默认情况下，`set` 函数执行浅合并。如果你需要用一个新的状态完全替换当前状态，请使用 `replace` 参数并设置为 `true`

```ts
import { createStore } from 'zustand/vanilla'

type XStore = number

const xStore = createStore<XStore>()(() => 0)

const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
const $dot = document.getElementById('dot') as HTMLDivElement

$dotContainer.addEventListener('pointermove', (event) => {
  xStore.setState(event.clientX, true)
})

const render: Parameters<typeof xStore.subscribe>[0] = (x) => {
  $dot.style.transform = `translate(${x}px, 0)`
}

render(xStore.getInitialState(), xStore.getInitialState())

xStore.subscribe(render)
```

这是 `html` 代码

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

### 更新状态中的对象

对象在 JavaScript 中是 **可变的**，但在存储它们时，你应该将它们视为 **不可变的**。相反，当你想要更新一个对象时，你需要创建一个新的对象（或复制一个现有的对象），然后设置状态以使用新对象。

默认情况下，`set` 函数执行浅合并。对于大多数只需要修改特定属性的更新，默认的浅合并是首选，因为它更高效。要完全用一个新的状态替换当前状态，请谨慎使用 `replace` 参数并设置为 `true`，因为它会丢弃状态中的任何现有嵌套数据。

```ts
import { createStore } from 'zustand/vanilla'

type PositionStoreState = { position: { x: number; y: number } }

type PositionStoreActions = {
  setPosition: (nextPosition: PositionStoreState['position']) => void
}

type PositionStore = PositionStoreState & PositionStoreActions

const positionStore = createStore<PositionStore>()((set) => ({
  position: { x: 0, y: 0 },
  setPosition: (position) => set({ position }),
}))

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

render(positionStore.getInitialState(), positionStore.getInitialState())

positionStore.subscribe(render)
```

这是 `html` 代码

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

### 更新状态中的数组

数组在 JavaScript 中是可变的，但在存储它们时，你应该将它们视为不可变的。就像对象一样，当你想要更新存储在状态中的数组时，你需要创建一个新的数组（或复制一个现有的数组），然后设置状态以使用新数组。

默认情况下，`set` 函数执行浅合并。要更新数组值，我们应该分配新值以确保更新正确应用，并避免意外行为。要完全用一个新的状态替换当前状态，请使用 `replace` 参数并设置为 `true`。

> [!IMPORTANT]
> 我们应该优先使用不可变操作，如：`[...array]`，`concat(...)`，`filter(...)`，`slice(...)`，`map(...)`，`toSpliced(...)`，`toSorted(...)`，和 `toReversed(...)`，并避免使用可变操作，如 `array[arrayIndex] = ...`，`push(...)`，`unshift(...)`，`pop(...)`，`shift(...)`，`splice(...)`，`reverse(...)`，和 `sort(...)`。

```ts
import { createStore } from 'zustand/vanilla'

type PositionStore = [number, number]

const positionStore = create<PositionStore>()(() => [0, 0])

const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
const $dot = document.getElementById('dot') as HTMLDivElement

$dotContainer.addEventListener('pointermove', (event) => {
  positionStore.setState([event.clientX, event.clientY], true)
})

const render: Parameters<typeof positionStore.subscribe>[0] = ([x, y]) => {
  $dot.style.transform = `translate(${x}px, ${y}px)`
}

render(positionStore.getInitialState(), positionStore.getInitialState())

positionStore.subscribe(render)
```

这是 `html` 代码

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

### 订阅状态更新

通过订阅状态更新，你可以注册一个回调函数，每当 store 的状态更新时，该回调函数就会触发。我们可以使用 `subscribe` 进行外部状态管理。

```ts
import { createStore } from 'zustand/vanilla'

type PositionStoreState = { position: { x: number; y: number } }

type PositionStoreActions = {
  setPosition: (nextPosition: PositionStoreState['position']) => void
}

type PositionStore = PositionStoreState & PositionStoreActions

const positionStore = createStore<PositionStore>()((set) => ({
  position: { x: 0, y: 0 },
  setPosition: (position) => set({ position }),
}))

const $dot = document.getElementById('dot') as HTMLDivElement

$dot.addEventListener('mouseenter', (event) => {
  const parent = event.currentTarget.parentElement
  const parentWidth = parent.clientWidth
  const parentHeight = parent.clientHeight

  positionStore.getState().setPosition({
    x: Math.ceil(Math.random() * parentWidth),
    y: Math.ceil(Math.random() * parentHeight),
  })
})

const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
  $dot.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`
}

render(positionStore.getInitialState(), positionStore.getInitialState())

positionStore.subscribe(render)

const logger: Parameters<typeof positionStore.subscribe>[0] = (state) => {
  console.log('新位置', { position: state.position })
}

positionStore.subscribe(logger)
```

这是 `html` 代码

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

### 我更新了状态，但屏幕没有更新

在前面的示例中，`position` 对象总是从当前光标位置新创建。但通常，你会希望在创建新对象时包含现有数据。例如，你可能只想更新表单中的一个字段，但保留所有其他字段的先前值。

这些输入字段不起作用，因为 `oninput` 处理程序会改变状态：

```ts
import { createStore } from 'zustand/vanilla'

type PersonStoreState = {
  person: { firstName: string; lastName: string; email: string }
}

type PersonStoreActions = {
  setPerson: (nextPerson: PersonStoreState['person']) => void
}

type PersonStore = PersonStoreState & PersonStoreActions

const personStore = createStore<PersonStore>()((set) => ({
  person: {
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com',
  },
  setPerson: (person) => set({ person }),
}))

const $firstNameInput = document.getElementById(
  'first-name',
) as HTMLInputElement
const $lastNameInput = document.getElementById('last-name') as HTMLInputElement
const $emailInput = document.getElementById('email') as HTMLInputElement
const $result = document.getElementById('result') as HTMLDivElement

function handleFirstNameChange(event: Event) {
  personStore.getState().person.firstName = (event.target as any).value
}

function handleLastNameChange(event: Event) {
  personStore.getState().person.lastName = (event.target as any).value
}

function handleEmailChange(event: Event) {
  personStore.getState().person.email = (event.target as any).value
}

$firstNameInput.addEventListener('input', handleFirstNameChange)
$lastNameInput.addEventListener('input', handleLastNameChange)
$emailInput.addEventListener('input', handleEmailChange)

const render: Parameters<typeof personStore.subscribe>[0] = (state) => {
  $firstNameInput.value = state.person.firstName
  $lastNameInput.value = state.person.lastName
  $emailInput.value = state.person.email

  $result.innerHTML = `${state.person.firstName} ${state.person.lastName} (${state.person.email})`
}

render(personStore.getInitialState(), personStore.getInitialState())

personStore.subscribe(render)
```

这是 `html` 代码

```html
<label style="display: block">
  名字:
  <input id="first-name" />
</label>
<label style="display: block">
  姓氏:
  <input id="last-name" />
</label>
<label style="display: block">
  电子邮件:
  <input id="email" />
</label>
<p id="result"></p>
```

例如，这行代码会改变过去渲染的状态：

```ts
personStore.getState().firstName = (e.target as any).value
```

获得你想要的行为的可靠方法是创建一个新对象并传递给 `setPerson`。但在这里你还希望将现有数据复制到其中，因为只有一个字段发生了变化：

```ts
personStore.getState().setPerson({
  firstName: e.target.value, // 来自输入的新名字
})
```

> [!NOTE]
> 我们不需要单独复制每个属性，因为 `set` 函数默认执行浅合并。

现在表单可以正常工作了！

注意你没有为每个输入字段声明一个单独的状态变量。对于大型表单，将所有数据分组在一个对象中非常方便——只要你正确更新它！

```ts {32-34,38-40,44-46}
import { createStore } from 'zustand/vanilla'

type PersonStoreState = {
  person: { firstName: string; lastName: string; email: string }
}

type PersonStoreActions = {
  setPerson: (nextPerson: PersonStoreState['person']) => void
}

type PersonStore = PersonStoreState & PersonStoreActions

const personStore = createStore<PersonStore>()((set) => ({
  person: {
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com',
  },
  setPerson: (person) => set({ person }),
}))

const $firstNameInput = document.getElementById(
  'first-name',
) as HTMLInputElement
const $lastNameInput = document.getElementById('last-name') as HTMLInputElement
const $emailInput = document.getElementById('email') as HTMLInputElement
const $result = document.getElementById('result') as HTMLDivElement

function handleFirstNameChange(event: Event) {
  personStore.getState().setPerson({
    ...personStore.getState().person,
    firstName: (event.target as any).value,
  })
}

function handleLastNameChange(event: Event) {
  personStore.getState().setPerson({
    ...personStore.getState().person,
    lastName: (event.target as any).value,
  })
}

function handleEmailChange(event: Event) {
  personStore.getState().setPerson({
    ...personStore.getState().person,
    email: (event.target as any).value,
  })
}

$firstNameInput.addEventListener('input', handleFirstNameChange)
$lastNameInput.addEventListener('input', handleLastNameChange)
$emailInput.addEventListener('input', handleEmailChange)

const render: Parameters<typeof personStore.subscribe>[0] = (state) => {
  $firstNameInput.value = state.person.firstName
  $lastNameInput.value = state.person.lastName
  $emailInput.value = state.person.email

  $result.innerHTML = `${state.person.firstName} ${state.person.lastName} (${state.person.email})`
}

render(personStore.getInitialState(), personStore.getInitialState())

personStore.subscribe(render)
```
