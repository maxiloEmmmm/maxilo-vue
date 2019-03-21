"use strict";

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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