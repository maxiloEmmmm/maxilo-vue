"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _base = _interopRequireDefault(require("./base"));

var _default = {
  isNotEmpty: function isNotEmpty(v) {
    return !this.isEmpty(v);
  },
  isEmpty: function isEmpty(v) {
    var type = _base.default.getType(v);

    if (type === 'Number' || type === 'Function' || type === 'Boolean') {
      return false;
    } else if (type === 'String' && v.length != 0) {
      return false;
    } else if (type === 'Object') {
      return (0, _keys.default)(v).length === 0;
    } else if (type === 'Set' || type === ' ') {
      return v.size === 0;
    } else if (type === 'Array') {
      return v.length === 0;
    } //Null or Undefined


    return true;
  }
};
exports.default = _default;