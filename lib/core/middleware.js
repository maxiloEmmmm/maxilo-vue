'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var middleware = function middleware() {
    this.name = 'middleware';
    this.instance = null;
    this.items = {};

    this.add = function () {
        if (!this.instance) {
            this.instance = new routeLib();
        }

        return this.instance;
    };

    this.getRoutes = function () {
        return this.instance.routes;
    };

    this.run = function (vue) {
        vue.use(VueRouter);
        return new VueRouter({
            mode: 'history',
            base: __dirname,
            linkActiveClass: 'active',
            routes: this.instance ? this.instance.routes : []
        });
    };
};
exports.default = middleware;