/**
 * hep-pug
 * @param options
 */
const HepPug = require('./hepPug')

module.exports = function hepPug(options) {
    return async function hepPug(ctx, next) {
        if (!ctx.hepPug) {
            let hepPug = new HepPug(options)
            hepPug.config.ctx = ctx
            ctx.hepPug = hepPug
        }
        await next()
    }
}
