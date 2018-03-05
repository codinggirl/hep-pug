const viewPath = require('../lib/viewPath')

describe('locals', function () {
    
    it('should be a object', function () {
        let obj = viewPath(null, 'a')
        expect(obj).toBeDefined()
    })
    
    it('should undefiend', function () {
        let obj = viewPath({}, undefined)
        expect(obj).toBeUndefined()
    })

    it('should undefiend', function () {
        let obj = viewPath({}, null)
        expect(obj).toBeUndefined()
    })
})
