import router from './router';
import VueRouter from 'vue-router'
export default function(){
    this.register = function(app){
        app.bind("router", function(app){
            return new router
        })
    }

    this.boot = function(app){
        app.vue.use(VueRouter)
        app.addHook('router', app.make("router").run())
    }
}