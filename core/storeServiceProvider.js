import store from './store.js';
import Vuex from 'vuex';
export default function(){
    this.register = function(app){
        app.bind("store", function(app){
            let config = app.make("config")
            return new store(config.storeKey, config.debug)
        })
    }

    this.boot = function(app){
        app.vue.use(Vuex)
        app.addHook('store', app.make("store").run())
    }
}