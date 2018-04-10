'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _route = require('./libs/route');

var _route2 = _interopRequireDefault(_route);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = function router() {
    this.name = 'router';
    this.instance = null;

    this.getRoute = function () {
        if (!this.instance) {
            this.instance = new _route2.default();
        }

        return this.instance;
    };

    this.getRoutes = function () {
        return this.instance.routes;
    };

    this.run = function (vue) {
        vue.use(_vueRouter2.default);
        return new _vueRouter2.default({
            mode: 'history',
            base: __dirname,
            linkActiveClass: 'active',
            routes: this.instance ? this.instance.routes : []
        });
    };
};
exports.default = router;