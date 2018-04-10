'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

exports.default = function () {
    this.modules = {};
    this.targetComponent = false;

    /* singleton */
    this.register = function (module) {
        var name = '';
        if (!module.name) {
            _utils2.default.system.notice('[maxilo-vue] module name is not define, will use object prototype constructor name.');
            name = module.constructor.name;
        } else {
            name = module.name;
        }

        if (this.modules.hasOwnProperty(name)) {
            _utils2.default.system.notice('[maxilo-vue warning] module - ' + name + ' is already exist, will replace old.');
        }

        module.app = this;
        this.modules[name] = module;
        (0, _defineProperty2.default)(this, name, {
            get: function get() {
                return this.modules[name];
            }
        });
    };

    this.run = function () {
        var _this = this;

        var moduleInstance = {};
        (0, _keys2.default)(this.modules).map(function (v) {
            return moduleInstance[v] = _this.modules[v].run(_vue2.default);
        });

        var app = new _vue2.default((0, _extends3.default)({}, moduleInstance, {
            render: this.targetComponent ? function (h) {
                return h(_this.targetComponent);
            } : function (h) {
                return h('div', [h('router-view')]);
            }
        })).$mount('#app');
    };
};

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _isObject = require('lodash/isObject');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;