---
title: '教程：井字棋'
description: 构建一个游戏
nav: 0
---

# 教程：井字棋

## 构建一个游戏

在本教程中，您将构建一个小型的井字棋游戏。本教程假设您已有 React 知识。您将在教程中学习到的技术是构建任何 React 应用的基础，完全理解它将使您对 React 和 Zustand 有深入的了解。

> [!NOTE]
> 本教程专为那些通过动手实践学习效果最好并希望快速创建一些具体内容的人设计。它借鉴了 React 的井字棋教程。

本教程分为几个部分：

- 教程设置将为您提供一个开始点，以便您可以跟随教程。
- 概述将教您 React 的基础知识：组件、props 和状态。
- 完成游戏将教您 React 开发中最常见的技术。
- 添加时间旅行将使您深入了解 React 的独特优势。

### 您将构建什么？

在本教程中，您将使用 React 和 Zustand 构建一个交互式的井字棋游戏。

您可以在这里看到完成后的样子：

```jsx
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const useGameStore = create(
  combine(
    {
      history: [Array(9).fill(null)],
      currentMove: 0,
    },
    (set, get) => {
      return {
        setHistory: (nextHistory) => {
          set((state) => ({
            history:
              typeof nextHistory === 'function'
                ? nextHistory(state.history)
                : nextHistory,
          }))
        },
        setCurrentMove: (nextCurrentMove) => {
          set((state) => ({
            currentMove:
              typeof nextCurrentMove === 'function'
                ? nextCurrentMove(state.currentMove)
                : nextCurrentMove,
          }))
        },
      }
    },
  ),
)

function Square({ value, onSquareClick }) {
  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        backgroundColor: '#fff',
        border: '1px solid #999',
        outline: 0,
        borderRadius: 0,
        fontSize: '1rem',
        fontWeight: 'bold',
      }}
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}

function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares)
  const turns = calculateTurns(squares)
  const player = xIsNext ? 'X' : 'O'
  const status = calculateStatus(winner, turns, player)

  function handleClick(i) {
    if (squares[i] || winner) return
    const nextSquares = squares.slice()
    nextSquares[i] = player
    onPlay(nextSquares)
  }

  return (
    <>
      <div style={{ marginBottom: '0.5rem' }}>{status}</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          width: 'calc(3 * 2.5rem)',
          height: 'calc(3 * 2.5rem)',
          border: '1px solid #999',
        }}
      >
        {squares.map((_, i) => (
          <Square
            key={`square-${i}`}
            value={squares[i]}
            onSquareClick={() => handleClick(i)}
          />
        ))}
      </div>
    </>
  )
}

export default function Game() {
  const { history, setHistory, currentMove, setCurrentMove } = useGameStore()
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        fontFamily: 'monospace',
      }}
    >
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div style={{ marginLeft: '1rem' }}>
        <ol>
          {history.map((_, historyIndex) => {
            const description =
              historyIndex > 0
                ? `Go to move #${historyIndex}`
                : 'Go to game start'

            return (
              <li key={historyIndex}>
                <button onClick={() => jumpTo(historyIndex)}>
                  {description}
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null
}

function calculateTurns(squares) {
  return squares.filter((square) => !square).length
}

