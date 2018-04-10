"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    getType: function getType(o) {
        var str = Object.prototype.toString.call(o);
        return str.slice(8, str.length - 1);
    }
};