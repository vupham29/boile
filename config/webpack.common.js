const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const dirApp = path.join(__dirname, '..', 'app');
const dirAssets = path.join(__dirname, '..', 'styles');
const dirShared = path.join(__dirname, '..', 'shared');
const dirPublic = path.join(__dirname, '..', 'public');

module.exports = {
    entry: [path.join(dirApp, 'index.js'), path.join(dirAssets, 'index.scss')],

    output: {
        path: dirPublic
    },

    resolve: {
        extensions: ['.ts', '.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, '../', 'app'),
        },
    },

    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                type: "asset/resource",
                generator: {
                    filename: "[hash].[ext]",
                },
            },
            {
                test: /\.(woff(2))$/,
                type: 'asset/inline',
                generator: {
                    filename: "[hash].[ext]",
                },
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),

        new CopyWebpackPlugin({
            patterns: [

                {
                    from: dirShared,
                    to: dirPublic,
                    noErrorOnMissing: true
                }
            ]
        }),

        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].css",
        }),
    ],
};