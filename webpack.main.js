const path = require('path');

module.exports = {
  entry: './src/main/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      }
    ]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  target: 'electron-main'
};

