/**
 * hep-pug
 * a pug middleware for hep or koa
 */

const pug = require('pug')

/**
 * 
 * @param option an object like { pugOption: { ... }, local: { ... } }
 * @return {function(*, *)}
 * 
 * @param option
 * 
 * option 是一个有如下格式的对象：
 * 
 * ```
 *  {
 *      pugOption: { ... },
 *      local: { ... },
 *      ...
 *  }
 *  ```
 *  
 *  其中：
 *  pugOption 用于 pug 编译模版时使用
 *  local 全局性的 local，渲染模版时会与传递的 local 合并，以在页面使用
 */
const middleware = function (option) {
    let config = option || {}
    
    // pug option
    let pugOption = option.pugOption
    
    // global local for views
    let globalLocal = option.local
    
    return async (ctx, next) => {

        ctx.hepPug = {}
        ctx.hepPug.render = (templatePath, local) => {
            const templateFn = pug.compileFile(templatePath, pugOption)
            
            let combinedLocals = Object.assign({}, globalLocal, local)
            const html = templateFn(combinedLocals)
            ctx.body = html
        }
        await next()
    }
}

module.exports = middleware
