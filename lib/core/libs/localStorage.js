"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/keys"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/json/stringify"));

var ls = window.localStorage;
var _default = {
  getItem: function getItem(key) {
    try {
      return JSON.parse(ls.getItem(key));
    } catch (err) {
      return null;
    }
  },
  setItem: function setItem(key, val) {
    ls.setItem(key, (0, _stringify.default)(val));
  },
  clear: function clear() {
    ls.clear();
  },
  keys: function keys() {
    return (0, _keys.default)(ls).call(ls);
  },
  removeItem: function removeItem(key) {
    ls.removeItem(key);
  },
  all: function all() {
    return ls;
  }
};
exports.default = _default;