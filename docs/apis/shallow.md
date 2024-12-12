---
title: shallow
description: 如何有效地比较简单数据
nav: 27
---

`shallow` 让你可以对简单数据结构进行快速检查。当你处理没有嵌套对象或数组的数据结构时，它可以有效地识别
**顶层** 属性的变化。

> [!NOTE]
> Shallow 让你可以进行快速比较，但请记住它的局限性。

```js
const equal = shallow(a, b)
```

- [类型](#types)
  - [签名](#shallow-signature)
- [参考](#reference)
- [用法](#usage)
  - [比较原始值](#comparing-primitives)
  - [比较对象](#comparing-objects)
  - [比较集合](#comparing-sets)
  - [比较映射](#comparing-maps)
- [故障排除](#troubleshooting)
  - [比较对象即使相同也返回 `false`](#comparing-objects-returns-false-even-if-they-are-identical)

## 类型

### 签名

```ts
shallow<T>(a: T, b: T): boolean
```

## 参考

### `shallow(a, b)`

#### 参数

- `a`: 第一个值。
- `b`: 第二个值。

#### 返回值

当 `a` 和 `b` 基于浅比较的 **顶层** 属性相等时，`shallow` 返回 `true`。否则，它应返回 `false`。

## 用法

### 比较原始值

当比较 `string`、`number`、`boolean` 和 `BigInt` 等原始值时，如果值相同，`Object.is` 和 `shallow` 函数都返回 `true`。这是因为原始值是通过它们的实际值而不是引用进行比较的。

```ts
const stringLeft = 'John Doe'
const stringRight = 'John Doe'

Object.is(stringLeft, stringRight) // -> true
shallow(stringLeft, stringRight) // -> true

const numberLeft = 10
const numberRight = 10

Object.is(numberLeft, numberRight) // -> true
shallow(numberLeft, numberRight) // -> true

const booleanLeft = true
const booleanRight = true

Object.is(booleanLeft, booleanRight) // -> true
shallow(booleanLeft, booleanRight) // -> true

const bigIntLeft = 1n
const bigIntRight = 1n

Object.is(bigIntLeft, bigIntRight) // -> true
shallow(bigIntLeft, bigIntRight) // -> true
```

### 比较对象

当比较对象时，理解 `Object.is` 和 `shallow` 函数的操作方式非常重要，因为它们处理比较的方式不同。

`shallow` 函数返回 `true`，因为 shallow 执行对象的浅比较。它检查顶层属性及其值是否相同。在这种情况下，`objectLeft` 和 `objectRight` 之间的顶层属性（`firstName`、`lastName` 和 `age`）及其值是相同的，因此 shallow 认为它们是相等的。

```ts
const objectLeft = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
}
const objectRight = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
}

Object.is(objectLeft, objectRight) // -> false
shallow(objectLeft, objectRight) // -> true
```

### 比较集合

当比较集合时，理解 `Object.is` 和 `shallow` 函数的操作方式非常重要，因为它们处理比较的方式不同。

`shallow` 函数返回 `true`，因为 shallow 执行集合的浅比较。它检查顶层属性（在这种情况下是集合本身）是否相同。由于 `setLeft` 和 `setRight` 都是 Set 对象的实例并包含相同的元素，因此 shallow 认为它们是相等的。

```ts
const setLeft = new Set([1, 2, 3])
const setRight = new Set([1, 2, 3])

Object.is(setLeft, setRight) // -> false
shallow(setLeft, setRight) // -> true
```

### 比较映射

当比较映射时，理解 `Object.is` 和 `shallow` 函数的操作方式非常重要，因为它们处理比较的方式不同。

`shallow` 返回 `true`，因为 shallow 执行映射的浅比较。它检查顶层属性（在这种情况下是映射本身）是否相同。由于 `mapLeft` 和 `mapRight` 都是 Map 对象的实例并包含相同的键值对，因此 shallow 认为它们是相等的。

```ts
const mapLeft = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
])
const mapRight = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
])

Object.is(mapLeft, mapRight) // -> false
shallow(mapLeft, mapRight) // -> true
```

## 故障排除

### 比较对象即使相同也返回 `false`

`shallow` 函数执行浅比较。浅比较检查两个对象的顶层属性是否相等。它不检查嵌套对象或深层嵌套属性。换句话说，它只比较属性的引用。

在以下示例中，shallow 函数返回 `false`，因为它只比较顶层属性及其引用。两个对象中的 address 属性是一个嵌套对象，即使它们的内容相同，它们的引用也是不同的。因此，shallow 认为它们是不同的，结果为 `false`。

```ts
const objectLeft = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: {
      lat: '-37.3159',
      lng: '81.1496',
    },
  },
}
const objectRight = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: {
      lat: '-37.3159',
      lng: '81.1496',
    },
  },
}

Object.is(objectLeft, objectRight) // -> false
shallow(objectLeft, objectRight) // -> false
```

如果我们移除 `address` 属性，浅比较将按预期工作，因为所有顶层属性将是原始值或引用相同的值：

```ts
const objectLeft = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
}
const objectRight = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
}

Object.is(objectLeft, objectRight) // -> false
shallow(objectLeft, objectRight) // -> true
```

在这个修改后的示例中，`objectLeft` 和 `objectRight` 具有相同的顶层属性和原始值。由于 `shallow` 函数只比较顶层属性，它将返回 `true`，因为两个对象中的原始值（`firstName`、`lastName` 和 `age`）是相同的。
