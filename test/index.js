const path = require('path')
const hepPug = require('../lib')

describe('hep pug', () => {
    const middleware = hepPug()
    
    it('ctx.hepPug should be defined', () => {
        const ctx = {}
        const next = () => {}
        middleware(ctx, next)
        
        expect(ctx.hepPug).toBeDefined()
        
    })
    
    it('async should be work', () => {
        const ctx = {}
        const next = async (ctx, next) => {
            expect(ctx.body).equal('hello ')
            console.log(ctx)
        }
        middleware(ctx, next)
        ctx.hepPug.view(path.join(__dirname, 'index.pug'))
    })
})
