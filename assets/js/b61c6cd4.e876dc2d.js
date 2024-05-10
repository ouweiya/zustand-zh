"use strict";(self.webpackChunkzustand_zh=self.webpackChunkzustand_zh||[]).push([[478],{7620:(e,r,s)=>{s.r(r),s.d(r,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>i,metadata:()=>o,toc:()=>c});var t=s(4848),n=s(8453);const i={title:"Slices Pattern",nav:15},a=void 0,o={id:"guides/slices-pattern",title:"Slices Pattern",description:"Slicing the store into smaller stores",source:"@site/docs/guides/slices-pattern.md",sourceDirName:"guides",slug:"/guides/slices-pattern",permalink:"/zustand-zh/docs/guides/slices-pattern",draft:!1,unlisted:!1,editUrl:"https://github.com/ouweiya/zustand-zh/docs/guides/slices-pattern.md",tags:[],version:"current",frontMatter:{title:"Slices Pattern",nav:15},sidebar:"tutorialSidebar",previous:{title:"Prevent rerenders with useShallow",permalink:"/zustand-zh/docs/guides/prevent-rerenders-with-use-shallow"},next:{title:"SSR and Hydration",permalink:"/zustand-zh/docs/guides/ssr-and-hydration"}},d={},c=[{value:"Slicing the store into smaller stores",id:"slicing-the-store-into-smaller-stores",level:2},{value:"Usage in a React component",id:"usage-in-a-react-component",level:3},{value:"Updating multiple stores",id:"updating-multiple-stores",level:3},{value:"Adding middlewares",id:"adding-middlewares",level:2},{value:"Usage with TypeScript",id:"usage-with-typescript",level:2}];function l(e){const r={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,n.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.h2,{id:"slicing-the-store-into-smaller-stores",children:"Slicing the store into smaller stores"}),"\n",(0,t.jsx)(r.p,{children:"Your store can become bigger and bigger and tougher to maintain as you add more features."}),"\n",(0,t.jsx)(r.p,{children:"You can divide your main store into smaller individual stores to achieve modularity. This is simple to accomplish in Zustand!"}),"\n",(0,t.jsx)(r.p,{children:"The first individual store:"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-js",children:"export const createFishSlice = (set) => ({\r\n  fishes: 0,\r\n  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),\r\n})\n"})}),"\n",(0,t.jsx)(r.p,{children:"Another individual store:"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-js",children:"export const createBearSlice = (set) => ({\r\n  bears: 0,\r\n  addBear: () => set((state) => ({ bears: state.bears + 1 })),\r\n  eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),\r\n})\n"})}),"\n",(0,t.jsxs)(r.p,{children:["You can now combine both the stores into ",(0,t.jsx)(r.strong,{children:"one bounded store"}),":"]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-js",children:"import { create } from 'zustand'\r\nimport { createBearSlice } from './bearSlice'\r\nimport { createFishSlice } from './fishSlice'\r\n\r\nexport const useBoundStore = create((...a) => ({\r\n  ...createBearSlice(...a),\r\n  ...createFishSlice(...a),\r\n}))\n"})}),"\n",(0,t.jsx)(r.h3,{id:"usage-in-a-react-component",children:"Usage in a React component"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-jsx",children:"import { useBoundStore } from './stores/useBoundStore'\r\n\r\nfunction App() {\r\n  const bears = useBoundStore((state) => state.bears)\r\n  const fishes = useBoundStore((state) => state.fishes)\r\n  const addBear = useBoundStore((state) => state.addBear)\r\n  return (\r\n    <div>\r\n      <h2>Number of bears: {bears}</h2>\r\n      <h2>Number of fishes: {fishes}</h2>\r\n      <button onClick={() => addBear()}>Add a bear</button>\r\n    </div>\r\n  )\r\n}\r\n\r\nexport default App\n"})}),"\n",(0,t.jsx)(r.h3,{id:"updating-multiple-stores",children:"Updating multiple stores"}),"\n",(0,t.jsx)(r.p,{children:"You can update multiple stores, at the same time, in a single function."}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-js",children:"export const createBearFishSlice = (set, get) => ({\r\n  addBearAndFish: () => {\r\n    get().addBear()\r\n    get().addFish()\r\n  },\r\n})\n"})}),"\n",(0,t.jsx)(r.p,{children:"Combining all the stores together is the same as before."}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-js",children:"import { create } from 'zustand'\r\nimport { createBearSlice } from './bearSlice'\r\nimport { createFishSlice } from './fishSlice'\r\nimport { createBearFishSlice } from './createBearFishSlice'\r\n\r\nexport const useBoundStore = create((...a) => ({\r\n  ...createBearSlice(...a),\r\n  ...createFishSlice(...a),\r\n  ...createBearFishSlice(...a),\r\n}))\n"})}),"\n",(0,t.jsx)(r.h2,{id:"adding-middlewares",children:"Adding middlewares"}),"\n",(0,t.jsx)(r.p,{children:"Adding middlewares to a combined store is the same as with other normal stores."}),"\n",(0,t.jsxs)(r.p,{children:["Adding ",(0,t.jsx)(r.code,{children:"persist"})," middleware to our ",(0,t.jsx)(r.code,{children:"useBoundStore"}),":"]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-js",children:"import { create } from 'zustand'\r\nimport { createBearSlice } from './bearSlice'\r\nimport { createFishSlice } from './fishSlice'\r\nimport { persist } from 'zustand/middleware'\r\n\r\nexport const useBoundStore = create(\r\n  persist(\r\n    (...a) => ({\r\n      ...createBearSlice(...a),\r\n      ...createFishSlice(...a),\r\n    }),\r\n    { name: 'bound-store' },\r\n  ),\r\n)\n"})}),"\n",(0,t.jsx)(r.p,{children:"Please keep in mind you should only apply middlewares in the combined store. Applying them inside individual slices can lead to unexpected issues."}),"\n",(0,t.jsx)(r.h2,{id:"usage-with-typescript",children:"Usage with TypeScript"}),"\n",(0,t.jsxs)(r.p,{children:["A detailed guide on how to use the slice pattern in Zustand with TypeScript can be found ",(0,t.jsx)(r.a,{href:"/zustand-zh/docs/guides/typescript#slices-pattern",children:"here"}),"."]})]})}function h(e={}){const{wrapper:r}={...(0,n.R)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},8453:(e,r,s)=>{s.d(r,{R:()=>a,x:()=>o});var t=s(6540);const n={},i=t.createContext(n);function a(e){const r=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function o(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:a(e.components),t.createElement(i.Provider,{value:r},e.children)}}}]);