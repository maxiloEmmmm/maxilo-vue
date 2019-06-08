"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _isArray = _interopRequireDefault(require("lodash/isArray"));

var _slice = _interopRequireDefault(require("lodash/slice"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _pick = _interopRequireDefault(require("lodash/pick"));

var _omitBy = _interopRequireDefault(require("lodash/omitBy"));

var _pickBy = _interopRequireDefault(require("lodash/pickBy"));

var _merge = _interopRequireDefault(require("lodash/merge"));

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _isString = _interopRequireDefault(require("lodash/isString"));

var _isObject = _interopRequireDefault(require("lodash/isObject"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _upperFirst = _interopRequireDefault(require("lodash/upperFirst"));

//lang
//string
var _default = {
  isArray: _isArray.default,
  slice: _slice.default,
  omit: _omit.default,
  pick: _pick.default,
  omitBy: _omitBy.default,
  pickBy: _pickBy.default,
  merge: _merge.default,
  cloneDeep: _cloneDeep.default,
  //lang
  isString: _isString.default,
  isObject: _isObject.default,
  isEmpty: _isEmpty.default,
  //string
  upperFirst: _upperFirst.default
};
exports.default = _default;