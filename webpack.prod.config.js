const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/js/index.js',
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
                    presets: ['env', 'stage-3', "react"]
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
              test: /\.(jpg|png)$/,
              use: "file-loader?name=[name].[ext]&outputPath=images/"
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}), // This tells the Webpack and Babel for optimization
        new HtmlWebpackPlugin({template: 'src/index.html'}),
        new ExtractTextPlugin('styles/index.css'), //to extract css file
        new CleanWebpackPlugin(['dist']), // to clean dist folder before every building
        new webpack.optimize.UglifyJsPlugin(), //To minify js
        new webpack.NoEmitOnErrorsPlugin(), // Makes sure Webpack will not compile if Errors
    ]
};
