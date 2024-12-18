---
title: redux
description: 如何在 store 中使用 actions 和 reducers
nav: 208
---

# redux

`redux` 中间件允许你像 redux 一样通过 actions 和 reducers 更新 store。

```js
const nextStateCreatorFn = redux(reducerFn, initialState)
```

- [类型](#类型)
  - [签名](#签名)
  - [变异器](#变异器)
- [参考](#参考)
- [用法](#用法)
  - [通过 actions 和 reducers 更新状态](#通过-actions-和-reducers-更新状态)
- [故障排除](#故障排除)

## 类型

### 签名

```ts
redux<T, A>(reducerFn: (state: T, action: A) => T, initialState: T): StateCreator<T & { dispatch: (action: A) => A }, [['zustand/redux', A]], []>
```

### 变换器

<!-- prettier-ignore-start -->
```ts
['zustand/redux', A]
```
<!-- prettier-ignore-end -->

## 参考

### `redux(reducerFn, initialState)`

#### 参数

- `reducerFn`: 它应该是纯函数，应该接受应用程序的当前状态和一个 action 对象作为参数，并返回应用 action 后的新状态。
- `initialState`: 你希望状态最初的值。它可以是任何类型的值，除了函数。

#### 返回值

`redux` 返回一个状态创建函数。

## 用法

### 通过 actions 和 reducers 更新状态

```ts
import { createStore } from 'zustand/vanilla'
import { redux } from 'zustand/middleware'

type PersonStoreState = {
  firstName: string
  lastName: string
  email: string
}

type PersonStoreAction =
  | { type: 'person/setFirstName'; firstName: string }
  | { type: 'person/setLastName'; lastName: string }
  | { type: 'person/setEmail'; email: string }

type PersonStore = PersonStoreState & PersonStoreActions

const personStoreReducer = (
  state: PersonStoreState,
  action: PersonStoreAction,
) => {
  switch (action.type) {
    case 'person/setFirstName': {
      return { ...state, firstName: action.firstName }
    }
    case 'person/setLastName': {
      return { ...state, lastName: action.lastName }
    }
    case 'person/setEmail': {
      return { ...state, email: action.email }
    }
    default: {
      return state
    }
  }
}

const personStoreInitialState: PersonStoreState = {
  firstName: 'Barbara',
  lastName: 'Hepworth',
  email: 'bhepworth@sculpture.com',
}

const personStore = createStore<PersonStore>()(
  redux(personStoreReducer, personStoreInitialState),
)

const $firstNameInput = document.getElementById(
  'first-name',
) as HTMLInputElement
const $lastNameInput = document.getElementById('last-name') as HTMLInputElement
const $emailInput = document.getElementById('email') as HTMLInputElement
const $result = document.getElementById('result') as HTMLDivElement

function handleFirstNameChange(event: Event) {
  personStore.dispatch({
    type: 'person/setFirstName',
    firstName: (event.target as any).value,
  })
}

function handleLastNameChange(event: Event) {
  personStore.dispatch({
    type: 'person/setLastName',
    lastName: (event.target as any).value,
  })
}

function handleEmailChange(event: Event) {
  personStore.dispatch({
    type: 'person/setEmail',
    email: (event.target as any).value,
  })
}

$firstNameInput.addEventListener('input', handleFirstNameChange)
$lastNameInput.addEventListener('input', handleLastNameChange)
$emailInput.addEventListener('input', handleEmailChange)

const render: Parameters<typeof personStore.subscribe>[0] = (person) => {
  $firstNameInput.value = person.firstName
  $lastNameInput.value = person.lastName
  $emailInput.value = person.email

  $result.innerHTML = `${person.firstName} ${person.lastName} (${person.email})`
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

## 故障排除

待定
