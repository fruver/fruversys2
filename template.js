{
  // eslint-disable-next-line no-unused-labels
  plugins: [
    ['@electron-forge/plugin-webpack', {
      mainConfig: './webpack.main.config.js',
      renderer: {
        config: './webpack.renderer.config.js',
        entryPoints: [{
          html: './src/index.html',
          js: './src/index.js',
          name: 'main_window'
        }]
      } 
    }]
  ];
}