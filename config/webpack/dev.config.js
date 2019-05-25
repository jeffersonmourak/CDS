const path = require('path');
const COMMON_CONFIG = require('./common.config');
const CONSTANTS = require('./constants');
const FakeBackend = require('../backend/fake');

module.exports = {
    ...COMMON_CONFIG,
    devServer: {
        contentBase: path.resolve(CONSTANTS.PUBLIC_DIR),
        open: true,
        port: 8000,
        before: FakeBackend,
    },
};
