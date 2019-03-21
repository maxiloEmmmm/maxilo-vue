"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.find-index");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _default = {
  methods: {
    areaValidate: function () {
      var _areaValidate = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(target) {
        var _this = this;

        var keys,
            child,
            len,
            result,
            _loop,
            i,
            _ret,
            _args2 = arguments;

        return _regenerator.default.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                keys = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : [];
                child = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : false;
                child = child ? child : target.$children;
                len = child.length;
                result = true;
                _loop =
                /*#__PURE__*/
                _regenerator.default.mark(function _loop(i) {
                  var sr;
                  return _regenerator.default.wrap(function _loop$(_context) {
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
                          if (!(child[i].$validator === undefined)) {
                            _context.next = 6;
                            break;
                          }

                          _context.t0 = true;
                          _context.next = 9;
                          break;

                        case 6:
                          _context.next = 8;
                          return child[i].$validator.validateAll();

                        case 8:
                          _context.t0 = _context.sent;

                        case 9:
                          sr = _context.t0;

                          if (!sr) {
                            _context.next = 18;
                            break;
                          }

                          if (!(child[i].$children.length != 0)) {
                            _context.next = 16;
                            break;
                          }

                          _context.next = 14;
                          return _this.areaValidate(null, keys, child[i].$children);

                        case 14:
                          if (_context.sent) {
                            _context.next = 16;
                            break;
                          }

                          result = false;

                        case 16:
                          _context.next = 19;
                          break;

                        case 18:
                          result = false;

                        case 19:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _loop);
                });
                i = 0;

              case 7:
                if (!(i < len)) {
                  _context2.next = 15;
                  break;
                }

                return _context2.delegateYield(_loop(i), "t0", 9);

              case 9:
                _ret = _context2.t0;

                if (!(_ret === "continue")) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt("continue", 12);

              case 12:
                i++;
                _context2.next = 7;
                break;

              case 15:
                return _context2.abrupt("return", result);

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee);
      }));

      function areaValidate(_x) {
        return _areaValidate.apply(this, arguments);
      }

      return areaValidate;
    }(),
    clearTipValidate: function () {
      var _clearTipValidate = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(target) {
        var child,
            len,
            i,
            _args3 = arguments;
        return _regenerator.default.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                child = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : false;
                child = child ? child : target.$children;
                len = child.length;
                i = 0;

              case 4:
                if (!(i < len)) {
                  _context3.next = 14;
                  break;
                }

                if (!(child[i].$validator !== undefined)) {
                  _context3.next = 8;
                  break;
                }

                _context3.next = 8;
                return child[i].$validator.reset();

              case 8:
                if (!(child[i].$children.length != 0)) {
                  _context3.next = 11;
                  break;
                }

                _context3.next = 11;
                return this.clearTipValidate(null, child[i].$children);

              case 11:
                i++;
                _context3.next = 4;
                break;

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee2, this);
      }));

      function clearTipValidate(_x2) {
        return _clearTipValidate.apply(this, arguments);
      }

      return clearTipValidate;
    }()
  }
};
exports.default = _default;