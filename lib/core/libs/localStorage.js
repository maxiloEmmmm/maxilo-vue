"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

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
    ls.setItem(key, JSON.stringify(val));
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
exports.default = _default;