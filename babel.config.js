module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    // See https://jestjs.io/docs/getting-started#using-typescript
    '@babel/preset-typescript'
  ]
}
