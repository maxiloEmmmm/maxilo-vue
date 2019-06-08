"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _route = _interopRequireDefault(require("./libs/route"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var router = function router() {
  this.name = 'router';
  this.instance = null;
  this.middleware = new middleware();
  this.mode = 'history';

  this.getRoute = function () {
    if (!this.instance) {
      this.instance = new _route.default();
    }

    return this.instance;
  };

  this.getRoutes = function () {
    return this.instance.routes;
  };

  this.run = function (vue) {
    var _this = this;

    vue.use(_vueRouter.default);
    var r = new _vueRouter.default({
      mode: this.mode,
      base: __dirname,
      linkActiveClass: 'active',
      routes: this.instance ? this.instance.routes : []
    });
    r.beforeEach(
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(to, from, next) {
        var _context;

        var globalMs, ms, toMiddle, n, len, i, v, _r;

        return _regenerator.default.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                globalMs = _this.middleware.globalItems;
                ms = _this.app.utils._.merge({}, globalMs, _this.middleware.items);
                toMiddle = (0, _toConsumableArray2.default)((0, _keys.default)(globalMs));
                (0, _forEach.default)(_context = to.matched).call(_context, function (v) {
                  if (v.meta.middlewares && v.meta.middlewares != 0) {
                    toMiddle.push.apply(toMiddle, (0, _toConsumableArray2.default)(v.meta.middlewares));
                  }
                });
                n = true;
                len = toMiddle.length;

                if (!(len != 0)) {
                  _context2.next = 30;
                  break;
                }

                i = 0;

              case 8:
                if (!(i < len)) {
                  _context2.next = 27;
                  break;
                }

                v = toMiddle[i];

                if (!ms[v]) {
                  _context2.next = 24;
                  break;
                }

                _context2.prev = 11;
                _context2.next = 14;
                return ms[v](_this.app.store.instance, to, from, next);

              case 14:
                _r = _context2.sent;

                if (_r) {
                  _context2.next = 18;
                  break;
                }

                n = false;
                return _context2.abrupt("break", 27);

              case 18:
                _context2.next = 24;
                break;

              case 20:
                _context2.prev = 20;
                _context2.t0 = _context2["catch"](11);
                n = false;
                return _context2.abrupt("break", 27);

              case 24:
                i++;
                _context2.next = 8;
                break;

              case 27:
                n ? next() : '';
                _context2.next = 31;
                break;

              case 30:
                next();

              case 31:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee, null, [[11, 20]]);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }());
    return r;
  };
};

var middleware = function middleware() {
  this.items = {};
  this.globalItems = {};

  this.add = function (key, build) {
    if (this.items[key]) {
      console.log('[maxiloVue - router warning] middleware is overwrite: ' + key + '.');
    }

    this.items[key] = build;
  };

  this.addGlobal = function (key, build) {
    if (this.globalItems['global-' + key]) {
      console.log('[maxiloVue - router warning] middleware is overwrite: ' + key + '.');
    }

    this.globalItems['global-' + key] = build;
  };
};

var _default = router;
exports.default = _default;