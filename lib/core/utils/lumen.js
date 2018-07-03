"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var validateErr = exports.validateErr = function validateErr(errObj, c) {
    return Object.keys(errObj).map(function (v) {
        return errObj[v].map(function (q) {
            return "<li class=" + c + ">" + q + "</li>";
        }).join();
    }).join();
};

exports.default = {
    validateErr: validateErr
};