function calculateStatus(winner, turns, player) {
  if (!winner && !turns) return 'Draw'
  if (winner) return `Winner ${winner}`
  return `Next player: ${player}`
}
```

### 构建棋盘

让我们从创建 `Square` 组件开始，它将是我们 `Board` 组件的构建块。这个组件将代表我们游戏中的每个方格。

`Square` 组件应该接受 `value` 和 `onSquareClick` 作为 props。它应该返回一个 `<button>` 元素，样式看起来像一个方格。按钮显示 value prop，根据游戏状态可以是 `'X'`、`'O'` 或 `null`。当按钮被点击时，它会触发传入的 `onSquareClick` 函数，使游戏能够响应用户输入。

以下是 `Square` 组件的代码：

```tsx
function Square({ value, onSquareClick }) {
  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        backgroundColor: '#fff',
        border: '1px solid #999',
        outline: 0,
        borderRadius: 0,
        fontSize: '1rem',
        fontWeight: 'bold',
      }}
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}
```

接下来，让我们创建 `Board` 组件，它将由 9 个方格组成，排列成一个网格。这个组件将作为我们游戏的主要游戏区。

`Board` 组件应该返回一个样式为网格的 `<div>` 元素。网格布局是使用 CSS Grid 实现的，有三列和三行，每列和每行占用相等的空间。网格的整体大小由宽度和高度属性决定，确保它是正方形且大小合适。

在网格内，我们放置了九个 `Square` 组件，每个组件都有一个表示其位置的 value prop。这些 `Square` 组件最终将包含游戏符号（`'X'` 或 `'O'`）并处理用户交互。

以下是 `Board` 组件的代码：

```tsx
export default function Board() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        width: 'calc(3 * 2.5rem)',
        height: 'calc(3 * 2.5rem)',
        border: '1px solid #999',
      }}
    >
      <Square value="1" />
      <Square value="2" />
      <Square value="3" />
      <Square value="4" />
      <Square value="5" />
      <Square value="6" />
      <Square value="7" />
      <Square value="8" />
      <Square value="9" />
    </div>
  )
}
```

这个 `Board` 组件通过将九个方格排列成 3x3 的网格来设置我们的游戏棋盘的基本结构。它将方格整齐地排列，为添加更多功能和处理玩家交互提供了基础。

### 状态提升

每个 `Square` 组件可以维护游戏状态的一部分。要检查井字棋游戏中的赢家，`Board` 组件需要以某种方式知道 9 个 `Square` 组件的状态。

您会如何处理这个问题？起初，您可能会猜测 `Board` 组件需要向每个 `Square` 组件询问该 `Square` 的组件状态。虽然这种方法在 React 中是技术上可行的，但我们不鼓励这样做，因为代码会变得难以理解，容易出错，并且难以重构。相反，最好的方法是将游戏状态存储在父 `Board` 组件中，而不是在每个 `Square` 组件中。`Board` 组件可以通过传递一个 prop 告诉每个 `Square` 组件显示什么，就像您传递一个数字给每个 `Square` 组件一样。

> [!IMPORTANT]
> 要从多个子组件收集数据，或者让两个或多个子组件相互通信，请在它们的父组件中声明共享状态。父组件可以通过 props 将该状态传递回子组件。这使得子组件与彼此以及它们的父组件保持同步。

让我们借此机会试一试。编辑 `Board` 组件，使其声明一个名为 squares 的状态变量，默认值为一个包含 9 个 null 的数组：

```tsx
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const useGameStore = create(
  combine({ squares: Array(9).fill(null) }, (set) => {
    return {
      setSquares: (nextSquares) => {
        set((state) => ({
          squares:
            typeof nextSquares === 'function'
              ? nextSquares(state.squares)
              : nextSquares,
        }))
      },
    }
  }),
)

