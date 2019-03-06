"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

var _utils = _interopRequireDefault(require("./utils/"));

var utils = function utils(modules) {
  var _this2 = this;

  this.depBind = function (hi) {
    var _this = this;

    var tmp = {};
    Object.keys(hi).forEach(function (v) {
      if (_utils.default.base.getType(hi[v]) == 'Object') {
        _this.depBind(hi[v]);
      } else {
        tmp[v] = function () {
          var _hi$v;

          return (_hi$v = hi[v]).call.apply(_hi$v, [this].concat(Array.prototype.slice.call(arguments)));
        }.bind(_this);
      }
    });
    return tmp;
  };

  _utils.default.diy.alert = this.depBind(_utils.default.diy.alert);
  _utils.default.async = this.depBind(_utils.default.async);
  this.name = 'utils';
  this.utilMap = _utils.default;
  Object.keys(this.utilMap).forEach(function (v) {
    Object.defineProperty(_this2, v, {
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

    if (native.includes[tmp[0]]) {
      alert(native.join(',') + ' 均为utils根保留关键字, 添加被拒绝.');
      return;
    }

    if (tmp.length == 1 && !this.utilMap[tmp[0]]) {
      var k = tmp[0];
      this.utilMap[k] = func;
      Object.defineProperty(this, k, {
        get: function get() {
          return bind ? function () {
            var _this$utilMap$k;

            return (_this$utilMap$k = this.utilMap[k]).call.apply(_this$utilMap$k, [this].concat(Array.prototype.slice.call(arguments)));
          }.bind(_this3) : _this3.utilMap[k];
        }
      });
      return;
    }

    this.depNameSpace(this.utilMap, tmp, func, bind);
  };

  this.run = function (vue) {
    var _this4 = this;

    Object.defineProperty(vue.prototype, '$utils', {
      get: function get() {
        return _this4.utilMap;
      }
    });
  };

  this.depNameSpace = function (target, space, func) {
    var bind = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var len = space.length;

    if (len === 1) {
      target[space[0]] = bind ? function () {
        return func.call.apply(func, [this].concat(Array.prototype.slice.call(arguments)));
      }.bind(this) : func;
    } else {
      if (!target[space[0]]) {
        target[space[0]] = {};
      }

      this.depNameSpace(target[space[0]], this.app.utils._.slice(space, 1, len), func, bind);
    }
  };
};

var _default = utils;
exports.default = _default;