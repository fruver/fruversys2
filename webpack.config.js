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
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
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
        test: /\.js(x?)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin(envKeys),
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: 'Fruver System Manager',
      template: './src/index.ejs'
    })
  ]
};