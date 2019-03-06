"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _default = {
  data: function data(vue) {
    var _this = this;

    var fieldsKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'dataForm';
    var viewKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'dataView';
    this.vueInstance = vue;
    this.mode = '';
    this.attribute = [];
    this.modeOmit = [];
    this.runTime = {};

    this.fill =
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(ds) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.vueInstance.$nextTick();

              case 2:
                Object.keys(_this.vueInstance[fieldsKey]).forEach(function (v) {
                  _this.vueInstance.$set(_this.vueInstance[fieldsKey], v, ds[v]);
                });
                return _context.abrupt("return", _this);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    this.change =
    /*#__PURE__*/
    function () {
      var _ref2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(mode) {
        var data,
            runTimeKey,
            filter,
            attrs,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                data = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                _context2.next = 3;
                return _this.vueInstance.$nextTick();

              case 3:
                _this.mode = mode;
                runTimeKey = 'is' + mode.substring(0, 1).toUpperCase() + mode.substring(1);
                Object.keys(_this.runTime).forEach(function (k) {
                  if (runTimeKey != k) {
                    _this.vueInstance.$set(_this.runTime, k, false);
                  }
                });

                _this.vueInstance.$set(_this.runTime, runTimeKey, true);
                /* 表单存储 */


                filter = _this.modeOmit[mode] !== undefined ? _this.modeOmit[mode] : [];
                attrs = _this.attribute.filter(function (v) {
                  return filter.indexOf(v) === -1;
                });
                attrs.forEach(function (v) {
                  _this.vueInstance.$set(_this.vueInstance[fieldsKey], v, data[v] !== undefined ? data[v] : '');
                });
                _context2.next = 12;
                return _this.vueInstance.$nextTick();

              case 12:
                /* 表单显示 */
                _this.vueInstance[viewKey] = {};
                Object.keys(_this.vueInstance[fieldsKey]).forEach(function (v) {
                  _this.vueInstance.$set(_this.vueInstance[viewKey], v, true);
                });
                return _context2.abrupt("return", _this);

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    this.changeSection = function () {};
  }
};
exports.default = _default;