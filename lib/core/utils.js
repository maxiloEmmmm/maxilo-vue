"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _defineProperty = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _bind = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/bind"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _utils = _interopRequireDefault(require("./utils/"));

var utils = function utils(modules) {
  var _context4,
      _this2 = this;

  this.depBind = function (hi) {
    var _context,
        _this = this;

    var tmp = {};
    (0, _forEach.default)(_context = (0, _keys.default)(hi)).call(_context, function (v) {
      if (_utils.default.base.getType(hi[v]) == 'Object') {
        _this.depBind(hi[v]);
      } else {
        var _context2;

        tmp[v] = (0, _bind.default)(_context2 = function _context2() {
          var _hi$v, _context3;

          return (_hi$v = hi[v]).call.apply(_hi$v, (0, _concat.default)(_context3 = [this]).call(_context3, (0, _slice.default)(Array.prototype).call(arguments)));
        }).call(_context2, _this);
      }
    });
    return tmp;
  };

  _utils.default.diy.alert = this.depBind(_utils.default.diy.alert);
  _utils.default.async = this.depBind(_utils.default.async);
  this.name = 'utils';
  this.utilMap = _utils.default;
  (0, _forEach.default)(_context4 = (0, _keys.default)(this.utilMap)).call(_context4, function (v) {
    (0, _defineProperty.default)(_this2, v, {
      get: function get() {
        return _this2.utilMap[v];
      }
    });
  });

  this.add = function (namespace, func) {
    var _this3 = this;

    var bind = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!this.app.utils._.isString(namespace) || namespace == '') {
      return;
    }

    var tmp = namespace.split('.');
    var native = ['add', 'utilMap', 'run', 'depNameSpace'];

    if ((0, _includes.default)(native)[tmp[0]]) {
      alert(native.join(',') + ' 均为utils根保留关键字, 添加被拒绝.');
      return;
    }

    if (tmp.length == 1 && !this.utilMap[tmp[0]]) {
      var k = tmp[0];
      this.utilMap[k] = func;
      (0, _defineProperty.default)(this, k, {
        get: function get() {
          var _context5;

          return bind ? (0, _bind.default)(_context5 = function _context5() {
            var _this$utilMap$k, _context6;

            return (_this$utilMap$k = this.utilMap[k]).call.apply(_this$utilMap$k, (0, _concat.default)(_context6 = [this]).call(_context6, (0, _slice.default)(Array.prototype).call(arguments)));
          }).call(_context5, _this3) : _this3.utilMap[k];
        }
      });
      return;
    }

    this.depNameSpace(this.utilMap, tmp, func, bind);
  };

  this.run = function (vue) {
    var _this4 = this;

    (0, _defineProperty.default)(vue.prototype, '$utils', {
      get: function get() {
        return _this4.utilMap;
      }
    });
  };

  this.depNameSpace = function (target, space, func) {
    var bind = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var len = space.length;

    if (len === 1) {
      var _context7;

      target[space[0]] = bind ? (0, _bind.default)(_context7 = function _context7() {
        var _context8;

        return func.call.apply(func, (0, _concat.default)(_context8 = [this]).call(_context8, (0, _slice.default)(Array.prototype).call(arguments)));
      }).call(_context7, this) : func;
    } else {
      var _context9;

      if (!target[space[0]]) {
        target[space[0]] = {};
      }

      this.depNameSpace(target[space[0]], (0, _slice.default)(_context9 = this.app.utils._).call(_context9, space, 1, len), func, bind);
    }
  };
};

var _default = utils;
exports.default = _default;