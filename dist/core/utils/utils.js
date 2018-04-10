'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var notice = exports.notice = function notice(msg) {
    var alert = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var __color_1 = 'background-image:-webkit-gradient( linear, left top, right top,font-weight:bold;-webkit-background-clip: text;font-size:5em;';
    var __color_2 = 'color:red';
    var __color_3 = 'color: green';
    console.group && console.group("需要注意的: ");
    console.log('| %c%s', alert ? __color_3 : __color_2, msg);
    console.group && console.groupEnd();
};

exports.default = {
    notice: notice
};