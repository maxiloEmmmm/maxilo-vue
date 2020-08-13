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

### DI
```javascript
import maxiloVue from "maxilo-vue"
maxiloVue.register({
    register(app){
        app.bind("x", function(app, args){
            //return instance
            return args
        })
    },
    boot: function(app){
        // 启动部分 如果需要初始化就放这
        console.log("x boot")
    }
})

// maxiloVue.make || this.$app.make
// 单例
console.log(maxiloVue.make("x", [1,2,3]))

maxiloVue.register({
    register(app){
        app.bind("r", function(app){
            //return instance
            return Math.random()
        })
    },
    boot: function(app){
        // 启动部分
        console.log("r boot")
    }
})
// maxiloVue.one || this.$app.one
// 非单例
console.log(maxiloVue.one("r"))

// 默认加载
// config http i18n store utils validator vue
// https://github.com/maxiloEmmmm/maxilo-vue/tree/master/core/*ServiceProvider.js

```

### store
```javascript
const state = {
    server: ""
}

const mutations = {
    setCurrentServer(state, payload){
        state.server = payload
    }
}

import maxiloVue from "maxilo-vue"
// 自动存储和读取localstorage
maxiloVue.make("store").add('server', {
    state,
    mutations,
    namespaced: true,
})

this.$store.commit("server/setCurrentServer", key)

// 一次性 刷新数据消失
maxiloVue.make("store").once('server', {
    state,
    mutations,
    namespaced: true,
})
```

### utils
```javascript
utils.add("x", () => {
    console.log("x")
})
this.$utils.x()

utils.add("q.p", () => {
    console.log("q.p")
})
this.$utils.q.p()

// 绑定this
utils.add("b", function() {
    console.log(this.app.make("x", [1,2,3]))
}, true)
this.$utils.b()
```

### validate
```javascript
import maxiloVue from "maxilo-vue"
const validator = maxiloVue.make("validator")
import { required } from 'vee-validate/dist/rules';

maxiloVue.register({
    // 在注册阶段注册 boot阶段无效
    register: function(app){
        validator.addRule('configOk', {
            validate: async config => {
                try {
                    await app.make("http").post("/validate/config", {payload: {config}})
                    return true
                } catch (error) {
                    return error
                }
            },
            message: "compose配置有误"
        })
        validator.addRule("required", {
            ...required,
            message: "必填不可为空!"
        })
        
        validator.addRule("abc", {
            validate(value){
                return /^[a-zA-Z0-9-_]+$/.test(value)
            },
            message: "只可以为大小写字母数字和-_"
        })
    }
})
```

### config
```javascript
// 添加 | 覆盖
config.add("baseURL", process.env.VUE_APP_BASEURL ? process.env.VUE_APP_BASEURL : "http://localhost:8000")
console.log(this.$configs.baseURL)

//baseURL 用于axios
//debug 调试模式
//locale 语种
//storeKey store存储localstorage key
```