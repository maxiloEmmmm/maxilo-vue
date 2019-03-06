"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.promise");

var _base = _interopRequireDefault(require("./utils/base"));

var alert = function alert() {
  this.name = 'alert';
  this.typeKey = 'icon';

  this.base = function (options) {
    var _this = this;

    return new Promise(function (ok, nok) {
      ok(window.alert(_this.getMsg(options)));
    });
  };

  this.confirm = function (options) {
    var _this2 = this;

    return new Promise(function (ok, nok) {
      ok(confirm(_this2.getMsg(options)));
    });
  };

  this.prompt = function (options) {
    var _this3 = this;

    return new Promise(function (ok, nok) {
      ok(prompt(_this3.getMsg(options)));
    });
  };

  this.getMsg = function (options) {
    if (options === undefined) {
      return '';
    }

    return _base.default.getType(options) === 'String' ? options : options.text ? options.text : options.title ? options.title : options.toString ? options.toString() : '';
  };

  this.run = function () {};
};

var _default = alert;
exports.default = _default;