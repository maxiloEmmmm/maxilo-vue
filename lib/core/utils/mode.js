"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

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
      _regenerator.default.mark(function _callee(ds) {
        var _context;

        return _regenerator.default.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this.vueInstance.$nextTick();

              case 2:
                (0, _forEach.default)(_context = (0, _keys.default)(_this.vueInstance[fieldsKey])).call(_context, function (v) {
                  _this.vueInstance.$set(_this.vueInstance[fieldsKey], v, ds[v]);
                });
                return _context2.abrupt("return", _this);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee);
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
      _regenerator.default.mark(function _callee2(mode) {
        var _context3, _context4, _context5;

        var data,
            runTimeKey,
            filter,
            attrs,
            _args2 = arguments;
        return _regenerator.default.wrap(function _callee2$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                data = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                _context6.next = 3;
                return _this.vueInstance.$nextTick();

              case 3:
                _this.mode = mode;
                runTimeKey = 'is' + mode.substring(0, 1).toUpperCase() + mode.substring(1);
                (0, _forEach.default)(_context3 = (0, _keys.default)(_this.runTime)).call(_context3, function (k) {
                  if (runTimeKey != k) {
                    _this.vueInstance.$set(_this.runTime, k, false);
                  }
                });

                _this.vueInstance.$set(_this.runTime, runTimeKey, true);
                /* 表单存储 */


                filter = _this.modeOmit[mode] !== undefined ? _this.modeOmit[mode] : [];
                attrs = (0, _filter.default)(_context4 = _this.attribute).call(_context4, function (v) {
                  return (0, _indexOf.default)(filter).call(filter, v) === -1;
                });
                (0, _forEach.default)(attrs).call(attrs, function (v) {
                  _this.vueInstance.$set(_this.vueInstance[fieldsKey], v, data.hasOwnProperty(v) ? data[v] : '');
                });
                _context6.next = 12;
                return _this.vueInstance.$nextTick();

              case 12:
                /* 表单显示 */
                _this.vueInstance[viewKey] = {};
                (0, _forEach.default)(_context5 = (0, _keys.default)(_this.vueInstance[fieldsKey])).call(_context5, function (v) {
                  _this.vueInstance.$set(_this.vueInstance[viewKey], v, true);
                });
                return _context6.abrupt("return", _this);

              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    this.changeSection = function () {};
  }
};
exports.default = _default;