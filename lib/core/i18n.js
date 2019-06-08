"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _defineProperty = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _vueI18n = _interopRequireDefault(require("vue-i18n"));

var i18n = function i18n() {
  this.name = 'i18n';
  this.locale = '';
  this.messages = {};

  this.add = function (key, ls) {
    if (this.app.utils._.isString(key) && !this.messages[key]) {
      this.messages[key] = this.app.utils._.isObject(ls) ? ls : {};
    }
  };

  this.run = function (vue) {
    vue.use(_vueI18n.default);
    (0, _defineProperty.default)(vue.prototype, '$tts', {
      get: function get() {
        return function () {
          for (var _len = arguments.length, tmp = new Array(_len), _key = 0; _key < _len; _key++) {
            tmp[_key] = arguments[_key];
          }

          var len = tmp.length,
              msg = '';

          for (var i = 0; i < len; i++) {
            var _context, _context2;

            msg += (0, _isArray.default)(tmp[i]) ? this.$t.apply(this, (0, _concat.default)(_context = [tmp[i][0]]).call(_context, (0, _toConsumableArray2.default)((0, _slice.default)(_context2 = tmp[i]).call(_context2, 1, -1)))) : this.$t(tmp[i]);
          }

          return msg;
        };
      }
    });
    return new _vueI18n.default({
      locale: this.locale == '' ? this.app.config.locale : this.locale,
      messages: this.messages
    });
  };
};

var _default = i18n;
exports.default = _default;