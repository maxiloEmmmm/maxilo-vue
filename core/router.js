import routeLib from './libs/route';
import VueRouter from 'vue-router';
const router = function () {
    this.name = 'router';
    this.instance = null;

    this.getRoute = function () {
        if(!this.instance) {
            this.instance = new routeLib;
        }
        
        return this.instance;
    };

    this.getRoutes = function () {
        return this.instance.routes;
    };

    this.run = function(vue){
        vue.use(VueRouter);
        return new VueRouter({
            mode: 'history',
            base: __dirname,
            linkActiveClass: 'active',
            routes: this.instance ? this.instance.routes : []
        });
    };
};
export default router;

