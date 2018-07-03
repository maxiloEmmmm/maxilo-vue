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
        resetComponent: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(target) {
                var child = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
                var len, i;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                child = child ? child : target.$children;

                                len = child.length;
                                i = 0;

                            case 3:
                                if (!(i < len)) {
                                    _context.next = 12;
                                    break;
                                }

                                if (!child[i].reset) {
                                    _context.next = 7;
                                    break;
                                }

                                _context.next = 7;
                                return child[i].reset();

                            case 7:
                                child[i].$validator.reset();

                                if (child[i].$children.length != 0) {
                                    this.resetComponent(null, child[i].$children);
                                }

                            case 9:
                                i++;
                                _context.next = 3;
                                break;

                            case 12:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function resetComponent(_x2) {
                return _ref.apply(this, arguments);
            }

            return resetComponent;
        }()
    }
};