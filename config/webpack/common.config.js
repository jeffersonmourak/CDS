const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CONSTANTS = require('./constants');

module.exports = {
    entry: ['@babel/polyfill', 'classlist-polyfill', 'whatwg-fetch', path.join(CONSTANTS.APP_DIR, 'index.js')],

    output: {
        path: path.resolve(CONSTANTS.DIST_DIR),
        filename: 'build-[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                        },
                    },
                ],
            }],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(CONSTANTS.APP_DIR, 'index.html'),
        }),
        new CleanWebpackPlugin(),
    ],
};
