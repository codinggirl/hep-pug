# HepPug API

## 中间件

```ecmascript 6
const Koa = require('koa')

let app = new Koa()

let options = {}
let middleware = hepPug(options)

app.use(middleware)
```

## hepPug

```ecmascript 6
ctx.hepPug
```

## config

```ecmascript 6

ctx.hepPug.config

```

## render

```ecmascript 6
let fullPath = 'path/to/view'
let locals = {}

ctx.hepPug.render(fullPath, locals)
```

## view

```ecmascript 6
let relativePath = 'relative/path/to/view'
let locals = {}

ctx.hepPug.view(relativePath, locals)
```
