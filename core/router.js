import routeLib from './libs/route';
import VueRouter from 'vue-router'
import utils from "./utils/"
const router = function () {
    this.instance = null;
    this.middleware = new middleware;
    this.mode = 'hash'

    this.getRoute = function () {
        if(!this.instance) {
            this.instance = new routeLib;
        }
        
        return this.instance;
    };

    this.getRoutes = function () {
        return this.instance.routes;
    };

    this.run = function(){
        let r = new VueRouter({
            mode: this.mode,
            linkActiveClass: 'active',
            routes: this.instance ? this.instance.routes : []
        });

        r.beforeEach(async (to, from, next) => {
            let globalMs = this.middleware.globalItems;
            let ms = utils.tool.bind({}, globalMs, this.middleware.items);
            let toMiddle = [...Object.keys(globalMs)];
            to.matched.forEach((v) => {
                if (v.meta.middlewares && v.meta.middlewares != 0) {
                    toMiddle.push(...v.meta.middlewares);
                }
            });

            let n = true;
            let len = toMiddle.length;
            if (len != 0) {
                for (let i = 0; i < len; i++) {
                    let v = toMiddle[i];
                    if (ms[v]) {
                        try {
                            let r = await ms[v](this.app, to, from, next);
                            if (!r) {
                                n = false;
                                break;
                            }
                        } catch (error) {
                            n = false;
                            break;
                        }
                    }
                }
                n ? next() : '';
            } else { next(); }
        });

        return r;
    };
};

const middleware = function () {
    this.items = {};
    this.globalItems = {};

    this.add = function (key, build) {
        if(this.items[key]) {
            console.log('[maxiloVue - router warning] middleware is overwrite: ' + key + '.');
        }
        this.items[key] = build;
    };

    this.addGlobal = function (key, build) {
        if (this.globalItems['global-' + key]) {
            console.log('[maxiloVue - router warning] middleware is overwrite: ' + key + '.');
        }
        this.globalItems['global-'+key] = build;
    };
};
export default router;

