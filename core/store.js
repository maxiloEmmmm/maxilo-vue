import ls from './libs/localStorage';
import Vuex from 'vuex';
const store = function (modules) {
    this.name = 'store';
    this.map = {};
    this.whitelist = [];
    this.modules = {};


    /* 一次性模块 */
    this.modulesWhite = [];

    this.add = function (key, store) {
        this.modules[key] = store;
    };

    this.once = function (key, store) {
        this.modulesWhite.push(key);
        this.add(key, store);
    };

    this.run = function (vue) {
        let ds = ls.getItem(this.app.config.storeKey)
        Object.keys(this.modules).forEach((i) => {
            if(!this.modulesWhite.includes(i)) {
                this.modules[i] = this.depModule(this.modules[i], ds && ds[i] ? ds[i] : {});
                this.map[i] = this.depState(this.modules[i]);
            }
        });

        vue.use(Vuex);
        return new Vuex.Store({
            modules: this.modules,
            strict: !this.app.config.debug,
            plugins: this.app.config.debug ? [
                this.toLs(this.map, this.writeList)
            ] : [this.toLs(this.map, this.writeList)]
        });
    };

    this.depModule = function (module, ds) {
        let deps = {
            state: module.state ? module.state : {},
            getters: module.getters ? module.getters : {},
            actions: module.actions ? module.actions : {},
            mutations: module.mutations ? module.mutations : {},
            namespaced: module.namespaced ? module.namespaced : true,
        };

        if (ds) {
            Object.keys(deps.state).forEach(k => deps.state[k] = this.app.utils._.merge(deps.state[k], ds[k] ? ds[k] : {}));
        }

        if (module.modules) {
            deps.modules = {};
            Object.keys(module.modules).forEach(i => deps.modules[i] = this.depModule(module.modules[i], ds && ds[i] && ds[i] ? ds[i] : {}));
        }
        
        return deps;
    };

    this.depState = function (module) {
        let deps = module.state ? { ...module.state } : {};
        if (module.modules) {
            deps._modules = {};
            Object.keys(module.modules).forEach(i => {
                deps._modules[i] = this.depState(module.modules[i]);
            });
        }
        return deps;
    };

    this.toLs = function () {
        let k = this.app.config.storeKey || 'lsKey';
        return store => {
            store.subscribe((mutation, state) => {
                if (this.whitelist.findIndex(m => m === mutation.type) < 0) {
                    let cd = Object.create(null);
                    Object.keys(state).forEach(k => {
                        if (this.map[k]) {
                            cd[k] = this.copy(state[k], this.map[k]);
                        }
                    });
                    ls.setItem(k, cd);
                }
            });
        };
    };

    this.copy = function(state, map){
        if (!state) {
            return state;
        }

        let tmp = this.app.utils._.isObject(map) ? Object.keys(map).filter(v => v != '_modules') : map;
        let d = Object.create(null);
        tmp.forEach(k => { 
            d[k] = state[k] ? state[k] : {};
        });

        if(map._modules) {
            Object.keys(map._modules).forEach(i => {
                d[i] = this.copy(state[i], map._modules[i]);
            });
        }
        return d;
    }
};
export default store;