"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _application = _interopRequireDefault(require("./core/libs/application"));

var _index = _interopRequireDefault(require("./core/utils/index.js"));

var _router = _interopRequireDefault(require("./core/router"));

var _store = _interopRequireDefault(require("./core/store"));

var _i18n = _interopRequireDefault(require("./core/i18n"));

var _validator = _interopRequireDefault(require("./core/validator"));

var _http = _interopRequireDefault(require("./core/http"));

var _config = _interopRequireDefault(require("./core/config"));

var _utils = _interopRequireDefault(require("./core/utils.js"));

var _vue = _interopRequireDefault(require("./core/vue"));

var _alert = _interopRequireDefault(require("./core/alert"));

var maxiloVueModule = new _application.default();

try {
  maxiloVueModule.register(new _config.default());
  maxiloVueModule.register(new _utils.default());
  maxiloVueModule.register(new _store.default());
  maxiloVueModule.register(new _router.default());
  maxiloVueModule.register(new _i18n.default());
  maxiloVueModule.register(new _validator.default());
  maxiloVueModule.register(new _http.default());
  maxiloVueModule.register(new _alert.default());
  maxiloVueModule.register(new _vue.default());
} catch (error) {
  _index.default.system.notice(error);
}

var _default = function () {
  return maxiloVueModule;
}();

exports.default = _default;
