const path = require('path')
const hepPug = require('../lib/index')

describe('test index.js', () => {
    
    it('should return a function', function () {
        let middleware = hepPug({})
        expect(typeof middleware).toEqual('function')
    })
})
