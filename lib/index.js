/**
 * 
 */

const pug = require('pug')

const middleware = function (options) {
    return async (ctx, next) => {
        ctx.hepPug = {}
        ctx.hepPug.render = (templatePath, locals) => {
            const templateFn = pug.compileFile(templatePath, options)
            const html = templateFn(locals)
            ctx.body = html
        }
        await next()
    }
}

module.exports = middleware
