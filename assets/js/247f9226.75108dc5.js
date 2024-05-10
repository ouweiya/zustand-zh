"use strict";(self.webpackChunkzustand_zh=self.webpackChunkzustand_zh||[]).push([[99],{807:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>i,default:()=>m,frontMatter:()=>s,metadata:()=>d,toc:()=>l});var r=t(4848),a=t(8453);const s={title:"Immer middleware",nav:16},i=void 0,d={id:"integrations/immer-middleware",title:"Immer middleware",description:"The Immer middleware enables you",source:"@site/docs/integrations/immer-middleware.md",sourceDirName:"integrations",slug:"/integrations/immer-middleware",permalink:"/zustand-zh/docs/integrations/immer-middleware",draft:!1,unlisted:!1,editUrl:"https://github.com/ouweiya/zustand-zh/blob/master/docs/integrations/immer-middleware.md",tags:[],version:"current",frontMatter:{title:"Immer middleware",nav:16},sidebar:"tutorialSidebar",previous:{title:"Setup with Next.js",permalink:"/zustand-zh/docs/guides/nextjs"},next:{title:"Third-party Libraries",permalink:"/zustand-zh/docs/integrations/third-party-libraries"}},o={},l=[{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2},{value:"Gotchas",id:"gotchas",level:2},{value:"My subscriptions aren&#39;t being called",id:"my-subscriptions-aren't-being-called",level:3},{value:"CodeSandbox Demo",id:"codesandbox-demo",level:2}];function c(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.a,{href:"https://github.com/immerjs/immer",children:"Immer"})," middleware enables you\r\nto use immutable state in a more convenient way.\r\nAlso, with Immer, you can simplify handling\r\nimmutable data structures in Zustand."]}),"\n",(0,r.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,r.jsx)(n.p,{children:"In order to use the Immer middleware in Zustand,\r\nyou will need to install Immer as a direct dependency."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"npm install immer\n"})}),"\n",(0,r.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,r.jsxs)(n.p,{children:["(Notice the extra parentheses after the type parameter as mentioned in the ",(0,r.jsx)(n.a,{href:"/zustand-zh/docs/guides/typescript",children:"Typescript Guide"}),")."]}),"\n",(0,r.jsx)(n.p,{children:"Updating simple states"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"import { create } from 'zustand'\r\nimport { immer } from 'zustand/middleware/immer'\r\n\r\ntype State = {\r\n  count: number\r\n}\r\n\r\ntype Actions = {\r\n  increment: (qty: number) => void\r\n  decrement: (qty: number) => void\r\n}\r\n\r\nexport const useCountStore = create<State & Actions>()(\r\n  immer((set) => ({\r\n    count: 0,\r\n    increment: (qty: number) =>\r\n      set((state) => {\r\n        state.count += qty\r\n      }),\r\n    decrement: (qty: number) =>\r\n      set((state) => {\r\n        state.count -= qty\r\n      }),\r\n  })),\r\n)\n"})}),"\n",(0,r.jsx)(n.p,{children:"Updating complex states"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"import { create } from 'zustand'\r\nimport { immer } from 'zustand/middleware/immer'\r\n\r\ninterface Todo {\r\n  id: string\r\n  title: string\r\n  done: boolean\r\n}\r\n\r\ntype State = {\r\n  todos: Record<string, Todo>\r\n}\r\n\r\ntype Actions = {\r\n  toggleTodo: (todoId: string) => void\r\n}\r\n\r\nexport const useTodoStore = create<State & Actions>()(\r\n  immer((set) => ({\r\n    todos: {\r\n      '82471c5f-4207-4b1d-abcb-b98547e01a3e': {\r\n        id: '82471c5f-4207-4b1d-abcb-b98547e01a3e',\r\n        title: 'Learn Zustand',\r\n        done: false,\r\n      },\r\n      '354ee16c-bfdd-44d3-afa9-e93679bda367': {\r\n        id: '354ee16c-bfdd-44d3-afa9-e93679bda367',\r\n        title: 'Learn Jotai',\r\n        done: false,\r\n      },\r\n      '771c85c5-46ea-4a11-8fed-36cc2c7be344': {\r\n        id: '771c85c5-46ea-4a11-8fed-36cc2c7be344',\r\n        title: 'Learn Valtio',\r\n        done: false,\r\n      },\r\n      '363a4bac-083f-47f7-a0a2-aeeee153a99c': {\r\n        id: '363a4bac-083f-47f7-a0a2-aeeee153a99c',\r\n        title: 'Learn Signals',\r\n        done: false,\r\n      },\r\n    },\r\n    toggleTodo: (todoId: string) =>\r\n      set((state) => {\r\n        state.todos[todoId].done = !state.todos[todoId].done\r\n      }),\r\n  })),\r\n)\n"})}),"\n",(0,r.jsx)(n.h2,{id:"gotchas",children:"Gotchas"}),"\n",(0,r.jsx)(n.p,{children:"In this section you will find some things\r\nthat you need to keep in mind when using Zustand with Immer."}),"\n",(0,r.jsx)(n.h3,{id:"my-subscriptions-aren't-being-called",children:"My subscriptions aren't being called"}),"\n",(0,r.jsxs)(n.p,{children:["If you are using Immer,\r\nmake sure you are actually following\r\n",(0,r.jsx)(n.a,{href:"https://immerjs.github.io/immer/pitfalls",children:"the rules of Immer"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["For example, you have to add ",(0,r.jsx)(n.code,{children:"[immerable] = true"})," for\r\n",(0,r.jsx)(n.a,{href:"https://immerjs.github.io/immer/complex-objects",children:"class objects"})," to work.\r\nIf you don't do this, Immer will still mutate the object,\r\nbut not as a proxy, so it will also update the current state.\r\nZustand checks if the state has actually changed,\r\nso since both the current state and the next state are\r\nequal (if you don't do it correctly),\r\nZustand will skip calling the subscriptions."]}),"\n",(0,r.jsx)(n.h2,{id:"codesandbox-demo",children:"CodeSandbox Demo"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://codesandbox.io/p/sandbox/zustand-updating-draft-states-basic-demo-forked-96mkdw",children:"Basic"}),","]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://codesandbox.io/p/sandbox/zustand-updating-draft-states-advanced-demo-forked-phkzzg",children:"Advanced"}),"."]}),"\n"]})]})}function m(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>d});var r=t(6540);const a={},s=r.createContext(a);function i(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);