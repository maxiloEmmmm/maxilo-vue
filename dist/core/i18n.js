'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vueI18n = require('vue-i18n');

var _vueI18n2 = _interopRequireDefault(_vueI18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        return new _vueI18n2.default({
            locale: this.locale == '' ? 'zh_cn' : this.locale,
            messages: this.messages
        });
    };
};
exports.default = i18n;