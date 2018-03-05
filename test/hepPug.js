const HepPug = require('../lib/hepPug')

describe('hepPug', function () {
    
    let hepPug1 = new HepPug()
    let hepPug2 = new HepPug()
    
    it('should be a class', function () {
        expect(typeof hepPug1).toEqual('object')
    })
    
    it('should config be same', function () {
        expect(hepPug1.config).toEqual(hepPug2.config)
    })
})
