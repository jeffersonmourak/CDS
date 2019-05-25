const path = require('path');
const COMMON_CONFIG = require('./common.config');
const CONSTANTS = require('./constants');

module.exports = {
    ...COMMON_CONFIG,
    devServer: {
        contentBase: path.resolve(CONSTANTS.PUBLIC_DIR),
        open: true,
        port: 8000,
    },
};
