'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.middleware = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

var _middleware = require('route/middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _helpers = require('libs/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middleware = exports.middleware = function middleware(router, middlewares) {
  router.beforeEach(bootstrap);
};

var bootstrap = function bootstrap(to, from, next) {
  var ms = _middleware2.default[_helpers.helpers.getSystemKey() + 'Middlewares'];
  var toMiddle = [];
  to.matched.forEach(function (v) {
    if (v.meta.middlewares && v.meta.middlewares != 0) {
      toMiddle.push.apply(toMiddle, (0, _toConsumableArray3.default)(v.meta.middlewares));
    }
  });

  var n = true;
  var len = toMiddle.length;
  if (len != 0) {
    for (var i = 0; i < len; i++) {
      var v = toMiddle[i];
      if (ms[v]) {
        if (!ms[v](_store2.default, to, from, next)) {
          n = false;
          break;
        }
      }
    }
    n ? next() : '';
  } else {
    next();
  }
};