'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _localStorage = require('./libs/localStorage');

var _localStorage2 = _interopRequireDefault(_localStorage);

var _vuex = require('vuex');

var _vuex2 = _interopRequireDefault(_vuex);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = function store(modules) {
    this.name = 'store';
    this.map = {};
    this.whitelist = [];
    this.modules = {};
    this.instance = null;

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
        var _this = this;

        var ds = _localStorage2.default.getItem(this.app.config.storeKey);
        Object.keys(this.modules).forEach(function (i) {
            if (!_this.modulesWhite.includes(i)) {
                _this.modules[i] = _this.depModule(_this.modules[i], ds && ds[i] ? ds[i] : {});
                _this.map[i] = _this.depState(_this.modules[i]);
            }
        });

        vue.use(_vuex2.default);
        this.instance = new _vuex2.default.Store({
            modules: this.modules,
            strict: !this.app.config.debug,
            plugins: this.app.config.debug ? [this.toLs(this.map, this.writeList)] : [this.toLs(this.map, this.writeList)]
        });
        return this.instance;
    };

    this.depModule = function (module, ds) {
        var _this2 = this;

        var deps = {
            state: module.state ? module.state : {},
            getters: module.getters ? module.getters : {},
            actions: module.actions ? module.actions : {},
            mutations: module.mutations ? module.mutations : {},
            namespaced: module.namespaced ? module.namespaced : true
        };

        if (ds) {
            Object.keys(deps.state).forEach(function (k) {
                //await to fixed Map、 Set and syblm 
                if ((0, _isObject2.default)(deps.state[k]) || Array.isArray(deps.state[k])) {
                    deps.state[k] = _this2.app.utils._.merge(deps.state[k], ds[k] !== undefined ? ds[k] : {});
                } else {
                    deps.state[k] = ds[k] ? ds[k] : '';
                }
            });
        }

        if (module.modules) {
            deps.modules = {};
            Object.keys(module.modules).forEach(function (i) {
                return deps.modules[i] = _this2.depModule(module.modules[i], ds && ds[i] !== undefined ? ds[i] : {});
            });
        }

        return deps;
    };

    this.depState = function (module) {
        var _this3 = this;

        var deps = module.state ? _extends({}, module.state) : {};
        if (module.modules) {
            deps._modules = {};
            Object.keys(module.modules).forEach(function (i) {
                deps._modules[i] = _this3.depState(module.modules[i]);
            });
        }
        return deps;
    };

    this.toLs = function () {
        var _this4 = this;

        var k = this.app.config.storeKey || 'lsKey';
        return function (store) {
            store.subscribe(function (mutation, state) {
                if (_this4.whitelist.findIndex(function (m) {
                    return m === mutation.type;
                }) < 0) {
                    var cd = Object.create(null);
                    Object.keys(state).forEach(function (k) {
                        if (_this4.map[k]) {
                            cd[k] = _this4.copy(state[k], _this4.map[k]);
                        }
                    });
                    _localStorage2.default.setItem(k, cd);
                }
            });
        };
    };

    this.copy = function (state, map) {
        var _this5 = this;

        if (!state) {
            return state;
        }

        var tmp = this.app.utils._.isObject(map) ? Object.keys(map).filter(function (v) {
            return v != '_modules';
        }) : map;
        var d = Object.create(null);
        tmp.forEach(function (k) {
            d[k] = state[k] !== undefined ? state[k] : {};
        });

        if (map._modules) {
            Object.keys(map._modules).forEach(function (i) {
                d[i] = _this5.copy(state[i], map._modules[i]);
            });
        }
        return d;
    };
};
exports.default = store;