"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _component = _interopRequireDefault(require("./mixs/component"));

var vue = function vue() {
  this.name = 'vue';
  this.instance = null;
  this.components = {};
  this.uses = [];
  this.errorHandler = false;
  this.warnHandler = false;

  this.component = function (name, component) {
    if (!this.app.utils._.isString(name) || name == '') {
      if (this.app.utils.base.getType(name) == 'Object' && name.name) {
        name = name.name;
      } else {
        return;
      }
    }

    this.components[name] = component;
  };

  this.depComponent = function (mix) {
    var _this = this;

    if (this.app.utils.base.getType(mix) == 'Object') {
      var _context;

      if (mix.__file || mix._compiled || mix.functional || mix._scopeId) {
        this.component(mix.name, mix);
        return;
      }

      (0, _forEach.default)(_context = (0, _keys.default)(mix)).call(_context, function (i) {
        if (_this.app.utils.base.getType(mix[i]) == 'Object') {
          if (mix[i].__file || mix[i]._compiled || mix[i].functional || mix[i]._scopeId) {
            _this.component(i, mix[i]);
          } else {
            _this.depComponent(mix[i]);
          }
        } else if (_this.app.utils.base.getType(mix[i]) == 'Array') {
          _this.depComponent(mix[i]);
        }
      });
    } else if (this.app.utils.base.getType(mix) == 'Array') {
      (0, _forEach.default)(mix).call(mix, function (v) {
        return _this.depComponent(v);
      });
    }
  };

  this.use = function (t, param) {
    this.uses.push([t, param]);
  };

  this.run = function (vue) {
    var _context2,
        _this2 = this,
        _context3;

    this.instance = vue;

    if (this.app.config.debug && this.errorHandler) {
      vue.config.errorHandler = this.errorHandler;
    }

    if (this.app.config.debug && this.warnHandler) {
      vue.config.warnHandler = this.warnHandler;
    }

    vue.config.performance = this.app.config.debug;
    vue.config.devtools = this.app.config.debug;
    (0, _forEach.default)(_context2 = (0, _keys.default)(this.components)).call(_context2, function (i) {
      return vue.component(i, _this2.components[i]);
    });
    (0, _forEach.default)(_context3 = this.uses).call(_context3, function (v) {
      return vue.use(v[0], v[1]);
    });
    vue.mixin(_component.default);
  };
};

var _default = vue;
exports.default = _default;