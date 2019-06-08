"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = exports.validateErr = void 0;

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var validateErr = function validateErr(errObj, c) {
  var _context;

  return (0, _map.default)(_context = (0, _keys.default)(errObj)).call(_context, function (v) {
    var _context2;

    return (0, _map.default)(_context2 = errObj[v]).call(_context2, function (q) {
      var _context3, _context4;

      return (0, _concat.default)(_context3 = (0, _concat.default)(_context4 = "<li class=").call(_context4, c, ">")).call(_context3, q, "</li>");
    }).join();
  }).join();
};

exports.validateErr = validateErr;
var _default = {
  validateErr: validateErr
};
exports.default = _default;