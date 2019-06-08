"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _default = {
  methods: {
    resetComponent: function () {
      var _resetComponent = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(target) {
        var child,
            len,
            i,
            _args = arguments;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                child = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
                child = child ? child : target.$children;
                len = child.length;
                i = 0;

              case 4:
                if (!(i < len)) {
                  _context.next = 13;
                  break;
                }

                if (!child[i].reset) {
                  _context.next = 8;
                  break;
                }

                _context.next = 8;
                return child[i].reset();

              case 8:
                if (child[i].$validator !== undefined) {
                  child[i].$validator.reset();
                }

                if (child[i].$children.length != 0) {
                  this.resetComponent(null, child[i].$children);
                }

              case 10:
                i++;
                _context.next = 4;
                break;

              case 13:
                _context.next = 15;
                return this.$nextTick();

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function resetComponent(_x) {
        return _resetComponent.apply(this, arguments);
      }

      return resetComponent;
    }()
  }
};
exports.default = _default;