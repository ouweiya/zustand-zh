"use strict";(self.webpackChunkzustand_zh=self.webpackChunkzustand_zh||[]).push([[1258],{7791:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>i,contentTitle:()=>l,default:()=>c,frontMatter:()=>o,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"middlewares/immer","title":"immer","description":"\u5982\u4f55\u5728\u4e0d\u4f7f\u7528\u6837\u677f\u4ee3\u7801\u7684\u60c5\u51b5\u4e0b\u5728\u5b58\u50a8\u4e2d\u6267\u884c\u4e0d\u53ef\u53d8\u66f4\u65b0","source":"@site/docs/middlewares/immer.md","sourceDirName":"middlewares","slug":"/middlewares/immer","permalink":"/zustand-zh/docs/middlewares/immer","draft":false,"unlisted":false,"editUrl":"https://github.com/ouweiya/zustand-zh/blob/master/docs/middlewares/immer.md","tags":[],"version":"current","frontMatter":{"title":"immer","description":"\u5982\u4f55\u5728\u4e0d\u4f7f\u7528\u6837\u677f\u4ee3\u7801\u7684\u60c5\u51b5\u4e0b\u5728\u5b58\u50a8\u4e2d\u6267\u884c\u4e0d\u53ef\u53d8\u66f4\u65b0","nav":206},"sidebar":"tutorialSidebar","previous":{"title":"devtools","permalink":"/zustand-zh/docs/middlewares/devtools"},"next":{"title":"persist","permalink":"/zustand-zh/docs/middlewares/persist"}}');var r=t(4848),a=t(8453);const o={title:"immer",description:"\u5982\u4f55\u5728\u4e0d\u4f7f\u7528\u6837\u677f\u4ee3\u7801\u7684\u60c5\u51b5\u4e0b\u5728\u5b58\u50a8\u4e2d\u6267\u884c\u4e0d\u53ef\u53d8\u66f4\u65b0",nav:206},l="immer",i={},d=[{value:"\u7c7b\u578b",id:"\u7c7b\u578b",level:2},{value:"\u7b7e\u540d",id:"\u7b7e\u540d",level:3},{value:"\u53d8\u6362\u5668",id:"\u53d8\u6362\u5668",level:3},{value:"\u53c2\u8003",id:"\u53c2\u8003",level:2},{value:"<code>immer(stateCreatorFn)</code>",id:"immerstatecreatorfn",level:3},{value:"\u53c2\u6570",id:"\u53c2\u6570",level:4},{value:"\u8fd4\u56de\u503c",id:"\u8fd4\u56de\u503c",level:4},{value:"\u7528\u6cd5",id:"\u7528\u6cd5",level:2},{value:"\u5728\u4e0d\u4f7f\u7528\u6837\u677f\u4ee3\u7801\u7684\u60c5\u51b5\u4e0b\u66f4\u65b0\u72b6\u6001",id:"\u5728\u4e0d\u4f7f\u7528\u6837\u677f\u4ee3\u7801\u7684\u60c5\u51b5\u4e0b\u66f4\u65b0\u72b6\u6001",level:3},{value:"\u6545\u969c\u6392\u9664",id:"\u6545\u969c\u6392\u9664",level:2}];function m(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"immer",children:"immer"})}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"immer"})," \u4e2d\u95f4\u4ef6\u8ba9\u4f60\u53ef\u4ee5\u6267\u884c\u4e0d\u53ef\u53d8\u66f4\u65b0\u3002"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"const nextStateCreatorFn = immer(stateCreatorFn)\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"#%E7%B1%BB%E5%9E%8B",children:"\u7c7b\u578b"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"#%E7%AD%BE%E5%90%8D",children:"\u7b7e\u540d"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"#%E5%8F%98%E6%8D%A2%E5%99%A8",children:"\u53d8\u6362\u5668"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"#%E5%8F%82%E8%80%83",children:"\u53c2\u8003"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"#%E7%94%A8%E6%B3%95",children:"\u7528\u6cd5"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"#%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4",children:"\u6545\u969c\u6392\u9664"})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"\u7c7b\u578b",children:"\u7c7b\u578b"}),"\n",(0,r.jsx)(n.h3,{id:"\u7b7e\u540d",children:"\u7b7e\u540d"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"immer<T>(stateCreatorFn: StateCreator<T, [], []>): StateCreator<T, [['zustand/immer', never]], []>\n"})}),"\n",(0,r.jsx)(n.h3,{id:"\u53d8\u6362\u5668",children:"\u53d8\u6362\u5668"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"['zustand/immer', never]\n"})}),"\n",(0,r.jsx)(n.h2,{id:"\u53c2\u8003",children:"\u53c2\u8003"}),"\n",(0,r.jsx)(n.h3,{id:"immerstatecreatorfn",children:(0,r.jsx)(n.code,{children:"immer(stateCreatorFn)"})}),"\n",(0,r.jsx)(n.h4,{id:"\u53c2\u6570",children:"\u53c2\u6570"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"stateCreatorFn"}),": \u4e00\u4e2a\u51fd\u6570\uff0c\u63a5\u53d7 ",(0,r.jsx)(n.code,{children:"set"})," \u51fd\u6570\u3001",(0,r.jsx)(n.code,{children:"get"})," \u51fd\u6570\u548c ",(0,r.jsx)(n.code,{children:"store"})," \u4f5c\u4e3a\u53c2\u6570\u3002\n\u901a\u5e38\uff0c\u4f60\u4f1a\u8fd4\u56de\u4e00\u4e2a\u5305\u542b\u4f60\u60f3\u8981\u66b4\u9732\u7684\u65b9\u6cd5\u7684\u5bf9\u8c61\u3002"]}),"\n"]}),"\n",(0,r.jsx)(n.h4,{id:"\u8fd4\u56de\u503c",children:"\u8fd4\u56de\u503c"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"immer"})," \u8fd4\u56de\u4e00\u4e2a\u72b6\u6001\u521b\u5efa\u51fd\u6570\u3002"]}),"\n",(0,r.jsx)(n.h2,{id:"\u7528\u6cd5",children:"\u7528\u6cd5"}),"\n",(0,r.jsx)(n.h3,{id:"\u5728\u4e0d\u4f7f\u7528\u6837\u677f\u4ee3\u7801\u7684\u60c5\u51b5\u4e0b\u66f4\u65b0\u72b6\u6001",children:"\u5728\u4e0d\u4f7f\u7528\u6837\u677f\u4ee3\u7801\u7684\u60c5\u51b5\u4e0b\u66f4\u65b0\u72b6\u6001"}),"\n",(0,r.jsxs)(n.p,{children:["\u5728\u4e0b\u4e00\u4e2a\u793a\u4f8b\u4e2d\uff0c\u6211\u4eec\u5c06\u66f4\u65b0 ",(0,r.jsx)(n.code,{children:"person"})," \u5bf9\u8c61\u3002\u7531\u4e8e\u5b83\u662f\u4e00\u4e2a\u5d4c\u5957\u5bf9\u8c61\uff0c\u6211\u4eec\u9700\u8981\u5728\u8fdb\u884c\u66f4\u65b0\u4e4b\u524d\u521b\u5efa\u6574\u4e2a\u5bf9\u8c61\u7684\u526f\u672c\u3002"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"import { createStore } from 'zustand/vanilla'\n\ntype PersonStoreState = {\n  person: { firstName: string; lastName: string; email: string }\n}\n\ntype PersonStoreActions = {\n  setPerson: (\n    nextPerson: (\n      person: PersonStoreState['person'],\n    ) => PersonStoreState['person'] | PersonStoreState['person'],\n  ) => void\n}\n\ntype PersonStore = PersonStoreState & PersonStoreActions\n\nconst personStore = createStore<PersonStore>()((set) => ({\n  person: {\n    firstName: 'Barbara',\n    lastName: 'Hepworth',\n    email: 'bhepworth@sculpture.com',\n  },\n  setPerson: (nextPerson) =>\n    set((state) => ({\n      person:\n        typeof nextPerson === 'function'\n          ? nextPerson(state.person)\n          : nextPerson,\n    })),\n}))\n\nconst $firstNameInput = document.getElementById(\n  'first-name',\n) as HTMLInputElement\nconst $lastNameInput = document.getElementById('last-name') as HTMLInputElement\nconst $emailInput = document.getElementById('email') as HTMLInputElement\nconst $result = document.getElementById('result') as HTMLDivElement\n\nfunction handleFirstNameChange(event: Event) {\n  personStore.getState().setPerson((person) => ({\n    ...person,\n    firstName: (event.target as any).value,\n  }))\n}\n\nfunction handleLastNameChange(event: Event) {\n  personStore.getState().setPerson((person) => ({\n    ...person,\n    lastName: (event.target as any).value,\n  }))\n}\n\nfunction handleEmailChange(event: Event) {\n  personStore.getState().setPerson((person) => ({\n    ...person,\n    email: (event.target as any).value,\n  }))\n}\n\n$firstNameInput.addEventListener('input', handleFirstNameChange)\n$lastNameInput.addEventListener('input', handleLastNameChange)\n$emailInput.addEventListener('input', handleEmailChange)\n\nconst render: Parameters<typeof personStore.subscribe>[0] = (state) => {\n  $firstNameInput.value = state.person.firstName\n  $lastNameInput.value = state.person.lastName\n  $emailInput.value = state.person.email\n\n  $result.innerHTML = `${state.person.firstName} ${state.person.lastName} (${state.person.email})`\n}\n\nrender(personStore.getInitialState(), personStore.getInitialState())\n\npersonStore.subscribe(render)\n"})}),"\n",(0,r.jsxs)(n.p,{children:["\u8fd9\u662f ",(0,r.jsx)(n.code,{children:"html"})," \u4ee3\u7801"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-html",children:'<label style="display: block">\n  \u540d\u5b57:\n  <input id="first-name" />\n</label>\n<label style="display: block">\n  \u59d3\u6c0f:\n  <input id="last-name" />\n</label>\n<label style="display: block">\n  \u90ae\u7bb1:\n  <input id="email" />\n</label>\n<p id="result"></p>\n'})}),"\n",(0,r.jsxs)(n.p,{children:["\u4e3a\u4e86\u907f\u514d\u5728\u8fdb\u884c\u66f4\u65b0\u4e4b\u524d\u624b\u52a8\u590d\u5236\u6574\u4e2a\u5bf9\u8c61\uff0c\u6211\u4eec\u5c06\u4f7f\u7528 ",(0,r.jsx)(n.code,{children:"immer"})," \u4e2d\u95f4\u4ef6\u3002"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"import { createStore } from 'zustand/vanilla'\nimport { immer } from 'zustand/middleware/immer'\n\ntype PersonStoreState = {\n  person: { firstName: string; lastName: string; email: string }\n}\n\ntype PersonStoreActions = {\n  setPerson: (\n    nextPerson: (\n      person: PersonStoreState['person'],\n    ) => PersonStoreState['person'] | PersonStoreState['person'],\n  ) => void\n}\n\ntype PersonStore = PersonStoreState & PersonStoreActions\n\nconst personStore = createStore<PersonStore>()(\n  immer((set) => ({\n    person: {\n      firstName: 'Barbara',\n      lastName: 'Hepworth',\n      email: 'bhepworth@sculpture.com',\n    },\n    setPerson: (nextPerson) =>\n      set((state) => {\n        state.person = typeof nextPerson ? nextPerson(state.person) : nextPerson\n      }),\n  })),\n)\n\nconst $firstNameInput = document.getElementById(\n  'first-name',\n) as HTMLInputElement\nconst $lastNameInput = document.getElementById('last-name') as HTMLInputElement\nconst $emailInput = document.getElementById('email') as HTMLInputElement\nconst $result = document.getElementById('result') as HTMLDivElement\n\nfunction handleFirstNameChange(event: Event) {\n  personStore.getState().setPerson((person) => {\n    person.firstName = (event.target as any).value\n  })\n}\n\nfunction handleLastNameChange(event: Event) {\n  personStore.getState().setPerson((person) => {\n    person.lastName = (event.target as any).value\n  })\n}\n\nfunction handleEmailChange(event: Event) {\n  personStore.getState().setPerson((person) => {\n    person.email = (event.target as any).value\n  })\n}\n\n$firstNameInput.addEventListener('input', handleFirstNameChange)\n$lastNameInput.addEventListener('input', handleLastNameChange)\n$emailInput.addEventListener('input', handleEmailChange)\n\nconst render: Parameters<typeof personStore.subscribe>[0] = (state) => {\n  $firstNameInput.value = state.person.firstName\n  $lastNameInput.value = state.person.lastName\n  $emailInput.value = state.person.email\n\n  $result.innerHTML = `${state.person.firstName} ${state.person.lastName} (${state.person.email})`\n}\n\nrender(personStore.getInitialState(), personStore.getInitialState())\n\npersonStore.subscribe(render)\n"})}),"\n",(0,r.jsx)(n.h2,{id:"\u6545\u969c\u6392\u9664",children:"\u6545\u969c\u6392\u9664"}),"\n",(0,r.jsx)(n.p,{children:"\u5f85\u5b9a"})]})}function c(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(m,{...e})}):m(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>l});var s=t(6540);const r={},a=s.createContext(r);function o(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);