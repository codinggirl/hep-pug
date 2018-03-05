const pug = require('pug')
const config = require('./config')
const locals = require('./locals')
const viewPath = require('./viewPath')

module.exports = class HepPug {
    constructor(options) {
        this.config = Object.assign({}, config, options)
    }
    
    render(fullPath, locals) {
        const fn = pug.compileFile(fullPath, config.pug)
        config.ctx.body = fn(locals(this.config, locals))
    }
    
    view(relativePath, locals) {
        const fullPath = viewPath(relativePath)
        this.render(fullPath, locals)
    }
}
