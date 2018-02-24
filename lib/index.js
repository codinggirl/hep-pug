/**
 * hep-pug
 * a pug middleware for hep or koa
 */

const pug = require('pug')
const path = require('path')

const viewLocals = (options, ctx, locals) => {
    return Object.assign({}, options.local, options.locals, (ctx.hepPug || {}).locals, locals)
}

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
/**
 * 
 * @param option
 * @return {function(*, *)}
 */
const middleware = function (option = {}) {

    let pugOption = option.pugOption || {}
    
    return (ctx, next) => {
        
        const viewPath = (relativePath) => {
            let extName = ctx.hepPug.extName
            if (path.extname(relativePath) !== extName) {
                relativePath += extName
            }
            return path.join(ctx.hepPug.viewPath, relativePath)
        }

        /**
         * render a view
         * @param path view path
         * @param locals view locals
         */
        const render = (path, locals) => {
            const templateFn = pug.compileFile(path, pugOption)
            ctx.body = templateFn(viewLocals(option, ctx, locals))
        }
        
        /**
         * rendor a view
         * @param path view path
         * @param locals view locals
         */
        const view = (path, locals) => {
            return render(viewPath(path), locals)
        }
        
        ctx.hepPug = {}
        Object.assign(ctx.hepPug, {
            // default view path
            viewPath: option.viewPath,
            // default view template ext name
            extName: option.extName || '.pug',
            // default view locals
            locals: {},
            render: render,
            view: view
        })
        
        next().then().catch((e) => {
            throw e
        })
    }
}

module.exports = middleware
