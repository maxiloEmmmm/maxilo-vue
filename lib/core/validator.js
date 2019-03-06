"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

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
      Object.keys(rs).forEach(function (i) {
        _this.addRuke(i, rs[i]);
      });
    } else if (this.app.utils.base.getType(mix) == 'Array') {
      rs.forEach(function (v) {
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
    var _this2 = this;

    Object.keys(this.rules).forEach(function (k) {
      return _veeValidate.Validator.extend(k, _this2.rules[k]);
    });
    Object.keys(this.messages).forEach(function (k) {
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