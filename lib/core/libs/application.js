"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = _default;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectSpread"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _defineProperty = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _index = _interopRequireDefault(require("../utils/index.js"));

var _vue = _interopRequireDefault(require("vue"));

function _default() {
  this.modules = {};
  this.targetComponent = false;
  this.vueFactory = _vue.default;
  this.instance = null;
  /* singleton */

  this.register = function (module) {
    var name = '';

    if (!module.name) {
      _index.default.system.notice('[maxilo-vue] module name is not define, will use object prototype constructor name.');

      name = module.constructor.name;
    } else {
      name = module.name;
    }

    if (this.modules.hasOwnProperty(name)) {
      _index.default.system.notice('[maxilo-vue warning] module - ' + name + ' is already exist, will replace old.');
    }

    module.app = this;
    this.modules[name] = module;
    (0, _defineProperty.default)(this, name, {
      get: function get() {
        return this.modules[name];
      }
    });
  };

  this.run =
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var _this = this;

    var moduleInstance, moduleKey, moduleKeyLen, i;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            moduleInstance = {};
            moduleKey = (0, _keys.default)(this.modules);
            moduleKeyLen = moduleKey.length;
            i = 0;

          case 4:
            if (!(i < moduleKeyLen)) {
              _context.next = 11;
              break;
            }

            _context.next = 7;
            return this.modules[moduleKey[i]].run(_vue.default);

          case 7:
            moduleInstance[moduleKey[i]] = _context.sent;

          case 8:
            i++;
            _context.next = 4;
            break;

          case 11:
            this.instance = new _vue.default((0, _objectSpread2.default)({}, moduleInstance, {
              render: this.targetComponent ? function (h) {
                return h(_this.targetComponent);
              } : function (h) {
                return h('div', [h('router-view')]);
              }
            })).$mount('#app');

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
}

;