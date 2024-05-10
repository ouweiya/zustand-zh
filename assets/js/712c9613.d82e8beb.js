"use strict";(self.webpackChunkzustand_zh=self.webpackChunkzustand_zh||[]).push([[607],{9664:e=>{e.exports=JSON.parse('{"version":{"pluginId":"default","version":"current","label":"Next","banner":null,"badge":false,"noIndex":false,"className":"docs-version-current","isLast":true,"docsSidebars":{"tutorialSidebar":[{"type":"category","label":"\u5165\u95e8","collapsed":false,"items":[{"type":"link","label":"\u4ecb\u7ecd","href":"/zustand-zh/docs/getting-started/introduction","docId":"getting-started/introduction","unlisted":false},{"type":"link","label":"\u6bd4\u8f83","href":"/zustand-zh/docs/getting-started/comparison","docId":"getting-started/comparison","unlisted":false}],"collapsible":true},{"type":"category","label":"\u6307\u5357","collapsed":false,"items":[{"type":"link","label":"Updating state","href":"/zustand-zh/docs/guides/updating-state","docId":"guides/updating-state","unlisted":false},{"type":"link","label":"Immutable state and merging","href":"/zustand-zh/docs/guides/immutable-state-and-merging","docId":"guides/immutable-state-and-merging","unlisted":false},{"type":"link","label":"Flux inspired practice","href":"/zustand-zh/docs/guides/flux-inspired-practice","docId":"guides/flux-inspired-practice","unlisted":false},{"type":"link","label":"Auto Generating Selectors","href":"/zustand-zh/docs/guides/auto-generating-selectors","docId":"guides/auto-generating-selectors","unlisted":false},{"type":"link","label":"Practice with no store actions","href":"/zustand-zh/docs/guides/practice-with-no-store-actions","docId":"guides/practice-with-no-store-actions","unlisted":false},{"type":"link","label":"TypeScript Guide","href":"/zustand-zh/docs/guides/typescript","docId":"guides/typescript","unlisted":false},{"type":"link","label":"Testing","href":"/zustand-zh/docs/guides/testing","docId":"guides/testing","unlisted":false},{"type":"link","label":"Calling actions outside a React event handler in pre React 18","href":"/zustand-zh/docs/guides/event-handler-in-pre-react-18","docId":"guides/event-handler-in-pre-react-18","unlisted":false},{"type":"link","label":"Map and Set Usage","href":"/zustand-zh/docs/guides/maps-and-sets-usage","docId":"guides/maps-and-sets-usage","unlisted":false},{"type":"link","label":"Connect to state with URL","href":"/zustand-zh/docs/guides/connect-to-state-with-url-hash","docId":"guides/connect-to-state-with-url-hash","unlisted":false},{"type":"link","label":"How to reset state","href":"/zustand-zh/docs/guides/how-to-reset-state","docId":"guides/how-to-reset-state","unlisted":false},{"type":"link","label":"Initialize state with props","href":"/zustand-zh/docs/guides/initialize-state-with-props","docId":"guides/initialize-state-with-props","unlisted":false},{"type":"link","label":"Slices Pattern","href":"/zustand-zh/docs/guides/slices-pattern","docId":"guides/slices-pattern","unlisted":false},{"type":"link","label":"Prevent rerenders with useShallow","href":"/zustand-zh/docs/guides/prevent-rerenders-with-use-shallow","docId":"guides/prevent-rerenders-with-use-shallow","unlisted":false},{"type":"link","label":"SSR and Hydration","href":"/zustand-zh/docs/guides/ssr-and-hydration","docId":"guides/ssr-and-hydration","unlisted":false},{"type":"link","label":"Setup with Next.js","href":"/zustand-zh/docs/guides/nextjs","docId":"guides/nextjs","unlisted":false}],"collapsible":true},{"type":"category","label":"\u96c6\u6210","collapsed":false,"items":[{"type":"link","label":"Immer middleware","href":"/zustand-zh/docs/integrations/immer-middleware","docId":"integrations/immer-middleware","unlisted":false},{"type":"link","label":"Third-party Libraries","href":"/zustand-zh/docs/integrations/third-party-libraries","docId":"integrations/third-party-libraries","unlisted":false},{"type":"link","label":"Persisting store data","href":"/zustand-zh/docs/integrations/persisting-store-data","docId":"integrations/persisting-store-data","unlisted":false}],"collapsible":true},{"type":"category","label":"\u4ee5\u524d\u7684\u7248\u672c","items":[{"type":"link","label":"createContext from zustand/context","href":"/zustand-zh/docs/previous-versions/zustand-v3-create-context","docId":"previous-versions/zustand-v3-create-context","unlisted":false}],"collapsed":true,"collapsible":true},{"type":"category","label":"\u8fc1\u79fb","items":[{"type":"link","label":"Migrating to v4","href":"/zustand-zh/docs/migrations/migrating-to-v4","docId":"migrations/migrating-to-v4","unlisted":false}],"collapsed":true,"collapsible":true}]},"docs":{"getting-started/comparison":{"id":"getting-started/comparison","title":"\u6bd4\u8f83","description":"Zustand \u4e0e\u7c7b\u4f3c\u5e93\u7684\u5bf9\u6bd4","sidebar":"tutorialSidebar"},"getting-started/introduction":{"id":"getting-started/introduction","title":"\u4ecb\u7ecd","description":"\u5982\u4f55\u4f7f\u7528 Zustand","sidebar":"tutorialSidebar"},"guides/auto-generating-selectors":{"id":"guides/auto-generating-selectors","title":"Auto Generating Selectors","description":"We recommend using selectors when using either the properties or actions from the store. You can access values from the store like so:","sidebar":"tutorialSidebar"},"guides/connect-to-state-with-url-hash":{"id":"guides/connect-to-state-with-url-hash","title":"Connect to state with URL","description":"Connect State with URL Hash","sidebar":"tutorialSidebar"},"guides/event-handler-in-pre-react-18":{"id":"guides/event-handler-in-pre-react-18","title":"Calling actions outside a React event handler in pre React 18","description":"Because React handles setState synchronously if it\'s called outside an event handler, updating the state outside an event handler will force react to update the components synchronously. Therefore, there is a risk of encountering the zombie-child effect.","sidebar":"tutorialSidebar"},"guides/flux-inspired-practice":{"id":"guides/flux-inspired-practice","title":"Flux inspired practice","description":"Although Zustand is an unopinionated library, we do recommend a few patterns.","sidebar":"tutorialSidebar"},"guides/how-to-reset-state":{"id":"guides/how-to-reset-state","title":"How to reset state","description":"The following pattern can be used to reset the state to its initial value.","sidebar":"tutorialSidebar"},"guides/immutable-state-and-merging":{"id":"guides/immutable-state-and-merging","title":"Immutable state and merging","description":"Like with React\'s useState, we need to update state immutably.","sidebar":"tutorialSidebar"},"guides/initialize-state-with-props":{"id":"guides/initialize-state-with-props","title":"Initialize state with props","description":"In cases where dependency injection is needed, such as when a store should be initialized with props from a component, the recommended approach is to use a vanilla store with React.context.","sidebar":"tutorialSidebar"},"guides/maps-and-sets-usage":{"id":"guides/maps-and-sets-usage","title":"Map and Set Usage","description":"You need to wrap Maps and Sets inside an object. When you want its update to be reflected (e.g. in React),","sidebar":"tutorialSidebar"},"guides/nextjs":{"id":"guides/nextjs","title":"Setup with Next.js","description":"Next.js is a popular server-side rendering framework for React that presents","sidebar":"tutorialSidebar"},"guides/practice-with-no-store-actions":{"id":"guides/practice-with-no-store-actions","title":"Practice with no store actions","description":"The recommended usage is to colocate actions and states within the store (let your actions be located together with your state).","sidebar":"tutorialSidebar"},"guides/prevent-rerenders-with-use-shallow":{"id":"guides/prevent-rerenders-with-use-shallow","title":"Prevent rerenders with useShallow","description":"When you need to subscribe to a computed state from a store, the recommended way is to","sidebar":"tutorialSidebar"},"guides/slices-pattern":{"id":"guides/slices-pattern","title":"Slices Pattern","description":"Slicing the store into smaller stores","sidebar":"tutorialSidebar"},"guides/ssr-and-hydration":{"id":"guides/ssr-and-hydration","title":"SSR and Hydration","description":"Server-side Rendering (SSR) {#server-side-rendering-(ssr)}","sidebar":"tutorialSidebar"},"guides/testing":{"id":"guides/testing","title":"Testing","description":"Writing Tests","sidebar":"tutorialSidebar"},"guides/typescript":{"id":"guides/typescript","title":"TypeScript Guide","description":"Basic usage","sidebar":"tutorialSidebar"},"guides/updating-state":{"id":"guides/updating-state","title":"Updating state","description":"Flat updates","sidebar":"tutorialSidebar"},"integrations/immer-middleware":{"id":"integrations/immer-middleware","title":"Immer middleware","description":"The Immer middleware enables you","sidebar":"tutorialSidebar"},"integrations/persisting-store-data":{"id":"integrations/persisting-store-data","title":"Persisting store data","description":"The Persist middleware enables you to store","sidebar":"tutorialSidebar"},"integrations/third-party-libraries":{"id":"integrations/third-party-libraries","title":"Third-party Libraries","description":"Zustand provides bear necessities for state management.","sidebar":"tutorialSidebar"},"migrations/migrating-to-v4":{"id":"migrations/migrating-to-v4","title":"Migrating to v4","description":"The only breaking changes are in types.","sidebar":"tutorialSidebar"},"previous-versions/zustand-v3-create-context":{"id":"previous-versions/zustand-v3-create-context","title":"createContext from zustand/context","description":"A special createContext is provided since v3.5,","sidebar":"tutorialSidebar"}}}}')}}]);