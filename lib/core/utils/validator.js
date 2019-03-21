"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
      return Object.keys(v).length === 0;
    } else if (type === 'Set' || type === ' ') {
      return v.size === 0;
    } else if (type === 'Array') {
      return v.length === 0;
    } //Null or Undefined


    return true;
  }
};
exports.default = _default;