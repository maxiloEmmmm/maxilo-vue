'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _slice = require('lodash/slice');

var _slice2 = _interopRequireDefault(_slice);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _pick = require('lodash/pick');

var _pick2 = _interopRequireDefault(_pick);

var _omitBy = require('lodash/omitBy');

var _omitBy2 = _interopRequireDefault(_omitBy);

var _pickBy = require('lodash/pickBy');

var _pickBy2 = _interopRequireDefault(_pickBy);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _upperFirst = require('lodash/upperFirst');

var _upperFirst2 = _interopRequireDefault(_upperFirst);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//lang
exports.default = {
    isArray: _isArray2.default,
    slice: _slice2.default,

    omit: _omit2.default,
    pick: _pick2.default,
    omitBy: _omitBy2.default,
    pickBy: _pickBy2.default,
    merge: _merge2.default,
    cloneDeep: _cloneDeep2.default,

    //lang
    isString: _isString2.default,
    isObject: _isObject2.default,
    isEmpty: _isEmpty2.default,

    //string
    upperFirst: _upperFirst2.default
};

//string