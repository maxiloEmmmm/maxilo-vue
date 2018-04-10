'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    isNotEmpty: function isNotEmpty(v) {
        return !this.isEmpty(v);
    },
    isEmpty: function isEmpty(v) {
        var type = _base2.default.getType(v);
        if (type === 'Number' || type === 'Function' || type === 'Boolean') {
            return false;
        } else if (type === 'String' && v.length != 0) {
            return false;
        } else if (type === 'Object') {
            return (0, _keys2.default)(v).length === 0;
        } else if (type === 'Set' || type === 'Map') {
            return v.size === 0;
        } else if (type === 'Array') {
            return v.length === 0;
        }
        //Null or Undefined
        return true;
    }
};