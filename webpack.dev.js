const path = require('path');
const fs = require('fs');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = fs.realpathSync(process.cwd());
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    externalsType: 'script',
    devServer: {
        compress: false,
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: resolveAppPath('public/index.html'),
        }),
    ],
});
