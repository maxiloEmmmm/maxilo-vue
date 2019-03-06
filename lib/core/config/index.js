"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

var _index = _interopRequireDefault(require("../utils/index.js"));

var config = function config() {
  var _this = this;

  this.name = 'config';
  this.cs = {
    debug: _index.default.base.env(process.env.VUE_APP_DEBUG, true),
    locale: _index.default.base.env(process.env.VUE_APP_LANG, 'zh_cn'),
    baseURL: _index.default.base.env(process.env.VUE_APP_SERVER, 'server'),
    storeKey: 'fuf8u18uhf1huif13uhif2'
  };
  Object.keys(this.cs).forEach(function (v) {
    Object.defineProperty(_this, v, {
      get: function get() {
        return this.cs[v];
      },
      set: function set(val) {
        this.cs[v] = val;
      }
    });
  });

  this.add = function (key, v) {
    if (this.cs[key] === undefined) {
      Object.defineProperty(this, key, {
        get: function get() {
          return v;
        },
        set: function set(val) {
          this.cs[key] = v;
        }
      });
    }

    this.cs[key] = v;
  };

  this.merge = function (obj) {
    var _this2 = this;

    Object.keys(obj).forEach(function (v) {
      if (!_this2.cs[v]) {
        _this2.add(v, obj[v]);
      } else {
        _this2.cs[v] = obj[v];
      }
    });
  };

  this.run = function (vue) {
    var _this3 = this;

    Object.defineProperty(vue.prototype, '$configs', {
      get: function get() {
        return _this3.cs;
      }
    });
  };
};

var _default = config;
exports.default = _default;