export default function Board() {
  const [squares, setSquares] = useGameStore((state) => [
    state.squares,
    state.setSquares,
  ])

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        width: 'calc(3 * 2.5rem)',
        height: 'calc(3 * 2.5rem)',
        border: '1px solid #999',
      }}
    >
      {squares.map((square, squareIndex) => (
        <Square key={squareIndex} value={square} />
      ))}
    </div>
  )
}
```

`Array(9).fill(null)` 创建一个包含九个元素的数组，并将每个元素设置为 `null`。`useGameStore` 声明一个初始设置为该数组的 `squares` 状态。数组中的每个条目对应一个方格的值。当您稍后填充棋盘时，squares 数组将如下所示：

```ts
const squares = ['O', null, 'X', 'X', 'X', 'O', 'O', null, null]
```

每个 `Square` 现在将接收一个 `value` prop，该 prop 将是 `'X'`、`'O'` 或 `null`（表示空方格）。

接下来，您需要更改当 `Square` 组件被点击时发生的事情。`Board` 组件现在维护哪些方格已被填充。您需要创建一种方法，使 `Square` 组件能够更新 `Board` 的组件状态。由于状态是定义它的组件的私有属性，您不能直接从 `Square` 组件更新 `Board` 的组件状态。

相反，您将从 `Board` 组件向 `Square` 组件传递一个函数，并让 `Square` 组件在方格被点击时调用该函数。您将从 `Square` 组件在被点击时调用的函数开始。您将调用该函数 `onSquareClick`：

现在，您将 `onSquareClick` prop 连接到 `Board` 组件中的一个名为 `handleClick` 的函数。要将 `onSquareClick` 连接到 `handleClick`，您将向第一个 `Square` 组件的 `onSquareClick` prop 传递一个内联函数：

```tsx
<Square key={squareIndex} value={square} onSquareClick={() => handleClick(i)} />
```

最后，您将在 `Board` 组件中定义 `handleClick` 函数，以更新保存棋盘状态的 squares 数组。

`handleClick` 函数应接受要更新的方格的索引，并创建 squares 数组的副本（`nextSquares`）。然后，`handleClick` 更新 `nextSquares` 数组，在指定索引（`i`）处添加 `X`，如果该方格尚未填充。

```tsx {7-12,29}
export default function Board() {
  const [squares, setSquares] = useGameStore((state) => [
    state.squares,
    state.setSquares,
  ])

  function handleClick(i) {
    if (squares[i]) return
    const nextSquares = squares.slice()
    nextSquares[i] = 'X'
    setSquares(nextSquares)
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        width: 'calc(3 * 2.5rem)',
        height: 'calc(3 * 2.5rem)',
        border: '1px solid #999',
      }}
    >
      {squares.map((square, squareIndex) => (
        <Square
          key={squareIndex}
          value={square}
          onSquareClick={() => handleClick(squareIndex)}
        />
      ))}
    </div>
  )
}
```

> [!IMPORTANT]
> 注意在 `handleClick` 函数中，您调用 `.slice()` 来创建 squares 数组的副本，而不是修改现有数组。

### 轮流

现在是时候修复这个井字棋游戏中的一个主要缺陷了：`'O'` 不能在棋盘上使用。

您将默认设置第一步为 `'X'`。让我们通过向 `useGameStore` 钩子添加另一个状态来跟踪这一点：

```tsx {2,12-18}
const useGameStore = create(
  combine({ squares: Array(9).fill(null), xIsNext: true }, (set) => {
    return {
      setSquares: (nextSquares) => {
        set((state) => ({
          squares:
            typeof nextSquares === 'function'
              ? nextSquares(state.squares)
              : nextSquares,
        }))
      },
      setXIsNext: (nextXIsNext) => {
        set((state) => ({
          xIsNext:
            typeof nextXIsNext === 'function'
              ? nextXIsNext(state.xIsNext)
              : nextXIsNext,
        }))
      },
    }
  }),
)
```

每次玩家移动时，`xIsNext`（一个布尔值）将被翻转，以确定下一个玩家是谁，并保存游戏状态。您将更新 `Board` 的 `handleClick` 函数以翻转 `xIsNext` 的值：

```tsx {2-5,10,15}
export default function Board() {
  const [xIsNext, setXIsNext] = useGameStore((state) => [
    state.xIsNext,
    state.setXIsNext,
  ])
  const [squares, setSquares] = useGameStore((state) => [
    state.squares,
    state.setSquares,
  ])
  const player = xIsNext ? 'X' : 'O'

  function handleClick(i) {
    if (squares[i]) return
    const nextSquares = squares.slice()
    nextSquares[i] = player
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        width: 'calc(3 * 2.5rem)',
        height: 'calc(3 * 2.5rem)',
        border: '1px solid #999',
      }}
    >
      {squares.map((square, squareIndex) => (
        <Square
          key={squareIndex}
          value={square}
          onSquareClick={() => handleClick(squareIndex)}
        />
      ))}
    </div>
  )
}
```

### 宣布赢家或平局

现在玩家可以轮流了，您将希望在游戏获胜或平局且没有更多回合时显示结果。为此，您将添加三个辅助函数。第一个辅助函数名为 `calculateWinner`，它接受一个包含 9 个方格的数组，检查是否有赢家，并返回 `'X'`、`'O'` 或 `null`。第二个辅助函数名为 `calculateTurns`，它接受相同的数组，通过过滤出仅 `null` 项来检查剩余回合，并返回它们的数量。最后一个辅助函数名为 `calculateStatus`，它接受剩余回合、赢家和当前玩家（`'X'` 或 `'O'`）：

```ts
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null
}

