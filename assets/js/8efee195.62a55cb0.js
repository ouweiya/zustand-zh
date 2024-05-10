"use strict";(self.webpackChunkzustand_zh=self.webpackChunkzustand_zh||[]).push([[265],{4783:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>i,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var s=t(4848),n=t(8453);const o={title:"\u81ea\u52a8\u751f\u6210\u9009\u62e9\u5668",nav:6},a=void 0,c={id:"guides/auto-generating-selectors",title:"\u81ea\u52a8\u751f\u6210\u9009\u62e9\u5668",description:"\u6211\u4eec\u5efa\u8bae\u5728\u4f7f\u7528\u5b58\u50a8\u7684\u5c5e\u6027\u6216\u64cd\u4f5c\u65f6\u4f7f\u7528\u9009\u62e9\u5668\u3002\u4f60\u53ef\u4ee5\u50cf\u8fd9\u6837\u4ece\u5b58\u50a8\u4e2d\u83b7\u53d6\u503c\uff1a",source:"@site/docs/guides/auto-generating-selectors.md",sourceDirName:"guides",slug:"/guides/auto-generating-selectors",permalink:"/zustand-zh/docs/guides/auto-generating-selectors",draft:!1,unlisted:!1,editUrl:"https://github.com/ouweiya/zustand-zh/blob/master/docs/guides/auto-generating-selectors.md",tags:[],version:"current",frontMatter:{title:"\u81ea\u52a8\u751f\u6210\u9009\u62e9\u5668",nav:6},sidebar:"tutorialSidebar",previous:{title:"\u53d7Flux\u542f\u53d1\u7684\u5b9e\u8df5",permalink:"/zustand-zh/docs/guides/flux-inspired-practice"},next:{title:"\u65e0\u5b58\u50a8\u64cd\u4f5c\u7684\u5b9e\u8df5",permalink:"/zustand-zh/docs/guides/practice-with-no-store-actions"}},i={},l=[{value:"\u521b\u5efa\u4ee5\u4e0b\u51fd\u6570\uff1a<code>createSelectors</code>",id:"create-the-following-function:-createselectors",level:2},{value:"Vanilla Store",id:"vanilla-store",level:2},{value:"\u5b9e\u65f6\u6f14\u793a",id:"live-demo",level:2},{value:"\u7b2c\u4e09\u65b9\u5e93",id:"third-party-libraries",level:2}];function d(e){const r={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,n.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r.p,{children:"\u6211\u4eec\u5efa\u8bae\u5728\u4f7f\u7528\u5b58\u50a8\u7684\u5c5e\u6027\u6216\u64cd\u4f5c\u65f6\u4f7f\u7528\u9009\u62e9\u5668\u3002\u4f60\u53ef\u4ee5\u50cf\u8fd9\u6837\u4ece\u5b58\u50a8\u4e2d\u83b7\u53d6\u503c\uff1a"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"const bears = useBearStore((state) => state.bears)\n"})}),"\n",(0,s.jsx)(r.p,{children:"\u7136\u800c\uff0c\u7f16\u5199\u8fd9\u4e9b\u53ef\u80fd\u4f1a\u5f88\u7e41\u7410\u3002\u5982\u679c\u4f60\u4e5f\u6709\u8fd9\u79cd\u611f\u89c9\uff0c\u4f60\u53ef\u4ee5\u81ea\u52a8\u751f\u6210\u4f60\u7684\u9009\u62e9\u5668\u3002"}),"\n",(0,s.jsxs)(r.h2,{id:"create-the-following-function:-createselectors",children:["\u521b\u5efa\u4ee5\u4e0b\u51fd\u6570\uff1a",(0,s.jsx)(r.code,{children:"createSelectors"})]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"import { StoreApi, UseBoundStore } from 'zustand'\r\n\r\ntype WithSelectors<S> = S extends { getState: () => infer T }\r\n  ? S & { use: { [K in keyof T]: () => T[K] } }\r\n  : never\r\n\r\nconst createSelectors = <S extends UseBoundStore<StoreApi<object>>>(\r\n  _store: S,\r\n) => {\r\n  let store = _store as WithSelectors<typeof _store>\r\n  store.use = {}\r\n  for (let k of Object.keys(store.getState())) {\r\n    ;(store.use as any)[k] = () => store((s) => s[k as keyof typeof s])\r\n  }\r\n\r\n  return store\r\n}\n"})}),"\n",(0,s.jsx)(r.p,{children:"\u5982\u679c\u4f60\u6709\u4e00\u4e2a\u50cf\u8fd9\u6837\u7684\u5b58\u50a8\uff1a"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"interface BearState {\r\n  bears: number\r\n  increase: (by: number) => void\r\n  increment: () => void\r\n}\r\n\r\nconst useBearStoreBase = create<BearState>()((set) => ({\r\n  bears: 0,\r\n  increase: (by) => set((state) => ({ bears: state.bears + by })),\r\n  increment: () => set((state) => ({ bears: state.bears + 1 })),\r\n}))\n"})}),"\n",(0,s.jsx)(r.p,{children:"\u5c06\u8be5\u51fd\u6570\u5e94\u7528\u5230\u4f60\u7684\u5b58\u50a8\uff1a"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"const useBearStore = createSelectors(useBearStoreBase)\n"})}),"\n",(0,s.jsx)(r.p,{children:"\u73b0\u5728\u9009\u62e9\u5668\u5df2\u7ecf\u81ea\u52a8\u751f\u6210\uff0c\u4f60\u53ef\u4ee5\u76f4\u63a5\u8bbf\u95ee\u5b83\u4eec\uff1a"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"// \u83b7\u53d6\u5c5e\u6027\r\nconst bears = useBearStore.use.bears()\r\n\r\n// \u83b7\u53d6\u64cd\u4f5c\r\nconst increment = useBearStore.use.increment()\n"})}),"\n",(0,s.jsx)(r.h2,{id:"vanilla-store",children:"Vanilla Store"}),"\n",(0,s.jsxs)(r.p,{children:["\u5982\u679c\u4f60\u6b63\u5728\u4f7f\u7528\u4e00\u4e2a\u666e\u901a\u7684\u5b58\u50a8\uff0c\u4f7f\u7528\u4ee5\u4e0b\u7684 ",(0,s.jsx)(r.code,{children:"createSelectors"})," \u51fd\u6570\uff1a"]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"import { StoreApi, useStore } from 'zustand'\r\n\r\ntype WithSelectors<S> = S extends { getState: () => infer T }\r\n  ? S & { use: { [K in keyof T]: () => T[K] } }\r\n  : never\r\n\r\nconst createSelectors = <S extends StoreApi<object>>(_store: S) => {\r\n  const store = _store as WithSelectors<typeof _store>\r\n  store.use = {}\r\n  for (const k of Object.keys(store.getState())) {\r\n    ;(store.use as any)[k] = () =>\r\n      useStore(_store, (s) => s[k as keyof typeof s])\r\n  }\r\n\r\n  return store\r\n}\n"})}),"\n",(0,s.jsx)(r.p,{children:"\u4f7f\u7528\u65b9\u5f0f\u4e0e React \u5b58\u50a8\u76f8\u540c\u3002\u5982\u679c\u4f60\u6709\u4e00\u4e2a\u50cf\u8fd9\u6837\u7684\u5b58\u50a8\uff1a"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"import { createStore } from 'zustand'\r\n\r\ninterface BearState {\r\n  bears: number\r\n  increase: (by: number) => void\r\n  increment: () => void\r\n}\r\n\r\nconst store = createStore<BearState>((set) => ({\r\n  bears: 0,\r\n  increase: (by) => set((state) => ({ bears: state.bears + by })),\r\n  increment: () => set((state) => ({ bears: state.bears + 1 })),\r\n}))\n"})}),"\n",(0,s.jsx)(r.p,{children:"\u5c06\u8be5\u51fd\u6570\u5e94\u7528\u5230\u4f60\u7684\u5b58\u50a8\uff1a"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"const useBearStore = createSelectors(store)\n"})}),"\n",(0,s.jsx)(r.p,{children:"\u73b0\u5728\u9009\u62e9\u5668\u5df2\u7ecf\u81ea\u52a8\u751f\u6210\uff0c\u4f60\u53ef\u4ee5\u76f4\u63a5\u8bbf\u95ee\u5b83\u4eec\uff1a"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"// \u83b7\u53d6\u5c5e\u6027\r\nconst bears = useBearStore.use.bears()\r\n\r\n// \u83b7\u53d6\u64cd\u4f5c\r\nconst increment = useBearStore.use.increment()\n"})}),"\n",(0,s.jsx)(r.h2,{id:"live-demo",children:"\u5b9e\u65f6\u6f14\u793a"}),"\n",(0,s.jsxs)(r.p,{children:["\u6709\u5173\u6b64\u7684\u5de5\u4f5c\u793a\u4f8b\uff0c\u8bf7\u53c2\u89c1 ",(0,s.jsx)(r.a,{href:"https://codesandbox.io/s/zustand-auto-generate-selectors-forked-rl8v5e?file=/src/selectors.ts",children:"Code Sandbox"}),"\u3002"]}),"\n",(0,s.jsx)(r.h2,{id:"third-party-libraries",children:"\u7b2c\u4e09\u65b9\u5e93"}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsx)(r.li,{children:(0,s.jsx)(r.a,{href:"https://github.com/Albert-Gao/auto-zustand-selectors-hook",children:"auto-zustand-selectors-hook"})}),"\n",(0,s.jsx)(r.li,{children:(0,s.jsx)(r.a,{href:"https://github.com/dai-shi/react-hooks-global-state",children:"react-hooks-global-state"})}),"\n",(0,s.jsx)(r.li,{children:(0,s.jsx)(r.a,{href:"https://github.com/udecode/zustood",children:"zustood"})}),"\n",(0,s.jsx)(r.li,{children:(0,s.jsx)(r.a,{href:"https://www.npmjs.com/package/@davstack/store",children:"@davstack/store"})}),"\n"]})]})}function u(e={}){const{wrapper:r}={...(0,n.R)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,r,t)=>{t.d(r,{R:()=>a,x:()=>c});var s=t(6540);const n={},o=s.createContext(n);function a(e){const r=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function c(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:a(e.components),s.createElement(o.Provider,{value:r},e.children)}}}]);