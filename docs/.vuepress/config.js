module.exports = {
  title: 'y-for-table',
  base: '/y-for-table/',
  description: 'y-for-table 帮你快速搞定vue 中后台应用',
  head: [
    ['link', { rel: 'icon', href: '/img/logo.ico' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
  ],
  themeConfig: {
    nav: [
      // { text: '指南', link: '/' },
      // { text: '组件', link: '/' },
      // { text: '使用手册', link: '/' },
      // { text: '教程', link: '/' },
      { text: 'Github', link: 'https://github.com/Venusjason/y-for-table' },
    ],
    sidebar: [
      {
        title: '开发指南',
        path: '/guide/',
        // sidebarDepth: 1,
        collapsable: false,
        children: [
          {
            title: '安装',
            path: '/guide/install',
            // sidebarDepth: 2,
          },
          {
            title: '快速上手',
            path: '/guide/quickStart',
          }
        ]
      },
      {
        title: '组件',
        path: '/yComponents/',
        collapsable: false,
        children: [
          {
            title: 'YForm',
            path: '/yComponents/YForm',
          },
          {
            title: 'YField',
            path: '/yComponents/YField',
          },
          {
            title: 'YButton',
            path: '/yComponents/YButton',
          },
          {
            title: 'YQueryTable',
            path: '/yComponents/YQueryTable',
          },
        ],
      },
    ],
    displayAllHeaders: true,
  },
  plugins: [
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }],
  ],
}