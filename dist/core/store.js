'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _localStorage = require('./libs/localStorage');

var _localStorage2 = _interopRequireDefault(_localStorage);

var _vuex = require('vuex');

var _vuex2 = _interopRequireDefault(_vuex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = function store(modules) {
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
        var _this = this;

        var ds = _localStorage2.default.getItem(this.app.config.storeKey);
        (0, _keys2.default)(this.modules).forEach(function (i) {
            if (!_this.modulesWhite.includes(i)) {
                _this.modules[i] = _this.depModule(_this.modules[i], ds && ds[i] ? ds[i] : {});
                _this.map[i] = _this.depState(_this.modules[i]);
            }
        });

        vue.use(_vuex2.default);
        return new _vuex2.default.Store({
            modules: this.modules,
            strict: !this.app.config.debug,
            plugins: this.app.config.debug ? [this.toLs(this.map, this.writeList)] : [this.toLs(this.map, this.writeList)]
        });
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
            (0, _keys2.default)(deps.state).forEach(function (k) {
                return deps.state[k] = _this2.app.utils._.merge(deps.state[k], ds[k] ? ds[k] : {});
            });
        }

        if (module.modules) {
            deps.modules = {};
            (0, _keys2.default)(module.modules).forEach(function (i) {
                return deps.modules[i] = _this2.depModule(module.modules[i], ds && ds[i] && ds[i] ? ds[i] : {});
            });
        }

        return deps;
    };

    this.depState = function (module) {
        var _this3 = this;

        var deps = module.state ? (0, _extends3.default)({}, module.state) : {};
        if (module.modules) {
            deps._modules = {};
            (0, _keys2.default)(module.modules).forEach(function (i) {
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
                    var cd = (0, _create2.default)(null);
                    (0, _keys2.default)(state).forEach(function (k) {
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

        var tmp = this.app.utils._.isObject(map) ? (0, _keys2.default)(map).filter(function (v) {
            return v != '_modules';
        }) : map;
        var d = (0, _create2.default)(null);
        tmp.forEach(function (k) {
            d[k] = state[k] ? state[k] : {};
        });

        if (map._modules) {
            (0, _keys2.default)(map._modules).forEach(function (i) {
                d[i] = _this5.copy(state[i], map._modules[i]);
            });
        }
        return d;
    };
};
exports.default = store;