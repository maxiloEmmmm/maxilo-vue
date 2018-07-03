'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = require('../utils/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = function config() {
    var _this = this;

    this.name = 'config';
    this.cs = {
        debug: _index2.default.base.env(process.env.DEBUG, true),
        locale: _index2.default.base.env(process.env.LANG, 'zh_cn'),
        baseURL: _index2.default.base.env(process.env.SERVER, 'server'),
        storeKey: 'fuf8u18uhf1huif13uhif2'
    };

    Object.keys(this.cs).forEach(function (v) {
        Object.defineProperty(_this, v, {
            get: function get() {
                return this.cs[v];
            },
            set: function set(val) {
                this.cs[v] = val;
            }
        });
    });

    this.add = function (key, v) {
        if (this.cs[key] === undefined) {
            Object.defineProperty(this, key, {
                get: function get() {
                    return v;
                },
                set: function set(val) {
                    this.cs[key] = v;
                }
            });
        }

        this.cs[key] = v;
    };

    this.merge = function (obj) {
        var _this2 = this;

        Object.keys(obj).forEach(function (v) {
            if (!_this2.cs[v]) {
                _this2.add(v, obj[v]);
            } else {
                _this2.cs[v] = obj[v];
            }
        });
    };

    this.run = function (vue) {
        var _this3 = this;

        Object.defineProperty(vue.prototype, '$configs', {
            get: function get() {
                return _this3.cs;
            }
        });
    };
};

exports.default = config;