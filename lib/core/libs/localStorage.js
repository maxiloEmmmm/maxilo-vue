"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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