function calculateTurns(squares) {
  return squares.filter((square) => !square).length
}

function calculateStatus(winner, turns, player) {
  if (!winner && !turns) return 'Draw'
  if (winner) return `Winner ${winner}`
  return `Next player: ${player}`
}
```

您将在 `Board` 组件的 `handleClick` 函数中使用 `calculateWinner(squares)` 的结果来检查是否有玩家获胜。您可以在检查用户是否点击了已经有 `'X'` 或 `'O'` 的方格时同时进行此检查。我们希望在这两种情况下尽早返回：

```ts {2}
function handleClick(i) {
  if (squares[i] || winner) return
  const nextSquares = squares.slice()
  nextSquares[i] = player'
  setSquares(nextSquares)
  setXIsNext(!xIsNext)
}
```

为了让玩家知道游戏何时结束，您可以显示诸如 `'Winner: X'` 或 `'Winner: O'` 的文本。为此，您将向 `Board` 组件添加一个 `status` 部分。状态将显示赢家或平局，如果游戏正在进行中，您将显示下一个玩家的回合：

```tsx {10-11,13,25}
export default function Board() {
  const [xIsNext, setXIsNext] = useGameStore((state) => [
    state.xIsNext,
    state.setXIsNext,
  ])
  const [squares, setSquares] = useGameStore((state) => [
    state.squares,
    state.setSquares,
  ])
  const winner = calculateWinner(squares)
  const turns = calculateTurns(squares)
  const player = xIsNext ? 'X' : 'O'
  const status = calculateStatus(winner, turns, player)

  function handleClick(i) {
    if (squares[i] || winner) return
    const nextSquares = squares.slice()
    nextSquares[i] = player
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  return (
    <>
      <div style={{ marginBottom: '0.5rem' }}>{status}</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          width: 'calc(3 * 2.5rem)',
          height: 'calc(3 * 2.5rem)',
          border: '1px solid #999',
        }}
      >
        {squares.map((square, squareIndex) => (
          <Square
            key={squareIndex}
            value={square}
            onSquareClick={() => handleClick(squareIndex)}
          />
        ))}
      </div>
    </>
  )
}
```

恭喜！您现在有一个可以正常工作的井字棋游戏。您还学习了 React 和 Zustand 的基础知识。所以您才是真正的赢家。以下是代码应有的样子：

```tsx
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const useGameStore = create(
  combine({ squares: Array(9).fill(null), xIsNext: true }, (set) => {
    return {
      setSquares: (nextSquares) => {
        set((state) => ({
          squares:
            typeof nextSquares === 'function'
              ? nextSquares(state.squares)
              : nextSquares,
        }))
      },
      setXIsNext: (nextXIsNext) => {
        set((state) => ({
          xIsNext:
            typeof nextXIsNext === 'function'
              ? nextXIsNext(state.xIsNext)
              : nextXIsNext,
        }))
      },
    }
  }),
)

function Square({ value, onSquareClick }) {
  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        backgroundColor: '#fff',
        border: '1px solid #999',
        outline: 0,
        borderRadius: 0,
        fontSize: '1rem',
        fontWeight: 'bold',
      }}
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}

