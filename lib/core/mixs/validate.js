"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
    methods: {
        areaValidate: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(target) {
                var _this = this;

                var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
                var child = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

                var len, result, _loop, i, _ret;

                return _regenerator2.default.wrap(function _callee$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                child = child ? child : target.$children;

                                len = child.length;
                                result = true;
                                _loop = /*#__PURE__*/_regenerator2.default.mark(function _loop(i) {
                                    var sr;
                                    return _regenerator2.default.wrap(function _loop$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    if (!(keys.findIndex(function (q) {
                                                        return q._uid == child[i]._uid;
                                                    }) != -1)) {
                                                        _context.next = 2;
                                                        break;
                                                    }

                                                    return _context.abrupt("return", "continue");

                                                case 2:
                                                    _context.next = 4;
                                                    return child[i].$validator.validateAll();

                                                case 4:
                                                    sr = _context.sent;

                                                    if (!sr) {
                                                        _context.next = 13;
                                                        break;
                                                    }

                                                    if (!(child[i].$children.length != 0)) {
                                                        _context.next = 11;
                                                        break;
                                                    }

                                                    _context.next = 9;
                                                    return _this.areaValidate(null, keys, child[i].$children);

                                                case 9:
                                                    if (_context.sent) {
                                                        _context.next = 11;
                                                        break;
                                                    }

                                                    result = false;

                                                case 11:
                                                    _context.next = 14;
                                                    break;

                                                case 13:
                                                    result = false;

                                                case 14:
                                                case "end":
                                                    return _context.stop();
                                            }
                                        }
                                    }, _loop, _this);
                                });
                                i = 0;

                            case 5:
                                if (!(i < len)) {
                                    _context2.next = 13;
                                    break;
                                }

                                return _context2.delegateYield(_loop(i), "t0", 7);

                            case 7:
                                _ret = _context2.t0;

                                if (!(_ret === "continue")) {
                                    _context2.next = 10;
                                    break;
                                }

                                return _context2.abrupt("continue", 10);

                            case 10:
                                i++;
                                _context2.next = 5;
                                break;

                            case 13:
                                return _context2.abrupt("return", result);

                            case 14:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee, this);
            }));

            function areaValidate(_x3) {
                return _ref.apply(this, arguments);
            }

            return areaValidate;
        }(),
        clearTipValidate: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(target) {
                var child = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
                var len, i;
                return _regenerator2.default.wrap(function _callee2$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                child = child ? child : target.$children;

                                len = child.length;
                                i = 0;

                            case 3:
                                if (!(i < len)) {
                                    _context3.next = 12;
                                    break;
                                }

                                _context3.next = 6;
                                return child[i].$validator.reset();

                            case 6:
                                if (!(child[i].$children.length != 0)) {
                                    _context3.next = 9;
                                    break;
                                }

                                _context3.next = 9;
                                return this.clearTipValidate(null, child[i].$children);

                            case 9:
                                i++;
                                _context3.next = 3;
                                break;

                            case 12:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function clearTipValidate(_x5) {
                return _ref2.apply(this, arguments);
            }

            return clearTipValidate;
        }()
    }
};