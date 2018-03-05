const pug = require('pug')
const config = require('./config')
const combileLocals = require('./locals')
const viewPath = require('./viewPath')
const debug = require('debug')('hep-pug')

module.exports = class HepPug {
    constructor(options) {
        this.config = Object.assign({}, config, options)
    }
    
    render(fullPath, locals) {
        if (!fullPath) {
            debug('full path should not be undefined, please check your view path')
            return
        }
        const fn = pug.compileFile(fullPath, this.config.pug)
        this.config.ctx.body = fn(combileLocals(this.config, locals))
    }
    
    view(relativePath, locals) {
        const fullPath = viewPath(this.config, relativePath)
        this.render(fullPath, locals)
    }
}
