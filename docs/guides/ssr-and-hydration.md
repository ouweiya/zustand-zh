---
title: 服务器端渲染和注水
nav: 20
---

## 服务器端渲染 (SSR) {#server-side-rendering-(ssr)}

服务器端渲染 (SSR) 是一种技术，它帮助我们在服务器上将组件渲染成 HTML 字符串，直接发送到浏览器，最后在客户端将静态标记"注水"成一个完全交互式的应用。

### React {#react}

假设我们想要使用 React 渲染一个无状态的应用。为了做到这一点，我们需要使用 `express`，`react` 和 `react-dom/server`。由于它是一个无状态的应用，我们不需要 `react-dom/client`。

让我们深入了解一下：

- `express` 帮助我们构建一个可以使用 Node 运行的 web 应用，
- `react` 帮助我们构建应用中使用的 UI 组件，
- `react-dom/server` 帮助我们在服务器上渲染组件。

```json
// tsconfig.json
{
    "compilerOptions": {
        "noImplicitAny": false,
        "noEmitOnError": true,
        "removeComments": false,
        "sourceMap": true,
        "target": "esnext"
    },
    "include": ["**/*"]
}
```

> **注意：**不要忘记从你的 `tsconfig.json` 文件中删除所有注释。

```tsx
// app.tsx
export const App = () => {
    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>静态服务器端渲染应用</title>
            </head>
            <body>
                <div>你好，世界！</div>
            </body>
        </html>
    )
}
```

```tsx
// server.tsx
import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

import { App } from './app.tsx'

const port = Number.parseInt(process.env.PORT || '3000', 10)
const app = express()

app.get('/', (_, res) => {
    const { pipe } = ReactDOMServer.renderToPipeableStream(<App />, {
        onShellReady() {
            res.setHeader('content-type', 'text/html')
            pipe(res)
        },
    })
})

app.listen(port, () => {
    console.log(`服务器正在监听 ${port} 端口`)
})
```

```sh
tsc --build
```

```sh
node server.js
```

## 注水 {#hydration}

注水将服务器的初始 HTML 快照转换为在浏览器中运行的完全交互式应用。"注水"组件的正确方式是使用 `hydrateRoot`。

### React {#react}

假设我们想要使用 React 渲染一个有状态的应用。为了做到这一点，我们需要使用 `express`，`react`，`react-dom/server` 和 `react-dom/client`。

让我们深入了解一下：

- `express` 帮助我们构建一个可以使用 Node 运行的 web 应用，
- `react` 帮助我们构建应用中使用的 UI 组件，
- `react-dom/server` 帮助我们在服务器上渲染组件，
- `react-dom/client` 帮助我们在客户端注水我们的组件。

> **注意：**即使我们可以在服务器上渲染我们的组件，但是在客户端"注水"它们以使它们交互式是非常重要的。

```json
// tsconfig.json
{
  "compilerOptions": {
    "noImplicitAny": false,
    "noEmitOnError": true,
    "removeComments": false,
    "sourceMap": true,
    "target": "esnext"
  },
  "include": ["**/*"]
}
```

> **注意：**不要忘记从你的 `tsconfig.json` 文件中删除所有注释。

```tsx
// app.tsx
export const App = () => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Static Server-side-rendered App</title>
      </head>
      <body>
        <div>Hello World!</div>
      </body>
    </html>
  )
}
```

```tsx
// main.tsx
import ReactDOMClient from 'react-dom/client'

import { App } from './app.tsx'

ReactDOMClient.hydrateRoot(<App />, document)
```

```tsx
// server.tsx
import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

import { App } from './app.tsx'

const port = Number.parseInt(process.env.PORT || '3000', 10)
const app = express()

app.use('/', (_, res) => {
  const { pipe } = ReactDOMServer.renderToPipeableStream(<App />, {
    bootstrapScripts: ['/main.js'],
    onShellReady() {
      res.setHeader('content-type', 'text/html')
      pipe(res)
    },
  })
})

app.listen(port, () => {
  console.log(`Server is listening at ${port}`)
})
```

```sh
tsc --build
```

```sh
node server.js
```

> **警告：**你传递给 `hydrateRoot` 的 React 树需要产生与服务器上相同的输出。
> 导致注水错误的最常见原因包括：
>
> - 根节点内部 React 生成的 HTML 周围有额外的空白（如换行）。
> - 在你的渲染逻辑中使用诸如 typeof window !== 'undefined' 的检查。
> - 在你的渲染逻辑中使用仅浏览器可用的 API，如 `window.matchMedia`。
> - 在服务器和客户端上渲染不同的数据。
>
> React 可以从一些注水错误中恢复，但你必须像处理其他 bug 一样修复它们。在最好的情况下，它们会导致速度变慢；在最坏的情况下，事件处理器可能会附加到错误的元素上。

你可以在这里阅读更多关于注意事项和陷阱的信息：[hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot)
