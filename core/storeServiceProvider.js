import store from './store.js';
import Vuex from 'vuex';
export default function(){
    this.register = function(app){
        app.bind("store", function(app){
            return new store()
        })
    }

    this.boot = function(app){
        app.vue.use(Vuex)
        let config = app.make("config")
        app.addHook('store', app.make("store").run(config.storeKey, config.debug))
    }
}