const path = require('path')

/**
 * 
 * @param config see config.js for structure
 * @param relativePath
 * @return {*|string}
 */
module.exports = function viewPath(config = {}, relativePath) {
    if (!relativePath) {
        return undefined
    }
    if (config && config.view) {
        if (path.extname(relativePath) !== config.view.extName) {
            relativePath += config.view.extName
        }
        return path.join(config.view.basePath, relativePath)
    } else {
        return relativePath
    }
}
