"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperty = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _index = _interopRequireDefault(require("../utils/index.js"));

var config = function config() {
  var _context,
      _this = this;

  this.name = 'config';
  this.cs = {
    debug: _index.default.base.env(process.env.VUE_APP_DEBUG, true),
    locale: _index.default.base.env(process.env.VUE_APP_LANG, 'zh_cn'),
    baseURL: _index.default.base.env(process.env.VUE_APP_SERVER, 'server'),
    storeKey: 'fuf8u18uhf1huif13uhif2'
  };
  (0, _forEach.default)(_context = (0, _keys.default)(this.cs)).call(_context, function (v) {
    (0, _defineProperty.default)(_this, v, {
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
      (0, _defineProperty.default)(this, key, {
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
    var _context2,
        _this2 = this;

    (0, _forEach.default)(_context2 = (0, _keys.default)(obj)).call(_context2, function (v) {
      if (!_this2.cs[v]) {
        _this2.add(v, obj[v]);
      } else {
        _this2.cs[v] = obj[v];
      }
    });
  };

  this.run = function (vue) {
    var _this3 = this;

    (0, _defineProperty.default)(vue.prototype, '$configs', {
      get: function get() {
        return _this3.cs;
      }
    });
  };
};

var _default = config;
exports.default = _default;