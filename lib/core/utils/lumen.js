"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.validateErr = void 0;

var validateErr = function validateErr(errObj, c) {
  return Object.keys(errObj).map(function (v) {
    return errObj[v].map(function (q) {
      return "<li class=".concat(c, ">").concat(q, "</li>");
    }).join();
  }).join();
};

exports.validateErr = validateErr;
var _default = {
  validateErr: validateErr
};
exports.default = _default;