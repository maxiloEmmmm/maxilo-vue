"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectSpread"));

var _base = _interopRequireDefault(require("./base"));

var _2 = _interopRequireDefault(require("./_"));

var tmp = {
  alert: {
    base: function base(options) {
      return this.app.alert.base(options);
    },
    prompt: function prompt(options) {
      return this.app.alert.prompt(options);
    },
    confirm: function confirm(options) {
      return this.app.alert.confirm(options);
    },
    confirmWithCheck: function confirmWithCheck(options) {
      if (ds.length !== 0) {
        return this.app.alert.confirm(options);
      } else {
        return this.app.alert.base((0, _objectSpread2.default)({
          title: '未选择'
        }, getType(this.app.alert.typeKey, 'info')));
      }
    }
  }
};

tmp.alert.success = tmp.alert.ok = function (options) {
  return tmp.alert.base(tmpFunc(options, getType(this.app.alert.typeKey, 'success')));
};

tmp.alert.info = function (options) {
  return tmp.alert.base(tmpFunc(options, getType(this.app.alert.typeKey, 'info')));
};

tmp.alert.error = tmp.alert.err = function (options) {
  return tmp.alert.base(tmpFunc(options, getType(this.app.alert.typeKey, 'error')));
};

tmp.alert.warning = tmp.alert.warn = function (options) {
  return tmp.alert.base(tmpFunc(options, getType(this.app.alert.typeKey, 'warning')));
};

var tmpFunc = function tmpFunc(obj) {
  var sub = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _2.default.merge({}, _base.default.getType(obj) === 'String' ? {
    title: obj
  } : obj, sub);
};

var getType = function getType(key, v) {
  var tmp = {};
  tmp[key] = v;
  return tmp;
};

var _default = tmp;
exports.default = _default;