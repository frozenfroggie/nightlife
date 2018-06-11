const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const webpack = require('webpack');
require("babel-polyfill");

module.exports = {
    entry: ['babel-polyfill', './app/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: 'development',
    resolve: {
      alias: {
        images: path.resolve('./app/images'),
      }
    },
    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                      presets: ['env', 'stage-2', "react"]
                  }
                }
              ]
            },
            {
              test: /\.scss$/,
              use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
              test: /\.html$/,
              use: ['html-loader']
            },
            {
              test: /\.(jpe?g|png)$/,
              use: "url-loader?name=[name].[ext]&outputPath=images/"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: 'app/index.html'}),
        new HtmlWebpackPlugin({filename: 'error.html', template: 'app/error.html', inject: false}),
        new FaviconsWebpackPlugin('./app/assets/logo.png'),
        new BrowserSyncPlugin({
          host: 'localhost',
          port: 8080,
          proxy: 'http://localhost:8000/',
          reloadDelay: 1000
         },
         {
           reload: true
         })
    ]
};
