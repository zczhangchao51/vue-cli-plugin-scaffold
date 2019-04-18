module.exports = {
  presets: ['@vue/app'],
  plugins: [
    [
      'component',
      {
        libraryName: 'epic-spinners',
        libDir: 'src/components/lib',
        camel2Dash: false,
        style: false
      },
      'epic-spinners'
    ]
  ]
}
