"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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
      regeneratorRuntime.mark(function _callee(to, from, next) {
        var globalMs, ms, toMiddle, n, len, i, v, _r;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                globalMs = _this.middleware.globalItems;
                ms = _this.app.utils._.merge({}, globalMs, _this.middleware.items);
                toMiddle = (0, _toConsumableArray2.default)(Object.keys(globalMs));
                to.matched.forEach(function (v) {
                  if (v.meta.middlewares && v.meta.middlewares != 0) {
                    toMiddle.push.apply(toMiddle, (0, _toConsumableArray2.default)(v.meta.middlewares));
                  }
                });
                n = true;
                len = toMiddle.length;

                if (!(len != 0)) {
                  _context.next = 30;
                  break;
                }

                i = 0;

              case 8:
                if (!(i < len)) {
                  _context.next = 27;
                  break;
                }

                v = toMiddle[i];

                if (!ms[v]) {
                  _context.next = 24;
                  break;
                }

                _context.prev = 11;
                _context.next = 14;
                return ms[v](_this.app.store.instance, to, from, next);

              case 14:
                _r = _context.sent;

                if (_r) {
                  _context.next = 18;
                  break;
                }

                n = false;
                return _context.abrupt("break", 27);

              case 18:
                _context.next = 24;
                break;

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](11);
                n = false;
                return _context.abrupt("break", 27);

              case 24:
                i++;
                _context.next = 8;
                break;

              case 27:
                n ? next() : '';
                _context.next = 31;
                break;

              case 30:
                next();

              case 31:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[11, 20]]);
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