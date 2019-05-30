const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const COMMON_CONFIG = require('./common.config');

module.exports = {
    ...COMMON_CONFIG,
    mode: 'production',
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [
        ...COMMON_CONFIG.plugins,
        new MiniCssExtractPlugin({
            filename: '[name]-[hash].css',
        }),
        new MinifyPlugin(),
    ],
    module: {
        rules: [
            ...COMMON_CONFIG.module.rules,
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                ],
            },
        ],
    },
};
