/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const dotEnv = require('dotenv').config().parsed;
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {CheckerPlugin} = require('awesome-typescript-loader');

const envKeys = Object.keys(dotEnv).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(dotEnv[next]);
  return prev;
}, {});

module.exports = {
  context: __dirname,
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  
  devtool: 'source-map',

  devServer: {
    port: 9001,
    hot: true,
    inline: true,
    compress: true,
    watchContentBase: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /(node_modules)/,
        loader: 'awesome-typescript-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },

  plugins: [
    new CheckerPlugin(),
    new webpack.DefinePlugin(envKeys),
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: 'Fruver',
      template: './src/index.ejs'
    })
  ]
};