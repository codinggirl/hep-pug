/**
 * 
 * @param config see config.js for structure
 * @param locals
 * @return {{} & ({}|module.exports.locals|{name: string, sum: number}|locals|{name, sum}|{name: string, sum: number}) & ({name: string, sum: number}|state|{name, sum}|string|string|ListeningState|*) & any}
 */
module.exports = function locals(config, locals) {
    if (!config) {
        return locals || {}
    }
    return Object.assign({}, config.locals, (config.ctx || {}).state, locals)
}
