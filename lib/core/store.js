"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find-index");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.string.includes");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _localStorage = _interopRequireDefault(require("./libs/localStorage"));

var _vuex = _interopRequireDefault(require("vuex"));

var _isObject = _interopRequireDefault(require("lodash/isObject"));

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

    var ds = _localStorage.default.getItem(this.app.config.storeKey);

    Object.keys(this.modules).forEach(function (i) {
      if (!_this.modulesWhite.includes(i)) {
        _this.modules[i] = _this.depModule(_this.modules[i], ds && ds[i] ? ds[i] : {});
        _this.map[i] = _this.depState(_this.modules[i]);
      }
    });
    vue.use(_vuex.default);
    this.instance = new _vuex.default.Store({
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
        if ((0, _isObject.default)(deps.state[k]) || Array.isArray(deps.state[k])) {
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

    var deps = module.state ? (0, _objectSpread2.default)({}, module.state) : {};

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

          _localStorage.default.setItem(k, cd);
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

var _default = store;
exports.default = _default;