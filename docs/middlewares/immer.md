---
title: immer
description: 如何在不使用样板代码的情况下在存储中执行不可变更新
nav: 206
---

# immer

`immer` 中间件让你可以执行不可变更新。

```js
const nextStateCreatorFn = immer(stateCreatorFn)
```

- [类型](#类型)
  - [签名](#签名)
  - [变换器](#变换器)
- [参考](#参考)
- [用法](#用法)
- [故障排除](#故障排除)

## 类型

### 签名

```ts
immer<T>(stateCreatorFn: StateCreator<T, [], []>): StateCreator<T, [['zustand/immer', never]], []>
```

### 变换器

<!-- prettier-ignore-start -->
```ts
['zustand/immer', never]
```
<!-- prettier-ignore-end -->

## 参考

### `immer(stateCreatorFn)`

#### 参数

- `stateCreatorFn`: 一个函数，接受 `set` 函数、`get` 函数和 `store` 作为参数。
  通常，你会返回一个包含你想要暴露的方法的对象。

#### 返回值

`immer` 返回一个状态创建函数。

## 用法

### 在不使用样板代码的情况下更新状态

在下一个示例中，我们将更新 `person` 对象。由于它是一个嵌套对象，我们需要在进行更新之前创建整个对象的副本。

```ts
import { createStore } from 'zustand/vanilla'

type PersonStoreState = {
  person: { firstName: string; lastName: string; email: string }
}

type PersonStoreActions = {
  setPerson: (
    nextPerson: (
      person: PersonStoreState['person'],
    ) => PersonStoreState['person'] | PersonStoreState['person'],
  ) => void
}

type PersonStore = PersonStoreState & PersonStoreActions

const personStore = createStore<PersonStore>()((set) => ({
  person: {
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com',
  },
  setPerson: (nextPerson) =>
    set((state) => ({
      person:
        typeof nextPerson === 'function'
          ? nextPerson(state.person)
          : nextPerson,
    })),
}))

const $firstNameInput = document.getElementById(
  'first-name',
) as HTMLInputElement
const $lastNameInput = document.getElementById('last-name') as HTMLInputElement
const $emailInput = document.getElementById('email') as HTMLInputElement
const $result = document.getElementById('result') as HTMLDivElement

function handleFirstNameChange(event: Event) {
  personStore.getState().setPerson((person) => ({
    ...person,
    firstName: (event.target as any).value,
  }))
}

function handleLastNameChange(event: Event) {
  personStore.getState().setPerson((person) => ({
    ...person,
    lastName: (event.target as any).value,
  }))
}

function handleEmailChange(event: Event) {
  personStore.getState().setPerson((person) => ({
    ...person,
    email: (event.target as any).value,
  }))
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
  邮箱:
  <input id="email" />
</label>
<p id="result"></p>
```

为了避免在进行更新之前手动复制整个对象，我们将使用 `immer` 中间件。

```ts
import { createStore } from 'zustand/vanilla'
import { immer } from 'zustand/middleware/immer'

type PersonStoreState = {
  person: { firstName: string; lastName: string; email: string }
}

type PersonStoreActions = {
  setPerson: (
    nextPerson: (
      person: PersonStoreState['person'],
    ) => PersonStoreState['person'] | PersonStoreState['person'],
  ) => void
}

type PersonStore = PersonStoreState & PersonStoreActions

const personStore = createStore<PersonStore>()(
  immer((set) => ({
    person: {
      firstName: 'Barbara',
      lastName: 'Hepworth',
      email: 'bhepworth@sculpture.com',
    },
    setPerson: (nextPerson) =>
      set((state) => {
        state.person = typeof nextPerson ? nextPerson(state.person) : nextPerson
      }),
  })),
)

const $firstNameInput = document.getElementById(
  'first-name',
) as HTMLInputElement
const $lastNameInput = document.getElementById('last-name') as HTMLInputElement
const $emailInput = document.getElementById('email') as HTMLInputElement
const $result = document.getElementById('result') as HTMLDivElement

function handleFirstNameChange(event: Event) {
  personStore.getState().setPerson((person) => {
    person.firstName = (event.target as any).value
  })
}

function handleLastNameChange(event: Event) {
  personStore.getState().setPerson((person) => {
    person.lastName = (event.target as any).value
  })
}

function handleEmailChange(event: Event) {
  personStore.getState().setPerson((person) => {
    person.email = (event.target as any).value
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

## 故障排除

待定
