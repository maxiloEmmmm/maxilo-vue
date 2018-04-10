"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ls = window.localStorage;

exports.default = {
  getItem: function getItem(key) {
    try {
      return JSON.parse(ls.getItem(key));
    } catch (err) {
      return null;
    }
  },
  setItem: function setItem(key, val) {
    ls.setItem(key, (0, _stringify2.default)(val));
  },
  clear: function clear() {
    ls.clear();
  },
  keys: function keys() {
    return ls.keys();
  },
  removeItem: function removeItem(key) {
    ls.removeItem(key);
  },
  all: function all() {
    return ls;
  }
};