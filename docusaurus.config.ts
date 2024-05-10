import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
    title: 'Zustand',
    tagline: '🐻 React状态管理的基本必需品',
    favicon: 'img/zustand.ico',

    // Set the production url of your site here
    url: 'https://ouweiya.github.io',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/zustand-zh/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'ouweiya', // Usually your GitHub org/user name.
    projectName: 'zustand-zh', // Usually your repo name.

    onBrokenMarkdownLinks: 'warn',
    onBrokenLinks: 'ignore',
    onBrokenAnchors: 'ignore',
    trailingSlash: false,
    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'zh-Hans',
        locales: ['zh-Hans'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: 'https://github.com/ouweiya/zustand-zh/blob/master/',
                    // editUrl: 'https://github.com/ouweiya/zustand-zh',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        navbar: {
            title: 'Zustand',
            logo: {
                alt: 'My Site Logo',
                src: 'img/zustand-icon.png',
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'tutorialSidebar',
                    position: 'left',
                    label: '文档',
                },
                {
                    href: 'https://github.com/ouweiya/zustand-zh',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },

        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
            // darkTheme: prismThemes.vsDark,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
