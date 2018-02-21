/**
 * hep-pug
 * a pug middleware for hep or koa
 */

const pug = require('pug')
const path = require('path')

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
 *      // for `view` method only
        viewPath: '',
        // for `view` method only
        extName: '.pug',
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

    let viewPath = option.viewPath || ''
    let extName = option.extName || '.pug'
    
    const render = (templatePath, local) => {
        const templateFn = pug.compileFile(templatePath, pugOption)

        let combinedLocals = Object.assign({}, globalLocal, local)
        const html = templateFn(combinedLocals)
        ctx.body = html
    }
    
    /**
     * render view by short viewName & locals
     * @param viewName
     * @param locals
     */
    const view = (viewName, locals) => {
        let tplPath = path.join(viewPath, viewName)
        if (path.extname(tplPath) !== extName) {
            tplPath = path.join(tplPath, extName)
        }
        let viewLocals = Object.assign({}, globalLocal, locals)
        ctx.body = pug.compileFile(tplPath, pugOption)(viewLocals)
    }
    
    return async (ctx, next) => {

        ctx.hepPug = {
            render: render,
            view: view
        }
     
        await next()
    }
}

module.exports = middleware
