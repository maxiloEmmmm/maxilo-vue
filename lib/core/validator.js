"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _veeValidate = _interopRequireWildcard(require("vee-validate"));

var _validate = _interopRequireDefault(require("./mixs/validate"));

var validator = function validator() {
  this.name = 'validator';
  this.locale = 'en';
  this.messages = {};
  this.rules = {};

  this.addRule = function (key, v) {
    var focre = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (this.rules[key] && !focre) {
      console.log('[maxilo-vue validator warning]rules is exist: ' + key);
      return;
    } else {
      if (!v.validate) {
        console.log('[maxilo-vue validator warning]rule validate is not find: ' + key);
        return;
      }

      if (!v.getMessage) {
        v.getMessage = function (v, args) {
          return key + ' Error.';
        };
      }

      this.rules[key] = v;
    }
  };

  this.addRules = function (rs) {
    var _this = this;

    if (this.app.utils.base.getType(rs) == 'Object') {
      var _context;

      (0, _forEach.default)(_context = (0, _keys.default)(rs)).call(_context, function (i) {
        _this.addRuke(i, rs[i]);
      });
    } else if (this.app.utils.base.getType(mix) == 'Array') {
      (0, _forEach.default)(rs).call(rs, function (v) {
        if (v.ruleKey && v, ruleBuild) {
          _this.addRule(v.ruleKey, v.ruleBuild);
        }
      });
    }
  };

  this.addLocalize = function (key, v) {
    this.messages[key] = v;
  };

  this.addLocalizes = function (ls) {
    this.messages = this.app.utils._.merge(this.messages, ls);
  };

  this.run = function (vue) {
    var _context2,
        _this2 = this,
        _context3;

    (0, _forEach.default)(_context2 = (0, _keys.default)(this.rules)).call(_context2, function (k) {
      return _veeValidate.Validator.extend(k, _this2.rules[k]);
    });
    (0, _forEach.default)(_context3 = (0, _keys.default)(this.messages)).call(_context3, function (k) {
      return _veeValidate.Validator.localize(k, {
        name: k,
        messages: _this2.messages[k]
      });
    });

    _veeValidate.Validator.localize(this.app.config.locale);

    vue.use(_veeValidate.default);
    vue.mixin(_validate.default);
  };
};

var _default = validator;
exports.default = _default;