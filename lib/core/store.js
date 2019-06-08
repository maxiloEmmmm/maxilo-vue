"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _create = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/create"));

var _findIndex = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find-index"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectSpread"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

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
    var _context,
        _this = this;

    var ds = _localStorage.default.getItem(this.app.config.storeKey);

    (0, _forEach.default)(_context = (0, _keys.default)(this.modules)).call(_context, function (i) {
      var _context2;

      if (!(0, _includes.default)(_context2 = _this.modulesWhite).call(_context2, i)) {
        _this.modules[i] = _this.depModule(_this.modules[i], ds && ds[i] ? ds[i] : {});
        (0, _map.default)(_this)[i] = _this.depState(_this.modules[i]);
      }
    });
    vue.use(_vuex.default);
    this.instance = new _vuex.default.Store({
      modules: this.modules,
      strict: !this.app.config.debug,
      plugins: this.app.config.debug ? [this.toLs((0, _map.default)(this), this.writeList)] : [this.toLs((0, _map.default)(this), this.writeList)]
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
      var _context3;

      (0, _forEach.default)(_context3 = (0, _keys.default)(deps.state)).call(_context3, function (k) {
        //await to fixed Map、 Set and syblm 
        if ((0, _isObject.default)(deps.state[k]) || (0, _isArray.default)(deps.state[k])) {
          deps.state[k] = _this2.app.utils._.merge(deps.state[k], ds[k] !== undefined ? ds[k] : {});
        } else {
          deps.state[k] = ds[k] ? ds[k] : '';
        }
      });
    }

    if (module.modules) {
      var _context4;

      deps.modules = {};
      (0, _forEach.default)(_context4 = (0, _keys.default)(module.modules)).call(_context4, function (i) {
        return deps.modules[i] = _this2.depModule(module.modules[i], ds && ds[i] !== undefined ? ds[i] : {});
      });
    }

    return deps;
  };

  this.depState = function (module) {
    var _this3 = this;

    var deps = module.state ? (0, _objectSpread2.default)({}, module.state) : {};

    if (module.modules) {
      var _context5;

      deps._modules = {};
      (0, _forEach.default)(_context5 = (0, _keys.default)(module.modules)).call(_context5, function (i) {
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
        var _context6;

        if ((0, _findIndex.default)(_context6 = _this4.whitelist).call(_context6, function (m) {
          return m === mutation.type;
        }) < 0) {
          var _context7;

          var cd = (0, _create.default)(null);
          (0, _forEach.default)(_context7 = (0, _keys.default)(state)).call(_context7, function (k) {
            if ((0, _map.default)(_this4)[k]) {
              cd[k] = _this4.copy(state[k], (0, _map.default)(_this4)[k]);
            }
          });

          _localStorage.default.setItem(k, cd);
        }
      });
    };
  };

  this.copy = function (state, map) {
    var _context8,
        _this5 = this;

    if (!state) {
      return state;
    }

    var tmp = this.app.utils._.isObject(map) ? (0, _filter.default)(_context8 = (0, _keys.default)(map)).call(_context8, function (v) {
      return v != '_modules';
    }) : map;
    var d = (0, _create.default)(null);
    (0, _forEach.default)(tmp).call(tmp, function (k) {
      d[k] = state[k] !== undefined ? state[k] : {};
    });

    if (map._modules) {
      var _context9;

      (0, _forEach.default)(_context9 = (0, _keys.default)(map._modules)).call(_context9, function (i) {
        d[i] = _this5.copy(state[i], map._modules[i]);
      });
    }

    return d;
  };
};

var _default = store;
exports.default = _default;