export default function Board() {
  const [xIsNext, setXIsNext] = useGameStore((state) => [
    state.xIsNext,
    state.setXIsNext,
  ])
  const [squares, setSquares] = useGameStore((state) => [
    state.squares,
    state.setSquares,
  ])
  const winner = calculateWinner(squares)
  const turns = calculateTurns(squares)
  const player = xIsNext ? 'X' : 'O'
  const status = calculateStatus(winner, turns, player)

  function handleClick(i) {
    if (squares[i] || winner) return
    const nextSquares = squares.slice()
    nextSquares[i] = player
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  return (
    <>
      <div style={{ marginBottom: '0.5rem' }}>{status}</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          width: 'calc(3 * 2.5rem)',
          height: 'calc(3 * 2.5rem)',
          border: '1px solid #999',
        }}
      >
        {squares.map((square, squareIndex) => (
          <Square
            key={squareIndex}
            value={square}
            onSquareClick={() => handleClick(squareIndex)}
          />
        ))}
      </div>
    </>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null
}

function calculateTurns(squares) {
  return squares.filter((square) => !square).length
}

function calculateStatus(winner, turns, player) {
  if (!winner && !turns) return 'Draw'
  if (winner) return `Winner ${winner}`
  return `Next player: ${player}`
}
```

### 添加时间旅行

作为最后一个练习，让我们使其能够“回到过去”并重新查看游戏中的先前步骤。

如果您直接修改了 squares 数组，实现这个时间旅行功能将非常困难。然而，由于您使用 `slice()` 在每次移动后创建 squares 数组的新副本，将其视为不可变的，您可以存储 squares 数组的每个过去版本并在它们之间导航。

您将通过一个名为 `history` 的新状态变量来跟踪这些过去的 squares 数组。这个 `history` 数组将存储所有棋盘状态，从第一步到最新的一步，看起来像这样：

```ts
const history = [
  // 第一步
  [null, null, null, null, null, null, null, null, null],
  // 第二步
  ['X', null, null, null, null, null, null, null, null],
  // 第三步
  ['X', 'O', null, null, null, null, null, null, null],
  // 依此类推...
]
```

这种方法使您可以轻松地在不同的游戏状态之间导航并实现时间旅行功能。

### 再次提升状态

接下来，您将创建一个名为 `Game` 的新顶级组件，以显示过去的移动列表。这是您将存储包含整个游戏历史的 `history` 状态的地方。

通过将 `history` 状态放在 `Game` 组件中，您可以从 `Board` 组件中删除 `squares` 状态。您现在将状态从 `Board` 组件提升到顶级的 `Game` 组件。这一变化使 `Game` 组件能够完全控制 `Board` 的组件数据，并指示 `Board` 组件渲染 `history` 中的先前回合。

首先，添加一个带有 `export default` 的 `Game` 组件，并从 `Board` 组件中删除它。以下是代码应有的样子：

```tsx {1,48-65}
function Board() {
  const [xIsNext, setXIsNext] = useGameStore((state) => [
    state.xIsNext,
    state.setXIsNext,
  ])
  const [squares, setSquares] = useGameStore((state) => [
    state.squares,
    state.setSquares,
  ])
  const winner = calculateWinner(squares)
  const turns = calculateTurns(squares)
  const player = xIsNext ? 'X' : 'O'
  const status = calculateStatus(winner, turns, player)

  function handleClick(i) {
    if (squares[i] || winner) return
    const nextSquares = squares.slice()
    nextSquares[i] = player
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  return (
    <>
      <div style={{ marginBottom: '0.5rem' }}>{status}</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          width: 'calc(3 * 2.5rem)',
          height: 'calc(3 * 2.5rem)',
          border: '1px solid #999',
        }}
      >
        {squares.map((square, squareIndex) => (
          <Square
            key={squareIndex}
            value={square}
            onSquareClick={() => handleClick(squareIndex)}
          />
        ))}
      </div>
    </>
  )
}

