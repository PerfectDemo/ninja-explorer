const isDev = require('../../package.json').DEV;
const config = require('../../config.json');

exports.getConfig = function() {
    if (isDev) {
        return config.DEV;
    } else {
        return config.PROD;
    }
}