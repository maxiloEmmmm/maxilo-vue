'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.middleware = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

var _middleware = require('route/middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _helpers = require('libs/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var middleware = exports.middleware = function middleware(router, middlewares) {
	router.beforeEach(bootstrap);
};

var bootstrap = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(to, from, next) {
		var ms, toMiddle, n, len, i, v, r;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						ms = _middleware2.default[_helpers.helpers.getSystemKey() + 'Middlewares'];
						toMiddle = [];

						to.matched.forEach(function (v) {
							if (v.meta.middlewares && v.meta.middlewares != 0) {
								toMiddle.push.apply(toMiddle, _toConsumableArray(v.meta.middlewares));
							}
						});

						n = true;
						len = toMiddle.length;

						if (!(len != 0)) {
							_context.next = 29;
							break;
						}

						i = 0;

					case 7:
						if (!(i < len)) {
							_context.next = 26;
							break;
						}

						v = toMiddle[i];

						if (!ms[v]) {
							_context.next = 23;
							break;
						}

						_context.prev = 10;
						_context.next = 13;
						return ms[v](_store2.default, to, from, next);

					case 13:
						r = _context.sent;

						if (r) {
							_context.next = 17;
							break;
						}

						n = false;
						return _context.abrupt('break', 26);

					case 17:
						_context.next = 23;
						break;

					case 19:
						_context.prev = 19;
						_context.t0 = _context['catch'](10);

						n = false;
						return _context.abrupt('break', 26);

					case 23:
						i++;
						_context.next = 7;
						break;

					case 26:
						n ? next() : '';
						_context.next = 30;
						break;

					case 29:
						next();
					case 30:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this, [[10, 19]]);
	}));

	return function bootstrap(_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	};
}();