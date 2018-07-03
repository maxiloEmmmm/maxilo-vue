'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _route = require('./libs/route');

var _route2 = _interopRequireDefault(_route);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = function router() {
    this.name = 'router';
    this.instance = null;
    this.middleware = new middleware();
    this.mode = 'history';

    this.getRoute = function () {
        if (!this.instance) {
            this.instance = new _route2.default();
        }

        return this.instance;
    };

    this.getRoutes = function () {
        return this.instance.routes;
    };

    this.run = function (vue) {
        var _this = this;

        vue.use(_vueRouter2.default);
        var r = new _vueRouter2.default({
            mode: this.mode,
            base: __dirname,
            linkActiveClass: 'active',
            routes: this.instance ? this.instance.routes : []
        });

        r.beforeEach(function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(to, from, next) {
                var globalMs, ms, toMiddle, n, len, i, v, _r;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                globalMs = _this.middleware.globalItems;
                                ms = _this.app.utils._.merge({}, globalMs, _this.middleware.items);
                                toMiddle = [].concat(_toConsumableArray(Object.keys(globalMs)));

                                to.matched.forEach(function (v) {
                                    if (v.meta.middlewares && v.meta.middlewares != 0) {
                                        toMiddle.push.apply(toMiddle, _toConsumableArray(v.meta.middlewares));
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
                                return _context.abrupt('break', 27);

                            case 18:
                                _context.next = 24;
                                break;

                            case 20:
                                _context.prev = 20;
                                _context.t0 = _context['catch'](11);

                                n = false;
                                return _context.abrupt('break', 27);

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
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this, [[11, 20]]);
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
exports.default = router;