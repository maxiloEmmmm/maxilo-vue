'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storeKey = 'aVqsCo0US9hnP6W';

var config = function config() {
    var _this = this;

    this.name = 'config';
    this.cs = {
        storeKey: storeKey,
        debug: process.env.DEBUG ? true : false,
        lang: 'zh_cn',
        systemKey: 'platform',
        systemList: ['platform'],
        baseUrl: process.env.SERVER ? 'http://' + process.env.SERVER : 'http://localhost:13133'
    };

    (0, _keys2.default)(this.cs).forEach(function (v) {
        (0, _defineProperty2.default)(_this, v, {
            get: function get() {
                return this.cs[v];
            },
            set: function set(val) {
                this.cs[v] = val;
            }
        });
    });

    this.run = function (vue) {
        var _this2 = this;

        Object.defineProperty(vue.prototype, '$configs', {
            get: function get() {
                return _this2.cs;
            }
        });
    };
};

exports.default = config;