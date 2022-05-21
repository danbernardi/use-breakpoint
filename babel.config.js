module.exports = {
  presets: [
    [
      '@babel/preset-react',
      {
        absoluteRuntime: false,
      },
    ],
    [
      '@babel/preset-env',
      {
        targets: { node: 'current' },
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        absoluteRuntime: true
      },
    ]
  ],
};