export default function Game() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        fontFamily: 'monospace',
      }}
    >
      <div>
        <Board />
      </div>
      <div style={{ marginLeft: '1rem' }}>
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  )
}
```

向 `useGameStore` 钩子添加一些状态以跟踪移动的历史记录：

```ts {2,4-11}
const useGameStore = create(
  combine({ history: [Array(9).fill(null)], xIsNext: true }, (set) => {
    return {
      setHistory: (nextHistory) => {
        set((state) => ({
          history:
            typeof nextHistory === 'function'
              ? nextHistory(state.history)
              : nextHistory,
        }))
      },
      setXIsNext: (nextXIsNext) => {
        set((state) => ({
          xIsNext:
            typeof nextXIsNext === 'function'
              ? nextXIsNext(state.xIsNext)
              : nextXIsNext,
        }))
      },
    }
  }),
)
```

注意 `[Array(9).fill(null)]` 如何创建一个包含单个项目的数组，该项目本身是一个包含 9 个 null 值的数组。

要渲染当前移动的方格，您需要从 `history` 状态中读取最新的方格数组。您不需要为此额外的状态，因为您已经有足够的信息在渲染期间计算它：

```tsx {2-3}
export default function Game() {
  const { history, setHistory, xIsNext, setXIsNext } = useGameStore()
  const currentSquares = history[history.length - 1]

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        fontFamily: 'monospace',
      }}
    >
      <div>
        <Board />
      </div>
      <div style={{ marginLeft: '1rem' }}>
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  )
}
```

接下来，在 `Game` 组件中创建一个 `handlePlay` 函数，该函数将由 `Board` 组件调用以更新游戏。将 `xIsNext`、`currentSquares` 和 `handlePlay` 作为 props 传递给 `Board` 组件：

```tsx {5-7,18}
export default function Game() {
  const { history, setHistory, xIsNext, setXIsNext } = useGameStore()
  const currentSquares = history[history.length - 1]

  function handlePlay(nextSquares) {
    // TODO
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        fontFamily: 'monospace',
      }}
    >
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div style={{ marginLeft: '1rem' }}>
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  )
}
```

让我们使 `Board` 组件完全由其接收的 props 控制。为此，我们将修改 `Board` 组件以接受三个 props：`xIsNext`、`squares` 和一个新的 `onPlay` 函数，当玩家进行移动时，`Board` 组件可以调用该函数并传递更新后的方格数组。

```tsx {1}
function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares)
  const turns = calculateTurns(squares)
  const player = xIsNext ? 'X' : 'O'
  const status = calculateStatus(winner, turns, player)

  function handleClick(i) {
    if (squares[i] || winner) return
    const nextSquares = squares.slice()
    nextSquares[i] = player
    setSquares(nextSquares)
  }

  return (
    <>
      <div style={{ marginBottom: '0.5rem' }}>{status}</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          width: 'calc(3 * 2.5rem)',
          height: 'calc(3 * 2.5rem)',
          border: '1px solid #999',
        }}
      >
        {squares.map((square, squareIndex) => (
          <Square
            key={squareIndex}
            value={square}
            onSquareClick={() => handleClick(squareIndex)}
          />
        ))}
      </div>
    </>
  )
}
```

`Board` 组件现在完全由 `Game` 组件传递给它的 props 控制。要使游戏再次正常工作，您需要在 `Game` 组件中实现 `handlePlay` 函数。

当 `handlePlay` 被调用时，它应该做什么？以前，`Board` 组件使用更新后的数组调用 `setSquares`；现在它将更新后的方格数组传递给 `onPlay`。

`handlePlay` 函数需要更新 `Game` 组件的状态以触发重新渲染。您将更新 `history` 状态变量，通过将更新后的方格数组作为新的 `history` 条目附加，而不是使用 `setSquares`。您还需要像 `Board` 组件以前那样切换 `xIsNext`。

```ts {2-3}
function handlePlay(nextSquares) {
  setHistory(history.concat([nextSquares]))
  setXIsNext(!xIsNext)
}
```

此时，您已将状态移至 `Game` 组件，并且 UI 应该完全正常工作，就像重构之前一样。以下是此时代码应有的样子：

```tsx
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const useGameStore = create(
  combine({ history: [Array(9).fill(null)], xIsNext: true }, (set) => {
    return {
      setHistory: (nextHistory) => {
        set((state) => ({
          history:
            typeof nextHistory === 'function'
              ? nextHistory(state.history)
              : nextHistory,
        }))
      },
      setXIsNext: (nextXIsNext) => {
        set((state) => ({
          xIsNext:
            typeof nextXIsNext === 'function'
              ? nextXIsNext(state.xIsNext)
              : nextXIsNext,
        }))
      },
    }
  }),
)

