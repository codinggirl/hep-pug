const locals = require('../lib/locals')

describe('locals', function () {
    
    it('should be defiend', function () {
        let obj = locals(null, null)
        expect(obj).toBeDefined()
    })
    
    it('should be locals object', function () {
        let one = {}
        let obj = locals(null, one)
        expect(obj).toEqual(one)
    })
})
