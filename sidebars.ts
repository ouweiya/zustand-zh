import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
    tutorialSidebar: [
        {
            type: 'category',
            label: '入门指南',
            collapsed: false,
            items: ['getting-started/introduction', 'getting-started/comparison'],
        },
        {
            type: 'category',
            label: '指南',
            collapsed: false,
            items: [
                'guides/updating-state',
                'guides/immutable-state-and-merging',
                'guides/flux-inspired-practice',
                'guides/auto-generating-selectors',
                'guides/practice-with-no-store-actions',
                'guides/typescript',
                'guides/testing',
                'guides/event-handler-in-pre-react-18',
                'guides/maps-and-sets-usage',
                'guides/connect-to-state-with-url-hash',
                'guides/how-to-reset-state',
                'guides/initialize-state-with-props',
                'guides/slices-pattern',
                'guides/prevent-rerenders-with-use-shallow',
                'guides/ssr-and-hydration',
                'guides/nextjs',
            ],
        },
        {
            type: 'category',
            label: '集成',
            collapsed: false,
            items: ['integrations/immer-middleware', 'integrations/third-party-libraries', 'integrations/persisting-store-data'],
        },
        {
            type: 'category',
            label: '以前的版本',
            items: ['previous-versions/zustand-v3-create-context'],
        },
        {
            type: 'category',
            label: '迁移',
            items: ['migrations/migrating-to-v4'],
        },
    ],
};

export default sidebars;
