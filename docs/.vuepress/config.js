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
      { text: 'Github', link: 'https://github.com/Venusjason/vuejs-form-creator' },
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
      // {
      //   title: '使用说明',
      //   path: '/apis/',
      //   collapsable: false,
      //   children: [
      //     {
      //       title: '配置option',
      //       path: '/apis/option',
      //     },
      //     {
      //       title: '表单域field',
      //       path: '/apis/field',
      //     },
      //   ],
      // },
    ],
    displayAllHeaders: true,
  },
  plugins: [
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }],
  ],
}