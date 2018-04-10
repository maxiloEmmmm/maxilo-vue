'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require('./utils/');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utils = function utils(modules) {
    var _this = this;

    this.name = 'utils';
    this.utilMap = (0, _extends3.default)({}, _utils2.default);

    (0, _keys2.default)(this.utilMap).forEach(function (v) {
        (0, _defineProperty2.default)(_this, v, {
            get: function get() {
                return _this.utilMap[v];
            }
        });
    });

    this.add = function (namespace, func) {
        var _this2 = this;

        if (this.app.utils._.isString(namespace) || namespace == '') {
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
            this.utilMap[k] = {};
            (0, _defineProperty2.default)(this, k, {
                get: function get() {
                    return _this2.utilMap[k];
                }
            });
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
            this.depNameSpace(target[space[0]], this.app.utils._.slice(space, 1, len), func);
        }
    };
};
exports.default = utils;