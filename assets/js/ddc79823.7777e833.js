"use strict";(self.webpackChunkzustand_zh=self.webpackChunkzustand_zh||[]).push([[175],{4971:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>o,contentTitle:()=>d,default:()=>x,frontMatter:()=>c,metadata:()=>i,toc:()=>a});var t=n(4848),s=n(8453);const c={title:"\u8fc1\u79fb\u5230v4",nav:19},d=void 0,i={id:"migrations/migrating-to-v4",title:"\u8fc1\u79fb\u5230v4",description:"\u552f\u4e00\u7684\u7834\u574f\u6027\u53d8\u5316\u5728\u4e8e\u7c7b\u578b\u3002",source:"@site/docs/migrations/migrating-to-v4.md",sourceDirName:"migrations",slug:"/migrations/migrating-to-v4",permalink:"/zustand-zh/docs/migrations/migrating-to-v4",draft:!1,unlisted:!1,editUrl:"https://github.com/ouweiya/zustand-zh/blob/master/docs/migrations/migrating-to-v4.md",tags:[],version:"current",frontMatter:{title:"\u8fc1\u79fb\u5230v4",nav:19},sidebar:"tutorialSidebar",previous:{title:"\u4ecezustand/context\u4e2d\u521b\u5efa\u4e0a\u4e0b\u6587",permalink:"/zustand-zh/docs/previous-versions/zustand-v3-create-context"}},o={},a=[{value:"<code>create</code>",id:"create",level:2},{value:"<code>StateCreator</code>",id:"statecreator",level:2},{value:"<code>PartialState</code>",id:"partialstate",level:2},{value:"<code>useStore</code>",id:"usestore",level:2},{value:"<code>UseBoundStore</code>",id:"useboundstore",level:2},{value:"<code>UseContextStore</code>",id:"usecontextstore",level:2},{value:"<code>createContext</code>",id:"createcontext",level:2},{value:"<code>combine</code>, <code>devtools</code>, <code>subscribeWithSelector</code>",id:"combine-devtools-subscribewithselector",level:2},{value:"<code>persist</code>",id:"persist",level:2},{value:"<code>redux</code>",id:"redux",level:2}];function l(e){const r={a:"a",code:"code",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.p,{children:"\u552f\u4e00\u7684\u7834\u574f\u6027\u53d8\u5316\u5728\u4e8e\u7c7b\u578b\u3002\r\n\u5982\u679c\u4f60\u5728\u4f7f\u7528TypeScript\u6216\u8005JSDoc\u7c7b\u578b\u6ce8\u89e3\u7684Zustand\uff0c\r\n\u90a3\u4e48\u8fd9\u4e2a\u6307\u5357\u5c31\u9002\u7528\u4e8e\u4f60\u3002\r\n\u5426\u5219\uff0c\u65e0\u9700\u8fdb\u884c\u8fc1\u79fb\u3002"}),"\n",(0,t.jsxs)(r.p,{children:["\u6b64\u5916\uff0c\u5efa\u8bae\u4f60\u9996\u5148\u9605\u8bfb\r\n\u65b0\u7684",(0,t.jsx)(r.a,{href:"/zustand-zh/docs/guides/typescript",children:"TypeScript\u6307\u5357"}),"\uff0c\r\n\u8fd9\u6837\u53ef\u4ee5\u66f4\u5bb9\u6613\u7406\u89e3\u8fc1\u79fb\u8fc7\u7a0b\u3002"]}),"\n",(0,t.jsxs)(r.p,{children:["\u9664\u4e86\u8fd9\u4e2a\u8fc1\u79fb\u6307\u5357\uff0c\r\n\u4f60\u8fd8\u53ef\u4ee5\u67e5\u770b\r\n",(0,t.jsx)(r.a,{href:"https://github.com/pmndrs/zustand/compare/v3.7.2...v4.0.0?short_path=37e5b4c#diff-c21e24854115b390eccde717da83f91feb2d5927a76c1485e5f0fdd0135c2afa",children:"\u5dee\u5f02"}),"\r\n\u5728Zustand\u4ed3\u5e93\u4e2d\uff0c\u4ecev3\u5230v4\u7684\u6d4b\u8bd5\u6587\u4ef6\u7684\u5dee\u5f02\u3002"]}),"\n",(0,t.jsx)(r.h2,{id:"create",children:(0,t.jsx)(r.code,{children:"create"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u9002\u7528\u7684\u5bfc\u5165"})}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"import create from 'zustand'\r\nimport create from 'zustand/vanilla'\n"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u53d8\u66f4"})}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-diff",children:'- create:\r\n-   < State\r\n-   , StoreSetState = StoreApi<State>["set"]\r\n-   , StoreGetState = StoreApi<State>["get"]\r\n-   , Store = StoreApi<State>\r\n-   >\r\n-     (f: ...) => ...\r\n+ create:\r\n+   { <State>(): (f: ...) => ...\r\n+   , <State, Mutators>(f: ...) => ...\r\n+   }\n'})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u8fc1\u79fb"})}),"\n",(0,t.jsxs)(r.p,{children:["\u5982\u679c\u4f60\u6ca1\u6709\u5411 ",(0,t.jsx)(r.code,{children:"create"})," \u4f20\u9012\u4efb\u4f55\u7c7b\u578b\u53c2\u6570\uff0c\u90a3\u4e48\u4e0d\u9700\u8981\u8fdb\u884c\u8fc1\u79fb\u3002"]}),"\n",(0,t.jsxs)(r.p,{children:["\u5982\u679c\u4f60\u6b63\u5728\u4f7f\u7528\u50cf ",(0,t.jsx)(r.code,{children:"combine"})," \u6216 ",(0,t.jsx)(r.code,{children:"redux"}),' \u8fd9\u6837\u7684 "\u53f6\u5b50" \u4e2d\u95f4\u4ef6\uff0c\u90a3\u4e48\u4ece ',(0,t.jsx)(r.code,{children:"create"})," \u4e2d\u79fb\u9664\u6240\u6709\u7c7b\u578b\u53c2\u6570\u3002"]}),"\n",(0,t.jsxs)(r.p,{children:["\u5426\u5219\uff0c\u5c06 ",(0,t.jsx)(r.code,{children:"create<T, ...>(...)"})," \u66ff\u6362\u4e3a ",(0,t.jsx)(r.code,{children:"create<T>()(...)"}),"\u3002"]}),"\n",(0,t.jsx)(r.h2,{id:"statecreator",children:(0,t.jsx)(r.code,{children:"StateCreator"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u9002\u7528\u7684\u5bfc\u5165"})}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"import type { StateCreator } from 'zustand'\r\nimport type { StateCreator } from 'zustand/vanilla'\n"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u53d8\u66f4"})}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-diff",children:'- type StateCreator\r\n-   < State\r\n-   , StoreSetState = StoreApi<State>["set"]\r\n-   , StoreGetState = StoreApi<State>["get"]\r\n-   , Store = StoreApi<State>\r\n-   > =\r\n-     ...\r\n+ type StateCreator\r\n+   < State\r\n+   , InMutators extends [StoreMutatorIdentifier, unknown][] = []\r\n+   , OutMutators extends [StoreMutatorIdentifier, unknown][] = []\r\n+   , Return = State\r\n+   > =\r\n+     ...\n'})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u8fc1\u79fb"})}),"\n",(0,t.jsxs)(r.p,{children:["\u5982\u679c\u4f60\u6b63\u5728\u4f7f\u7528 ",(0,t.jsx)(r.code,{children:"StateCreator"}),'\uff0c\u4f60\u53ef\u80fd\u6b63\u5728\u7f16\u5199\u4e00\u4e2a\u4e2d\u95f4\u4ef6\u6216\u4f7f\u7528 "slices" \u6a21\u5f0f\u3002\u5bf9\u6b64\uff0c\u8bf7\u67e5\u770b TypeScript \u6307\u5357\u4e2d\u7684 ',(0,t.jsx)(r.a,{href:"/zustand-zh/docs/guides/typescript#authoring-middlewares-and-advanced-usage",children:"\u7f16\u5199\u4e2d\u95f4\u4ef6\u548c\u9ad8\u7ea7\u7528\u6cd5"})," \u548c ",(0,t.jsx)(r.a,{href:"/zustand-zh/docs/guides/typescript#common-recipes",children:"\u5e38\u89c1\u914d\u65b9"})," \u90e8\u5206\u3002"]}),"\n",(0,t.jsx)(r.h2,{id:"partialstate",children:(0,t.jsx)(r.code,{children:"PartialState"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u9002\u7528\u7684\u5bfc\u5165"})}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"import type { PartialState } from 'zustand'\r\nimport type { PartialState } from 'zustand/vanilla'\n"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u53d8\u66f4"})}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-diff",children:"- type PartialState\r\n-   < T extends State\r\n-   , K1 extends keyof T = keyof T\r\n-   , K2 extends keyof T = K1\r\n-   , K3 extends keyof T = K2\r\n-   , K4 extends keyof T = K3\r\n-   > =\r\n-   | (Pick<T, K1> | Pick<T, K2> | Pick<T, K3> | Pick<T, K4> | T)\r\n-   | ((state: T) => Pick<T, K1> | Pick<T, K2> | Pick<T, K3> | Pick<T, K4> | T)\r\n+ type PartialState<T> =\r\n+   | Partial<T>\r\n+   | ((state: T) => Partial<T>)\n"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u8fc1\u79fb"})}),"\n",(0,t.jsxs)(r.p,{children:["\u5c06 ",(0,t.jsx)(r.code,{children:"PartialState<T, ...>"})," \u66ff\u6362\u4e3a ",(0,t.jsx)(r.code,{children:"PartialState<T>"}),"\uff0c\u5e76\u4e14\u6700\u597d\u5728\u4f60\u7684 ",(0,t.jsx)(r.code,{children:"tsconfig.json"})," \u4e2d\u5f00\u542f ",(0,t.jsx)(r.a,{href:"https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes",children:(0,t.jsx)(r.code,{children:"exactOptionalPropertyTypes"})}),"\uff1a"]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-json",children:'{\r\n  "compilerOptions": {\r\n    "exactOptionalPropertyTypes": true\r\n  }\r\n}\n'})}),"\n",(0,t.jsxs)(r.p,{children:["\u6211\u4eec\u4e0d\u518d\u4f7f\u7528\u8fd9\u4e2a\u6280\u5de7\u6765\u7981\u6b62 ",(0,t.jsx)(r.code,{children:"{ foo: undefined }"})," \u88ab\u8d4b\u503c\u7ed9 ",(0,t.jsx)(r.code,{children:"Partial<{ foo: string }>"}),"\u3002\u76f8\u53cd\uff0c\u6211\u4eec\u4f9d\u8d56\u7528\u6237\u5f00\u542f ",(0,t.jsx)(r.code,{children:"exactOptionalPropertyTypes"}),"\u3002"]}),"\n",(0,t.jsx)(r.h2,{id:"usestore",children:(0,t.jsx)(r.code,{children:"useStore"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u9002\u7528\u7684\u5bfc\u5165"})}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"import { useStore } from 'zustand'\r\nimport { useStore } from 'zustand/react'\n"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u53d8\u66f4"})}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-diff",children:"- useStore:\r\n-   { <State>(store: StoreApi<State>): State\r\n-   , <State, StateSlice>\r\n-       ( store: StoreApi<State>\r\n-       , selector: StateSelector<State, StateSlice>,\r\n-       , equals?: EqualityChecker<StateSlice>\r\n-       ): StateSlice\r\n-   }\r\n+ useStore:\r\n+   <Store, StateSlice = ExtractState<Store>>\r\n+     ( store: Store\r\n+     , selector?: StateSelector<State, StateSlice>,\r\n+     , equals?: EqualityChecker<StateSlice>\r\n+     )\r\n+       => StateSlice\n"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u8fc1\u79fb"})}),"\n",(0,t.jsxs)(r.p,{children:["\u5982\u679c\u4f60\u6ca1\u6709\u5411 ",(0,t.jsx)(r.code,{children:"useStore"})," \u4f20\u9012\u4efb\u4f55\u7c7b\u578b\u53c2\u6570\uff0c\u90a3\u4e48\u4e0d\u9700\u8981\u8fdb\u884c\u8fc1\u79fb\u3002"]}),"\n",(0,t.jsxs)(r.p,{children:["\u5982\u679c\u4f60\u6709\uff0c\u5efa\u8bae\u79fb\u9664\u6240\u6709\u7c7b\u578b\u53c2\u6570\uff0c\u6216\u8005\u5c06 ",(0,t.jsx)(r.strong,{children:"store"})," \u7c7b\u578b\u800c\u4e0d\u662f ",(0,t.jsx)(r.strong,{children:"state"})," \u7c7b\u578b\u4f5c\u4e3a\u7b2c\u4e00\u4e2a\u53c2\u6570\u4f20\u9012\u3002"]}),"\n",(0,t.jsx)(r.h2,{id:"useboundstore",children:(0,t.jsx)(r.code,{children:"UseBoundStore"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u9002\u7528\u7684\u5bfc\u5165"})}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"import type { UseBoundStore } from 'zustand'\r\nimport type { UseBoundStore } from 'zustand/react'\n"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u53d8\u66f4"})}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-diff",children:"- type UseBoundStore<\r\n-   State,\r\n-   Store = StoreApi<State>\r\n- > =\r\n-   & { (): T\r\n-     , <StateSlice>\r\n-         ( selector: StateSelector<State, StateSlice>\r\n-         , equals?: EqualityChecker<StateSlice>\r\n-         ): U\r\n-     }\r\n-   & Store\r\n+ type UseBoundStore<Store> =\r\n+   & (<StateSlice = ExtractState<S>>\r\n+       ( selector?: (state: ExtractState<S>) => StateSlice\r\n+       , equals?: (a: StateSlice, b: StateSlice) => boolean\r\n+       ) => StateSlice\r\n+     )\r\n+   & S\n"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u8fc1\u79fb"})}),"\n",(0,t.jsxs)(r.p,{children:["\u5c06 ",(0,t.jsx)(r.code,{children:"UseBoundStore<T>"})," \u66ff\u6362\u4e3a ",(0,t.jsx)(r.code,{children:"UseBoundStore<StoreApi<T>>"}),"\uff0c\u5c06 ",(0,t.jsx)(r.code,{children:"UseBoundStore<T, S>"})," \u66ff\u6362\u4e3a ",(0,t.jsx)(r.code,{children:"UseBoundStore<S>"}),"\u3002"]}),"\n",(0,t.jsx)(r.h2,{id:"usecontextstore",children:(0,t.jsx)(r.code,{children:"UseContextStore"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u9002\u7528\u7684\u5bfc\u5165"})}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"import type { UseContextStore } from 'zustand/context'\n"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u53d8\u66f4"})}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-diff",children:"- type UseContextStore\n"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u8fc1\u79fb"})}),"\n",(0,t.jsxs)(r.p,{children:["\u4f7f\u7528 ",(0,t.jsx)(r.code,{children:"typeof MyContext.useStore"})," \u66ff\u4ee3\u3002"]}),"\n",(0,t.jsx)(r.h2,{id:"createcontext",children:(0,t.jsx)(r.code,{children:"createContext"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u9002\u7528\u7684\u5bfc\u5165"})}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"import createContext from 'zustand/context'\n"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u53d8\u66f4"})}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-diff",children:"  createContext:\r\n-   <State, Store = StoreApi<State>>() => ...\r\n+   <Store>() => ...\n"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u8fc1\u79fb"})}),"\n",(0,t.jsxs)(r.p,{children:["Replace ",(0,t.jsx)(r.code,{children:"createContext<T>()"})," with ",(0,t.jsx)(r.code,{children:"createContext<StoreApi<T>>()"}),",\r\nand ",(0,t.jsx)(r.code,{children:"createContext<T, S>()"})," with ",(0,t.jsx)(r.code,{children:"createContext<S>()"}),"."]}),"\n",(0,t.jsxs)(r.h2,{id:"combine-devtools-subscribewithselector",children:[(0,t.jsx)(r.code,{children:"combine"}),", ",(0,t.jsx)(r.code,{children:"devtools"}),", ",(0,t.jsx)(r.code,{children:"subscribeWithSelector"})]}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u9002\u7528\u7684\u5bfc\u5165"})}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"import { combine } from 'zustand/middleware'\r\nimport { devtools } from 'zustand/middleware'\r\nimport { subscribeWithSelector } from 'zustand/middleware'\n"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u53d8\u66f4"})}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-diff",children:"- combine:\r\n-   <T, U>(...) => ...\r\n+ combine:\r\n+   <T, U, Mps, Mcs>(...) => ...\r\n\r\n- devtools:\r\n-   <T>(...) => ...\r\n+ devtools:\r\n+   <T, Mps, Mcs>(...) => ...\r\n\r\n- subscribeWithSelector:\r\n-   <T>(...) => ...\r\n+ subscribeWithSelector:\r\n+   <T, Mps, Mcs>(...) => ...\n"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u8fc1\u79fb"})}),"\n",(0,t.jsxs)(r.p,{children:["\u5982\u679c\u4f60\u6ca1\u6709\u5411 ",(0,t.jsx)(r.code,{children:"combine"}),"\uff0c",(0,t.jsx)(r.code,{children:"devtools"})," \u6216 ",(0,t.jsx)(r.code,{children:"subscribeWithSelector"})," \u4f20\u9012\u4efb\u4f55\u7c7b\u578b\u53c2\u6570\uff0c\u90a3\u4e48\u4e0d\u9700\u8981\u8fdb\u884c\u8fc1\u79fb\u3002"]}),"\n",(0,t.jsx)(r.p,{children:"\u5982\u679c\u4f60\u6709\uff0c\u79fb\u9664\u6240\u6709\u7c7b\u578b\u53c2\u6570\uff0c\u56e0\u4e3a\u5b83\u4eec\u4f1a\u88ab\u81ea\u52a8\u63a8\u65ad\u3002"}),"\n",(0,t.jsx)(r.h2,{id:"persist",children:(0,t.jsx)(r.code,{children:"persist"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u9002\u7528\u7684\u5bfc\u5165"})}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"import { persist } from 'zustand/middleware'\n"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u53d8\u66f4"})}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-diff",children:"- persist:\r\n-   <T, U = Partial<T>>(...) => ...\r\n+ persist:\r\n+   <T, Mps, Mcs, U = T>(...) => ...\n"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u8fc1\u79fb"})}),"\n",(0,t.jsx)(r.p,{children:"\u5982\u679c\u4f60\u6b63\u5728\u4f20\u9012\u4efb\u4f55\u7c7b\u578b\u53c2\u6570\uff0c\u79fb\u9664\u5b83\u4eec\uff0c\u56e0\u4e3a\u5b83\u4eec\u4f1a\u88ab\u81ea\u52a8\u63a8\u65ad\u3002"}),"\n",(0,t.jsxs)(r.p,{children:["\u63a5\u4e0b\u6765\uff0c\u5982\u679c\u4f60\u6b63\u5728\u4f20\u9012 ",(0,t.jsx)(r.code,{children:"partialize"})," \u9009\u9879\uff0c\u90a3\u4e48\u4e0d\u9700\u8981\u8fdb\u884c\u8fdb\u4e00\u6b65\u7684\u8fc1\u79fb\u3002"]}),"\n",(0,t.jsxs)(r.p,{children:["\u5982\u679c\u4f60",(0,t.jsx)(r.strong,{children:"\u6ca1\u6709"}),"\u4f20\u9012 ",(0,t.jsx)(r.code,{children:"partialize"})," \u9009\u9879\uff0c\u4f60\u53ef\u80fd\u4f1a\u770b\u5230\u4e00\u4e9b\u7f16\u8bd1\u9519\u8bef\u3002\u5982\u679c\u4f60\u6ca1\u6709\u770b\u5230\u4efb\u4f55\u9519\u8bef\uff0c\u90a3\u4e48\u4e0d\u9700\u8981\u8fdb\u884c\u8fdb\u4e00\u6b65\u7684\u8fc1\u79fb\u3002"]}),"\n",(0,t.jsxs)(r.p,{children:["\u73b0\u5728\uff0c\u90e8\u5206\u5316\u72b6\u6001\u7684\u7c7b\u578b\u662f ",(0,t.jsx)(r.code,{children:"T"})," \u800c\u4e0d\u662f ",(0,t.jsx)(r.code,{children:"Partial<T>"}),"\uff0c\u8fd9\u4e0e\u9ed8\u8ba4 ",(0,t.jsx)(r.code,{children:"partialize"})," \u7684\u8fd0\u884c\u65f6\u884c\u4e3a\u4e00\u81f4\uff0c\u5373\u8eab\u4efd\u51fd\u6570\uff08",(0,t.jsx)(r.code,{children:"s => s"}),"\uff09\u3002"]}),"\n",(0,t.jsxs)(r.p,{children:["\u5982\u679c\u4f60\u770b\u5230\u4e00\u4e9b\u7f16\u8bd1\u9519\u8bef\uff0c\u4f60\u9700\u8981\u81ea\u5df1\u627e\u5230\u5e76\u4fee\u590d\u8fd9\u4e9b\u9519\u8bef\uff0c\u56e0\u4e3a\u5b83\u4eec\u53ef\u80fd\u8868\u793a\u4ee3\u7801\u6709\u95ee\u9898\u3002\u53e6\u4e00\u79cd\u89e3\u51b3\u65b9\u6cd5\u662f\u5c06 ",(0,t.jsx)(r.code,{children:"s => s as Partial<typeof s>"})," \u4f20\u9012\u7ed9 ",(0,t.jsx)(r.code,{children:"partialize"}),"\u3002\u5982\u679c\u4f60\u7684\u90e8\u5206\u5316\u72b6\u6001\u786e\u5b9e\u662f ",(0,t.jsx)(r.code,{children:"Partial<T>"}),"\uff0c\u4f60\u4e0d\u5e94\u8be5\u9047\u5230\u4efb\u4f55\u9519\u8bef\u3002"]}),"\n",(0,t.jsx)(r.p,{children:"\u8fd0\u884c\u65f6\u884c\u4e3a\u6ca1\u6709\u6539\u53d8\uff0c\u53ea\u662f\u73b0\u5728\u7684\u7c7b\u578b\u66f4\u51c6\u786e\u4e86\u3002"}),"\n",(0,t.jsx)(r.h2,{id:"redux",children:(0,t.jsx)(r.code,{children:"redux"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u9002\u7528\u7684\u5bfc\u5165"})}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"import { redux } from 'zustand/middleware'\n"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u53d8\u66f4"})}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-diff",children:"- redux:\r\n-   <T, A>(...) => ...\r\n+ redux:\r\n+   <T, A, Mps, Mcs>(...) => ...\n"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.strong,{children:"\u8fc1\u79fb"})}),"\n",(0,t.jsxs)(r.p,{children:["\u5982\u679c\u4f60\u6ca1\u6709\u5411 ",(0,t.jsx)(r.code,{children:"redux"})," \u4f20\u9012\u4efb\u4f55\u7c7b\u578b\u53c2\u6570\uff0c\u90a3\u4e48\u4e0d\u9700\u8981\u8fdb\u884c\u8fc1\u79fb\u3002"]}),"\n",(0,t.jsxs)(r.p,{children:["\u5982\u679c\u4f60\u6709\uff0c\u79fb\u9664\u6240\u6709\u7c7b\u578b\u53c2\u6570\uff0c\u5e76\u4e14\u53ea\u6ce8\u89e3\u7b2c\u4e8c\u4e2a\uff08\u52a8\u4f5c\uff09\u53c2\u6570\u3002\u4e5f\u5c31\u662f\u8bf4\uff0c\u5c06 ",(0,t.jsx)(r.code,{children:"redux<T, A>((state, action) => ..., ...)"})," \u66ff\u6362\u4e3a ",(0,t.jsx)(r.code,{children:"redux((state, action: A) => ..., ...)"}),"\u3002"]})]})}function x(e={}){const{wrapper:r}={...(0,s.R)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},8453:(e,r,n)=>{n.d(r,{R:()=>d,x:()=>i});var t=n(6540);const s={},c=t.createContext(s);function d(e){const r=t.useContext(c);return t.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function i(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:d(e.components),t.createElement(c.Provider,{value:r},e.children)}}}]);