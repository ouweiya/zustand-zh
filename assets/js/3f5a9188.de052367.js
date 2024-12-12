"use strict";(self.webpackChunkzustand_zh=self.webpackChunkzustand_zh||[]).push([[8564],{8389:(s,n,t)=>{t.r(n),t.d(n,{assets:()=>h,contentTitle:()=>a,default:()=>u,frontMatter:()=>r,metadata:()=>e,toc:()=>l});const e=JSON.parse('{"id":"integrations/third-party-libraries","title":"\u7b2c\u4e09\u65b9\u5e93","description":"Zustand \u63d0\u4f9b\u4e86\u72b6\u6001\u7ba1\u7406\u7684\u57fa\u672c\u9700\u6c42\u3002","source":"@site/docs/integrations/third-party-libraries.md","sourceDirName":"integrations","slug":"/integrations/third-party-libraries","permalink":"/zustand-zh/docs/integrations/third-party-libraries","draft":false,"unlisted":false,"editUrl":"https://github.com/ouweiya/zustand-zh/blob/master/docs/integrations/third-party-libraries.md","tags":[],"version":"current","frontMatter":{"title":"\u7b2c\u4e09\u65b9\u5e93","nav":16},"sidebar":"tutorialSidebar","previous":{"title":"Immer \u4e2d\u95f4\u4ef6","permalink":"/zustand-zh/docs/integrations/immer-middleware"},"next":{"title":"\u6301\u4e45\u5316\u5b58\u50a8\u6570\u636e","permalink":"/zustand-zh/docs/integrations/persisting-store-data"}}');var i=t(4848),d=t(8453);const r={title:"\u7b2c\u4e09\u65b9\u5e93",nav:16},a=void 0,h={},l=[];function c(s){const n={a:"a",blockquote:"blockquote",li:"li",p:"p",ul:"ul",...(0,d.R)(),...s.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:"Zustand \u63d0\u4f9b\u4e86\u72b6\u6001\u7ba1\u7406\u7684\u57fa\u672c\u9700\u6c42\u3002\r\n\u5c3d\u7ba1\u5b83\u975e\u5e38\u9002\u5408\u5927\u591a\u6570\u9879\u76ee\uff0c\r\n\u4f46\u4e00\u4e9b\u7528\u6237\u5e0c\u671b\u6269\u5c55\u5e93\u7684\u529f\u80fd\u96c6\u3002\r\n\u8fd9\u53ef\u4ee5\u901a\u8fc7\u4f7f\u7528\u793e\u533a\u521b\u5efa\u7684\u7b2c\u4e09\u65b9\u5e93\u6765\u5b9e\u73b0\u3002"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsx)(n.p,{children:"\u514d\u8d23\u58f0\u660e\uff1a\u8fd9\u4e9b\u5e93\u53ef\u80fd\u5b58\u5728 bug\uff0c\u7ef4\u62a4\u6709\u9650\uff0c\r\n\u6216\u6709\u5176\u4ed6\u9650\u5236\uff0c\u4e14\u5e76\u672a\u5f97\u5230 pmndrs \u6216 Zustand \u7ef4\u62a4\u8005\u7684\u5b98\u65b9\u63a8\u8350\u3002\r\n\u672c\u5217\u8868\u65e8\u5728\u4e3a\u5bfb\u6c42\u6269\u5c55 Zustand \u529f\u80fd\u96c6\u7684\u4eba\u63d0\u4f9b\u4e00\u4e2a\u826f\u597d\u7684\u8d77\u70b9\u3002"}),"\n"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://colorfy-software.gitbook.io/zfy/",children:"@colorfy-software/zfy"})," \u2014 \ud83e\uddf8 \u5bf9\u4e8e\u4f7f\u7528 Zustand \u8fdb\u884c React \u72b6\u6001\u7ba1\u7406\u7684\u6709\u7528\u52a9\u624b\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://www.npmjs.com/package/@davstack/store",children:"@davstack/store"})," \u2014 \u4e00\u4e2a Zustand \u5b58\u50a8\u5de5\u5382\uff0c\u81ea\u52a8\u751f\u6210\u5e26\u6709 get/set/use \u65b9\u6cd5\u7684\u9009\u62e9\u5668\uff0c\u652f\u6301\u63a8\u65ad\u7c7b\u578b\uff0c\u4f7f\u5168\u5c40/\u672c\u5730\u72b6\u6001\u7ba1\u7406\u53d8\u5f97\u7b80\u5355\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/dhmk083/dhmk-zustand-lens",children:"@dhmk/zustand-lens"})," \u2014 Zustand \u7684 Lens \u652f\u6301\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/liveblocks/liveblocks/tree/main/packages/liveblocks-zustand",children:"@liveblocks/zustand"})," \u2014 Liveblocks \u4e2d\u95f4\u4ef6\uff0c\u4f7f\u60a8\u7684\u5e94\u7528\u7a0b\u5e8f\u6210\u4e3a\u591a\u4eba\u6e38\u620f\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/Albert-Gao/auto-zustand-selectors-hook",children:"auto-zustand-selectors-hook"})," \u2014 \u81ea\u52a8\u751f\u6210\u5e26\u6709 Typescript \u652f\u6301\u7684 Zustand \u94a9\u5b50\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/zustandjs/derive-zustand",children:"derive-zustand"})," \u2014 \u4e00\u4e2a\u51fd\u6570\uff0c\u7528\u4e8e\u4ece\u5176\u4ed6 Zustand \u5b58\u50a8\u521b\u5efa\u6d3e\u751f\u7684 Zustand \u5b58\u50a8\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/BowlingX/geschichte",children:"geschichte"})," \u2014 \u57fa\u4e8e Zustand \u548c Immer \u7684\u94a9\u5b50\uff0c\u7528\u4e8e\u7ba1\u7406\u67e5\u8be2\u53c2\u6570\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/hecmatyar/leiten-zustand",children:"leiten-zustand"})," \u2014 \u6e05\u7406\u60a8\u7684\u5b58\u50a8\uff0c\u907f\u514d\u8bf7\u6c42\u548c\u6570\u636e\u8f6c\u6362\u7684\u6837\u677f\u4ee3\u7801\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/2A5F/Mobz",children:"mobz"})," \u2014 Zustand \u98ce\u683c\u7684 MobX API\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/JoaoPauloLousada/ngx-zustand",children:"ngx-zustand"})," - \u9002\u7528\u4e8e Angular \u7684 Zustand \u9002\u914d\u5668\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/mayank1513/persist-and-sync",children:"persist-and-sync"})," - Zustand \u4e2d\u95f4\u4ef6\uff0c\u53ef\u4ee5\u8f7b\u677e\u5730\u5728\u5177\u6709\u76f8\u540c\u6e90\u7684\u9009\u9879\u5361/\u7a97\u53e3/iframe \u4e4b\u95f4\u6301\u4e45\u5316\u548c\u540c\u6b65 Zustand \u72b6\u6001\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/Tom-Julux/shared-zustand",children:"shared-zustand"})," \u2014 Zustand \u7684\u8de8\u9009\u9879\u5361\u72b6\u6001\u5171\u4eab\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/beerose/simple-zustand-devtools",children:"simple-zustand-devtools"})," \u2014 \ud83d\udc3b\u269b\ufe0f \u5728 React DevTools \u4e2d\u68c0\u67e5\u60a8\u7684 Zustand \u5b58\u50a8\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/wobsoriano/solid-zustand",children:"solid-zustand"})," \u2014 \u4f7f\u7528 Zustand \u8fdb\u884c Solid \u7684\u72b6\u6001\u7ba1\u7406\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/Romainlg29/use-broadcast",children:"use-broadcast-ts"})," \u2014 Zustand \u4e2d\u95f4\u4ef6\uff0c\u7528\u4e8e\u5728\u9009\u9879\u5361\u4e4b\u95f4\u5171\u4eab\u72b6\u6001\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/zustandjs/use-zustand",children:"use-zustand"})," \u2014 \u53e6\u4e00\u4e2a\u81ea\u5b9a\u4e49\u94a9\u5b50\uff0c\u7528\u4e8e\u4f7f\u7528 Zustand \u539f\u751f\u5b58\u50a8\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/wobsoriano/vue-zustand",children:"vue-zustand"})," \u2014 \u57fa\u4e8e Zustand \u7684 Vue \u72b6\u6001\u7ba1\u7406\u89e3\u51b3\u65b9\u6848\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/InfiniteXyy/zoov",children:"zoov"})," \u2014 \u57fa\u4e8e Zustand \u7684\u72b6\u6001\u7ba1\u7406\u89e3\u51b3\u65b9\u6848\uff0c\u5177\u6709\u7c7b\u4f3c\u6a21\u5757\u7684 API\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/charkour/zundo",children:"zundo"})," \u2014 \ud83c\udf5c Zustand \u7684\u64a4\u9500\u548c\u91cd\u505a\u4e2d\u95f4\u4ef6\uff0c\u4f7f\u60a8\u7684\u5e94\u7528\u7a0b\u5e8f\u80fd\u591f\u8fdb\u884c\u65f6\u95f4\u65c5\u884c\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/oslabs-beta/Zukeeper",children:"zukeeper"})," - \u539f\u751f\u5f00\u53d1\u5de5\u5177\uff0c\u5177\u6709\u72b6\u6001\u548c\u64cd\u4f5c\u8ddf\u8e2a\u3001\u5dee\u5f02\u3001\u6811\u5f62\u663e\u793a\u548c\u65f6\u95f4\u65c5\u884c"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/ivoilic/zustand-ards",children:"zustand-ards"})," - \ud83d\udc81 \u7b80\u5355\u7684\u6709\u89c1\u5730\u7684\u5b9e\u7528\u7a0b\u5e8f\uff0c\u4f8b\u5982\u66ff\u4ee3\u9009\u62e9\u5668\u683c\u5f0f\u548c\u9ed8\u8ba4\u6d45\u94a9\u5b50"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/chrisvander/zustand-computed",children:"zustand-computed"})," \u2014 \u7528\u4e8e\u521b\u5efa\u8ba1\u7b97\u72b6\u6001\u7684 Zustand \u4e2d\u95f4\u4ef6\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/ntvinhit/zustand-constate",children:"zustand-constate"})," \u2014 \u57fa\u4e8e Zustand \u7684\u4e0a\u4e0b\u6587\u72b6\u6001\u7ba1\u7406\uff0c\u501f\u9274\u4e86 Constate \u7684\u601d\u60f3\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/fredericoo/zustand-context",children:"zustand-context"})," \u2014 \u5728 React Context \u4e2d\u521b\u5efa\u4e00\u4e2a Zustand \u5b58\u50a8\uff0c\u5305\u542b\u521d\u59cb\u503c\uff0c\u6216\u5728\u60a8\u7684\u7ec4\u4ef6\u4e2d\u4f7f\u7528\u9694\u79bb\u7684\u3001\u53ef\u6a21\u62df\u7684\u5b9e\u4f8b\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/charkour/zustand-di",children:"zustand-di"})," - \u4f7f\u7528 react props \u521d\u59cb\u5316 zustand \u5b58\u50a8"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/Conduct/zustand-forms",children:"zustand-forms"})," \u2014 \u5feb\u901f\u3001\u7c7b\u578b\u5b89\u5168\u7684\u8868\u5355\u72b6\u6001\u4f5c\u4e3a Zustand \u5b58\u50a8\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/cmlarsen/zustand-middleware-computed-state",children:"zustand-middleware-computed-state"})," \u2014 \u4e00\u4e2a\u7b80\u5355\u7684\u4e2d\u95f4\u4ef6\uff0c\u7528\u4e8e\u5411 Zustand \u6dfb\u52a0\u8ba1\u7b97\u72b6\u6001\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/biowaffeln/zustand-middleware-xstate",children:"zustand-middleware-xstate"})," \u2014 \u4e00\u4e2a\u4e2d\u95f4\u4ef6\uff0c\u7528\u4e8e\u5c06 XState \u72b6\u6001\u673a\u653e\u5165\u5168\u5c40 Zustand \u5b58\u50a8\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/joebobmiles/zustand-middleware-yjs",children:"zustand-middleware-yjs"})," \u2014 \u4e00\u4e2a\u4e2d\u95f4\u4ef6\uff0c\u7528\u4e8e\u540c\u6b65 Zustand \u5b58\u50a8\u548c Yjs\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/roadmanfong/zustand-persist",children:"zustand-persist"})," \u2014 \u7528\u4e8e\u6301\u4e45\u5316\u548c\u91cd\u65b0\u6df7\u5408\u72b6\u6001\u7684\u4e2d\u95f4\u4ef6\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/AwesomeDevin/zustand-pub",children:"zustand-pub"})," - \u57fa\u4e8e zustand \u548c zustand-vue \u7684\u8de8\u5e94\u7528\u7a0b\u5e8f/\u8de8\u6846\u67b6\u72b6\u6001\u7ba1\u7406\u548c\u5171\u4eab\uff0c\u9002\u7528\u4e8e React/Vue\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/nitedani/zustand-querystring",children:"zustand-querystring"})," \u2014 \u4e00\u4e2a Zustand \u4e2d\u95f4\u4ef6\uff0c\u7528\u4e8e\u5c06\u5b58\u50a8\u4e0e\u67e5\u8be2\u5b57\u7b26\u4e32\u540c\u6b65\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/patdx/zustand-rx",children:"zustand-rx"})," \u2014 \u4e00\u4e2a Zustand \u4e2d\u95f4\u4ef6\uff0c\u4f7f\u60a8\u80fd\u591f\u5c06\u5b58\u50a8\u4f5c\u4e3a RxJS Observable \u8ba2\u9605\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/Nowsta/zustand-saga",children:"zustand-saga"})," \u2014 \u4e00\u4e2a Zustand \u4e2d\u95f4\u4ef6\uff0c\u7528\u4e8e redux-saga\uff08\u65e0 redux\uff09\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/zustandjs/zustand-slices",children:"zustand-slices"})," \u2014 Zustand \u7684\u5207\u7247\u5b9e\u7528\u7a0b\u5e8f\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/Diablow/zustand-store-addons",children:"zustand-store-addons"})," \u2014 Zustand \u7684 React \u72b6\u6001\u7ba1\u7406\u63d2\u4ef6\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/mayank1513/zustand-sync-tabs",children:"zustand-sync-tabs"})," \u2014 Zustand \u4e2d\u95f4\u4ef6\uff0c\u53ef\u4ee5\u8f7b\u677e\u5730\u5728\u5177\u6709\u76f8\u540c\u6e90\u7684\u9009\u9879\u5361/\u7a97\u53e3/iframe \u4e4b\u95f4\u540c\u6b65 Zustand \u72b6\u6001\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/AwesomeDevin/zustand-vue",children:"zustand-vue"})," - \u57fa\u4e8e zustand \u7684 vue\uff08Vue3 / Vue2\uff09\u72b6\u6001\u7ba1\u7406\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/tandem-pt/zustand-yjs",children:"zustand-yjs"})," \u2014 \u9002\u7528\u4e8e Yjs \u7ed3\u6784\u7684 Zustand \u5b58\u50a8\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/timkindberg/zusteller",children:"zusteller"}),' \u2014 \u60a8\u7684\u5168\u5c40\u72b6\u6001\u6551\u661f\u3002 "\u53ea\u6709\u94a9\u5b50" + Zustand\u3002']}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/udecode/zustood",children:"zustood"})," \u2014 \ud83d\udc3b\u200d\u2744\ufe0f \u4f7f\u7528 Zustand \u7684\u6a21\u5757\u5316\u5b58\u50a8\u5de5\u5382\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/oslabs-beta/Zusty",children:"zusty"})," - Zustand \u5de5\u5177\uff0c\u7528\u4e8e\u534f\u52a9\u8c03\u8bd5\uff0c\u5177\u6709\u65f6\u95f4\u65c5\u884c\u3001\u64cd\u4f5c\u65e5\u5fd7\u3001\u72b6\u6001\u5feb\u7167\u3001\u5b58\u50a8\u89c6\u56fe\u3001\u6e32\u67d3\u65f6\u95f4\u6307\u6807\u548c\u72b6\u6001\u7ec4\u4ef6\u6811\u3002"]}),"\n"]}),"\n"]})]})}function u(s={}){const{wrapper:n}={...(0,d.R)(),...s.components};return n?(0,i.jsx)(n,{...s,children:(0,i.jsx)(c,{...s})}):c(s)}},8453:(s,n,t)=>{t.d(n,{R:()=>r,x:()=>a});var e=t(6540);const i={},d=e.createContext(i);function r(s){const n=e.useContext(d);return e.useMemo((function(){return"function"==typeof s?s(n):{...n,...s}}),[n,s])}function a(s){let n;return n=s.disableParentContext?"function"==typeof s.components?s.components(i):s.components||i:r(s.components),e.createElement(d.Provider,{value:n},s.children)}}}]);