import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import type { Configuration } from 'webpack';

const config: Configuration = {
    entry: path.resolve(__dirname, '../src/index.ts'),
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        projectReferences: true,
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(gif|png|jpe?g|svg|xml)$/,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: path.resolve(__dirname, '../tsconfig.json'),
                references: [
                    path.resolve(__dirname, '../../common/tsconfig.json'),
                ],
            }),
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
        }),
    ],
};

export default config;
