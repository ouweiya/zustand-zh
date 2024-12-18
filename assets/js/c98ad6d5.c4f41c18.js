"use strict";(self.webpackChunkzustand_zh=self.webpackChunkzustand_zh||[]).push([[4921],{2925:(n,t,e)=>{e.r(t),e.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>d,frontMatter:()=>i,metadata:()=>o,toc:()=>l});const o=JSON.parse('{"id":"hooks/use-store-with-equality-fn","title":"useStoreWithEqualityFn \u269b\ufe0f","description":"\u5982\u4f55\u5728 React \u4e2d\u6709\u6548\u5730\u4f7f\u7528 vanilla stores","source":"@site/docs/hooks/use-store-with-equality-fn.md","sourceDirName":"hooks","slug":"/hooks/use-store-with-equality-fn","permalink":"/zustand-zh/docs/hooks/use-store-with-equality-fn","draft":false,"unlisted":false,"editUrl":"https://github.com/ouweiya/zustand-zh/blob/master/docs/hooks/use-store-with-equality-fn.md","tags":[],"version":"current","frontMatter":{"title":"useStoreWithEqualityFn \u269b\ufe0f","description":"\u5982\u4f55\u5728 React \u4e2d\u6709\u6548\u5730\u4f7f\u7528 vanilla stores","nav":29},"sidebar":"tutorialSidebar","previous":{"title":"useShallow \u269b\ufe0f","permalink":"/zustand-zh/docs/hooks/use-shallow"},"next":{"title":"useStore \u269b\ufe0f","permalink":"/zustand-zh/docs/hooks/use-store"}}');var r=e(4848),s=e(8453);const i={title:"useStoreWithEqualityFn \u269b\ufe0f",description:"\u5982\u4f55\u5728 React \u4e2d\u6709\u6548\u5730\u4f7f\u7528 vanilla stores",nav:29},a=void 0,c={},l=[{value:"\u7b7e\u540d",id:"\u7b7e\u540d",level:3},{value:"\u53c2\u8003",id:"\u53c2\u8003",level:2},{value:"<code>useStoreWithEqualityFn(store, selectorFn, equalityFn)</code>",id:"usestorewithequalityfnstore-selectorfn-equalityfn",level:3},{value:"\u53c2\u6570",id:"\u53c2\u6570",level:4},{value:"\u8fd4\u56de\u503c",id:"\u8fd4\u56de\u503c",level:4},{value:"\u7528\u6cd5",id:"\u7528\u6cd5",level:2},{value:"\u5728 React \u4e2d\u4f7f\u7528\u5168\u5c40 vanilla store",id:"\u5728-react-\u4e2d\u4f7f\u7528\u5168\u5c40-vanilla-store",level:3},{value:"\u5728 React \u4e2d\u4f7f\u7528\u52a8\u6001\u5168\u5c40 vanilla store",id:"\u5728-react-\u4e2d\u4f7f\u7528\u52a8\u6001\u5168\u5c40-vanilla-store",level:3},{value:"\u5728 React \u4e2d\u4f7f\u7528\u4f5c\u7528\u57df\uff08\u975e\u5168\u5c40\uff09vanilla store",id:"\u5728-react-\u4e2d\u4f7f\u7528\u4f5c\u7528\u57df\u975e\u5168\u5c40vanilla-store",level:3},{value:"\u5728 React \u4e2d\u4f7f\u7528\u52a8\u6001\u4f5c\u7528\u57df\uff08\u975e\u5168\u5c40\uff09vanilla store",id:"\u5728-react-\u4e2d\u4f7f\u7528\u52a8\u6001\u4f5c\u7528\u57df\u975e\u5168\u5c40vanilla-store",level:3},{value:"\u6545\u969c\u6392\u9664",id:"\u6545\u969c\u6392\u9664",level:2}];function u(n){const t={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:"useStoreWithEqualityFn"})," \u662f\u4e00\u4e2a React Hook\uff0c\u5b83\u5141\u8bb8\u4f60\u5728 React \u4e2d\u4f7f\u7528 vanilla store\uff0c\u5c31\u50cf ",(0,r.jsx)(t.code,{children:"useStore"})," \u4e00\u6837\u3002\u7136\u800c\uff0c\u5b83\u63d0\u4f9b\u4e86\u4e00\u79cd\u5b9a\u4e49\u81ea\u5b9a\u4e49\u76f8\u7b49\u6027\u68c0\u67e5\u7684\u65b9\u6cd5\u3002\u8fd9\u5141\u8bb8\u5bf9\u7ec4\u4ef6\u91cd\u65b0\u6e32\u67d3\u8fdb\u884c\u66f4\u7ec6\u7c92\u5ea6\u7684\u63a7\u5236\uff0c\u4ece\u800c\u63d0\u9ad8\u6027\u80fd\u548c\u54cd\u5e94\u901f\u5ea6\u3002"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-js",children:"const someState = useStoreWithEqualityFn(store, selectorFn, equalityFn)\n"})}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:"#%E7%B1%BB%E5%9E%8B",children:"\u7c7b\u578b"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"#%E7%AD%BE%E5%90%8D",children:"\u7b7e\u540d"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"#%E5%8F%82%E8%80%83",children:"\u53c2\u8003"})}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:"#%E7%94%A8%E6%B3%95",children:"\u7528\u6cd5"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"#%E5%9C%A8-react-%E4%B8%AD%E4%BD%BF%E7%94%A8%E5%85%A8%E5%B1%80-vanilla-store",children:"\u5728 React \u4e2d\u4f7f\u7528\u5168\u5c40 vanilla store"})}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"#%E5%9C%A8-react-%E4%B8%AD%E4%BD%BF%E7%94%A8%E5%8A%A8%E6%80%81%E5%85%A8%E5%B1%80-vanilla-store",children:"\u5728 React \u4e2d\u4f7f\u7528\u52a8\u6001\u5168\u5c40 vanilla store"})}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"#%E5%9C%A8-react-%E4%B8%AD%E4%BD%BF%E7%94%A8%E4%BD%9C%E7%94%A8%E5%9F%9F%E9%9D%9E%E5%85%A8%E5%B1%80vanilla-store",children:"\u5728 React \u4e2d\u4f7f\u7528\u4f5c\u7528\u57df\uff08\u975e\u5168\u5c40\uff09vanilla store"})}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"#%E5%9C%A8-react-%E4%B8%AD%E4%BD%BF%E7%94%A8%E5%8A%A8%E6%80%81%E4%BD%9C%E7%94%A8%E5%9F%9F%E9%9D%9E%E5%85%A8%E5%B1%80vanilla-store",children:"\u5728 React \u4e2d\u4f7f\u7528\u52a8\u6001\u4f5c\u7528\u57df\uff08\u975e\u5168\u5c40\uff09vanilla store"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"#%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4",children:"\u6545\u969c\u6392\u9664"})}),"\n"]}),"\n",(0,r.jsx)(t.h3,{id:"\u7b7e\u540d",children:"\u7b7e\u540d"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",children:"useStoreWithEqualityFn<T, U = T>(store: StoreApi<T>, selectorFn: (state: T) => U, equalityFn?: (a: T, b: T) => boolean): U\n"})}),"\n",(0,r.jsx)(t.h2,{id:"\u53c2\u8003",children:"\u53c2\u8003"}),"\n",(0,r.jsx)(t.h3,{id:"usestorewithequalityfnstore-selectorfn-equalityfn",children:(0,r.jsx)(t.code,{children:"useStoreWithEqualityFn(store, selectorFn, equalityFn)"})}),"\n",(0,r.jsx)(t.h4,{id:"\u53c2\u6570",children:"\u53c2\u6570"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"storeApi"}),": \u5141\u8bb8\u4f60\u8bbf\u95ee store API \u5b9e\u7528\u7a0b\u5e8f\u7684\u5b9e\u4f8b\u3002"]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"selectorFn"}),": \u4e00\u4e2a\u51fd\u6570\uff0c\u5141\u8bb8\u4f60\u8fd4\u56de\u57fa\u4e8e\u5f53\u524d\u72b6\u6001\u7684\u6570\u636e\u3002"]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"equalityFn"}),": \u4e00\u4e2a\u51fd\u6570\uff0c\u5141\u8bb8\u4f60\u8df3\u8fc7\u91cd\u65b0\u6e32\u67d3\u3002"]}),"\n"]}),"\n",(0,r.jsx)(t.h4,{id:"\u8fd4\u56de\u503c",children:"\u8fd4\u56de\u503c"}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:"useStoreWithEqualityFn"})," \u8fd4\u56de\u57fa\u4e8e\u5f53\u524d\u72b6\u6001\u7684\u4efb\u4f55\u6570\u636e\uff0c\u5177\u4f53\u53d6\u51b3\u4e8e\u9009\u62e9\u5668\u51fd\u6570\uff0c\u5e76\u5141\u8bb8\u4f60\u4f7f\u7528\u76f8\u7b49\u6027\u51fd\u6570\u8df3\u8fc7\u91cd\u65b0\u6e32\u67d3\u3002\u5b83\u5e94\u8be5\u63a5\u53d7\u4e00\u4e2a store\u3001\u4e00\u4e2a\u9009\u62e9\u5668\u51fd\u6570\u548c\u4e00\u4e2a\u76f8\u7b49\u6027\u51fd\u6570\u4f5c\u4e3a\u53c2\u6570\u3002"]}),"\n",(0,r.jsx)(t.h2,{id:"\u7528\u6cd5",children:"\u7528\u6cd5"}),"\n",(0,r.jsx)(t.h3,{id:"\u5728-react-\u4e2d\u4f7f\u7528\u5168\u5c40-vanilla-store",children:"\u5728 React \u4e2d\u4f7f\u7528\u5168\u5c40 vanilla store"}),"\n",(0,r.jsxs)(t.p,{children:["\u9996\u5148\uff0c\u8ba9\u6211\u4eec\u8bbe\u7f6e\u4e00\u4e2a store \u6765\u4fdd\u5b58\u5c4f\u5e55\u4e0a\u70b9\u7684\u4f4d\u7f6e\u3002\u6211\u4eec\u5c06\u5b9a\u4e49 store \u6765\u7ba1\u7406 ",(0,r.jsx)(t.code,{children:"x"})," \u548c ",(0,r.jsx)(t.code,{children:"y"})," \u5750\u6807\uff0c\u5e76\u63d0\u4f9b\u4e00\u4e2a\u52a8\u4f5c\u6765\u66f4\u65b0\u8fd9\u4e9b\u5750\u6807\u3002"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-tsx",children:"import { createStore, useStore } from 'zustand'\n\ntype PositionStoreState = { position: { x: number; y: number } }\n\ntype PositionStoreActions = {\n  setPosition: (nextPosition: PositionStoreState['position']) => void\n}\n\ntype PositionStore = PositionStoreState & PositionStoreActions\n\nconst positionStore = createStore<PositionStore>()((set) => ({\n  position: { x: 0, y: 0 },\n  setPosition: (position) => set({ position }),\n}))\n"})}),"\n",(0,r.jsxs)(t.p,{children:["\u63a5\u4e0b\u6765\uff0c\u6211\u4eec\u5c06\u521b\u5efa\u4e00\u4e2a ",(0,r.jsx)(t.code,{children:"MovingDot"})," \u7ec4\u4ef6\uff0c\u8be5\u7ec4\u4ef6\u6e32\u67d3\u4e00\u4e2a\u8868\u793a\u70b9\u7684 div\u3002\u8be5\u7ec4\u4ef6\u5c06\u4f7f\u7528 store \u6765\u8ddf\u8e2a\u548c\u66f4\u65b0\u70b9\u7684\u4f4d\u7f6e\u3002"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-tsx",children:"function MovingDot() {\n  const position = useStoreWithEqualityFn(\n    positionStore,\n    (state) => state.position,\n    shallow,\n  )\n  const setPosition = useStoreWithEqualityFn(\n    positionStore,\n    (state) => state.setPosition,\n    shallow,\n  )\n\n  return (\n    <div\n      onPointerMove={(e) => {\n        setPosition({\n          x: e.clientX,\n          y: e.clientY,\n        })\n      }}\n      style={{\n        position: 'relative',\n        width: '100vw',\n        height: '100vh',\n      }}\n    >\n      <div\n        style={{\n          position: 'absolute',\n          backgroundColor: 'red',\n          borderRadius: '50%',\n          transform: `translate(${position.x}px, ${position.y}px)`,\n          left: -10,\n          top: -10,\n          width: 20,\n          height: 20,\n        }}\n      />\n    </div>\n  )\n}\n"})}),"\n",(0,r.jsxs)(t.p,{children:["\u6700\u540e\uff0c\u6211\u4eec\u5c06\u5728 ",(0,r.jsx)(t.code,{children:"App"})," \u7ec4\u4ef6\u4e2d\u6e32\u67d3 ",(0,r.jsx)(t.code,{children:"MovingDot"})," \u7ec4\u4ef6\u3002"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-tsx",children:"export default function App() {\n  return <MovingDot />\n}\n"})}),"\n",(0,r.jsx)(t.p,{children:"\u4ee3\u7801\u5982\u4e0b\u6240\u793a\uff1a"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-tsx",children:"import { createStore } from 'zustand'\nimport { useStoreWithEqualityFn } from 'zustand/traditional'\nimport { shallow } from 'zustand/shallow'\n\ntype PositionStoreState = { position: { x: number; y: number } }\n\ntype PositionStoreActions = {\n  setPosition: (nextPosition: PositionStoreState['position']) => void\n}\n\ntype PositionStore = PositionStoreState & PositionStoreActions\n\nconst positionStore = createStore<PositionStore>()((set) => ({\n  position: { x: 0, y: 0 },\n  setPosition: (position) => set({ position }),\n}))\n\nfunction MovingDot() {\n  const position = useStoreWithEqualityFn(\n    positionStore,\n    (state) => state.position,\n    shallow,\n  )\n  const setPosition = useStoreWithEqualityFn(\n    positionStore,\n    (state) => state.setPosition,\n    shallow,\n  )\n\n  return (\n    <div\n      onPointerMove={(e) => {\n        setPosition({\n          x: e.clientX,\n          y: e.clientY,\n        })\n      }}\n      style={{\n        position: 'relative',\n        width: '100vw',\n        height: '100vh',\n      }}\n    >\n      <div\n        style={{\n          position: 'absolute',\n          backgroundColor: 'red',\n          borderRadius: '50%',\n          transform: `translate(${position.x}px, ${position.y}px)`,\n          left: -10,\n          top: -10,\n          width: 20,\n          height: 20,\n        }}\n      />\n    </div>\n  )\n}\n\nexport default function App() {\n  return <MovingDot />\n}\n"})}),"\n",(0,r.jsx)(t.h3,{id:"\u5728-react-\u4e2d\u4f7f\u7528\u52a8\u6001\u5168\u5c40-vanilla-store",children:"\u5728 React \u4e2d\u4f7f\u7528\u52a8\u6001\u5168\u5c40 vanilla store"}),"\n",(0,r.jsx)(t.p,{children:"\u9996\u5148\uff0c\u6211\u4eec\u5c06\u521b\u5efa\u4e00\u4e2a\u5de5\u5382\u51fd\u6570\uff0c\u7528\u4e8e\u751f\u6210\u7ba1\u7406\u8ba1\u6570\u5668\u72b6\u6001\u7684 store\u3002\u6bcf\u4e2a\u6807\u7b7e\u9875\u5c06\u6709\u81ea\u5df1\u7684 store \u5b9e\u4f8b\u3002"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",children:"import { createStore } from 'zustand'\n\ntype CounterState = {\n  count: number\n}\n\ntype CounterActions = { increment: () => void }\n\ntype CounterStore = CounterState & CounterActions\n\nconst createCounterStore = () => {\n  return createStore<CounterStore>()((set) => ({\n    count: 0,\n    increment: () => {\n      set((state) => ({ count: state.count + 1 }))\n    },\n  }))\n}\n"})}),"\n",(0,r.jsx)(t.p,{children:"\u63a5\u4e0b\u6765\uff0c\u6211\u4eec\u5c06\u521b\u5efa\u4e00\u4e2a\u5de5\u5382\u51fd\u6570\uff0c\u7528\u4e8e\u7ba1\u7406\u8ba1\u6570\u5668 stores \u7684\u521b\u5efa\u548c\u68c0\u7d22\u3002\u8fd9\u5141\u8bb8\u6bcf\u4e2a\u6807\u7b7e\u9875\u90fd\u6709\u81ea\u5df1\u7684\u72ec\u7acb\u8ba1\u6570\u5668\u3002"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",children:"const defaultCounterStores = new Map<\n  string,\n  ReturnType<typeof createCounterStore>\n>()\n\nconst createCounterStoreFactory = (\n  counterStores: typeof defaultCounterStores,\n) => {\n  return (counterStoreKey: string) => {\n    if (!counterStores.has(counterStoreKey)) {\n      counterStores.set(counterStoreKey, createCounterStore())\n    }\n    return counterStores.get(counterStoreKey)!\n  }\n}\n\nconst getOrCreateCounterStoreByKey =\n  createCounterStoreFactory(defaultCounterStores)\n"})}),"\n",(0,r.jsx)(t.p,{children:"\u73b0\u5728\uff0c\u8ba9\u6211\u4eec\u6784\u5efa Tabs \u7ec4\u4ef6\uff0c\u7528\u6237\u53ef\u4ee5\u5728\u5176\u4e2d\u5207\u6362\u6807\u7b7e\u9875\u5e76\u589e\u52a0\u6bcf\u4e2a\u6807\u7b7e\u9875\u7684\u8ba1\u6570\u5668\u3002"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-tsx",children:"const [currentTabIndex, setCurrentTabIndex] = useState(0)\nconst counterState = useStoreWithEqualityFn(\n  getOrCreateCounterStoreByKey(`tab-${currentTabIndex}`),\n  (state) => state,\n  shallow,\n)\n\nreturn (\n  <div style={{ fontFamily: 'monospace' }}>\n    <div\n      style={{\n        display: 'flex',\n        gap: '0.5rem',\n        borderBottom: '1px solid salmon',\n        paddingBottom: 4,\n      }}\n    >\n      <button\n        type=\"button\"\n        style={{\n          border: '1px solid salmon',\n          backgroundColor: '#fff',\n          cursor: 'pointer',\n        }}\n        onClick={() => setCurrentTabIndex(0)}\n      >\n        Tab 1\n      </button>\n      <button\n        type=\"button\"\n        style={{\n          border: '1px solid salmon',\n          backgroundColor: '#fff',\n          cursor: 'pointer',\n        }}\n        onClick={() => setCurrentTabIndex(1)}\n      >\n        Tab 2\n      </button>\n      <button\n        type=\"button\"\n        style={{\n          border: '1px solid salmon',\n          backgroundColor: '#fff',\n          cursor: 'pointer',\n        }}\n        onClick={() => setCurrentTabIndex(2)}\n      >\n        Tab 3\n      </button>\n    </div>\n    <div style={{ padding: 4 }}>\n      Content of Tab {currentTabIndex + 1}\n      <br /> <br />\n      <button type=\"button\" onClick={() => counterState.increment()}>\n        Count: {counterState.count}\n      </button>\n    </div>\n  </div>\n)\n"})}),"\n",(0,r.jsxs)(t.p,{children:["\u6700\u540e\uff0c\u6211\u4eec\u5c06\u521b\u5efa ",(0,r.jsx)(t.code,{children:"App"})," \u7ec4\u4ef6\uff0c\u8be5\u7ec4\u4ef6\u6e32\u67d3\u6807\u7b7e\u9875\u53ca\u5176\u5404\u81ea\u7684\u8ba1\u6570\u5668\u3002\u8ba1\u6570\u5668\u72b6\u6001\u72ec\u7acb\u7ba1\u7406\u6bcf\u4e2a\u6807\u7b7e\u9875\u3002"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-tsx",children:"export default function App() {\n  return <Tabs />\n}\n"})}),"\n",(0,r.jsx)(t.p,{children:"\u4ee3\u7801\u5982\u4e0b\u6240\u793a\uff1a"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-tsx",children:"import { useState } from 'react'\nimport { createStore } from 'zustand'\nimport { useStoreWithEqualityFn } from 'zustand/traditional'\nimport { shallow } from 'zustand/shallow'\n\ntype CounterState = {\n  count: number\n}\n\ntype CounterActions = { increment: () => void }\n\ntype CounterStore = CounterState & CounterActions\n\nconst createCounterStore = () => {\n  return createStore<CounterStore>()((set) => ({\n    count: 0,\n    increment: () => {\n      set((state) => ({ count: state.count + 1 }))\n    },\n  }))\n}\n\nconst defaultCounterStores = new Map<\n  string,\n  ReturnType<typeof createCounterStore>\n>()\n\nconst createCounterStoreFactory = (\n  counterStores: typeof defaultCounterStores,\n) => {\n  return (counterStoreKey: string) => {\n    if (!counterStores.has(counterStoreKey)) {\n      counterStores.set(counterStoreKey, createCounterStore())\n    }\n    return counterStores.get(counterStoreKey)!\n  }\n}\n\nconst getOrCreateCounterStoreByKey =\n  createCounterStoreFactory(defaultCounterStores)\n\nexport default function App() {\n  const [currentTabIndex, setCurrentTabIndex] = useState(0)\n  const counterState = useStoreWithEqualityFn(\n    getOrCreateCounterStoreByKey(`tab-${currentTabIndex}`),\n    (state) => state,\n    shallow,\n  )\n\n  return (\n    <div style={{ fontFamily: 'monospace' }}>\n      <div\n        style={{\n          display: 'flex',\n          gap: '0.5rem',\n          borderBottom: '1px solid salmon',\n          paddingBottom: 4,\n        }}\n      >\n        <button\n          type=\"button\"\n          style={{\n            border: '1px solid salmon',\n            backgroundColor: '#fff',\n            cursor: 'pointer',\n          }}\n          onClick={() => setCurrentTabIndex(0)}\n        >\n          Tab 1\n        </button>\n        <button\n          type=\"button\"\n          style={{\n            border: '1px solid salmon',\n            backgroundColor: '#fff',\n            cursor: 'pointer',\n          }}\n          onClick={() => setCurrentTabIndex(1)}\n        >\n          Tab 2\n        </button>\n        <button\n          type=\"button\"\n          style={{\n            border: '1px solid salmon',\n            backgroundColor: '#fff',\n            cursor: 'pointer',\n          }}\n          onClick={() => setCurrentTabIndex(2)}\n        >\n          Tab 3\n        </button>\n      </div>\n      <div style={{ padding: 4 }}>\n        Content of Tab {currentTabIndex + 1}\n        <br /> <br />\n        <button type=\"button\" onClick={() => counterState.increment()}>\n          Count: {counterState.count}\n        </button>\n      </div>\n    </div>\n  )\n}\n"})}),"\n",(0,r.jsx)(t.h3,{id:"\u5728-react-\u4e2d\u4f7f\u7528\u4f5c\u7528\u57df\u975e\u5168\u5c40vanilla-store",children:"\u5728 React \u4e2d\u4f7f\u7528\u4f5c\u7528\u57df\uff08\u975e\u5168\u5c40\uff09vanilla store"}),"\n",(0,r.jsxs)(t.p,{children:["\u9996\u5148\uff0c\u8ba9\u6211\u4eec\u8bbe\u7f6e\u4e00\u4e2a store \u6765\u4fdd\u5b58\u5c4f\u5e55\u4e0a\u70b9\u7684\u4f4d\u7f6e\u3002\u6211\u4eec\u5c06\u5b9a\u4e49 store \u6765\u7ba1\u7406 ",(0,r.jsx)(t.code,{children:"x"})," \u548c ",(0,r.jsx)(t.code,{children:"y"})," \u5750\u6807\uff0c\u5e76\u63d0\u4f9b\u4e00\u4e2a\u52a8\u4f5c\u6765\u66f4\u65b0\u8fd9\u4e9b\u5750\u6807\u3002"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-tsx",children:"type PositionStoreState = { position: { x: number; y: number } }\n\ntype PositionStoreActions = {\n  setPosition: (nextPosition: PositionStoreState['position']) => void\n}\n\ntype PositionStore = PositionStoreState & PositionStoreActions\n\nconst createPositionStore = () => {\n  return createStore<PositionStore>()((set) => ({\n    position: { x: 0, y: 0 },\n    setPosition: (position) => set({ position }),\n  }))\n}\n"})}),"\n",(0,r.jsxs)(t.p,{children:["\u63a5\u4e0b\u6765\uff0c\u6211\u4eec\u5c06\u521b\u5efa\u4e00\u4e2a\u4e0a\u4e0b\u6587\u548c\u4e00\u4e2a\u63d0\u4f9b\u8005\u7ec4\u4ef6\uff0c\u901a\u8fc7 React \u7ec4\u4ef6\u6811\u4f20\u9012 store\u3002\u8fd9\u5141\u8bb8\u6bcf\u4e2a ",(0,r.jsx)(t.code,{children:"MovingDot"})," \u7ec4\u4ef6\u6709\u81ea\u5df1\u7684\u72ec\u7acb\u72b6\u6001\u3002"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-tsx",children:"const PositionStoreContext = createContext<ReturnType<\n  typeof createPositionStore\n> | null>(null)\n\nfunction PositionStoreProvider({ children }: { children: ReactNode }) {\n  const [positionStore] = useState(createPositionStore)\n\n  return (\n    <PositionStoreContext.Provider value={positionStore}>\n      {children}\n    </PositionStoreContext.Provider>\n  )\n}\n"})}),"\n",(0,r.jsxs)(t.p,{children:["\u4e3a\u4e86\u7b80\u5316\u8bbf\u95ee store\uff0c\u6211\u4eec\u5c06\u521b\u5efa\u4e00\u4e2a React \u81ea\u5b9a\u4e49 hook\uff0c",(0,r.jsx)(t.code,{children:"usePositionStore"}),"\u3002\u8fd9\u4e2a hook \u5c06\u4ece\u4e0a\u4e0b\u6587\u4e2d\u8bfb\u53d6 store\uff0c\u5e76\u5141\u8bb8\u6211\u4eec\u9009\u62e9\u72b6\u6001\u7684\u7279\u5b9a\u90e8\u5206\u3002"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",children:"function usePositionStore<U>(selector: (state: PositionStore) => U) {\n  const store = useContext(PositionStoreContext)\n\n  if (store === null) {\n    throw new Error(\n      'usePositionStore \u5fc5\u987b\u5728 PositionStoreProvider \u5185\u4f7f\u7528',\n    )\n  }\n\n  return useStoreWithEqualityFn(store, selector, shallow)\n}\n"})}),"\n",(0,r.jsxs)(t.p,{children:["\u73b0\u5728\uff0c\u8ba9\u6211\u4eec\u521b\u5efa ",(0,r.jsx)(t.code,{children:"MovingDot"})," \u7ec4\u4ef6\uff0c\u8be5\u7ec4\u4ef6\u5c06\u5728\u5176\u5bb9\u5668\u5185\u6e32\u67d3\u4e00\u4e2a\u8ddf\u968f\u9f20\u6807\u5149\u6807\u7684\u70b9\u3002"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-tsx",children:"function MovingDot({ color }: { color: string }) {\n  const position = usePositionStore((state) => state.position)\n  const setPosition = usePositionStore((state) => state.setPosition)\n\n  return (\n    <div\n      onPointerMove={(e) => {\n        setPosition({\n          x:\n            e.clientX > e.currentTarget.clientWidth\n              ? e.clientX - e.currentTarget.clientWidth\n              : e.clientX,\n          y: e.clientY,\n        })\n      }}\n      style={{\n        position: 'relative',\n        width: '50vw',\n        height: '100vh',\n      }}\n    >\n      <div\n        style={{\n          position: 'absolute',\n          backgroundColor: color,\n          borderRadius: '50%',\n          transform: `translate(${position.x}px, ${position.y}px)`,\n          left: -10,\n          top: -10,\n          width: 20,\n          height: 20,\n        }}\n      />\n    </div>\n  )\n}\n"})}),"\n",(0,r.jsxs)(t.p,{children:["\u6700\u540e\uff0c\u6211\u4eec\u5c06\u5728 ",(0,r.jsx)(t.code,{children:"App"})," \u7ec4\u4ef6\u4e2d\u5c06\u6240\u6709\u5185\u5bb9\u7ed3\u5408\u5728\u4e00\u8d77\uff0c\u5176\u4e2d\u6211\u4eec\u6e32\u67d3\u4e24\u4e2a ",(0,r.jsx)(t.code,{children:"MovingDot"})," \u7ec4\u4ef6\uff0c\u6bcf\u4e2a\u7ec4\u4ef6\u90fd\u6709\u81ea\u5df1\u7684\u72ec\u7acb\u72b6\u6001\u3002"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-tsx",children:'export default function App() {\n  return (\n    <div style={{ display: \'flex\' }}>\n      <PositionStoreProvider>\n        <MovingDot color="red" />\n      </PositionStoreProvider>\n      <PositionStoreProvider>\n        <MovingDot color="blue" />\n      </PositionStoreProvider>\n    </div>\n  )\n}\n'})}),"\n",(0,r.jsx)(t.p,{children:"\u4ee3\u7801\u5982\u4e0b\u6240\u793a\uff1a"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-tsx",children:"import { type ReactNode, useState, createContext, useContext } from 'react'\nimport { createStore } from 'zustand'\nimport { useStoreWithEqualityFn } from 'zustand/traditional'\nimport { shallow } from 'zustand/shallow'\n\ntype PositionStoreState = { position: { x: number; y: number } }\n\ntype PositionStoreActions = {\n  setPosition: (nextPosition: PositionStoreState['position']) => void\n}\n\ntype PositionStore = PositionStoreState & PositionStoreActions\n\nconst createPositionStore = () => {\n  return createStore<PositionStore>()((set) => ({\n    position: { x: 0, y: 0 },\n    setPosition: (position) => set({ position }),\n  }))\n}\n\nconst PositionStoreContext = createContext<ReturnType<\n  typeof createPositionStore\n> | null>(null)\n\nfunction PositionStoreProvider({ children }: { children: ReactNode }) {\n  const [positionStore] = useState(createPositionStore)\n\n  return (\n    <PositionStoreContext.Provider value={positionStore}>\n      {children}\n    </PositionStoreContext.Provider>\n  )\n}\n\nfunction usePositionStore<U>(selector: (state: PositionStore) => U) {\n  const store = useContext(PositionStoreContext)\n\n  if (store === null) {\n    throw new Error(\n      'usePositionStore \u5fc5\u987b\u5728 PositionStoreProvider \u5185\u4f7f\u7528',\n    )\n  }\n\n  return useStoreWithEqualityFn(store, selector, shallow)\n}\n\nfunction MovingDot({ color }: { color: string }) {\n  const position = usePositionStore((state) => state.position)\n  const setPosition = usePositionStore((state) => state.setPosition)\n\n  return (\n    <div\n      onPointerMove={(e) => {\n        setPosition({\n          x:\n            e.clientX > e.currentTarget.clientWidth\n              ? e.clientX - e.currentTarget.clientWidth\n              : e.clientX,\n          y: e.clientY,\n        })\n      }}\n      style={{\n        position: 'relative',\n        width: '50vw',\n        height: '100vh',\n      }}\n    >\n      <div\n        style={{\n          position: 'absolute',\n          backgroundColor: color,\n          borderRadius: '50%',\n          transform: `translate(${position.x}px, ${position.y}px)`,\n          left: -10,\n          top: -10,\n          width: 20,\n          height: 20,\n        }}\n      />\n    </div>\n  )\n}\n\nexport default function App() {\n  return (\n    <div style={{ display: 'flex' }}>\n      <PositionStoreProvider>\n        <MovingDot color=\"red\" />\n      </PositionStoreProvider>\n      <PositionStoreProvider>\n        <MovingDot color=\"blue\" />\n      </PositionStoreProvider>\n    </div>\n  )\n}\n"})}),"\n",(0,r.jsx)(t.h3,{id:"\u5728-react-\u4e2d\u4f7f\u7528\u52a8\u6001\u4f5c\u7528\u57df\u975e\u5168\u5c40vanilla-store",children:"\u5728 React \u4e2d\u4f7f\u7528\u52a8\u6001\u4f5c\u7528\u57df\uff08\u975e\u5168\u5c40\uff09vanilla store"}),"\n",(0,r.jsx)(t.p,{children:"\u9996\u5148\uff0c\u6211\u4eec\u5c06\u521b\u5efa\u4e00\u4e2a\u5de5\u5382\u51fd\u6570\uff0c\u7528\u4e8e\u751f\u6210\u7ba1\u7406\u8ba1\u6570\u5668\u72b6\u6001\u7684 store\u3002\u6bcf\u4e2a\u6807\u7b7e\u9875\u5c06\u6709\u81ea\u5df1\u7684 store \u5b9e\u4f8b\u3002"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",children:"type CounterState = {\n  count: number\n}\n\ntype CounterActions = { increment: () => void }\n\ntype CounterStore = CounterState & CounterActions\n\nconst createCounterStore = () => {\n  return createStore<CounterStore>()((set) => ({\n    count: 0,\n    increment: () => {\n      set((state) => ({ count: state.count + 1 }))\n    },\n  }))\n}\n"})}),"\n",(0,r.jsx)(t.p,{children:"\u63a5\u4e0b\u6765\uff0c\u6211\u4eec\u5c06\u521b\u5efa\u4e00\u4e2a\u5de5\u5382\u51fd\u6570\uff0c\u7528\u4e8e\u7ba1\u7406\u8ba1\u6570\u5668 stores \u7684\u521b\u5efa\u548c\u68c0\u7d22\u3002\u8fd9\u5141\u8bb8\u6bcf\u4e2a\u6807\u7b7e\u9875\u90fd\u6709\u81ea\u5df1\u7684\u72ec\u7acb\u8ba1\u6570\u5668\u3002"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",children:"const createCounterStoreFactory = (\n  counterStores: Map<string, ReturnType<typeof createCounterStore>>,\n) => {\n  return (counterStoreKey: string) => {\n    if (!counterStores.has(counterStoreKey)) {\n      counterStores.set(counterStoreKey, createCounterStore())\n    }\n    return counterStores.get(counterStoreKey)!\n  }\n}\n"})}),"\n",(0,r.jsx)(t.p,{children:"\u63a5\u4e0b\u6765\uff0c\u6211\u4eec\u9700\u8981\u4e00\u79cd\u65b9\u6cd5\u6765\u7ba1\u7406\u548c\u8bbf\u95ee\u8fd9\u4e9b stores\u3002\u6211\u4eec\u5c06\u4f7f\u7528 React \u7684\u4e0a\u4e0b\u6587\u6765\u5b9e\u73b0\u8fd9\u4e00\u70b9\u3002"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-tsx",children:"const CounterStoresContext = createContext(null)\n\nconst CounterStoresProvider = ({ children }) => {\n  const [stores] = useState(\n    () => new Map<string, ReturnType<typeof createCounterStore>>(),\n  )\n\n  return (\n    <CounterStoresContext.Provider value={stores}>\n      {children}\n    </CounterStoresContext.Provider>\n  )\n}\n"})}),"\n",(0,r.jsxs)(t.p,{children:["\u73b0\u5728\uff0c\u6211\u4eec\u5c06\u521b\u5efa\u4e00\u4e2a\u81ea\u5b9a\u4e49 hook\uff0c",(0,r.jsx)(t.code,{children:"useCounterStore"}),"\uff0c\u5b83\u5141\u8bb8\u6211\u4eec\u8bbf\u95ee\u7ed9\u5b9a\u6807\u7b7e\u9875\u7684\u6b63\u786e store\u3002"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-tsx",children:"const useCounterStore = <U,>(\n  currentTabIndex: number,\n  selector: (state: CounterStore) => U,\n) => {\n  const stores = useContext(CounterStoresContext)\n\n  if (stores === undefined) {\n    throw new Error('useCounterStore \u5fc5\u987b\u5728 CounterStoresProvider \u5185\u4f7f\u7528')\n  }\n\n  const getOrCreateCounterStoreByKey = useCallback(\n    () => createCounterStoreFactory(stores),\n    [stores],\n  )\n\n  return useStoreWithEqualityFn(\n    getOrCreateCounterStoreByKey(`tab-${currentTabIndex}`),\n    selector,\n    shallow,\n  )\n}\n"})}),"\n",(0,r.jsx)(t.p,{children:"\u73b0\u5728\uff0c\u8ba9\u6211\u4eec\u6784\u5efa Tabs \u7ec4\u4ef6\uff0c\u7528\u6237\u53ef\u4ee5\u5728\u5176\u4e2d\u5207\u6362\u6807\u7b7e\u9875\u5e76\u589e\u52a0\u6bcf\u4e2a\u6807\u7b7e\u9875\u7684\u8ba1\u6570\u5668\u3002"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-tsx",children:"function Tabs() {\n  const [currentTabIndex, setCurrentTabIndex] = useState(0)\n  const counterState = useCounterStore(\n    `tab-${currentTabIndex}`,\n    (state) => state,\n  )\n\n  return (\n    <div style={{ fontFamily: 'monospace' }}>\n      <div\n        style={{\n          display: 'flex',\n          gap: '0.5rem',\n          borderBottom: '1px solid salmon',\n          paddingBottom: 4,\n        }}\n      >\n        <button\n          type=\"button\"\n          style={{\n            border: '1px solid salmon',\n            backgroundColor: '#fff',\n            cursor: 'pointer',\n          }}\n          onClick={() => setCurrentTabIndex(0)}\n        >\n          Tab 1\n        </button>\n        <button\n          type=\"button\"\n          style={{\n            border: '1px solid salmon',\n            backgroundColor: '#fff',\n            cursor: 'pointer',\n          }}\n          onClick={() => setCurrentTabIndex(1)}\n        >\n          Tab 2\n        </button>\n        <button\n          type=\"button\"\n          style={{\n            border: '1px solid salmon',\n            backgroundColor: '#fff',\n            cursor: 'pointer',\n          }}\n          onClick={() => setCurrentTabIndex(2)}\n        >\n          Tab 3\n        </button>\n      </div>\n      <div style={{ padding: 4 }}>\n        Content of Tab {currentTabIndex + 1}\n        <br /> <br />\n        <button type=\"button\" onClick={() => counterState.increment()}>\n          Count: {counterState.count}\n        </button>\n      </div>\n    </div>\n  )\n}\n"})}),"\n",(0,r.jsxs)(t.p,{children:["\u6700\u540e\uff0c\u6211\u4eec\u5c06\u521b\u5efa ",(0,r.jsx)(t.code,{children:"App"})," \u7ec4\u4ef6\uff0c\u8be5\u7ec4\u4ef6\u6e32\u67d3\u6807\u7b7e\u9875\u53ca\u5176\u5404\u81ea\u7684\u8ba1\u6570\u5668\u3002\u8ba1\u6570\u5668\u72b6\u6001\u72ec\u7acb\u7ba1\u7406\u6bcf\u4e2a\u6807\u7b7e\u9875\u3002"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-tsx",children:"export default function App() {\n  return (\n    <CounterStoresProvider>\n      <Tabs />\n    </CounterStoresProvider>\n  )\n}\n"})}),"\n",(0,r.jsx)(t.p,{children:"\u4ee3\u7801\u5982\u4e0b\u6240\u793a\uff1a"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-tsx",children:"import {\n  type ReactNode,\n  useState,\n  useCallback,\n  useContext,\n  createContext,\n} from 'react'\nimport { createStore, useStore } from 'zustand'\n\ntype CounterState = {\n  count: number\n}\n\ntype CounterActions = { increment: () => void }\n\ntype CounterStore = CounterState & CounterActions\n\nconst createCounterStore = () => {\n  return createStore<CounterStore>()((set) => ({\n    count: 0,\n    increment: () => {\n      set((state) => ({ count: state.count + 1 }))\n    },\n  }))\n}\n\nconst createCounterStoreFactory = (\n  counterStores: Map<string, ReturnType<typeof createCounterStore>>,\n) => {\n  return (counterStoreKey: string) => {\n    if (!counterStores.has(counterStoreKey)) {\n      counterStores.set(counterStoreKey, createCounterStore())\n    }\n    return counterStores.get(counterStoreKey)!\n  }\n}\n\nconst CounterStoresContext = createContext<Map<\n  string,\n  ReturnType<typeof createCounterStore>\n> | null>(null)\n\nconst CounterStoresProvider = ({ children }: { children: ReactNode }) => {\n  const [stores] = useState(\n    () => new Map<string, ReturnType<typeof createCounterStore>>(),\n  )\n\n  return (\n    <CounterStoresContext.Provider value={stores}>\n      {children}\n    </CounterStoresContext.Provider>\n  )\n}\n\nconst useCounterStore = <U,>(\n  key: string,\n  selector: (state: CounterStore) => U,\n) => {\n  const stores = useContext(CounterStoresContext)\n\n  if (stores === undefined) {\n    throw new Error('useCounterStore \u5fc5\u987b\u5728 CounterStoresProvider \u5185\u4f7f\u7528')\n  }\n\n  const getOrCreateCounterStoreByKey = useCallback(\n    (key: string) => createCounterStoreFactory(stores!)(key),\n    [stores],\n  )\n\n  return useStore(getOrCreateCounterStoreByKey(key), selector)\n}\n\nfunction Tabs() {\n  const [currentTabIndex, setCurrentTabIndex] = useState(0)\n  const counterState = useCounterStore(\n    `tab-${currentTabIndex}`,\n    (state) => state,\n  )\n\n  return (\n    <div style={{ fontFamily: 'monospace' }}>\n      <div\n        style={{\n          display: 'flex',\n          gap: '0.5rem',\n          borderBottom: '1px solid salmon',\n          paddingBottom: 4,\n        }}\n      >\n        <button\n          type=\"button\"\n          style={{\n            border: '1px solid salmon',\n            backgroundColor: '#fff',\n            cursor: 'pointer',\n          }}\n          onClick={() => setCurrentTabIndex(0)}\n        >\n          Tab 1\n        </button>\n        <button\n          type=\"button\"\n          style={{\n            border: '1px solid salmon',\n            backgroundColor: '#fff',\n            cursor: 'pointer',\n          }}\n          onClick={() => setCurrentTabIndex(1)}\n        >\n          Tab 2\n        </button>\n        <button\n          type=\"button\"\n          style={{\n            border: '1px solid salmon',\n            backgroundColor: '#fff',\n            cursor: 'pointer',\n          }}\n          onClick={() => setCurrentTabIndex(2)}\n        >\n          Tab 3\n        </button>\n      </div>\n      <div style={{ padding: 4 }}>\n        Content of Tab {currentTabIndex + 1}\n        <br /> <br />\n        <button type=\"button\" onClick={() => counterState.increment()}>\n          Count: {counterState.count}\n        </button>\n      </div>\n    </div>\n  )\n}\n\nexport default function App() {\n  return (\n    <CounterStoresProvider>\n      <Tabs />\n    </CounterStoresProvider>\n  )\n}\n"})}),"\n",(0,r.jsx)(t.h2,{id:"\u6545\u969c\u6392\u9664",children:"\u6545\u969c\u6392\u9664"}),"\n",(0,r.jsx)(t.p,{children:"TBD"})]})}function d(n={}){const{wrapper:t}={...(0,s.R)(),...n.components};return t?(0,r.jsx)(t,{...n,children:(0,r.jsx)(u,{...n})}):u(n)}},8453:(n,t,e)=>{e.d(t,{R:()=>i,x:()=>a});var o=e(6540);const r={},s=o.createContext(r);function i(n){const t=o.useContext(s);return o.useMemo((function(){return"function"==typeof n?n(t):{...t,...n}}),[t,n])}function a(n){let t;return t=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:i(n.components),o.createElement(s.Provider,{value:t},n.children)}}}]);