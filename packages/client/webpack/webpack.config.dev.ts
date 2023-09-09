import path from 'path';
import type { Configuration as WebpackConfiguration } from 'webpack';
import type { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
    extends: path.resolve(__dirname, './webpack.config.base.ts'),
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        static: path.resolve(__dirname, '../dist'),
    },
};

export default config;
