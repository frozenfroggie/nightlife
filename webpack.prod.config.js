const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
              use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader', 'sass-loader']
              })
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
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}), // This tells the Webpack and Babel for optimization
        new HtmlWebpackPlugin({template: 'app/index.html'}),
        new HtmlWebpackPlugin({filename: 'error.html', template: 'app/error.html', inject: false}),
        new FaviconsWebpackPlugin('./app/assets/logo.png'),
        new ExtractTextPlugin('index.css'), //to extract css file
        new CleanWebpackPlugin(['dist']), // to clean dist folder before every building
        new webpack.optimize.UglifyJsPlugin(), //To minify js
        new webpack.NoEmitOnErrorsPlugin(), // Makes sure Webpack will not compile if Errors
    ]
};
