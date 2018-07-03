import utils from '../utils';
import Vue from 'vue';

export default function(){
    this.modules = {};
    this.targetComponent = false;
    this.vueFactory = Vue;

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

    this.run = function (){        
        let moduleInstance = {};
        Object.keys(this.modules).map(v => moduleInstance[v] = this.modules[v].run(Vue));
        
        let app = new Vue({
            ...moduleInstance,
            render: this.targetComponent ? h => h(this.targetComponent) : h => h('div', [
                h('router-view')
            ])
        }).$mount('#app');
    };
};