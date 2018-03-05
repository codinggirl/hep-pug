const HepPug = require('../lib/hepPug')

describe('hepPug', function () {
    
    let hepPug1 = new HepPug()
    let hepPug2 = new HepPug()
    
    let hepPug_nullOption = new HepPug(null)
    
    it('should be a class', function () {
        expect(typeof hepPug1).toEqual('object')
    })
    
    it('should config be same', function () {
        expect(hepPug1.config).toEqual(hepPug2.config)
    })
    
    it('config should not be null', function () {
        expect(hepPug1.config).toBeDefined()
    })
    
    it('config should not be null', function () {
        expect(hepPug_nullOption).toBeDefined()
    })

    it('config should be object', function () {
        expect(typeof hepPug_nullOption).toEqual('object')
    })
    
    it('config value should not be lost', function () {
        let options = {
            locals: {
                'name': 'li lei'
            }
        }
        let ins = new HepPug(options)
        ins.config.locals.age = 18
        
        expect(ins.config.locals.name).toEqual('li lei')
        expect(ins.config.locals.age).toEqual(18)
    })

    it('default config for view basePath should be undefined', function () {
        let options = null
        let ins = new HepPug(options)

        expect(ins.config.view.basePath).toBeUndefined()
    })
    
    it('default config for view extName should be .pug', function () {
        let options = null
        let ins = new HepPug(options)
        
        expect(ins.config.view.extName).toEqual('.pug')
    })
})
