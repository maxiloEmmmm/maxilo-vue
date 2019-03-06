"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.to-string");

var _default = {
  getType: function getType(o) {
    var str = Object.prototype.toString.call(o);
    return str.slice(8, str.length - 1);
  },
  env: function env(ds, d) {
    if (ds === undefined || ds === '') {
      return d;
    }

    return process.env.VUE_APP_DEBUG ? ds : d;
  }
};
exports.default = _default;