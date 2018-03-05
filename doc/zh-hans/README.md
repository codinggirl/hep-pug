# HepPug

HepPug 是一个处理 Pug 模版的 Hep/Koa 中间件。

它对 Pug 进行了封装，可以帮助我们更快地在 Koa 程序中开发视图渲染功能。

## 安装

- 运行 npm 命令行安装

```
npm i -S hep-pug
```

或

```
npm install --save hep-pug
```

- 运行 cnpm 命令行安装

```
cnpm i -S hep-pug
```

或

```
cnpm install --save hep-pug
```

## 使用

## API

[API](api.md)

## 注意事项

## 其他

[版本记录](history.md)

## Hep Pug （hep-pug） 是什么

hep-pug 是一个以 pug 为后端的视图渲染器，它可以将 pug 模版渲染成 html。

适用于 Hep 和 Koa 2。

### 为什么又要造一个轮子？

市面上的大多数以 pug 为基础，适用于 koa 的视图渲染库，都会直接使用 `ctx.render()`、`ctx.view()` 等。这造成的一个问题是，许多时候这些工具并不能混合使用。

Hep Pug 的一个愿景就是让各种工具都能混合使用，比如你可以同时在一个路由中使用 `hep-pug` 和其他以 pug 为基础的工具，而不发生冲突。 

### 如何做到的？

`hep-pug` 通过为 `ctx` 添加了一个新的属性 `hepPug`，所有相关的渲染函数都放置 `ctx.hepPug` 下面。



## 基本用法

加入你写了一个 Hep 或 Koa 中间件，需要在其中渲染视图。

### 步骤一：引入中间件。

```ecmascript 6
const hepPug = require('hep-pug')

// 使用其他中间件
// ...

// 将 Hep Pug 作为中间件使用
{
    let option = {
        pugOption: {},
        local: {
            resBasePath: '/'
        },
        viewPath: `${__dirname}/views/`,
        extName: '.pug'
    }
    app.use(hepPug(option))
}

// 使用其他中间件
// ...


```

### 步骤二：视图渲染。

```ecmascript 6
async (ctx, next) => {
    ctx.hepPug.render(`${__dirname}/view/main.pug`)
    next()
}
```

或者：

```ecmascript 6
async (ctx, next) => {
    let locals = {
        name: 'Li Lei',
        class: 1,
        grade: 2
    }
    ctx.hepPug.view('main', locals)
    next()
}
```

可以使用 `render` 或 `view` 方法进行渲染。

两种方法的不同之处在于：

`render` 需要传入绝对路径。

`view` 传入的是相对路径，甚至不包括扩展名。只是需要在注册中间件的时候设置模版基本路径 `viewPath` 和默认的扩展名 `extName`。

## 高级用法

许多时候，我们并没有将所有的模版都放在一个文件夹中，而是根据项目的不同模块，在每个模块下面放置一个或者多个模版文件夹。

此时，可以借助 node 中 Koa 相关的路由模块，不同的路由，来加载不同的模版路径。

比如我们选择使用 `koa-router`。这个模块支持给一个路径设置多个中间件函数。因此，我们可以在较早执行的中间件中，执行我们的模版路径设置函数，然后在后面的中间件中直接使用 `view` 方法。

安装 `koa-router`：

```
npm install koa-router -S
```

使用：

```
var Koa = require('koa')
var Router = require('koa-router')
const hepPug = require('hep-pug')

var app = new Koa()
var router = new Router()

{
    let option = {
        pugOption: {},
        local: {
            resBasePath: '/'
        }
    }
    app.use(hepPug(option))
}

const publicViews = (ctx, next) => {
    ctx.hepPug = Object.assign(ctx.hepPug, {
        viewPath: 'path/to/public/views/',
        extName: '.pug'
    })
}

const userViews = (ctx, next) => {
    ctx.hepPug = Object.assign(ctx.hepPug, {
        viewPath: 'path/to/user/views/',
        extName: '.pug'
    })
}

router.get('/home', publicViews, (ctx, next) => {
    ctx.hepPug.view('home')
})

router.get('/product', publicViews, (ctx, next) => {
    ctx.hepPug.view('product')
})

rotuer.get('/user/profile', userViews, (ctx, next) => {
    ctx.hepPug.view('profile')
})

rotuer.get('/user/colletion', userViews, (ctx, next) => {
    ctx.hepPug.view('colletion')
})

app.use(router.routes())
app.use(router.allowedMethods())

```

---

## 授权协议

The MIT License (MIT)

© 2018 LibreRose Studio

请参阅 [LICENSE](../../LICENSE) 文件。
