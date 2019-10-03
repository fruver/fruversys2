const path = require('path');
const webpack = require('webpack');
const dotEnv = require('dotenv').config().parsed;
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const envKeys = Object.keys(dotEnv).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(dotEnv[next]);
  return prev;
}, {});

module.exports = {
  target: 'electron-renderer',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'renderer.js'
  },

  resolve: {
    extensions: ['.js']
  },

  devtool: 'source-map',

  devServer: {
    port: 9080,
    hot: true,
    inline: true,
    compress: true,
  },

  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin(envKeys),
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin()
  ]
};