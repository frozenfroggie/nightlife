const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const webpack = require('webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
require("babel-polyfill");

module.exports = {
    entry: ['babel-polyfill', './app/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
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
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')}),
        new HtmlWebpackPlugin({template: 'app/index.html'}),
        new FaviconsWebpackPlugin('./app/assets/logo.png'),
        new BrowserSyncPlugin({
          host: 'localhost',
          port: 8080,
          proxy: 'http://localhost:3000/',
          reloadDelay: 1000
         },
         {
           reload: true
         })
    ]
};
