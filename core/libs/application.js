import utils from '../utils/index.js';
import Vue from 'vue';
import ServiceProvider from "./serviceProvider"

export default function(){
    this.modules = {};
    this.binds = {};
    this.target = false;
    this.vue = Vue;
    this.app = null;
    this.sp = new ServiceProvider(this)
    this.hooks = {}

    this.addHook = function(name, hook) {
        this.hooks[name] = hook
    }

    this.register = function(provider){
        this.sp.register(provider)
    }

    this.one = function(name, params = {}){
        return this.binds[name](this, params)
    }

    this.make = function(name, params = {}) {
        if(this.modules[name] === undefined) {
            this.modules[name] = this.binds[name](this, params)
        }

        return this.modules[name]
    }

    this.bind = function(name, module){
        this.binds[name] = module
    };

    this.run = async function (){        
        await this.sp.boot()

        Object.defineProperty(this.vue.prototype, '$app', {
            get: () => {
                return this;
            }
        });
        
        this.app = new this.vue({
            ...this.hooks,
            render: this.target ? h => h(this.target) : h => h('div', [
                h('router-view')
            ])
        }).$mount('#app');
    };
};