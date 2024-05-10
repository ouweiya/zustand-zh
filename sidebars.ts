import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
    // label: 'GETTING STARTED'
    // Introduction
    // Comparison

    tutorialSidebar: [
        {
            type: 'category',
            label: 'GETTING STARTED',
            collapsed: false,
            items: ['getting-started/introduction', 'getting-started/comparison'],
        },
        {
            type: 'category',
            label: 'GUIDES',
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
            label: 'INTEGRATIONS',
            collapsed: false,
            items: ['integrations/immer-middleware', 'integrations/third-party-libraries', 'integrations/persisting-store-data'],
        },
        {
            type: 'category',
            label: 'PREVIOUS VERSIONS',
            items: ['previous-versions/zustand-v3-create-context'],
        },
        {
            type: 'category',
            label: 'MIGRATIONS',
            items: ['migrations/migrating-to-v4'],
        },
    ],
};

export default sidebars;
