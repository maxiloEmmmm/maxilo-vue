'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
    this.modules = {};
    this.targetComponent = false;
    this.vueFactory = _vue2.default;

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
        Object.defineProperty(this, name, {
            get: function get() {
                return this.modules[name];
            }
        });
    };

    this.run = function () {
        var _this = this;

        var moduleInstance = {};
        Object.keys(this.modules).map(function (v) {
            return moduleInstance[v] = _this.modules[v].run(_vue2.default);
        });

        var app = new _vue2.default(_extends({}, moduleInstance, {
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;