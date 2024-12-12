"use strict";(self.webpackChunkzustand_zh=self.webpackChunkzustand_zh||[]).push([[9327],{9551:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>c,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"middlewares/subscribe-with-selector","title":"subscribeWithSelector","description":"\u5982\u4f55\u5728 store \u4e2d\u8ba2\u9605\u7ec6\u7c92\u5ea6\u7684 store \u66f4\u65b0","source":"@site/docs/middlewares/subscribe-with-selector.md","sourceDirName":"middlewares","slug":"/middlewares/subscribe-with-selector","permalink":"/zustand-zh/docs/middlewares/subscribe-with-selector","draft":false,"unlisted":false,"editUrl":"https://github.com/ouweiya/zustand-zh/blob/master/docs/middlewares/subscribe-with-selector.md","tags":[],"version":"current","frontMatter":{"title":"subscribeWithSelector","description":"\u5982\u4f55\u5728 store \u4e2d\u8ba2\u9605\u7ec6\u7c92\u5ea6\u7684 store \u66f4\u65b0","nav":210},"sidebar":"tutorialSidebar","previous":{"title":"redux","permalink":"/zustand-zh/docs/middlewares/redux"}}');var i=n(4848),r=n(8453);const o={title:"subscribeWithSelector",description:"\u5982\u4f55\u5728 store \u4e2d\u8ba2\u9605\u7ec6\u7c92\u5ea6\u7684 store \u66f4\u65b0",nav:210},c="subscribeWithSelector",l={},d=[{value:"\u7c7b\u578b",id:"\u7c7b\u578b",level:2},{value:"\u7b7e\u540d",id:"\u7b7e\u540d",level:3},{value:"\u53d8\u6362\u5668",id:"\u53d8\u6362\u5668",level:3},{value:"\u53c2\u8003",id:"\u53c2\u8003",level:2},{value:"<code>subscribeWithSelector(stateCreatorFn)</code>",id:"subscribewithselectorstatecreatorfn",level:3},{value:"\u53c2\u6570",id:"\u53c2\u6570",level:4},{value:"\u8fd4\u56de\u503c",id:"\u8fd4\u56de\u503c",level:4},{value:"\u7528\u6cd5",id:"\u7528\u6cd5",level:2},{value:"\u8ba2\u9605\u90e8\u5206\u72b6\u6001\u66f4\u65b0",id:"\u8ba2\u9605\u90e8\u5206\u72b6\u6001\u66f4\u65b0",level:3},{value:"\u6545\u969c\u6392\u9664",id:"\u6545\u969c\u6392\u9664",level:2}];function a(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"subscribewithselector",children:"subscribeWithSelector"})}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"subscribeWithSelector"})," \u4e2d\u95f4\u4ef6\u5141\u8bb8\u4f60\u6839\u636e\u5f53\u524d\u72b6\u6001\u8ba2\u9605\u7279\u5b9a\u6570\u636e\u3002"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-js",children:"const nextStateCreatorFn = subscribeWithSelector(stateCreatorFn)\n"})}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.a,{href:"#%E7%B1%BB%E5%9E%8B",children:"\u7c7b\u578b"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"#%E7%AD%BE%E5%90%8D",children:"\u7b7e\u540d"})}),"\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"#%E5%8F%98%E6%8D%A2%E5%99%A8",children:"\u53d8\u6362\u5668"})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"#%E5%8F%82%E8%80%83",children:"\u53c2\u8003"})}),"\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"#%E7%94%A8%E6%B3%95",children:"\u7528\u6cd5"})}),"\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"#%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4",children:"\u6545\u969c\u6392\u9664"})}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"\u7c7b\u578b",children:"\u7c7b\u578b"}),"\n",(0,i.jsx)(t.h3,{id:"\u7b7e\u540d",children:"\u7b7e\u540d"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-ts",children:"subscribeWithSelector<T>(stateCreatorFn: StateCreator<T, [], []>): StateCreator<T, [['zustand/subscribeWithSelector', never]], []>\n"})}),"\n",(0,i.jsx)(t.h3,{id:"\u53d8\u6362\u5668",children:"\u53d8\u6362\u5668"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-ts",children:"['zustand/subscribeWithSelector', never]\n"})}),"\n",(0,i.jsx)(t.h2,{id:"\u53c2\u8003",children:"\u53c2\u8003"}),"\n",(0,i.jsx)(t.h3,{id:"subscribewithselectorstatecreatorfn",children:(0,i.jsx)(t.code,{children:"subscribeWithSelector(stateCreatorFn)"})}),"\n",(0,i.jsx)(t.h4,{id:"\u53c2\u6570",children:"\u53c2\u6570"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"stateCreatorFn"}),": \u4e00\u4e2a\u51fd\u6570\uff0c\u63a5\u53d7 ",(0,i.jsx)(t.code,{children:"set"})," \u51fd\u6570\u3001",(0,i.jsx)(t.code,{children:"get"})," \u51fd\u6570\u548c ",(0,i.jsx)(t.code,{children:"store"})," \u4f5c\u4e3a\u53c2\u6570\u3002\n\u901a\u5e38\uff0c\u4f60\u4f1a\u8fd4\u56de\u4e00\u4e2a\u5305\u542b\u4f60\u60f3\u8981\u66b4\u9732\u7684\u65b9\u6cd5\u7684\u5bf9\u8c61\u3002"]}),"\n"]}),"\n",(0,i.jsx)(t.h4,{id:"\u8fd4\u56de\u503c",children:"\u8fd4\u56de\u503c"}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"subscribeWithSelector"})," \u8fd4\u56de\u4e00\u4e2a\u72b6\u6001\u521b\u5efa\u51fd\u6570\u3002"]}),"\n",(0,i.jsx)(t.h2,{id:"\u7528\u6cd5",children:"\u7528\u6cd5"}),"\n",(0,i.jsx)(t.h3,{id:"\u8ba2\u9605\u90e8\u5206\u72b6\u6001\u66f4\u65b0",children:"\u8ba2\u9605\u90e8\u5206\u72b6\u6001\u66f4\u65b0"}),"\n",(0,i.jsxs)(t.p,{children:["\u901a\u8fc7\u8ba2\u9605\u90e8\u5206\u72b6\u6001\u66f4\u65b0\uff0c\u4f60\u53ef\u4ee5\u6ce8\u518c\u4e00\u4e2a\u56de\u8c03\u51fd\u6570\uff0c\u6bcf\u5f53 store \u7684\u90e8\u5206\u72b6\u6001\u66f4\u65b0\u65f6\u89e6\u53d1\u3002\u6211\u4eec\u53ef\u4ee5\u4f7f\u7528 ",(0,i.jsx)(t.code,{children:"subscribe"})," \u8fdb\u884c\u5916\u90e8\u72b6\u6001\u7ba1\u7406\u3002"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-ts",children:"import { createStore } from 'zustand/vanilla'\nimport { subscribeWithSelector } from 'zustand/middleware'\n\ntype PositionStoreState = { position: { x: number; y: number } }\n\ntype PositionStoreActions = {\n  setPosition: (nextPosition: PositionStoreState['position']) => void\n}\n\ntype PositionStore = PositionStoreState & PositionStoreActions\n\nconst positionStore = createStore<PositionStore>()(\n  subscribeWithSelector((set) => ({\n    position: { x: 0, y: 0 },\n    setPosition: (position) => set({ position }),\n  })),\n)\n\nconst $dot = document.getElementById('dot') as HTMLDivElement\n\n$dot.addEventListener('mouseenter', (event) => {\n  const parent = event.currentTarget.parentElement\n  const parentWidth = parent.clientWidth\n  const parentHeight = parent.clientHeight\n\n  positionStore.getState().setPosition({\n    x: Math.ceil(Math.random() * parentWidth),\n    y: Math.ceil(Math.random() * parentHeight),\n  })\n})\n\nconst render: Parameters<typeof positionStore.subscribe>[0] = (state) => {\n  $dot.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`\n}\n\nrender(positionStore.getInitialState(), positionStore.getInitialState())\n\npositionStore.subscribe((state) => state.position, render)\n\nconst logger: Parameters<typeof positionStore.subscribe>[0] = (x) => {\n  console.log('new x position', { x })\n}\n\npositionStore.subscribe((state) => state.position.x, logger)\n"})}),"\n",(0,i.jsxs)(t.p,{children:["\u4ee5\u4e0b\u662f ",(0,i.jsx)(t.code,{children:"html"})," \u4ee3\u7801"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<div\n  id="dot-container"\n  style="position: relative; width: 100vw; height: 100vh;"\n>\n  <div\n    id="dot"\n    style="position: absolute; background-color: red; border-radius: 50%; left: -10px; top: -10px; width: 20px; height: 20px;"\n  ></div>\n</div>\n'})}),"\n",(0,i.jsx)(t.h2,{id:"\u6545\u969c\u6392\u9664",children:"\u6545\u969c\u6392\u9664"}),"\n",(0,i.jsx)(t.p,{children:"\u5f85\u5b9a"})]})}function h(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>c});var s=n(6540);const i={},r=s.createContext(i);function o(e){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);