function Square({ value, onSquareClick }) {
  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        backgroundColor: '#fff',
        border: '1px solid #999',
        outline: 0,
        borderRadius: 0,
        fontSize: '1rem',
        fontWeight: 'bold',
      }}
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}

function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares)
  const turns = calculateTurns(squares)
  const player = xIsNext ? 'X' : 'O'
  const status = calculateStatus(winner, turns, player)

  function handleClick(i) {
    if (squares[i] || winner) return
    const nextSquares = squares.slice()
    nextSquares[i] = player
    onPlay(nextSquares)
  }

  return (
    <>
      <div style={{ marginBottom: '0.5rem' }}>{status}</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          width: 'calc(3 * 2.5rem)',
          height: 'calc(3 * 2.5rem)',
          border: '1px solid #999',
        }}
      >
        {squares.map((square, squareIndex) => (
          <Square
            key={squareIndex}
            value={square}
            onSquareClick={() => handleClick(squareIndex)}
          />
        ))}
      </div>
    </>
  )
}

export default function Game() {
  const { history, setHistory, xIsNext, setXIsNext } = useGameStore()
  const currentSquares = history[history.length - 1]

  function handlePlay(nextSquares) {
    setHistory(history.concat([nextSquares]))
    setXIsNext(!xIsNext)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        fontFamily: 'monospace',
      }}
    >
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div style={{ marginLeft: '1rem' }}>
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null
}

function calculateTurns(squares) {
  return squares.filter((square) => !square).length
}

