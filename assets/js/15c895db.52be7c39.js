"use strict";(self.webpackChunkzustand_zh=self.webpackChunkzustand_zh||[]).push([[1608],{6313:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>l,default:()=>u,frontMatter:()=>i,metadata:()=>r,toc:()=>c});const r=JSON.parse('{"id":"middlewares/redux","title":"redux","description":"\u5982\u4f55\u5728 store \u4e2d\u4f7f\u7528 actions \u548c reducers","source":"@site/docs/middlewares/redux.md","sourceDirName":"middlewares","slug":"/middlewares/redux","permalink":"/zustand-zh/docs/middlewares/redux","draft":false,"unlisted":false,"editUrl":"https://github.com/ouweiya/zustand-zh/blob/master/docs/middlewares/redux.md","tags":[],"version":"current","frontMatter":{"title":"redux","description":"\u5982\u4f55\u5728 store \u4e2d\u4f7f\u7528 actions \u548c reducers","nav":208},"sidebar":"tutorialSidebar","previous":{"title":"persist","permalink":"/zustand-zh/docs/middlewares/persist"},"next":{"title":"subscribeWithSelector","permalink":"/zustand-zh/docs/middlewares/subscribe-with-selector"}}');var s=t(4848),a=t(8453);const i={title:"redux",description:"\u5982\u4f55\u5728 store \u4e2d\u4f7f\u7528 actions \u548c reducers",nav:208},l="redux",d={},c=[{value:"\u7c7b\u578b",id:"\u7c7b\u578b",level:2},{value:"\u7b7e\u540d",id:"\u7b7e\u540d",level:3},{value:"\u53d8\u6362\u5668",id:"\u53d8\u6362\u5668",level:3},{value:"\u53c2\u8003",id:"\u53c2\u8003",level:2},{value:"<code>redux(reducerFn, initialState)</code>",id:"reduxreducerfn-initialstate",level:3},{value:"\u53c2\u6570",id:"\u53c2\u6570",level:4},{value:"\u8fd4\u56de\u503c",id:"\u8fd4\u56de\u503c",level:4},{value:"\u7528\u6cd5",id:"\u7528\u6cd5",level:2},{value:"\u901a\u8fc7 actions \u548c reducers \u66f4\u65b0\u72b6\u6001",id:"\u901a\u8fc7-actions-\u548c-reducers-\u66f4\u65b0\u72b6\u6001",level:3},{value:"\u6545\u969c\u6392\u9664",id:"\u6545\u969c\u6392\u9664",level:2}];function o(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"redux",children:"redux"})}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"redux"})," \u4e2d\u95f4\u4ef6\u5141\u8bb8\u4f60\u50cf redux \u4e00\u6837\u901a\u8fc7 actions \u548c reducers \u66f4\u65b0 store\u3002"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"const nextStateCreatorFn = redux(reducerFn, initialState)\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"#%E7%B1%BB%E5%9E%8B",children:"\u7c7b\u578b"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"#%E7%AD%BE%E5%90%8D",children:"\u7b7e\u540d"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"#%E5%8F%98%E5%BC%82%E5%99%A8",children:"\u53d8\u5f02\u5668"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"#%E5%8F%82%E8%80%83",children:"\u53c2\u8003"})}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"#%E7%94%A8%E6%B3%95",children:"\u7528\u6cd5"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"#%E9%80%9A%E8%BF%87-actions-%E5%92%8C-reducers-%E6%9B%B4%E6%96%B0%E7%8A%B6%E6%80%81",children:"\u901a\u8fc7 actions \u548c reducers \u66f4\u65b0\u72b6\u6001"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"#%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4",children:"\u6545\u969c\u6392\u9664"})}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"\u7c7b\u578b",children:"\u7c7b\u578b"}),"\n",(0,s.jsx)(n.h3,{id:"\u7b7e\u540d",children:"\u7b7e\u540d"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"redux<T, A>(reducerFn: (state: T, action: A) => T, initialState: T): StateCreator<T & { dispatch: (action: A) => A }, [['zustand/redux', A]], []>\n"})}),"\n",(0,s.jsx)(n.h3,{id:"\u53d8\u6362\u5668",children:"\u53d8\u6362\u5668"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"['zustand/redux', A]\n"})}),"\n",(0,s.jsx)(n.h2,{id:"\u53c2\u8003",children:"\u53c2\u8003"}),"\n",(0,s.jsx)(n.h3,{id:"reduxreducerfn-initialstate",children:(0,s.jsx)(n.code,{children:"redux(reducerFn, initialState)"})}),"\n",(0,s.jsx)(n.h4,{id:"\u53c2\u6570",children:"\u53c2\u6570"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"reducerFn"}),": \u5b83\u5e94\u8be5\u662f\u7eaf\u51fd\u6570\uff0c\u5e94\u8be5\u63a5\u53d7\u5e94\u7528\u7a0b\u5e8f\u7684\u5f53\u524d\u72b6\u6001\u548c\u4e00\u4e2a action \u5bf9\u8c61\u4f5c\u4e3a\u53c2\u6570\uff0c\u5e76\u8fd4\u56de\u5e94\u7528 action \u540e\u7684\u65b0\u72b6\u6001\u3002"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"initialState"}),": \u4f60\u5e0c\u671b\u72b6\u6001\u6700\u521d\u7684\u503c\u3002\u5b83\u53ef\u4ee5\u662f\u4efb\u4f55\u7c7b\u578b\u7684\u503c\uff0c\u9664\u4e86\u51fd\u6570\u3002"]}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"\u8fd4\u56de\u503c",children:"\u8fd4\u56de\u503c"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"redux"})," \u8fd4\u56de\u4e00\u4e2a\u72b6\u6001\u521b\u5efa\u51fd\u6570\u3002"]}),"\n",(0,s.jsx)(n.h2,{id:"\u7528\u6cd5",children:"\u7528\u6cd5"}),"\n",(0,s.jsx)(n.h3,{id:"\u901a\u8fc7-actions-\u548c-reducers-\u66f4\u65b0\u72b6\u6001",children:"\u901a\u8fc7 actions \u548c reducers \u66f4\u65b0\u72b6\u6001"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"import { createStore } from 'zustand/vanilla'\nimport { redux } from 'zustand/middleware'\n\ntype PersonStoreState = {\n  firstName: string\n  lastName: string\n  email: string\n}\n\ntype PersonStoreAction =\n  | { type: 'person/setFirstName'; firstName: string }\n  | { type: 'person/setLastName'; lastName: string }\n  | { type: 'person/setEmail'; email: string }\n\ntype PersonStore = PersonStoreState & PersonStoreActions\n\nconst personStoreReducer = (\n  state: PersonStoreState,\n  action: PersonStoreAction,\n) => {\n  switch (action.type) {\n    case 'person/setFirstName': {\n      return { ...state, firstName: action.firstName }\n    }\n    case 'person/setLastName': {\n      return { ...state, lastName: action.lastName }\n    }\n    case 'person/setEmail': {\n      return { ...state, email: action.email }\n    }\n    default: {\n      return state\n    }\n  }\n}\n\nconst personStoreInitialState: PersonStoreState = {\n  firstName: 'Barbara',\n  lastName: 'Hepworth',\n  email: 'bhepworth@sculpture.com',\n}\n\nconst personStore = createStore<PersonStore>()(\n  redux(personStoreReducer, personStoreInitialState),\n)\n\nconst $firstNameInput = document.getElementById(\n  'first-name',\n) as HTMLInputElement\nconst $lastNameInput = document.getElementById('last-name') as HTMLInputElement\nconst $emailInput = document.getElementById('email') as HTMLInputElement\nconst $result = document.getElementById('result') as HTMLDivElement\n\nfunction handleFirstNameChange(event: Event) {\n  personStore.dispatch({\n    type: 'person/setFirstName',\n    firstName: (event.target as any).value,\n  })\n}\n\nfunction handleLastNameChange(event: Event) {\n  personStore.dispatch({\n    type: 'person/setLastName',\n    lastName: (event.target as any).value,\n  })\n}\n\nfunction handleEmailChange(event: Event) {\n  personStore.dispatch({\n    type: 'person/setEmail',\n    email: (event.target as any).value,\n  })\n}\n\n$firstNameInput.addEventListener('input', handleFirstNameChange)\n$lastNameInput.addEventListener('input', handleLastNameChange)\n$emailInput.addEventListener('input', handleEmailChange)\n\nconst render: Parameters<typeof personStore.subscribe>[0] = (person) => {\n  $firstNameInput.value = person.firstName\n  $lastNameInput.value = person.lastName\n  $emailInput.value = person.email\n\n  $result.innerHTML = `${person.firstName} ${person.lastName} (${person.email})`\n}\n\nrender(personStore.getInitialState(), personStore.getInitialState())\n\npersonStore.subscribe(render)\n"})}),"\n",(0,s.jsxs)(n.p,{children:["\u8fd9\u662f ",(0,s.jsx)(n.code,{children:"html"})," \u4ee3\u7801"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-html",children:'<label style="display: block">\n  \u540d\u5b57:\n  <input id="first-name" />\n</label>\n<label style="display: block">\n  \u59d3\u6c0f:\n  <input id="last-name" />\n</label>\n<label style="display: block">\n  \u90ae\u7bb1:\n  <input id="email" />\n</label>\n<p id="result"></p>\n'})}),"\n",(0,s.jsx)(n.h2,{id:"\u6545\u969c\u6392\u9664",children:"\u6545\u969c\u6392\u9664"}),"\n",(0,s.jsx)(n.p,{children:"\u5f85\u5b9a"})]})}function u(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>l});var r=t(6540);const s={},a=r.createContext(s);function i(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);