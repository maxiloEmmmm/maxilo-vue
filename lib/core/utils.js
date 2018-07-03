'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('./utils/');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utils = function utils(modules) {
    var _this = this;

    this.name = 'utils';
    this.utilMap = _extends({}, _utils2.default);

    Object.keys(this.utilMap).forEach(function (v) {
        Object.defineProperty(_this, v, {
            get: function get() {
                return _this.utilMap[v];
            }
        });
    });

    this.add = function (namespace, func) {
        var _this2 = this;

        if (!this.app.utils._.isString(namespace) || namespace == '') {
            return;
        }

        var tmp = namespace.split('.');

        var native = ['add', 'utilMap', 'run', 'depNameSpace'];
        if (native.includes[tmp[0]]) {
            alert(native.join(',') + ' 均为utils根保留关键字, 添加被拒绝.');
            return;
        }

        if (tmp.length == 1 && !this.utilMap[tmp[0]]) {
            var k = tmp[0];
            this.utilMap[k] = func;
            Object.defineProperty(this, k, {
                get: function get() {
                    return _this2.utilMap[k];
                }
            });
            return;
        }
        this.depNameSpace(this.utilMap, tmp, func);
    };

    this.run = function (vue) {
        var _this3 = this;

        Object.defineProperty(vue.prototype, '$utils', {
            get: function get() {
                return _this3.utilMap;
            }
        });
    };

    this.depNameSpace = function (target, space, func) {
        var len = space.length;
        if (len === 1) {
            target[space[0]] = func;
        } else {
            if (!target[space[0]]) {
                target[space[0]] = {};
            }
            this.depNameSpace(target[space[0]], this.app.utils._.slice(space, 1, len), func);
        }
    };
};
exports.default = utils;