'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.route = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var route = exports.route = function route() {
    var _this = this;

    this.routes = [];

    this.more = [];
    this.middlewares = [];
    this.currentIndex = 0;
    this.mGroup = false;

    this.merge = function (b) {
        var _routes;

        (_routes = _this.routes).push.apply(_routes, (0, _toConsumableArray3.default)(b));
    };

    this.add = function (path, component) {
        var params = {
            path: path,
            component: component,
            meta: {}
        };
        if (_this.middleware.length != 0) {
            params['meta']['middlewares'] = _this.middlewares;
            _this.middlewares = [];
        }
        _this.currentIndex = _this.routes.push(params);
        return _this.mgroup ? _this.currentIndex : _this;
    };

    this.group = function (path, component, callback) {
        var group = {
            path: path,
            meta: {}
        };

        if (component != '') {
            group.component = component;
        }

        if (_this.middleware.length != 0) {
            group['meta']['middlewares'] = _this.middlewares;
            _this.middlewares = [];
        }

        var tmp = new routeItem();
        callback(tmp);
        group.children = tmp.getRoutes();
        _this.currentIndex = _this.routes.push(group);
        return _this.mgroup ? _this.currentIndex : _this;
    };

    this.middleware = function (ms) {
        _this.middlewares = [];
        if ((0, _isString2.default)(ms)) {
            ms = [ms];
        }

        _this.middlewares = ms;
        return _this;
    }, this.middlewareGroup = function (ms, rs) {
        _this.mgroup = true;
        if ((0, _isString2.default)(ms)) {
            ms = [ms];
        }
        var r = rs();
        r.forEach(function (v) {
            _this.currentIndex = v;
            _this.addMiddleware(ms);
        });
        _this.mgroup = false;
    };

    this.addMiddleware = function (ms) {
        if (_this.currentIndex == 0) {
            return;
        }

        if ((0, _isString2.default)(ms)) {
            ms = [ms];
        }

        _this.routes[_this.currentIndex - 1]['meta'].middlewares = ms;
        _this.currentIndex = 0;
    };

    this.getRoutes = function () {
        return _this.routes;
    };
};

var routeItem = function routeItem() {
    var _this2 = this;

    this.items = [];
    this.add = function (path, component) {
        _this2.items.push({
            path: path,
            component: component
        });
    };

    this.group = function (path, component, callback) {
        var group = {
            path: path
        };

        if (component != '') {
            group.component = component;
        }

        var tmp = new routeItem();
        callback(tmp);
        group.children = tmp.getRoutes();
        _this2.items.push(group);
    };

    this.getRoutes = function () {
        return _this2.items;
    };
};

exports.default = route;