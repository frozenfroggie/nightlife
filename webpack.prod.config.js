const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const webpack = require('webpack');
require("babel-polyfill");

module.exports = {
    entry: ['babel-polyfill', './app/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: 'production',
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
        new CleanWebpackPlugin(['dist']), // to clean dist folder before every building
    ]
};
