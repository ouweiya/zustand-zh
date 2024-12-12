"use strict";(self.webpackChunkzustand_zh=self.webpackChunkzustand_zh||[]).push([[8711],{379:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>c,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>i});const s=JSON.parse('{"id":"guides/maps-and-sets-usage","title":"Map \u548c Set \u7684\u4f7f\u7528","description":"\u4f60\u9700\u8981\u5c06 Map \u548c Set \u5305\u88c5\u5728\u4e00\u4e2a\u5bf9\u8c61\u5185\u3002\u5f53\u4f60\u5e0c\u671b\u5b83\u7684\u66f4\u65b0\u88ab\u53cd\u6620\u51fa\u6765\uff08\u4f8b\u5982\uff0c\u5728 React \u4e2d\uff09\uff0c","source":"@site/docs/guides/maps-and-sets-usage.md","sourceDirName":"guides","slug":"/guides/maps-and-sets-usage","permalink":"/zustand-zh/docs/guides/maps-and-sets-usage","draft":false,"unlisted":false,"editUrl":"https://github.com/ouweiya/zustand-zh/blob/master/docs/guides/maps-and-sets-usage.md","tags":[],"version":"current","frontMatter":{"title":"Map \u548c Set \u7684\u4f7f\u7528","nav":11},"sidebar":"tutorialSidebar","previous":{"title":"\u5728 React 18 \u4e4b\u524d\u7684\u7248\u672c\u4e2d\uff0c\u5982\u4f55\u5728 React \u4e8b\u4ef6\u5904\u7406\u5668\u5916\u90e8\u8c03\u7528\u64cd\u4f5c","permalink":"/zustand-zh/docs/guides/event-handler-in-pre-react-18"},"next":{"title":"\u5c06URL\u8fde\u63a5\u5230\u72b6\u6001","permalink":"/zustand-zh/docs/guides/connect-to-state-with-url-hash"}}');var a=n(4848),r=n(8453);const o={title:"Map \u548c Set \u7684\u4f7f\u7528",nav:11},c=void 0,d={},i=[];function u(e){const t={a:"a",code:"code",p:"p",pre:"pre",strong:"strong",...(0,r.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(t.p,{children:["\u4f60\u9700\u8981\u5c06 Map \u548c Set \u5305\u88c5\u5728\u4e00\u4e2a\u5bf9\u8c61\u5185\u3002\u5f53\u4f60\u5e0c\u671b\u5b83\u7684\u66f4\u65b0\u88ab\u53cd\u6620\u51fa\u6765\uff08\u4f8b\u5982\uff0c\u5728 React \u4e2d\uff09\uff0c\r\n\u4f60\u53ef\u4ee5\u901a\u8fc7\u8c03\u7528 ",(0,a.jsx)(t.code,{children:"setState"})," \u6765\u5b9e\u73b0\uff1a"]}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsxs)(t.strong,{children:["\u4f60\u53ef\u4ee5\u5728\u8fd9\u91cc\u67e5\u770b\u4e00\u4e2a codesandbox\uff1a",(0,a.jsx)(t.a,{href:"https://codesandbox.io/s/late-https-bxz9qy",children:"https://codesandbox.io/s/late-https-bxz9qy"})]})}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-js",children:"import { create } from 'zustand'\r\n\r\nconst useFooBar = create(() => ({ foo: new Map(), bar: new Set() }))\r\n\r\nfunction doSomething() {\r\n    // \u505a\u4e00\u4e9b\u4e8b\u60c5...\r\n\r\n    // \u5982\u679c\u4f60\u60f3\u66f4\u65b0\u4e00\u4e9b\u4f7f\u7528 `useFooBar` \u7684 React \u7ec4\u4ef6\uff0c\u4f60\u5fc5\u987b\u8c03\u7528 setState\r\n    // \u6765\u8ba9 React \u77e5\u9053\u53d1\u751f\u4e86\u66f4\u65b0\u3002\r\n    // \u6309\u7167 React \u7684\u6700\u4f73\u5b9e\u8df5\uff0c\u4f60\u5e94\u8be5\u5728\u66f4\u65b0\u5b83\u4eec\u65f6\u521b\u5efa\u4e00\u4e2a\u65b0\u7684 Map/Set\uff1a\r\n    useFooBar.setState((prev) => ({\r\n        foo: new Map(prev.foo).set('newKey', 'newValue'),\r\n        bar: new Set(prev.bar).add('newKey'),\r\n    }))\r\n}\n"})})]})}function p(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(u,{...e})}):u(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>c});var s=n(6540);const a={},r=s.createContext(a);function o(e){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);