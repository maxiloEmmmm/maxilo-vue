"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _base = _interopRequireDefault(require("./utils/base"));

var alert = function alert() {
  this.name = 'alert';
  this.typeKey = 'icon';

  this.base = function (options) {
    var _this = this;

    return new _promise.default(function (ok, nok) {
      ok(window.alert(_this.getMsg(options)));
    });
  };

  this.confirm = function (options) {
    var _this2 = this;

    return new _promise.default(function (ok, nok) {
      ok(confirm(_this2.getMsg(options)));
    });
  };

  this.prompt = function (options) {
    var _this3 = this;

    return new _promise.default(function (ok, nok) {
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