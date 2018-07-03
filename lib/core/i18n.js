'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vueI18n = require('vue-i18n');

var _vueI18n2 = _interopRequireDefault(_vueI18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
        vue.use(_vueI18n2.default);

        Object.defineProperty(vue.prototype, '$tts', {
            get: function get() {
                return function () {
                    for (var _len = arguments.length, tmp = Array(_len), _key = 0; _key < _len; _key++) {
                        tmp[_key] = arguments[_key];
                    }

                    var len = tmp.length,
                        msg = '';
                    for (var i = 0; i < len; i++) {
                        msg += Array.isArray(tmp[i]) ? this.$t.apply(this, [tmp[i][0]].concat(_toConsumableArray(tmp[i].slice(1, -1)))) : this.$t(tmp[i]);
                    }
                    return msg;
                };
            }
        });
        return new _vueI18n2.default({
            locale: this.locale == '' ? this.app.config.locale : this.locale,
            messages: this.messages
        });
    };
};
exports.default = i18n;