function calculateStatus(winner, turns, player) {
  if (!winner && !turns) return 'Draw'
  if (winner) return `Winner ${winner}`
  return `Next player: ${player}`
}
```

### 显示过去的移动

由于您正在记录井字棋游戏的历史记录，您现在可以向玩家显示过去移动的列表。

您已经在存储中有一个 `history` 移动数组，因此现在您需要将其转换为 React 元素数组。在 JavaScript 中，要将一个数组转换为另一个数组，您可以使用 Array `.map()` 方法：

您将使用 `map` 将您的 `history` 移动转换为表示屏幕上按钮的 React 元素，并显示一个按钮列表以**跳转**到过去的移动。让我们在 `Game` 组件中 `map` 遍历 `history`：

```tsx {26-41}
export default function Game() {
  const { history, setHistory, xIsNext, setXIsNext } = useGameStore()
  const currentSquares = history[history.length - 1]

  function handlePlay(nextSquares) {
    setHistory(history.concat([nextSquares]))
    setXIsNext(!xIsNext)
  }

  function jumpTo(nextMove) {
    // TODO
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        fontFamily: 'monospace',
      }}
    >
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div style={{ marginLeft: '1rem' }}>
        <ol>
          {history.map((_, historyIndex) => {
            const description =
              historyIndex > 0
                ? `Go to move #${historyIndex}`
                : 'Go to game start'

            return (
              <li key={historyIndex}>
                <button onClick={() => jumpTo(historyIndex)}>
                  {description}
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
```

在实现 `jumpTo` 函数之前，您需要 `Game` 组件跟踪用户当前正在查看的步骤。为此，定义一个名为 `currentMove` 的新状态变量，该变量将从 `0` 开始：

```ts {3,14-21}
const useGameStore = create(
  combine(
    { history: [Array(9).fill(null)], currentMove: 0, xIsNext: true },
    (set) => {
      return {
        setHistory: (nextHistory) => {
          set((state) => ({
            history:
              typeof nextHistory === 'function'
                ? nextHistory(state.history)
                : nextHistory,
          }))
        },
        setCurrentMove: (nextCurrentMove) => {
          set((state) => ({
            currentMove:
              typeof nextCurrentMove === 'function'
                ? nextCurrentMove(state.currentMove)
                : nextCurrentMove,
          }))
        },
        setXIsNext: (nextXIsNext) => {
          set((state) => ({
            xIsNext:
              typeof nextXIsNext === 'function'
                ? nextXIsNext(state.xIsNext)
                : nextXIsNext,
          }))
        },
      }
    },
  ),
)
```

接下来，更新 `Game` 组件中的 `jumpTo` 函数以更新 `currentMove`。如果您要更改 `currentMove` 的数字是偶数，您还需要将 `xIsNext` 设置为 `true`。

```ts {2-3}
function jumpTo(nextMove) {
  setCurrentMove(nextMove)
  setXIsNext(currentMove % 2 === 0)
}
```

您现在将对 `Game` 组件中的 `handlePlay` 函数进行两项更改，当您点击一个方格时会调用该函数。

- 如果您“回到过去”然后从该点进行新的移动，您只希望保留历史记录到该点。您将 `nextSquares` 添加到 `history.slice(0, currentMove + 1)` 之后的所有项目中，而不是使用 Array `.concat()` 方法将其添加到所有历史记录项目之后。
- 每次进行移动时，您需要更新 `currentMove` 以指向最新的历史记录条目。

```ts {2-4}
function handlePlay(nextSquares) {
  const nextHistory = history.slice(0, currentMove + 1).concat([nextSquares])
  setHistory(nextHistory)
  setCurrentMove(nextHistory.length - 1)
  setXIsNext(!xIsNext)
}
```

最后，您将修改 `Game` 组件以渲染当前选择的移动，而不是始终渲染最终移动：

```tsx {2-10}
export default function Game() {
  const {
    history,
    setHistory,
    currentMove,
    setCurrentMove,
    xIsNext,
    setXIsNext,
  } = useGameStore()
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    const nextHistory = history.slice(0, currentMove + 1).concat([nextSquares])
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
    setXIsNext(!xIsNext)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
    setXIsNext(currentMove % 2 === 0)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        fontFamily: 'monospace',
      }}
    >
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div style={{ marginLeft: '1rem' }}>
        <ol>
          {history.map((_, historyIndex) => {
            const description =
              historyIndex > 0
                ? `Go to move #${historyIndex}`
                : 'Go to game start'

            return (
              <li key={historyIndex}>
                <button onClick={() => jumpTo(historyIndex)}>
                  {description}
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
```

### 最后的清理

如果您仔细查看代码，您会发现 `xIsNext` 在 `currentMove` 为偶数时为 `true`，在 `currentMove` 为奇数时为 `false`。这意味着如果您知道 `currentMove` 的值，您总是可以确定 `xIsNext` 应该是什么。

没有必要在状态中单独存储 `xIsNext`。最好避免冗余状态，因为它可以减少错误并使代码更易于理解。相反，您可以根据 `currentMove` 计算 `xIsNext`：

```tsx {2,10,14}
export default function Game() {
  const { history, setHistory, currentMove, setCurrentMove } = useGameStore()
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    const nextHistory = history.slice(0, currentMove + 1).concat([nextSquares])
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        fontFamily: 'monospace',
      }}
    >
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div style={{ marginLeft: '1rem' }}>
        <ol>
          {history.map((_, historyIndex) => {
            const description =
              historyIndex > 0
                ? `Go to move #${historyIndex}`
                : 'Go to game start'

            return (
              <li key={historyIndex}>
                <button onClick={() => jumpTo(historyIndex)}>
                  {description}
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
```

您不再需要 `xIsNext` 状态声明或对 `setXIsNext` 的调用。现在，即使您在编写组件时出错，`xIsNext` 也不会与 `currentMove` 同步。

### 总结

恭喜！您已经创建了一个井字棋游戏，该游戏：

- 允许您玩井字棋，
- 指示玩家何时赢得游戏或平局，
- 随着游戏的进行存储游戏的历史记录，
- 允许玩家查看游戏的历史记录并查看游戏棋盘的先前版本。

干得好！我们希望您现在对 React 和 Zustand 的工作原理有了一个不错的理解。
