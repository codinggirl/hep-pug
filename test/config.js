const config = require('../lib/config')

describe('config object', function () {
    
    it('should be a object', function () {
        expect(typeof config).toEqual('object')
    })
    
    it('should have pug option', function () {
        expect(config.pug).toBeDefined()
    })
    
    it('pug option should be a object', function () {
        expect(typeof config.pug).toEqual('object')
    })
    
    it('should have a view option', () => {
        expect(config.view).toBeDefined()
    })
    
    it('should have a locals option', () => {
        expect(config.locals).toBeDefined()
    })
    
    it('should have a ctx option', () => {
        expect(config.ctx).toBeDefined()
    })
    
    it('should have view.basePath', () => {
        expect(config.view.basePath).toBeUndefined()
    })
    
    it('should have view.extName option', function () {
        expect(config.view.extName).toBeDefined()
    })
})
