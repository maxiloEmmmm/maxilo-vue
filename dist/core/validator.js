'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _veeValidate = require('vee-validate');

var _veeValidate2 = _interopRequireDefault(_veeValidate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validator = function validator() {
    this.name = 'validator';
    this.locale = '';
    this.messages = {};
    this.rules = {};

    this.addRules = function (key, v) {
        this.rules[key] = v;
    };

    this.addLocalize = function (key, v) {
        this.messages[key] = v;
    };

    this.run = function (vue) {
        vue.use(_veeValidate2.default);
        //todo merge rules and localize
    };
};
exports.default = validator;