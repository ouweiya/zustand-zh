"use strict";(self.webpackChunkzustand_zh=self.webpackChunkzustand_zh||[]).push([[305],{5682:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>a,contentTitle:()=>c,default:()=>l,frontMatter:()=>d,metadata:()=>i,toc:()=>o});var n=s(4848),r=s(8453);const d={title:"\u53d7Flux\u542f\u53d1\u7684\u5b9e\u8df5",nav:5},c=void 0,i={id:"guides/flux-inspired-practice",title:"\u53d7Flux\u542f\u53d1\u7684\u5b9e\u8df5",description:"\u5c3d\u7ba1 Zustand \u662f\u4e00\u4e2a\u65e0\u504f\u89c1\u7684\u5e93\uff0c\u4f46\u6211\u4eec\u786e\u5b9e\u63a8\u8350\u4e00\u4e9b\u6a21\u5f0f\u3002",source:"@site/docs/guides/flux-inspired-practice.md",sourceDirName:"guides",slug:"/guides/flux-inspired-practice",permalink:"/zustand-zh/docs/guides/flux-inspired-practice",draft:!1,unlisted:!1,editUrl:"https://github.com/ouweiya/zustand-zh/blob/master/docs/guides/flux-inspired-practice.md",tags:[],version:"current",frontMatter:{title:"\u53d7Flux\u542f\u53d1\u7684\u5b9e\u8df5",nav:5},sidebar:"tutorialSidebar",previous:{title:"\u4e0d\u53ef\u53d8\u72b6\u6001\u548c\u5408\u5e76",permalink:"/zustand-zh/docs/guides/immutable-state-and-merging"},next:{title:"\u81ea\u52a8\u751f\u6210\u9009\u62e9\u5668",permalink:"/zustand-zh/docs/guides/auto-generating-selectors"}},a={},o=[{value:"\u63a8\u8350\u7684\u6a21\u5f0f",id:"recommended-patterns",level:2},{value:"\u5355\u4e00\u5b58\u50a8",id:"single-store",level:3},{value:"\u4f7f\u7528 <code>set</code> / <code>setState</code> \u66f4\u65b0\u5b58\u50a8 {#use-<code>set</code>-/-<code>setstate</code>-to-update-the-store}",id:"use-set-/-setstate-to-update-the-store",level:3},{value:"\u5c06\u5b58\u50a8\u64cd\u4f5c\u653e\u5728\u4e00\u8d77",id:"colocate-store-actions",level:3},{value:"\u7c7b Redux \u6a21\u5f0f",id:"redux-like-patterns",level:2}];function u(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(t.p,{children:["\u5c3d\u7ba1 Zustand \u662f\u4e00\u4e2a\u65e0\u504f\u89c1\u7684\u5e93\uff0c\u4f46\u6211\u4eec\u786e\u5b9e\u63a8\u8350\u4e00\u4e9b\u6a21\u5f0f\u3002\r\n\u8fd9\u4e9b\u6a21\u5f0f\u53d7\u5230\u6700\u521d\u5728 ",(0,n.jsx)(t.a,{href:"https://github.com/facebookarchive/flux",children:"Flux"})," \u4e2d\u53d1\u73b0\u7684\u5b9e\u8df5\u7684\u542f\u53d1\uff0c\r\n\u4ee5\u53ca\u6700\u8fd1\u7684 ",(0,n.jsx)(t.a,{href:"https://redux.js.org/understanding/thinking-in-redux/three-principles",children:"Redux"}),"\uff0c\r\n\u6240\u4ee5\u5982\u679c\u4f60\u6765\u81ea\u5176\u4ed6\u5e93\uff0c\u4f60\u5e94\u8be5\u611f\u5230\u975e\u5e38\u719f\u6089\u3002"]}),"\n",(0,n.jsx)(t.p,{children:"\u7136\u800c\uff0cZustand \u5728\u4e00\u4e9b\u57fa\u672c\u65b9\u5f0f\u4e0a\u786e\u5b9e\u6709\u6240\u4e0d\u540c\uff0c\r\n\u6240\u4ee5\u4e00\u4e9b\u672f\u8bed\u53ef\u80fd\u4e0d\u4f1a\u5b8c\u5168\u5bf9\u5e94\u5176\u4ed6\u5e93\u3002"}),"\n",(0,n.jsx)(t.h2,{id:"recommended-patterns",children:"\u63a8\u8350\u7684\u6a21\u5f0f"}),"\n",(0,n.jsx)(t.h3,{id:"single-store",children:"\u5355\u4e00\u5b58\u50a8"}),"\n",(0,n.jsx)(t.p,{children:"\u4f60\u7684\u5e94\u7528\u5168\u5c40\u72b6\u6001\u5e94\u8be5\u4f4d\u4e8e\u5355\u4e00\u7684 Zustand \u5b58\u50a8\u4e2d\u3002"}),"\n",(0,n.jsxs)(t.p,{children:["\u5982\u679c\u4f60\u6709\u4e00\u4e2a\u5927\u578b\u5e94\u7528\uff0cZustand \u652f\u6301",(0,n.jsx)(t.a,{href:"/zustand-zh/docs/guides/slices-pattern",children:"\u5c06\u5b58\u50a8\u5206\u5272\u6210\u5207\u7247"}),"\u3002"]}),"\n",(0,n.jsxs)(t.h3,{id:"use-set-/-setstate-to-update-the-store",children:["\u4f7f\u7528 ",(0,n.jsx)(t.code,{children:"set"})," / ",(0,n.jsx)(t.code,{children:"setState"})," \u66f4\u65b0\u5b58\u50a8 {#use-",(0,n.jsx)(t.code,{children:"set"}),"-/-",(0,n.jsx)(t.code,{children:"setstate"}),"-to-update-the-store}"]}),"\n",(0,n.jsxs)(t.p,{children:["\u59cb\u7ec8\u4f7f\u7528 ",(0,n.jsx)(t.code,{children:"set"}),"\uff08\u6216 ",(0,n.jsx)(t.code,{children:"setState"}),"\uff09\u6765\u66f4\u65b0\u4f60\u7684\u5b58\u50a8\u3002\r\n",(0,n.jsx)(t.code,{children:"set"}),"\uff08\u548c ",(0,n.jsx)(t.code,{children:"setState"}),"\uff09\u786e\u4fdd\u6240\u63cf\u8ff0\u7684\u66f4\u65b0\u88ab\u6b63\u786e\u5730\u5408\u5e76\uff0c\u76d1\u542c\u5668\u88ab\u9002\u5f53\u5730\u901a\u77e5\u3002"]}),"\n",(0,n.jsx)(t.h3,{id:"colocate-store-actions",children:"\u5c06\u5b58\u50a8\u64cd\u4f5c\u653e\u5728\u4e00\u8d77"}),"\n",(0,n.jsx)(t.p,{children:"\u5728 Zustand \u4e2d\uff0c\u72b6\u6001\u53ef\u4ee5\u5728\u6ca1\u6709 Flux \u5e93\u4e2d\u627e\u5230\u7684\u5206\u6d3e\u64cd\u4f5c\u548c reducer \u7684\u60c5\u51b5\u4e0b\u66f4\u65b0\u3002\r\n\u8fd9\u4e9b\u5b58\u50a8\u64cd\u4f5c\u53ef\u4ee5\u76f4\u63a5\u6dfb\u52a0\u5230\u5b58\u50a8\u4e2d\uff0c\u5982\u4e0b\u6240\u793a\u3002"}),"\n",(0,n.jsxs)(t.p,{children:["\u53ef\u9009\u5730\uff0c\u901a\u8fc7\u4f7f\u7528 ",(0,n.jsx)(t.code,{children:"setState"}),"\uff0c\u5b83\u4eec\u53ef\u4ee5",(0,n.jsx)(t.a,{href:"/zustand-zh/docs/guides/practice-with-no-store-actions",children:"\u4f4d\u4e8e\u5b58\u50a8\u5916\u90e8"})]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"const useBoundStore = create((set) => ({\r\n    storeSliceA: ...,\r\n    storeSliceB: ...,\r\n    storeSliceC: ...,\r\n    updateX: () => set(...),\r\n    updateY: () => set(...),\r\n}))\n"})}),"\n",(0,n.jsx)(t.h2,{id:"redux-like-patterns",children:"\u7c7b Redux \u6a21\u5f0f"}),"\n",(0,n.jsxs)(t.p,{children:["\u5982\u679c\u4f60\u4e0d\u80fd\u6ca1\u6709\u7c7b Redux \u7684 reducer\uff0c\u4f60\u53ef\u4ee5\u5728\u5b58\u50a8\u7684\u6839\u7ea7\u522b\u5b9a\u4e49\u4e00\u4e2a ",(0,n.jsx)(t.code,{children:"dispatch"})," \u51fd\u6570\uff1a"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"const types = { increase: 'INCREASE', decrease: 'DECREASE' }\r\n\r\nconst reducer = (state, { type, by = 1 }) => {\r\n    switch (type) {\r\n        case types.increase:\r\n            return { grumpiness: state.grumpiness + by }\r\n        case types.decrease:\r\n            return { grumpiness: state.grumpiness - by }\r\n    }\r\n}\r\n\r\nconst useGrumpyStore = create((set) => ({\r\n    grumpiness: 0,\r\n    dispatch: (args) => set((state) => reducer(state, args)),\r\n}))\r\n\r\nconst dispatch = useGrumpyStore((state) => state.dispatch)\r\ndispatch({ type: types.increase, by: 2 })\n"})}),"\n",(0,n.jsx)(t.p,{children:"\u4f60\u4e5f\u53ef\u4ee5\u4f7f\u7528\u6211\u4eec\u7684 redux-middleware\u3002\u5b83\u8fde\u63a5\u4f60\u7684\u4e3b reducer\uff0c\u8bbe\u7f6e\u521d\u59cb\u72b6\u6001\uff0c\u5e76\u5c06 dispatch \u51fd\u6570\u6dfb\u52a0\u5230\u72b6\u6001\u672c\u8eab\u548c vanilla api\u3002"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"import { redux } from 'zustand/middleware'\r\n\r\nconst useReduxStore = create(redux(reducer, initialState))\n"})}),"\n",(0,n.jsxs)(t.p,{children:["\u66f4\u65b0\u5b58\u50a8\u7684\u53e6\u4e00\u79cd\u65b9\u5f0f\u53ef\u80fd\u662f\u901a\u8fc7\u5305\u88c5\u72b6\u6001\u51fd\u6570\u7684\u51fd\u6570\u3002\u8fd9\u4e9b\u4e5f\u53ef\u4ee5\u5904\u7406\u64cd\u4f5c\u7684\u526f\u4f5c\u7528\u3002\u4f8b\u5982\uff0c\u4f7f\u7528 HTTP \u8c03\u7528\u3002\u8981\u4ee5\u975e\u53cd\u5e94\u65b9\u5f0f\u4f7f\u7528 Zustand\uff0c\u8bf7\u53c2\u9605",(0,n.jsx)(t.a,{href:"https://github.com/pmndrs/zustand#readingwriting-state-and-reacting-to-changes-outside-of-components",children:"\u81ea\u8ff0\u6587\u4ef6"}),"\u3002"]})]})}function l(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(u,{...e})}):u(e)}},8453:(e,t,s)=>{s.d(t,{R:()=>c,x:()=>i});var n=s(6540);const r={},d=n.createContext(r);function c(e){const t=n.useContext(d);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:c(e.components),n.createElement(d.Provider,{value:t},e.children)}}}]);