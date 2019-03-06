import utils from '../utils/index.js';
import Vue from 'vue';

export default function(){
    this.modules = {};
    this.targetComponent = false;
    this.vueFactory = Vue;
    this.instance = null;

    /* singleton */
    this.register = function(module){
        let name = '';
        if(!module.name) {
            utils.system.notice('[maxilo-vue] module name is not define, will use object prototype constructor name.');
            name = module.constructor.name;
        }else {name = module.name;}

        if (this.modules.hasOwnProperty(name)) {
            utils.system.notice('[maxilo-vue warning] module - ' + name + ' is already exist, will replace old.');
        }

        module.app = this;
        this.modules[name] = module;
        Object.defineProperty(this, name, {
            get(){
                return this.modules[name];
            }
        });
    };

    this.run = async function (){        
        let moduleInstance = {};
        let moduleKey = Object.keys(this.modules);
        let moduleKeyLen = moduleKey.length;
        for(let i = 0; i < moduleKeyLen; i++) {
            moduleInstance[moduleKey[i]] = await this.modules[moduleKey[i]].run(Vue)
        }
        
        this.instance = new Vue({
            ...moduleInstance,
            render: this.targetComponent ? h => h(this.targetComponent) : h => h('div', [
                h('router-view')
            ])
        }).$mount('#app');
    };
};