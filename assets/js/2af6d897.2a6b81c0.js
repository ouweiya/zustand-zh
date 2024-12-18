"use strict";(self.webpackChunkzustand_zh=self.webpackChunkzustand_zh||[]).push([[1232],{367:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>a,contentTitle:()=>d,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>i});const s=JSON.parse('{"id":"guides/typescript","title":"TypeScript \u6307\u5357","description":"\u57fa\u672c\u7528\u6cd5","source":"@site/docs/guides/typescript.md","sourceDirName":"guides","slug":"/guides/typescript","permalink":"/zustand-zh/docs/guides/typescript","draft":false,"unlisted":false,"editUrl":"https://github.com/ouweiya/zustand-zh/blob/master/docs/guides/typescript.md","tags":[],"version":"current","frontMatter":{"title":"TypeScript \u6307\u5357","nav":8},"sidebar":"tutorialSidebar","previous":{"title":"\u65e0 store \u64cd\u4f5c\u7684\u5b9e\u8df5","permalink":"/zustand-zh/docs/guides/practice-with-no-store-actions"},"next":{"title":"\u6d4b\u8bd5","permalink":"/zustand-zh/docs/guides/testing"}}');var t=n(4848),c=n(8453);const o={title:"TypeScript \u6307\u5357",nav:8},d=void 0,a={},i=[{value:"\u57fa\u672c\u7528\u6cd5",id:"basic-usage",level:2},{value:"\u4f7f\u7528\u4e2d\u95f4\u4ef6",id:"using-middlewares",level:2},{value:"\u7f16\u5199\u4e2d\u95f4\u4ef6\u548c\u9ad8\u7ea7\u4f7f\u7528",id:"authoring-middlewares-and-advanced-usage",level:2},{value:"\u5e38\u89c1\u914d\u65b9",id:"common-recipes",level:2},{value:"\u4e0d\u6539\u53d8\u5b58\u50a8\u7c7b\u578b\u7684\u4e2d\u95f4\u4ef6",id:"middleware-that-doesn't-change-the-store-type",level:3},{value:"\u6539\u53d8\u5b58\u50a8\u7c7b\u578b\u7684\u4e2d\u95f4\u4ef6",id:"middleware-that-changes-the-store-type",level:3},{value:"\u4e0d\u4f7f\u7528\u67ef\u91cc\u5316\u89e3\u51b3\u65b9\u6848\u7684 <code>create</code>",id:"create-without-curried-workaround",level:3},{value:"\u5207\u7247\u6a21\u5f0f",id:"slices-pattern",level:3},{value:"\u4e3a vanilla \u5b58\u50a8\u9650\u5b9a <code>useStore</code> \u94a9\u5b50",id:"bounded-usestore-hook-for-vanilla-stores",level:3},{value:"\u4e2d\u95f4\u4ef6\u53ca\u5176\u53d8\u5f02\u5668\u5f15\u7528",id:"middlewares-and-their-mutators-reference",level:2}];function l(e){const r={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,c.R)(),...e.components},{Details:n}=r;return n||function(e,r){throw new Error("Expected "+(r?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.h2,{id:"basic-usage",children:"\u57fa\u672c\u7528\u6cd5"}),"\n",(0,t.jsxs)(r.p,{children:["\u4f7f\u7528 TypeScript \u7684\u533a\u522b\u5728\u4e8e\uff0c\u4f60\u9700\u8981\u5199 ",(0,t.jsx)(r.code,{children:"create<T>()(...)"})," \u800c\u4e0d\u662f ",(0,t.jsx)(r.code,{children:"create(...)"}),"\uff08\u6ce8\u610f\u989d\u5916\u7684\u62ec\u53f7 ",(0,t.jsx)(r.code,{children:"()"})," \u548c\u7c7b\u578b\u53c2\u6570\uff09\uff0c\u5176\u4e2d ",(0,t.jsx)(r.code,{children:"T"})," \u662f\u7528\u6765\u6ce8\u89e3\u72b6\u6001\u7684\u7c7b\u578b\u3002\u4f8b\u5982\uff1a"]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"import { create } from 'zustand'\r\n\r\ninterface BearState {\r\n    bears: number\r\n    increase: (by: number) => void\r\n}\r\n\r\nconst useBearStore = create<BearState>()((set) => ({\r\n    bears: 0,\r\n    increase: (by) => set((state) => ({ bears: state.bears + by })),\r\n}))\n"})}),"\n",(0,t.jsxs)(n,{children:[(0,t.jsx)("summary",{children:"\u4e3a\u4ec0\u4e48\u6211\u4eec\u4e0d\u80fd\u7b80\u5355\u5730\u4ece\u521d\u59cb\u72b6\u6001\u63a8\u65ad\u7c7b\u578b\uff1f"}),(0,t.jsx)("br",{}),(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.strong,{children:"\u7b80\u800c\u8a00\u4e4b"}),"\uff1a\u56e0\u4e3a\u72b6\u6001\u6cdb\u578b ",(0,t.jsx)(r.code,{children:"T"})," \u662f\u4e0d\u53d8\u7684\u3002"]}),(0,t.jsxs)(r.p,{children:["\u8003\u8651\u8fd9\u4e2a\u6700\u5c0f\u7248\u672c\u7684 ",(0,t.jsx)(r.code,{children:"create"}),"\uff1a"]}),(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"declare const create: <T>(f: (get: () => T) => T) => T\r\n\r\nconst x = create((get) => ({\r\n    foo: 0,\r\n    bar: () => get(),\r\n}))\r\n// `x` \u88ab\u63a8\u65ad\u4e3a `unknown` \u800c\u4e0d\u662f\r\n// interface X {\r\n//   foo: number,\r\n//   bar: () => X\r\n// }\n"})}),(0,t.jsxs)(r.p,{children:["\u5728\u8fd9\u91cc\uff0c\u5982\u679c\u4f60\u770b ",(0,t.jsx)(r.code,{children:"create"})," \u4e2d ",(0,t.jsx)(r.code,{children:"f"})," \u7684\u7c7b\u578b\uff0c\u5373 ",(0,t.jsx)(r.code,{children:"(get: () => T) => T"}),'\uff0c\u5b83\u901a\u8fc7\u8fd4\u56de "\u7ed9\u51fa" ',(0,t.jsx)(r.code,{children:"T"}),"\uff08\u4f7f\u5176\u534f\u53d8\uff09\uff0c\u4f46\u5b83\u4e5f\u901a\u8fc7 ",(0,t.jsx)(r.code,{children:"get"}),' "\u63a5\u6536" ',(0,t.jsx)(r.code,{children:"T"}),'\uff08\u4f7f\u5176\u9006\u53d8\uff09\u3002"\u90a3\u4e48 ',(0,t.jsx)(r.code,{children:"T"}),' \u4ece\u54ea\u91cc\u6765\u5462\uff1f" TypeScript \u611f\u5230\u56f0\u60d1\u3002\u8fd9\u5c31\u50cf\u9e21\u548c\u86cb\u7684\u95ee\u9898\u3002\u6700\u540e TypeScript \u653e\u5f03\u4e86\uff0c\u63a8\u65ad ',(0,t.jsx)(r.code,{children:"T"})," \u4e3a ",(0,t.jsx)(r.code,{children:"unknown"}),"\u3002"]}),(0,t.jsx)(r.p,{children:"\u6240\u4ee5\uff0c\u53ea\u8981\u8981\u63a8\u65ad\u7684\u6cdb\u578b\u662f\u4e0d\u53d8\u7684\uff08\u5373\u65e2\u662f\u534f\u53d8\u7684\u53c8\u662f\u9006\u53d8\u7684\uff09\uff0cTypeScript \u5c31\u65e0\u6cd5\u63a8\u65ad\u5b83\u3002\u53e6\u4e00\u4e2a\u7b80\u5355\u7684\u4f8b\u5b50\u662f\u8fd9\u6837\u7684\uff1a"}),(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"const createFoo = {} as <T>(f: (t: T) => T) => T\r\nconst x = createFoo((_) => 'hello')\n"})}),(0,t.jsxs)(r.p,{children:["\u5728\u8fd9\u91cc\uff0c",(0,t.jsx)(r.code,{children:"x"})," \u53c8\u662f ",(0,t.jsx)(r.code,{children:"unknown"})," \u800c\u4e0d\u662f ",(0,t.jsx)(r.code,{children:"string"}),"\u3002"]}),(0,t.jsxs)(n,{children:[(0,t.jsx)("summary",{children:"\u5173\u4e8e\u63a8\u65ad\u7684\u66f4\u591a\u4fe1\u606f\uff08\u4ec5\u4f9b\u5bf9 TypeScript \u611f\u5174\u8da3\u7684\u4eba\uff09"}),(0,t.jsxs)(r.p,{children:["\u5728\u67d0\u79cd\u610f\u4e49\u4e0a\uff0c\u8fd9\u79cd\u63a8\u65ad\u5931\u8d25\u5e76\u4e0d\u662f\u95ee\u9898\uff0c\u56e0\u4e3a\u4e0d\u80fd\u5199\u51fa\u7c7b\u578b\u4e3a ",(0,t.jsx)(r.code,{children:"<T>(f: (t: T) => T) => T"})," \u7684\u503c\u3002\u4e5f\u5c31\u662f\u8bf4\uff0c\u4f60\u4e0d\u80fd\u5199\u51fa ",(0,t.jsx)(r.code,{children:"createFoo"})," \u7684\u771f\u5b9e\u8fd0\u884c\u65f6\u5b9e\u73b0\u3002\u6211\u4eec\u8bd5\u8bd5\u770b\uff1a"]}),(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-js",children:"const createFoo = (f) => f(/* ? */)\n"})}),(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.code,{children:"createFoo"})," \u9700\u8981\u8fd4\u56de ",(0,t.jsx)(r.code,{children:"f"})," \u7684\u8fd4\u56de\u503c\u3002\u4e3a\u4e86\u505a\u5230\u8fd9\u4e00\u70b9\uff0c\u6211\u4eec\u9996\u5148\u5fc5\u987b\u8c03\u7528 ",(0,t.jsx)(r.code,{children:"f"}),"\u3002\u4e3a\u4e86\u8c03\u7528\u5b83\uff0c\u6211\u4eec\u5fc5\u987b\u4f20\u9012\u4e00\u4e2a\u7c7b\u578b\u4e3a ",(0,t.jsx)(r.code,{children:"T"})," \u7684\u503c\u3002\u4e3a\u4e86\u4f20\u9012\u4e00\u4e2a\u7c7b\u578b\u4e3a ",(0,t.jsx)(r.code,{children:"T"})," \u7684\u503c\uff0c\u6211\u4eec\u9996\u5148\u5fc5\u987b\u4ea7\u751f\u5b83\u3002\u4f46\u662f\uff0c\u5f53\u6211\u4eec\u751a\u81f3\u4e0d\u77e5\u9053 ",(0,t.jsx)(r.code,{children:"T"})," \u662f\u4ec0\u4e48\u65f6\uff0c\u6211\u4eec\u5982\u4f55\u4ea7\u751f\u4e00\u4e2a\u7c7b\u578b\u4e3a ",(0,t.jsx)(r.code,{children:"T"})," \u7684\u503c\u5462\uff1f\u4ea7\u751f\u7c7b\u578b\u4e3a ",(0,t.jsx)(r.code,{children:"T"})," \u7684\u503c\u7684\u552f\u4e00\u65b9\u6cd5\u662f\u8c03\u7528 ",(0,t.jsx)(r.code,{children:"f"}),"\uff0c\u4f46\u662f\uff0c\u4e3a\u4e86\u8c03\u7528 ",(0,t.jsx)(r.code,{children:"f"})," \u672c\u8eab\uff0c\u6211\u4eec\u9700\u8981\u4e00\u4e2a\u7c7b\u578b\u4e3a ",(0,t.jsx)(r.code,{children:"T"})," \u7684\u503c\u3002\u6240\u4ee5\u4f60\u770b\uff0c\u5b9e\u9645\u4e0a\u662f\u65e0\u6cd5\u5199\u51fa ",(0,t.jsx)(r.code,{children:"createFoo"})," \u7684\u3002"]}),(0,t.jsxs)(r.p,{children:["\u6240\u4ee5\u6211\u4eec\u5728\u8bf4\uff0c",(0,t.jsx)(r.code,{children:"createFoo"})," \u7684\u63a8\u65ad\u5931\u8d25\u5b9e\u9645\u4e0a\u5e76\u4e0d\u662f\u95ee\u9898\uff0c\u56e0\u4e3a\u65e0\u6cd5\u5b9e\u73b0 ",(0,t.jsx)(r.code,{children:"createFoo"}),"\u3002\u4f46\u662f ",(0,t.jsx)(r.code,{children:"create"})," \u7684\u63a8\u65ad\u5931\u8d25\u53c8\u600e\u4e48\u6837\u5462\uff1f\u90a3\u4e5f\u5e76\u4e0d\u771f\u6b63\u662f\u95ee\u9898\uff0c\u56e0\u4e3a ",(0,t.jsx)(r.code,{children:"create"})," \u4e5f\u65e0\u6cd5\u5b9e\u73b0\u3002\u7b49\u4e00\u4e0b\uff0c\u5982\u679c\u65e0\u6cd5\u5b9e\u73b0 ",(0,t.jsx)(r.code,{children:"create"}),"\uff0c\u90a3\u4e48 Zustand \u662f\u5982\u4f55\u5b9e\u73b0\u5b83\u7684\u5462\uff1f\u7b54\u6848\u662f\uff0c\u5b83\u6ca1\u6709\u3002"]}),(0,t.jsxs)(r.p,{children:["Zustand \u5047\u88c5\u5b9e\u73b0\u4e86 ",(0,t.jsx)(r.code,{children:"create"})," \u7684\u7c7b\u578b\uff0c\u5b83\u53ea\u5b9e\u73b0\u4e86\u5927\u90e8\u5206\u3002\u4e0b\u9762\u662f\u4e00\u4e2a\u901a\u8fc7\u663e\u793a\u4e0d\u5408\u7406\u6027\u6765\u8bc1\u660e\u7684\u7b80\u5355\u4f8b\u5b50\uff1a"]}),(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"import { create } from 'zustand'\r\n\r\nconst useBoundStore = create<{ foo: number }>()((_, get) => ({\r\n    foo: get().foo,\r\n}))\n"})}),(0,t.jsxs)(r.p,{children:["\u8fd9\u6bb5\u4ee3\u7801\u53ef\u4ee5\u7f16\u8bd1\u3002\u4f46\u5982\u679c\u6211\u4eec\u8fd0\u884c\u5b83\uff0c\u6211\u4eec\u4f1a\u5f97\u5230\u4e00\u4e2a\u5f02\u5e38\uff1a\"Uncaught TypeError: Cannot read properties of undefined (reading 'foo')\"\u3002\u8fd9\u662f\u56e0\u4e3a\u5728\u521b\u5efa\u521d\u59cb\u72b6\u6001\u4e4b\u524d\uff0c",(0,t.jsx)(r.code,{children:"get"})," \u4f1a\u8fd4\u56de ",(0,t.jsx)(r.code,{children:"undefined"}),"\uff08\u56e0\u6b64\u4f60\u5728\u521b\u5efa\u521d\u59cb\u72b6\u6001\u65f6\u4e0d\u5e94\u8be5\u8c03\u7528 ",(0,t.jsx)(r.code,{children:"get"}),"\uff09\u3002\u7c7b\u578b\u627f\u8bfa ",(0,t.jsx)(r.code,{children:"get"})," \u6c38\u8fdc\u4e0d\u4f1a\u8fd4\u56de ",(0,t.jsx)(r.code,{children:"undefined"}),"\uff0c\u4f46\u5b83\u6700\u521d\u786e\u5b9e\u662f\u8fd9\u6837\uff0c\u8fd9\u610f\u5473\u7740 Zustand \u6ca1\u6709\u5b9e\u73b0\u5b83\u3002"]}),(0,t.jsxs)(r.p,{children:["\u5f53\u7136 Zustand \u5931\u8d25\u4e86\uff0c\u56e0\u4e3a\u65e0\u6cd5\u6309\u7167\u7c7b\u578b\u7684\u627f\u8bfa\u5b9e\u73b0 ",(0,t.jsx)(r.code,{children:"create"}),"\uff08\u5c31\u50cf\u65e0\u6cd5\u5b9e\u73b0 ",(0,t.jsx)(r.code,{children:"createFoo"})," \u4e00\u6837\uff09\u3002\u6362\u53e5\u8bdd\u8bf4\uff0c\u6211\u4eec\u6ca1\u6709\u4e00\u4e2a\u7c7b\u578b\u6765\u8868\u8fbe\u6211\u4eec\u5b9e\u9645\u5b9e\u73b0\u7684 ",(0,t.jsx)(r.code,{children:"create"}),"\u3002\u6211\u4eec\u4e0d\u80fd\u628a ",(0,t.jsx)(r.code,{children:"get"})," \u7c7b\u578b\u5316\u4e3a ",(0,t.jsx)(r.code,{children:"() => T | undefined"}),"\uff0c\u56e0\u4e3a\u8fd9\u4f1a\u5bfc\u81f4\u4e0d\u4fbf\uff0c\u800c\u4e14\u5b83\u4ecd\u7136\u4e0d\u6b63\u786e\uff0c\u56e0\u4e3a ",(0,t.jsx)(r.code,{children:"get"})," \u6700\u7ec8\u786e\u5b9e\u662f ",(0,t.jsx)(r.code,{children:"() => T"}),"\uff0c\u53ea\u662f\u5982\u679c\u540c\u6b65\u8c03\u7528\uff0c\u5b83\u4f1a\u662f ",(0,t.jsx)(r.code,{children:"() => undefined"}),"\u3002\u6211\u4eec\u9700\u8981\u7684\u662f\u4e00\u79cd TypeScript \u529f\u80fd\uff0c\u5141\u8bb8\u6211\u4eec\u628a ",(0,t.jsx)(r.code,{children:"get"})," \u7c7b\u578b\u5316\u4e3a ",(0,t.jsx)(r.code,{children:"(() => T) & WhenSync<() => undefined>"}),"\uff0c\u8fd9\u5f53\u7136\u662f\u6781\u5176\u9065\u4e0d\u53ef\u53ca\u7684\u3002"]}),(0,t.jsxs)(r.p,{children:["\u6240\u4ee5\u6211\u4eec\u6709\u4e24\u4e2a\u95ee\u9898\uff1a\u7f3a\u4e4f\u63a8\u65ad\u548c\u4e0d\u5408\u7406\u6027\u3002\u5982\u679c TypeScript \u53ef\u4ee5\u6539\u8fdb\u5bf9\u4e0d\u53d8\u91cf\u7684\u63a8\u65ad\uff0c\u5c31\u53ef\u4ee5\u89e3\u51b3\u7f3a\u4e4f\u63a8\u65ad\u7684\u95ee\u9898\u3002\u5982\u679c TypeScript \u5f15\u5165\u4e86\u7c7b\u4f3c ",(0,t.jsx)(r.code,{children:"WhenSync"})," \u7684\u4e1c\u897f\uff0c\u5c31\u53ef\u4ee5\u89e3\u51b3\u4e0d\u5408\u7406\u6027\u95ee\u9898\u3002\u4e3a\u4e86\u89e3\u51b3\u7f3a\u4e4f\u63a8\u65ad\uff0c\u6211\u4eec\u624b\u52a8\u6ce8\u89e3\u72b6\u6001\u7c7b\u578b\u3002\u6211\u4eec\u65e0\u6cd5\u89e3\u51b3\u4e0d\u5408\u7406\u6027\uff0c\u4f46\u8fd9\u6ca1\u5173\u7cfb\uff0c\u56e0\u4e3a\u5b83\u4e0d\u5927\uff0c\u53cd\u6b63\u540c\u6b65\u8c03\u7528 ",(0,t.jsx)(r.code,{children:"get"})," \u6ca1\u6709\u610f\u4e49\u3002"]})]})]}),"\n",(0,t.jsxs)(n,{children:[(0,t.jsxs)("summary",{children:["\u4e3a\u4ec0\u4e48\u8981\u4f7f\u7528\u67ef\u91cc\u5316 ",(0,t.jsx)(r.code,{children:"()(...)"}),"\uff1f"]}),(0,t.jsx)("br",{}),(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.strong,{children:"\u7b80\u800c\u8a00\u4e4b"}),"\uff1a\u8fd9\u662f\u5bf9 ",(0,t.jsx)(r.a,{href:"https://github.com/microsoft/TypeScript/issues/10571",children:"microsoft/TypeScript#10571"})," \u7684\u4e00\u79cd\u89e3\u51b3\u65b9\u6cd5\u3002"]}),(0,t.jsx)(r.p,{children:"\u5047\u8bbe\u4f60\u6709\u8fd9\u6837\u4e00\u4e2a\u573a\u666f\uff1a"}),(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"declare const withError: <T, E>(\r\n    p: Promise<T>,\r\n) => Promise<[error: undefined, value: T] | [error: E, value: undefined]>\r\ndeclare const doSomething: () => Promise<string>\r\n\r\nconst main = async () => {\r\n    let [error, value] = await withError(doSomething())\r\n}\n"})}),(0,t.jsxs)(r.p,{children:["\u5728\u8fd9\u91cc\uff0c",(0,t.jsx)(r.code,{children:"T"})," \u88ab\u63a8\u65ad\u4e3a ",(0,t.jsx)(r.code,{children:"string"}),"\uff0c",(0,t.jsx)(r.code,{children:"E"})," \u88ab\u63a8\u65ad\u4e3a ",(0,t.jsx)(r.code,{children:"unknown"}),"\u3002\u4f60\u53ef\u80fd\u60f3\u5c06 ",(0,t.jsx)(r.code,{children:"E"})," \u6ce8\u89e3\u4e3a ",(0,t.jsx)(r.code,{children:"Foo"}),"\uff0c\u56e0\u4e3a\u4f60\u786e\u5b9a ",(0,t.jsx)(r.code,{children:"doSomething()"})," \u629b\u51fa\u7684\u9519\u8bef\u7684\u5f62\u72b6\u3002\u7136\u800c\uff0c\u4f60\u4e0d\u80fd\u8fd9\u6837\u505a\u3002\u4f60\u53ea\u80fd\u4f20\u9012\u6240\u6709\u7684\u6cdb\u578b\u6216\u8005\u4e0d\u4f20\u3002\u9664\u4e86\u5c06 ",(0,t.jsx)(r.code,{children:"E"})," \u6ce8\u89e3\u4e3a ",(0,t.jsx)(r.code,{children:"Foo"}),"\uff0c\u4f60\u8fd8\u5fc5\u987b\u5c06 ",(0,t.jsx)(r.code,{children:"T"})," \u6ce8\u89e3\u4e3a ",(0,t.jsx)(r.code,{children:"string"}),"\uff0c\u5c3d\u7ba1\u5b83\u5df2\u7ecf\u88ab\u63a8\u65ad\u51fa\u6765\u4e86\u3002\u89e3\u51b3\u65b9\u6848\u662f\u5236\u4f5c\u4e00\u4e2a\u5728\u8fd0\u884c\u65f6\u4e0d\u505a\u4efb\u4f55\u4e8b\u60c5\u7684\u67ef\u91cc\u5316\u7248\u672c\u7684 ",(0,t.jsx)(r.code,{children:"withError"}),"\u3002\u5b83\u7684\u76ee\u7684\u5c31\u662f\u5141\u8bb8\u4f60\u6ce8\u89e3 ",(0,t.jsx)(r.code,{children:"E"}),"\u3002"]}),(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"declare const withError: {\r\n    <E>(): <T>(\r\n        p: Promise<T>,\r\n    ) => Promise<[error: undefined, value: T] | [error: E, value: undefined]>\r\n    <T, E>(\r\n        p: Promise<T>,\r\n    ): Promise<[error: undefined, value: T] | [error: E, value: undefined]>\r\n}\r\ndeclare const doSomething: () => Promise<string>\r\ninterface Foo {\r\n    bar: string\r\n}\r\n\r\nconst main = async () => {\r\n    let [error, value] = await withError<Foo>()(doSomething())\r\n}\n"})}),(0,t.jsxs)(r.p,{children:["\u8fd9\u6837\uff0c",(0,t.jsx)(r.code,{children:"T"})," \u88ab\u63a8\u65ad\u51fa\u6765\uff0c\u4f60\u53ef\u4ee5\u6ce8\u89e3 ",(0,t.jsx)(r.code,{children:"E"}),"\u3002Zustand \u5728\u6211\u4eec\u60f3\u8981\u6ce8\u89e3\u72b6\u6001\uff08\u7b2c\u4e00\u4e2a\u7c7b\u578b\u53c2\u6570\uff09\u4f46\u5141\u8bb8\u5176\u4ed6\u53c2\u6570\u88ab\u63a8\u65ad\u65f6\u6709\u76f8\u540c\u7684\u7528\u4f8b\u3002"]})]}),"\n",(0,t.jsxs)(r.p,{children:["\u53e6\u5916\uff0c\u4f60\u4e5f\u53ef\u4ee5\u4f7f\u7528 ",(0,t.jsx)(r.code,{children:"combine"}),"\uff0c\u5b83\u63a8\u65ad\u51fa\u72b6\u6001\uff0c\u6240\u4ee5\u4f60\u4e0d\u9700\u8981\u7c7b\u578b\u5316\u5b83\u3002"]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"import { create } from 'zustand'\r\nimport { combine } from 'zustand/middleware'\r\n\r\nconst useBearStore = create(\r\n    combine({ bears: 0 }, (set) => ({\r\n        increase: (by: number) => set((state) => ({ bears: state.bears + by })),\r\n    })),\r\n)\n"})}),"\n",(0,t.jsxs)(n,{children:[(0,t.jsx)("summary",{children:"\u8981\u5c0f\u5fc3\u4e00\u70b9"}),(0,t.jsx)("br",{}),(0,t.jsxs)(r.p,{children:["\u6211\u4eec\u901a\u8fc7\u5728\u4f60\u63a5\u6536\u7684 ",(0,t.jsx)(r.code,{children:"set"}),"\u3001",(0,t.jsx)(r.code,{children:"get"})," \u548c ",(0,t.jsx)(r.code,{children:"store"})," \u7684\u7c7b\u578b\u4e2d\u7a0d\u5fae\u6492\u4e2a\u5c0f\u8c0e\u6765\u5b9e\u73b0\u63a8\u65ad\u3002\u8fd9\u4e2a\u8c0e\u8a00\u662f\uff0c\u5b83\u4eec\u88ab\u7c7b\u578b\u5316\u4e3a\u72b6\u6001\u662f\u7b2c\u4e00\u4e2a\u53c2\u6570\uff0c\u5b9e\u9645\u4e0a\u72b6\u6001\u662f\u7b2c\u4e00\u4e2a\u53c2\u6570\u548c\u7b2c\u4e8c\u4e2a\u53c2\u6570\u8fd4\u56de\u7684\u6d45\u5408\u5e76\uff08",(0,t.jsx)(r.code,{children:"{ ...a, ...b }"}),"\uff09\u3002\u4f8b\u5982\uff0c\u7b2c\u4e8c\u4e2a\u53c2\u6570\u7684 ",(0,t.jsx)(r.code,{children:"get"})," \u7c7b\u578b\u4e3a ",(0,t.jsx)(r.code,{children:"() => { bears: number }"}),"\uff0c\u8fd9\u662f\u4e00\u4e2a\u8c0e\u8a00\uff0c\u56e0\u4e3a\u5b83\u5e94\u8be5\u662f ",(0,t.jsx)(r.code,{children:"() => { bears: number, increase: (by: number) => void }"}),"\u3002\u800c ",(0,t.jsx)(r.code,{children:"useBearStore"})," \u4ecd\u7136\u6709\u6b63\u786e\u7684\u7c7b\u578b\uff1b\u4f8b\u5982\uff0c",(0,t.jsx)(r.code,{children:"useBearStore.getState"})," \u88ab\u7c7b\u578b\u5316\u4e3a ",(0,t.jsx)(r.code,{children:"() => { bears: number, increase: (by: number) => void }"}),"\u3002"]}),(0,t.jsxs)(r.p,{children:["\u8fd9\u5176\u5b9e\u5e76\u4e0d\u771f\u7684\u662f\u4e00\u4e2a\u8c0e\u8a00\uff0c\u56e0\u4e3a ",(0,t.jsx)(r.code,{children:"{ bears: number }"})," \u4ecd\u7136\u662f ",(0,t.jsx)(r.code,{children:"{ bears: number, increase: (by: number) => void }"})," \u7684\u5b50\u7c7b\u578b\u3002\u56e0\u6b64\uff0c\u5728\u5927\u591a\u6570\u60c5\u51b5\u4e0b\u4e0d\u4f1a\u6709\u95ee\u9898\u3002\u4f60\u53ea\u9700\u8981\u5728\u4f7f\u7528\u66ff\u6362\u65f6\u5c0f\u5fc3\u3002\u4f8b\u5982\uff0c",(0,t.jsx)(r.code,{children:"set({ bears: 0 }, true)"})," \u4f1a\u7f16\u8bd1\uff0c\u4f46\u4f1a\u4e0d\u5b89\u5168\uff0c\u56e0\u4e3a\u5b83\u4f1a\u5220\u9664 ",(0,t.jsx)(r.code,{children:"increase"})," \u51fd\u6570\u3002\u53e6\u4e00\u4e2a\u4f60\u9700\u8981\u5c0f\u5fc3\u7684\u5730\u65b9\u662f\u5982\u679c\u4f60\u4f7f\u7528 ",(0,t.jsx)(r.code,{children:"Object.keys"}),"\u3002",(0,t.jsx)(r.code,{children:"Object.keys(get())"})," \u5c06\u8fd4\u56de ",(0,t.jsx)(r.code,{children:'["bears", "increase"]'})," \u800c\u4e0d\u662f ",(0,t.jsx)(r.code,{children:'["bears"]'}),"\u3002",(0,t.jsx)(r.code,{children:"get"})," \u7684\u8fd4\u56de\u7c7b\u578b\u53ef\u80fd\u4f1a\u8ba9\u4f60\u72af\u8fd9\u4e9b\u9519\u8bef\u3002"]}),(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.code,{children:"combine"})," \u4e3a\u4e86\u4e0d\u7528\u4e3a\u72b6\u6001\u5199\u7c7b\u578b\u7684\u4fbf\u5229\u6027\uff0c\u727a\u7272\u4e86\u4e00\u70b9\u7c7b\u578b\u5b89\u5168\u6027\u3002\u56e0\u6b64\uff0c\u4f60\u5e94\u8be5\u76f8\u5e94\u5730\u4f7f\u7528 ",(0,t.jsx)(r.code,{children:"combine"}),"\u3002\u5728\u5927\u591a\u6570\u60c5\u51b5\u4e0b\u90fd\u6ca1\u95ee\u9898\uff0c\u4f60\u53ef\u4ee5\u65b9\u4fbf\u5730\u4f7f\u7528\u5b83\u3002"]})]}),"\n",(0,t.jsxs)(r.p,{children:["\u6ce8\u610f\uff0c\u5f53\u4f7f\u7528 ",(0,t.jsx)(r.code,{children:"combine"})," \u65f6\uff0c\u6211\u4eec\u4e0d\u4f7f\u7528\u67ef\u91cc\u5316\u7248\u672c\uff0c\u56e0\u4e3a ",(0,t.jsx)(r.code,{children:"combine"}),' "\u521b\u5efa"\u4e86\u72b6\u6001\u3002\u5f53\u4f7f\u7528\u521b\u5efa\u72b6\u6001\u7684\u4e2d\u95f4\u4ef6\u65f6\uff0c\u4e0d\u9700\u8981\u4f7f\u7528\u67ef\u91cc\u5316\u7248\u672c\uff0c\u56e0\u4e3a\u73b0\u5728\u53ef\u4ee5\u63a8\u65ad\u51fa\u72b6\u6001\u3002\u53e6\u4e00\u4e2a\u521b\u5efa\u72b6\u6001\u7684\u4e2d\u95f4\u4ef6\u662f ',(0,t.jsx)(r.code,{children:"redux"}),"\u3002\u6240\u4ee5\uff0c\u5f53\u4f7f\u7528 ",(0,t.jsx)(r.code,{children:"combine"}),"\u3001",(0,t.jsx)(r.code,{children:"redux"})," \u6216\u4efb\u4f55\u5176\u4ed6\u81ea\u5b9a\u4e49\u4e2d\u95f4\u4ef6\u521b\u5efa\u72b6\u6001\u65f6\uff0c\u6211\u4eec\u4e0d\u63a8\u8350\u4f7f\u7528\u67ef\u91cc\u5316\u7248\u672c\u3002"]}),"\n",(0,t.jsx)(r.h2,{id:"using-middlewares",children:"\u4f7f\u7528\u4e2d\u95f4\u4ef6"}),"\n",(0,t.jsx)(r.p,{children:"\u5728 TypeScript \u4e2d\u4f7f\u7528\u4e2d\u95f4\u4ef6\uff0c\u4f60\u4e0d\u9700\u8981\u505a\u4efb\u4f55\u7279\u6b8a\u7684\u4e8b\u60c5\u3002"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"import { create } from 'zustand'\r\nimport { devtools, persist } from 'zustand/middleware'\r\n\r\ninterface BearState {\r\n    bears: number\r\n    increase: (by: number) => void\r\n}\r\n\r\nconst useBearStore = create<BearState>()(\r\n    devtools(\r\n        persist(\r\n            (set) => ({\r\n                bears: 0,\r\n                increase: (by) => set((state) => ({ bears: state.bears + by })),\r\n            }),\r\n            { name: 'bearStore' },\r\n        ),\r\n    ),\r\n)\n"})}),"\n",(0,t.jsxs)(r.p,{children:["\u53ea\u9700\u786e\u4fdd\u4f60\u5728 ",(0,t.jsx)(r.code,{children:"create"})," \u5185\u90e8\u7acb\u5373\u4f7f\u7528\u5b83\u4eec\uff0c\u4ee5\u4f7f\u4e0a\u4e0b\u6587\u63a8\u65ad\u5de5\u4f5c\u3002\u505a\u4e00\u4e9b\u7a0d\u5fae\u590d\u6742\u7684\u4e8b\u60c5\uff0c\u6bd4\u5982\u4e0b\u9762\u7684 ",(0,t.jsx)(r.code,{children:"myMiddlewares"}),"\uff0c\u53ef\u80fd\u9700\u8981\u66f4\u9ad8\u7ea7\u7684\u7c7b\u578b\u3002"]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"import { create } from 'zustand'\r\nimport { devtools, persist } from 'zustand/middleware'\r\n\r\nconst myMiddlewares = (f) => devtools(persist(f, { name: 'bearStore' }))\r\n\r\ninterface BearState {\r\n    bears: number\r\n    increase: (by: number) => void\r\n}\r\n\r\nconst useBearStore = create<BearState>()(\r\n    myMiddlewares((set) => ({\r\n        bears: 0,\r\n        increase: (by) => set((state) => ({ bears: state.bears + by })),\r\n    })),\r\n)\n"})}),"\n",(0,t.jsxs)(r.p,{children:["\u6b64\u5916\uff0c\u6211\u4eec\u5efa\u8bae\u5c3d\u53ef\u80fd\u5728\u6700\u540e\u4f7f\u7528 ",(0,t.jsx)(r.code,{children:"devtools"})," \u4e2d\u95f4\u4ef6\u3002\u4f8b\u5982\uff0c\u5f53\u4f60\u5c06 ",(0,t.jsx)(r.code,{children:"immer"})," \u4f5c\u4e3a\u4e2d\u95f4\u4ef6\u4f7f\u7528\u65f6\uff0c\u5b83\u5e94\u8be5\u662f ",(0,t.jsx)(r.code,{children:"immer(devtools(...))"})," \u800c\u4e0d\u662f ",(0,t.jsx)(r.code,{children:"devtools(immer(...))"}),"\u3002\u8fd9\u662f\u56e0\u4e3a ",(0,t.jsx)(r.code,{children:"devtools"})," \u6539\u53d8\u4e86 ",(0,t.jsx)(r.code,{children:"setState"})," \u5e76\u5728\u5176\u4e0a\u6dfb\u52a0\u4e86\u4e00\u4e2a\u7c7b\u578b\u53c2\u6570\uff0c\u5982\u679c\u5176\u4ed6\u4e2d\u95f4\u4ef6\uff08\u5982 ",(0,t.jsx)(r.code,{children:"immer"}),"\uff09\u5728 ",(0,t.jsx)(r.code,{children:"devtools"})," \u4e4b\u524d\u4e5f\u6539\u53d8\u4e86 ",(0,t.jsx)(r.code,{children:"setState"}),"\uff0c\u8fd9\u4e2a\u7c7b\u578b\u53c2\u6570\u53ef\u80fd\u4f1a\u4e22\u5931\u3002\u56e0\u6b64\uff0c\u6700\u540e\u4f7f\u7528 ",(0,t.jsx)(r.code,{children:"devtools"})," \u53ef\u4ee5\u786e\u4fdd\u6ca1\u6709\u4e2d\u95f4\u4ef6\u5728\u5b83\u4e4b\u524d\u6539\u53d8 ",(0,t.jsx)(r.code,{children:"setState"}),"\u3002"]}),"\n",(0,t.jsx)(r.h2,{id:"authoring-middlewares-and-advanced-usage",children:"\u7f16\u5199\u4e2d\u95f4\u4ef6\u548c\u9ad8\u7ea7\u4f7f\u7528"}),"\n",(0,t.jsx)(r.p,{children:"\u5047\u8bbe\u4f60\u9700\u8981\u7f16\u5199\u8fd9\u4e2a\u5047\u8bbe\u7684\u4e2d\u95f4\u4ef6\u3002"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"import { create } from 'zustand'\r\n\r\nconst foo = (f, bar) => (set, get, store) => {\r\n    store.foo = bar\r\n    return f(set, get, store)\r\n}\r\n\r\nconst useBearStore = create(foo(() => ({ bears: 0 }), 'hello'))\r\nconsole.log(useBearStore.foo.toUpperCase())\n"})}),"\n",(0,t.jsxs)(r.p,{children:["Zustand \u4e2d\u95f4\u4ef6\u53ef\u4ee5\u6539\u53d8\u5b58\u50a8\u3002\u4f46\u662f\u6211\u4eec\u5982\u4f55\u5728\u7c7b\u578b\u7ea7\u522b\u7f16\u7801\u8fd9\u79cd\u53d8\u5316\u5462\uff1f\u4e5f\u5c31\u662f\u8bf4\uff0c\u6211\u4eec\u5982\u4f55\u7c7b\u578b\u5316 ",(0,t.jsx)(r.code,{children:"foo"})," \u4ee5\u4f7f\u8fd9\u6bb5\u4ee3\u7801\u7f16\u8bd1\uff1f"]}),"\n",(0,t.jsxs)(r.p,{children:['\u5bf9\u4e8e\u4e00\u4e2a\u901a\u5e38\u7684\u9759\u6001\u7c7b\u578b\u8bed\u8a00\uff0c\u8fd9\u662f\u4e0d\u53ef\u80fd\u7684\u3002\u4f46\u662f\uff0c\u7531\u4e8e TypeScript\uff0cZustand \u6709\u4e00\u4e2a\u53eb\u505a "\u9ad8\u9636\u53d8\u5f02\u5668" \u7684\u4e1c\u897f\uff0c\u4f7f\u5f97\u8fd9\u6210\u4e3a\u53ef\u80fd\u3002\u5982\u679c\u4f60\u6b63\u5728\u5904\u7406\u590d\u6742\u7684\u7c7b\u578b\u95ee\u9898\uff0c\u6bd4\u5982\u7c7b\u578b\u5316\u4e00\u4e2a\u4e2d\u95f4\u4ef6\u6216\u4f7f\u7528 ',(0,t.jsx)(r.code,{children:"StateCreator"})," \u7c7b\u578b\uff0c\u4f60\u5c06\u9700\u8981\u7406\u89e3\u8fd9\u4e2a\u5b9e\u73b0\u7ec6\u8282\u3002\u4e3a\u6b64\uff0c\u4f60\u53ef\u4ee5",(0,t.jsx)(r.a,{href:"https://github.com/pmndrs/zustand/issues/710",children:"\u67e5\u770b #710"}),"\u3002"]}),"\n",(0,t.jsxs)(r.p,{children:["\u5982\u679c\u4f60\u6025\u4e8e\u77e5\u9053\u8fd9\u4e2a\u7279\u5b9a\u95ee\u9898\u7684\u7b54\u6848\uff0c\u90a3\u4e48\u4f60\u53ef\u4ee5",(0,t.jsx)(r.a,{href:"#middleware-that-changes-the-store-type",children:"\u5728\u8fd9\u91cc\u770b\u5230"}),"\u3002"]}),"\n",(0,t.jsx)(r.h2,{id:"common-recipes",children:"\u5e38\u89c1\u914d\u65b9"}),"\n",(0,t.jsx)(r.h3,{id:"middleware-that-doesn't-change-the-store-type",children:"\u4e0d\u6539\u53d8\u5b58\u50a8\u7c7b\u578b\u7684\u4e2d\u95f4\u4ef6"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"import { create, State, StateCreator, StoreMutatorIdentifier } from 'zustand'\r\n\r\ntype Logger = <\r\n  T extends State,\r\n  Mps extends [StoreMutatorIdentifier, unknown][] = [],\r\n  Mcs extends [StoreMutatorIdentifier, unknown][] = [],\r\n>(\r\n  f: StateCreator<T, Mps, Mcs>,\r\n  name?: string,\r\n) => StateCreator<T, Mps, Mcs>\r\n\r\ntype LoggerImpl = <T extends State>(\r\n  f: StateCreator<T, [], []>,\r\n  name?: string,\r\n) => StateCreator<T, [], []>\r\n\r\nconst loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {\r\n  type T = ReturnType<typeof f>\r\n  const loggedSet: typeof set = (...a) => {\r\n    set(...a)\r\n    console.log(...(name ? [`${name}:`] : []), get())\r\n  }\r\n  const setState = store.setState\r\n  store.setState = (...a) => {\r\n    setState(...a)\r\n    console.log(...(name ? [`${name}:`] : []), store.getState())\r\n  }\r\n\r\n  return f(loggedSet, get, store)\r\n}\r\n\r\nexport const logger = loggerImpl as unknown as Logger\r\n\r\n// ---\r\n\r\nconst useBearStore = create<BearState>()(\r\n  logger(\r\n    (set) => ({\r\n      bears: 0,\r\n      increase: (by) => set((state) => ({ bears: state.bears + by })),\r\n    }),\r\n    'bear-store',\r\n  ),\r\n)\n"})}),"\n",(0,t.jsx)(r.h3,{id:"middleware-that-changes-the-store-type",children:"\u6539\u53d8\u5b58\u50a8\u7c7b\u578b\u7684\u4e2d\u95f4\u4ef6"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"import {\r\n  create,\r\n  State,\r\n  StateCreator,\r\n  StoreMutatorIdentifier,\r\n  Mutate,\r\n  StoreApi,\r\n} from 'zustand'\r\n\r\ntype Foo = <\r\n  T extends State,\r\n  A,\r\n  Mps extends [StoreMutatorIdentifier, unknown][] = [],\r\n  Mcs extends [StoreMutatorIdentifier, unknown][] = [],\r\n>(\r\n  f: StateCreator<T, [...Mps, ['foo', A]], Mcs>,\r\n  bar: A,\r\n) => StateCreator<T, Mps, [['foo', A], ...Mcs]>\r\n\r\ndeclare module 'zustand' {\r\n  interface StoreMutators<S, A> {\r\n    foo: Write<Cast<S, object>, { foo: A }>\r\n  }\r\n}\r\n\r\ntype FooImpl = <T extends State, A>(\r\n  f: StateCreator<T, [], []>,\r\n  bar: A,\r\n) => StateCreator<T, [], []>\r\n\r\nconst fooImpl: FooImpl = (f, bar) => (set, get, _store) => {\r\n  type T = ReturnType<typeof f>\r\n  type A = typeof bar\r\n\r\n  const store = _store as Mutate<StoreApi<T>, [['foo', A]]>\r\n  store.foo = bar\r\n  return f(set, get, _store)\r\n}\r\n\r\nexport const foo = fooImpl as unknown as Foo\r\n\r\ntype Write<T extends object, U extends object> = Omit<T, keyof U> & U\r\n\r\ntype Cast<T, U> = T extends U ? T : U\r\n\r\n// ---\r\n\r\nconst useBearStore = create(foo(() => ({ bears: 0 }), 'hello'))\r\nconsole.log(useBearStore.foo.toUpperCase())\n"})}),"\n",(0,t.jsxs)(r.h3,{id:"create-without-curried-workaround",children:["\u4e0d\u4f7f\u7528\u67ef\u91cc\u5316\u89e3\u51b3\u65b9\u6848\u7684 ",(0,t.jsx)(r.code,{children:"create"})]}),"\n",(0,t.jsxs)(r.p,{children:["\u63a8\u8350\u7684\u4f7f\u7528 ",(0,t.jsx)(r.code,{children:"create"})," \u7684\u65b9\u5f0f\u662f\u4f7f\u7528\u67ef\u91cc\u5316\u89e3\u51b3\u65b9\u6848\uff0c\u5982\uff1a",(0,t.jsx)(r.code,{children:"create<T>()(...)"}),"\u3002\u8fd9\u662f\u56e0\u4e3a\u5b83\u53ef\u4ee5\u63a8\u65ad\u51fa\u5b58\u50a8\u7c7b\u578b\u3002\u4f46\u662f\uff0c\u5982\u679c\u51fa\u4e8e\u67d0\u79cd\u539f\u56e0\u4f60\u4e0d\u60f3\u4f7f\u7528\u8fd9\u79cd\u89e3\u51b3\u65b9\u6848\uff0c\u4f60\u53ef\u4ee5\u50cf\u4e0b\u9762\u8fd9\u6837\u4f20\u9012\u7c7b\u578b\u53c2\u6570\u3002\u8bf7\u6ce8\u610f\uff0c\u5728\u67d0\u4e9b\u60c5\u51b5\u4e0b\uff0c\u8fd9\u4f5c\u4e3a\u65ad\u8a00\u800c\u4e0d\u662f\u6ce8\u89e3\uff0c\u6240\u4ee5\u6211\u4eec\u4e0d\u63a8\u8350\u8fd9\u79cd\u65b9\u5f0f\u3002"]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"import { create } from \"zustand\"\r\n\r\ninterface BearState {\r\n  bears: number\r\n  increase: (by: number) => void\r\n}\r\n\r\nconst useBearStore = create<\r\n  BearState,\r\n  [\r\n    ['zustand/persist', BearState],\r\n    ['zustand/devtools', never]\r\n  ]\r\n>(devtools(persist((set) => ({\r\n  bears: 0,\r\n  increase: (by) => set((state) => ({ bears: state.bears + by })),\r\n}), { name: 'bearStore' }))\n"})}),"\n",(0,t.jsx)(r.h3,{id:"slices-pattern",children:"\u5207\u7247\u6a21\u5f0f"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"import { create, StateCreator } from 'zustand'\r\n\r\ninterface BearSlice {\r\n  bears: number\r\n  addBear: () => void\r\n  eatFish: () => void\r\n}\r\n\r\ninterface FishSlice {\r\n  fishes: number\r\n  addFish: () => void\r\n}\r\n\r\ninterface SharedSlice {\r\n  addBoth: () => void\r\n  getBoth: () => void\r\n}\r\n\r\nconst createBearSlice: StateCreator<\r\n  BearSlice & FishSlice,\r\n  [],\r\n  [],\r\n  BearSlice\r\n> = (set) => ({\r\n  bears: 0,\r\n  addBear: () => set((state) => ({ bears: state.bears + 1 })),\r\n  eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),\r\n})\r\n\r\nconst createFishSlice: StateCreator<\r\n  BearSlice & FishSlice,\r\n  [],\r\n  [],\r\n  FishSlice\r\n> = (set) => ({\r\n  fishes: 0,\r\n  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),\r\n})\r\n\r\nconst createSharedSlice: StateCreator<\r\n  BearSlice & FishSlice,\r\n  [],\r\n  [],\r\n  SharedSlice\r\n> = (set, get) => ({\r\n  addBoth: () => {\r\n    // \u4f60\u53ef\u4ee5\u590d\u7528\u4e4b\u524d\u7684\u65b9\u6cd5\r\n    get().addBear()\r\n    get().addFish()\r\n    // \u6216\u8005\u4ece\u5934\u5f00\u59cb\r\n    // set((state) => ({ bears: state.bears + 1, fishes: state.fishes + 1 })\r\n  },\r\n  getBoth: () => get().bears + get().fishes,\r\n})\r\n\r\nconst useBoundStore = create<BearSlice & FishSlice & SharedSlice>()((...a) => ({\r\n  ...createBearSlice(...a),\r\n  ...createFishSlice(...a),\r\n  ...createSharedSlice(...a),\r\n}))\n"})}),"\n",(0,t.jsxs)(r.p,{children:["\u5173\u4e8e\u5207\u7247\u6a21\u5f0f\u7684\u8be6\u7ec6\u89e3\u91ca\u53ef\u4ee5\u5728",(0,t.jsx)(r.a,{href:"/zustand-zh/docs/guides/slices-pattern",children:"\u8fd9\u91cc"}),"\u627e\u5230\u3002"]}),"\n",(0,t.jsxs)(r.p,{children:["\u5982\u679c\u4f60\u6709\u4e00\u4e9b\u4e2d\u95f4\u4ef6\uff0c\u90a3\u4e48\u7528 ",(0,t.jsx)(r.code,{children:"StateCreator<MyState, Mutators, [], MySlice>"})," \u66ff\u6362 ",(0,t.jsx)(r.code,{children:"StateCreator<MyState, [], [], MySlice>"}),"\u3002\u4f8b\u5982\uff0c\u5982\u679c\u4f60\u6b63\u5728\u4f7f\u7528 ",(0,t.jsx)(r.code,{children:"devtools"}),"\uff0c\u90a3\u4e48\u5b83\u5c06\u662f ",(0,t.jsx)(r.code,{children:'StateCreator<MyState, [["zustand/devtools", never]], [], MySlice>'}),"\u3002\u8bf7\u53c2\u9605",(0,t.jsx)(r.a,{href:"#middlewares-and-their-mutators-reference",children:'"\u4e2d\u95f4\u4ef6\u53ca\u5176\u53d8\u5f02\u5668\u5f15\u7528"'}),"\u90e8\u5206\uff0c\u67e5\u770b\u6240\u6709\u53d8\u5f02\u5668\u7684\u5217\u8868\u3002"]}),"\n",(0,t.jsxs)(r.h3,{id:"bounded-usestore-hook-for-vanilla-stores",children:["\u4e3a vanilla \u5b58\u50a8\u9650\u5b9a ",(0,t.jsx)(r.code,{children:"useStore"})," \u94a9\u5b50"]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"import { useStore } from 'zustand'\r\nimport { createStore } from 'zustand/vanilla'\r\n\r\ninterface BearState {\r\n  bears: number\r\n  increase: (by: number) => void\r\n}\r\n\r\nconst bearStore = createStore<BearState>()((set) => ({\r\n  bears: 0,\r\n  increase: (by) => set((state) => ({ bears: state.bears + by })),\r\n}))\r\n\r\nfunction useBearStore(): BearState\r\nfunction useBearStore<T>(selector: (state: BearState) => T): T\r\nfunction useBearStore<T>(selector?: (state: BearState) => T) {\r\n  return useStore(bearStore, selector!)\r\n}\n"})}),"\n",(0,t.jsxs)(r.p,{children:["\u5982\u679c\u4f60\u9700\u8981\u7ecf\u5e38\u521b\u5efa\u6709\u754c\u7684 ",(0,t.jsx)(r.code,{children:"useStore"})," \u94a9\u5b50\u5e76\u5e0c\u671b\u907f\u514d\u91cd\u590d\uff0c\u4f60\u4e5f\u53ef\u4ee5\u521b\u5efa\u4e00\u4e2a\u62bd\u8c61\u7684 ",(0,t.jsx)(r.code,{children:"createBoundedUseStore"})," \u51fd\u6570..."]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:"import { useStore, StoreApi } from 'zustand'\r\nimport { createStore } from 'zustand/vanilla'\r\n\r\ninterface BearState {\r\n  bears: number\r\n  increase: (by: number) => void\r\n}\r\n\r\nconst bearStore = createStore<BearState>()((set) => ({\r\n  bears: 0,\r\n  increase: (by) => set((state) => ({ bears: state.bears + by })),\r\n}))\r\n\r\nconst createBoundedUseStore = ((store) => (selector) => useStore(store)) as <\r\n  S extends StoreApi<unknown>,\r\n>(\r\n  store: S,\r\n) => {\r\n  (): ExtractState<S>\r\n  <T>(selector: (state: ExtractState<S>) => T): T\r\n}\r\n\r\ntype ExtractState<S> = S extends { getState: () => infer X } ? X : never\r\n\r\nconst useBearStore = createBoundedUseStore(bearStore)\n"})}),"\n",(0,t.jsx)(r.h2,{id:"middlewares-and-their-mutators-reference",children:"\u4e2d\u95f4\u4ef6\u53ca\u5176\u53d8\u5f02\u5668\u5f15\u7528"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.code,{children:"devtools"})," \u2014 ",(0,t.jsx)(r.code,{children:'["zustand/devtools", never]'})]}),"\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.code,{children:"persist"})," \u2014 ",(0,t.jsx)(r.code,{children:'["zustand/persist", YourPersistedState]'}),(0,t.jsx)("br",{}),"\r\n",(0,t.jsx)(r.code,{children:"YourPersistedState"})," \u662f\u4f60\u6253\u7b97\u6301\u4e45\u5316\u7684\u72b6\u6001\u7c7b\u578b\uff0c\u5373 ",(0,t.jsx)(r.code,{children:"options.partialize"})," \u7684\u8fd4\u56de\u7c7b\u578b\uff0c\u5982\u679c\u4f60\u6ca1\u6709\u4f20\u9012 ",(0,t.jsx)(r.code,{children:"partialize"})," \u9009\u9879\uff0c\u90a3\u4e48 ",(0,t.jsx)(r.code,{children:"YourPersistedState"})," \u53d8\u4e3a ",(0,t.jsx)(r.code,{children:"Partial<YourState>"}),"\u3002\u53e6\u5916\uff0c",(0,t.jsx)(r.a,{href:"https://github.com/pmndrs/zustand/issues/980#issuecomment-1162289836",children:"\u6709\u65f6"})," \u4f20\u9012\u5b9e\u9645\u7684 ",(0,t.jsx)(r.code,{children:"PersistedState"})," \u4e0d\u4f1a\u8d77\u4f5c\u7528\u3002\u5728\u8fd9\u4e9b\u60c5\u51b5\u4e0b\uff0c\u5c1d\u8bd5\u4f20\u9012 ",(0,t.jsx)(r.code,{children:"unknown"}),"\u3002"]}),"\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.code,{children:"immer"})," \u2014 ",(0,t.jsx)(r.code,{children:'["zustand/immer", never]'})]}),"\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.code,{children:"subscribeWithSelector"})," \u2014 ",(0,t.jsx)(r.code,{children:'["zustand/subscribeWithSelector", never]'})]}),"\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.code,{children:"redux"})," \u2014 ",(0,t.jsx)(r.code,{children:'["zustand/redux", YourAction]'})]}),"\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.code,{children:"combine"})," \u2014 \u6ca1\u6709\u53d8\u5f02\u5668\uff0c\u56e0\u4e3a ",(0,t.jsx)(r.code,{children:"combine"})," \u4e0d\u4f1a\u6539\u53d8\u5b58\u50a8"]}),"\n"]})]})}function h(e={}){const{wrapper:r}={...(0,c.R)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},8453:(e,r,n)=>{n.d(r,{R:()=>o,x:()=>d});var s=n(6540);const t={},c=s.createContext(t);function o(e){const r=s.useContext(c);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function d(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),s.createElement(c.Provider,{value:r},e.children)}}}]);