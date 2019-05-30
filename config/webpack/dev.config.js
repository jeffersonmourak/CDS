const path = require('path');
const COMMON_CONFIG = require('./common.config');
const CONSTANTS = require('./constants');
const FakeBackend = require('../backend/fake');

module.exports = {
    ...COMMON_CONFIG,
    mode: 'development',
    module: {
        rules: [
            ...COMMON_CONFIG.module.rules,
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    devServer: {
        contentBase: path.resolve(CONSTANTS.PUBLIC_DIR),
        open: true,
        port: 8000,
        before: FakeBackend,
    },
};
