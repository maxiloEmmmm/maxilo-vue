"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.validateErr = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

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