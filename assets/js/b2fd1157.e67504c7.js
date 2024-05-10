"use strict";(self.webpackChunkzustand_zh=self.webpackChunkzustand_zh||[]).push([[883],{1786:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>u,contentTitle:()=>i,default:()=>l,frontMatter:()=>s,metadata:()=>a,toc:()=>c});var n=t(4848),o=t(8453);const s={title:"Setup with Next.js",nav:21},i=void 0,a={id:"guides/nextjs",title:"Setup with Next.js",description:"Next.js is a popular server-side rendering framework for React that presents",source:"@site/docs/guides/nextjs.md",sourceDirName:"guides",slug:"/guides/nextjs",permalink:"/zustand-zh/docs/guides/nextjs",draft:!1,unlisted:!1,editUrl:"https://github.com/ouweiya/zustand-zh/blob/master/docs/guides/nextjs.md",tags:[],version:"current",frontMatter:{title:"Setup with Next.js",nav:21},sidebar:"tutorialSidebar",previous:{title:"SSR and Hydration",permalink:"/zustand-zh/docs/guides/ssr-and-hydration"},next:{title:"Immer middleware",permalink:"/zustand-zh/docs/integrations/immer-middleware"}},u={},c=[{value:"Creating a store per request",id:"creating-a-store-per-request",level:3},{value:"Providing the store",id:"providing-the-store",level:3},{value:"Initializing the store",id:"initializing-the-store",level:3},{value:"Using the store with different architectures",id:"using-the-store-with-different-architectures",level:3},{value:"Pages Router",id:"pages-router",level:4},{value:"App Router",id:"app-router",level:4}];function d(e){const r={a:"a",blockquote:"blockquote",code:"code",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.a,{href:"https://nextjs.org",children:"Next.js"})," is a popular server-side rendering framework for React that presents\r\nsome unique challenges for using Zustand properly.\r\nKeep in mind that Zustand store is a global\r\nvariable (AKA module state) making it optional to use a ",(0,n.jsx)(r.code,{children:"Context"}),".\r\nThese challenges include:"]}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:"Per-request store:"})," A Next.js server can handle multiple requests simultaneously. This means\r\nthat the store should be created per request and should not be shared across requests."]}),"\n",(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:"SSR friendly:"}),' Next.js applications are rendered twice, first on the server\r\nand again on the client. Having different outputs on both the client and the server will result\r\nin "hydration errors." The store will have to be initialized on the server and then\r\nre-initialized on the client with the same data in order to avoid that. Please read more about\r\nthat in our ',(0,n.jsx)(r.a,{href:"./ssr-and-hydration",children:"SSR and Hydration"})," guide."]}),"\n",(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:"SPA routing friendly:"})," Next.js supports a hybrid model for client side routing, which means\r\nthat in order to reset a store, we need to initialize it at the component level using a\r\n",(0,n.jsx)(r.code,{children:"Context"}),"."]}),"\n",(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:"Server caching friendly:"})," Recent versions of Next.js (specifically applications using the App\r\nRouter architecture) support aggressive server caching. Due to our store being a ",(0,n.jsx)(r.strong,{children:"module state"}),",\r\nit is completely compatible with this caching."]}),"\n"]}),"\n",(0,n.jsx)(r.p,{children:"We have these general recommendations for the appropriate use of Zustand:"}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:"No global stores"})," - Because the store should not be shared across requests, it should not be defined\r\nas a global variable. Instead, the store should be created per request."]}),"\n",(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:"React Server Components should not read from or write to the store"})," - RSCs cannot use hooks or context. They aren't\r\nmeant to be stateful. Having an RSC read from or write values to a global store violates the\r\narchitecture of Next.js."]}),"\n"]}),"\n",(0,n.jsx)(r.h3,{id:"creating-a-store-per-request",children:"Creating a store per request"}),"\n",(0,n.jsx)(r.p,{children:"Let's write our store factory function that will create a new store for each\r\nrequest."}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-json",children:'// tsconfig.json\r\n{\r\n  "compilerOptions": {\r\n    "lib": ["dom", "dom.iterable", "esnext"],\r\n    "allowJs": true,\r\n    "skipLibCheck": true,\r\n    "strict": true,\r\n    "noEmit": true,\r\n    "esModuleInterop": true,\r\n    "module": "esnext",\r\n    "moduleResolution": "bundler",\r\n    "resolveJsonModule": true,\r\n    "isolatedModules": true,\r\n    "jsx": "preserve",\r\n    "incremental": true,\r\n    "plugins": [\r\n      {\r\n        "name": "next"\r\n      }\r\n    ],\r\n    "paths": {\r\n      "@/*": ["./src/*"]\r\n    }\r\n  },\r\n  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],\r\n  "exclude": ["node_modules"]\r\n}\n'})}),"\n",(0,n.jsxs)(r.blockquote,{children:["\n",(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.strong,{children:"Note:"})," do not forget to remove all comments from your ",(0,n.jsx)(r.code,{children:"tsconfig.json"})," file."]}),"\n"]}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-ts",children:"// src/stores/counter-store.ts\r\nimport { createStore } from 'zustand/vanilla'\r\n\r\nexport type CounterState = {\r\n  count: number\r\n}\r\n\r\nexport type CounterActions = {\r\n  decrementCount: () => void\r\n  incrementCount: () => void\r\n}\r\n\r\nexport type CounterStore = CounterState & CounterActions\r\n\r\nexport const defaultInitState: CounterState = {\r\n  count: 0,\r\n}\r\n\r\nexport const createCounterStore = (\r\n  initState: CounterState = defaultInitState,\r\n) => {\r\n  return createStore<CounterStore>()((set) => ({\r\n    ...initState,\r\n    decrementCount: () => set((state) => ({ count: state.count - 1 })),\r\n    incrementCount: () => set((state) => ({ count: state.count + 1 })),\r\n  }))\r\n}\n"})}),"\n",(0,n.jsx)(r.h3,{id:"providing-the-store",children:"Providing the store"}),"\n",(0,n.jsxs)(r.p,{children:["Let's use the ",(0,n.jsx)(r.code,{children:"createCounterStore"})," in our component and share it using a context provider."]}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-tsx",children:"// src/providers/counter-store-provider.tsx\r\n'use client'\r\n\r\nimport { type ReactNode, createContext, useRef, useContext } from 'react'\r\nimport { useStore } from 'zustand'\r\n\r\nimport { type CounterStore, createCounterStore } from '@/stores/counter-store'\r\n\r\nexport type CounterStoreApi = ReturnType<typeof createCounterStore>\r\n\r\nexport const CounterStoreContext = createContext<CounterStoreApi | undefined>(\r\n  undefined,\r\n)\r\n\r\nexport interface CounterStoreProviderProps {\r\n  children: ReactNode\r\n}\r\n\r\nexport const CounterStoreProvider = ({\r\n  children,\r\n}: CounterStoreProviderProps) => {\r\n  const storeRef = useRef<CounterStoreApi>()\r\n  if (!storeRef.current) {\r\n    storeRef.current = createCounterStore()\r\n  }\r\n\r\n  return (\r\n    <CounterStoreContext.Provider value={storeRef.current}>\r\n      {children}\r\n    </CounterStoreContext.Provider>\r\n  )\r\n}\r\n\r\nexport const useCounterStore = <T,>(\r\n  selector: (store: CounterStore) => T,\r\n): T => {\r\n  const counterStoreContext = useContext(CounterStoreContext)\r\n\r\n  if (!counterStoreContext) {\r\n    throw new Error(`useCounterStore must be used within CounterStoreProvider`)\r\n  }\r\n\r\n  return useStore(counterStoreContext, selector)\r\n}\n"})}),"\n",(0,n.jsxs)(r.blockquote,{children:["\n",(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.strong,{children:"Note:"})," In this example, we ensure that this component is re-render-safe by checking the\r\nvalue of the reference, so that the store is only created once. This component will only be\r\nrendered once per request on the server, but might be re-rendered multiple times on the client if\r\nthere are stateful client components located above this component in the tree, or if this component\r\nalso contains other mutable state that causes a re-render."]}),"\n"]}),"\n",(0,n.jsx)(r.h3,{id:"initializing-the-store",children:"Initializing the store"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-ts",children:"// src/stores/counter-store.ts\r\nimport { createStore } from 'zustand/vanilla'\r\n\r\nexport type CounterState = {\r\n  count: number\r\n}\r\n\r\nexport type CounterActions = {\r\n  decrementCount: () => void\r\n  incrementCount: () => void\r\n}\r\n\r\nexport type CounterStore = CounterState & CounterActions\r\n\r\nexport const initCounterStore = (): CounterState => {\r\n  return { count: new Date().getFullYear() }\r\n}\r\n\r\nexport const defaultInitState: CounterState = {\r\n  count: 0,\r\n}\r\n\r\nexport const createCounterStore = (\r\n  initState: CounterState = defaultInitState,\r\n) => {\r\n  return createStore<CounterStore>()((set) => ({\r\n    ...initState,\r\n    decrementCount: () => set((state) => ({ count: state.count - 1 })),\r\n    incrementCount: () => set((state) => ({ count: state.count + 1 })),\r\n  }))\r\n}\n"})}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-tsx",children:"// src/providers/counter-store-provider.tsx\r\n'use client'\r\n\r\nimport { type ReactNode, createContext, useRef, useContext } from 'react'\r\nimport { useStore } from 'zustand'\r\n\r\nimport {\r\n  type CounterStore,\r\n  createCounterStore,\r\n  initCounterStore,\r\n} from '@/stores/counter-store'\r\n\r\nexport type CounterStoreApi = ReturnType<typeof createCounterStore>\r\n\r\nexport const CounterStoreContext = createContext<CounterStoreApi | undefined>(\r\n  undefined,\r\n)\r\n\r\nexport interface CounterStoreProviderProps {\r\n  children: ReactNode\r\n}\r\n\r\nexport const CounterStoreProvider = ({\r\n  children,\r\n}: CounterStoreProviderProps) => {\r\n  const storeRef = useRef<CounterStoreApi>()\r\n  if (!storeRef.current) {\r\n    storeRef.current = createCounterStore(initCounterStore())\r\n  }\r\n\r\n  return (\r\n    <CounterStoreContext.Provider value={storeRef.current}>\r\n      {children}\r\n    </CounterStoreContext.Provider>\r\n  )\r\n}\r\n\r\nexport const useCounterStore = <T,>(\r\n  selector: (store: CounterStore) => T,\r\n): T => {\r\n  const counterStoreContext = useContext(CounterStoreContext)\r\n\r\n  if (!counterStoreContext) {\r\n    throw new Error(`useCounterStore must be used within CounterStoreProvider`)\r\n  }\r\n\r\n  return useStore(counterStoreContext, selector)\r\n}\n"})}),"\n",(0,n.jsx)(r.h3,{id:"using-the-store-with-different-architectures",children:"Using the store with different architectures"}),"\n",(0,n.jsxs)(r.p,{children:["There are two architectures for a Next.js application: the\r\n",(0,n.jsx)(r.a,{href:"https://nextjs.org/docs/pages/building-your-application/routing",children:"Pages Router"})," and the\r\n",(0,n.jsx)(r.a,{href:"https://nextjs.org/docs/app/building-your-application/routing",children:"App Router"}),". The usage of Zustand on\r\nboth architectures should be the same with slight differences related to each architecture."]}),"\n",(0,n.jsx)(r.h4,{id:"pages-router",children:"Pages Router"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-tsx",children:'// src/components/pages/home-page.tsx\r\nimport { useCounterStore } from \'@/providers/counter-store-provider.ts\'\r\n\r\nexport const HomePage = () => {\r\n  const { count, incrementCount, decrementCount } = useCounterStore(\r\n    (state) => state,\r\n  )\r\n\r\n  return (\r\n    <div>\r\n      Count: {count}\r\n      <hr />\r\n      <button type="button" onClick={() => void incrementCount()}>\r\n        Increment Count\r\n      </button>\r\n      <button type="button" onClick={() => void decrementCount()}>\r\n        Decrement Count\r\n      </button>\r\n    </div>\r\n  )\r\n}\n'})}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-tsx",children:"// src/_app.tsx\r\nimport type { AppProps } from 'next/app'\r\n\r\nimport { CounterStoreProvider } from '@/providers/counter-store-provider.tsx'\r\n\r\nexport default function App({ Component, pageProps }: AppProps) {\r\n  return (\r\n    <CounterStoreProvider>\r\n      <Component {...pageProps} />\r\n    </CounterStoreProvider>\r\n  )\r\n}\n"})}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-tsx",children:"// src/pages/index.tsx\r\nimport { HomePage } from '@/components/pages/home-page.tsx'\r\n\r\nexport default function Home() {\r\n  return <HomePage />\r\n}\n"})}),"\n",(0,n.jsxs)(r.blockquote,{children:["\n",(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.strong,{children:"Note:"})," creating a store per route would require creating and sharing the store\r\nat page (route) component level. Try not to use this if you do not need to create\r\na store per route."]}),"\n"]}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-tsx",children:"// src/pages/index.tsx\r\nimport { CounterStoreProvider } from '@/providers/counter-store-provider.tsx'\r\nimport { HomePage } from '@/components/pages/home-page.tsx'\r\n\r\nexport default function Home() {\r\n  return (\r\n    <CounterStoreProvider>\r\n      <HomePage />\r\n    </CounterStoreProvider>\r\n  )\r\n}\n"})}),"\n",(0,n.jsx)(r.h4,{id:"app-router",children:"App Router"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-tsx",children:"// src/components/pages/home-page.tsx\r\n'use client'\r\n\r\nimport { useCounterStore } from '@/providers/counter-store-provider'\r\n\r\nexport const HomePage = () => {\r\n  const { count, incrementCount, decrementCount } = useCounterStore(\r\n    (state) => state,\r\n  )\r\n\r\n  return (\r\n    <div>\r\n      Count: {count}\r\n      <hr />\r\n      <button type=\"button\" onClick={() => void incrementCount()}>\r\n        Increment Count\r\n      </button>\r\n      <button type=\"button\" onClick={() => void decrementCount()}>\r\n        Decrement Count\r\n      </button>\r\n    </div>\r\n  )\r\n}\n"})}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-tsx",children:"// src/app/layout.tsx\r\nimport type { Metadata } from 'next'\r\nimport { Inter } from 'next/font/google'\r\nimport './globals.css'\r\n\r\nimport { CounterStoreProvider } from '@/providers/counter-store-provider'\r\n\r\nconst inter = Inter({ subsets: ['latin'] })\r\n\r\nexport const metadata: Metadata = {\r\n  title: 'Create Next App',\r\n  description: 'Generated by create next app',\r\n}\r\n\r\nexport default function RootLayout({\r\n  children,\r\n}: Readonly<{\r\n  children: React.ReactNode\r\n}>) {\r\n  return (\r\n    <html lang=\"en\">\r\n      <body className={inter.className}>\r\n        <CounterStoreProvider>{children}</CounterStoreProvider>\r\n      </body>\r\n    </html>\r\n  )\r\n}\n"})}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-tsx",children:"// src/app/page.tsx\r\nimport { HomePage } from '@/components/pages/home-page'\r\n\r\nexport default function Home() {\r\n  return <HomePage />\r\n}\n"})}),"\n",(0,n.jsxs)(r.blockquote,{children:["\n",(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.strong,{children:"Note:"})," creating a store per route would require creating and sharing the store\r\nat page (route) component level. Try not to use this if you do not need to create\r\na store per route."]}),"\n"]}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-tsx",children:"// src/app/page.tsx\r\nimport { CounterStoreProvider } from '@/providers/counter-store-provider'\r\nimport { HomePage } from '@/components/pages/home-page'\r\n\r\nexport default function Home() {\r\n  return (\r\n    <CounterStoreProvider>\r\n      <HomePage />\r\n    </CounterStoreProvider>\r\n  )\r\n}\n"})})]})}function l(e={}){const{wrapper:r}={...(0,o.R)(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},8453:(e,r,t)=>{t.d(r,{R:()=>i,x:()=>a});var n=t(6540);const o={},s=n.createContext(o);function i(e){const r=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function a(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),n.createElement(s.Provider,{value:r},e.children)}}}]);