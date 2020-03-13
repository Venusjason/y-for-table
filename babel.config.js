module.exports = {
  presets: [
    // '@vue/cli-plugin-babel/preset',
    ['@vue/app', {
      useBuiltIns: 'entry'
    }],
    [
      '@vue/babel-preset-jsx',
      {
        injectH: false
      }
    ]
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    [
      'import',
      {
        libraryName: 'view-design',
        libraryDirectory: 'src/components',
      }
    ]
  ],
}
