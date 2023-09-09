import path from 'path';
import type { Configuration } from 'webpack';

const config: Configuration = {
    extends: path.resolve(__dirname, './webpack.config.base.ts'),
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        clean: true,
    },
};

export default config;
