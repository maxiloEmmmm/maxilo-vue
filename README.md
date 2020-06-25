# maxilo-vue

<p align="left">
  <a href="https://npmcharts.com/compare/vue?minimal=true"><img src="https://img.shields.io/npm/dm/maxilo-vue.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue"><img src="https://img.shields.io/npm/v/maxilo-vue.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue"><img src="https://img.shields.io/npm/l/maxilo-vue.svg?sanitize=true" alt="License"></a>
</p>

## 文档

### 例子

https://github.com/maxiloEmmmm/maxilo-vue/tree/master/example/quickstart

### 路由
```javascript
    import maxiloVue from "maxilo-vue"

    let router = maxiloVue.make("router").getRoute()

    // 添加路由 /path
    router.add("path", "componment")

    // 添加嵌套路由 /path
    router.group("path", "component", (r) => {
        return [
            // /path/path
            r.add("path", "component"),
            // /path/path1
            r.add("path1", "component"),
            // /path/path2
            r.group("path2", (rr) => {
                return [
                    // /path/path2/path
                    rr.add("path", "component"),
                    // /path/path2/path1
                    rr.add("path1", "component"),
                ]
            })
        ]
    })

    // 添加中间件
    router.add("path", "componment").addMiddleware("middleware1")
    router.middleware("middleware1").add("path", "componment")
    
    // 添加中间件组
    router.middlewareGroup(["middleware1"], () => {
        return [
            router.add(),
            router.group(),
            ...
        ]
    })
```