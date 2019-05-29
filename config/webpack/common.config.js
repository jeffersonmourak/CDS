const path = require('path');
const CONSTANTS = require('./constants');

module.exports = {
    entry: ['classlist-polyfill', 'whatwg-fetch', path.join(CONSTANTS.APP_DIR, 'index.js')],
    output: {
        path: path.resolve(CONSTANTS.DIST_DIR),
        filename: 'form.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};
