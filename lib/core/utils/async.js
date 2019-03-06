"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _diy = _interopRequireDefault(require("./diy"));

var _default = {
  normalNotice: function () {
    var _normalNotice = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(ds) {
      var s,
          sMsg,
          _args = arguments;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              s = _args.length > 1 && _args[1] !== undefined ? _args[1] : 0;
              sMsg = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};

              if (!(ds.status === s)) {
                _context.next = 7;
                break;
              }

              _context.next = 5;
              return this.app.alert.base({
                type: 'success',
                title: '操作成功'
              });

            case 5:
              _context.next = 14;
              break;

            case 7:
              if (!(ds.status === 600)) {
                _context.next = 12;
                break;
              }

              _context.next = 10;
              return this.app.alert.base({
                type: 'warning',
                title: '信息有误!',
                text: this.$utils.lumen.validateErr(ds.err),
                time: 1000,
                html: true
              });

            case 10:
              _context.next = 14;
              break;

            case 12:
              _context.next = 14;
              return this.app.alert.base({
                type: 'warning',
                title: sMsg[ds.status] !== undefined ? sMsg[ds.status] : '操作失败'
              });

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function normalNotice(_x) {
      return _normalNotice.apply(this, arguments);
    };
  }()
};
exports.default = _default;