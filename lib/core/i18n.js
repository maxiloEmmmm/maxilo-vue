"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

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
    Object.defineProperty(vue.prototype, '$tts', {
      get: function get() {
        return function () {
          for (var _len = arguments.length, tmp = new Array(_len), _key = 0; _key < _len; _key++) {
            tmp[_key] = arguments[_key];
          }

          var len = tmp.length,
              msg = '';

          for (var i = 0; i < len; i++) {
            msg += Array.isArray(tmp[i]) ? this.$t.apply(this, [tmp[i][0]].concat((0, _toConsumableArray2.default)(tmp[i].slice(1, -1)))) : this.$t(tmp[i]);
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