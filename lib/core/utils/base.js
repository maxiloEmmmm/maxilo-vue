"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _default = {
  getType: function getType(o) {
    var str = Object.prototype.toString.call(o);
    return (0, _slice.default)(str).call(str, 8, str.length - 1);
  },
  env: function env(ds, d) {
    if (ds === undefined || ds === '') {
      return d;
    }

    return process.env.VUE_APP_DEBUG ? ds : d;
  }
};
exports.default = _default;