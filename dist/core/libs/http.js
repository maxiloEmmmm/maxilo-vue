'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.http = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _mLodash = require('libs/mLodash');

var _mLodash2 = _interopRequireDefault(_mLodash);

var _configs = require('configs');

var _helpers = require('libs/helpers');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _constants = require('libs/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create Axios
 */

var http = exports.http = _axios2.default.create({
    baseURL: _configs.configs.baseUrl
});

window.initManager = {};

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */
http.interceptors.request.use(function (request) {
    // let juid = store.getters[helpers.getSystemKey() + 'Auth/juid'];
    // if (request.method == 'post' && juid !== '') {
    //     if (request.data === undefined) {
    //         request.data = {};
    //     }
    //     request.data['juid'] = juid;
    // }
    return request;
}, function (err) {
    console.log('err: ', err);
});

http.interceptors.response.use(function (response) {
    return response;
}, function (err) {
    console.log('err: ', err);
});

var ie9 = navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE9.0";
if (ie9) {
    alert('请使用360浏览器的极速模式 或 谷歌浏览器 或 火狐浏览器.');
}
// let xhr = ie9 ? XDomainRequest :XMLHttpRequest ;
var xhr = XMLHttpRequest;

if (xhr) {

    var xhrOpen = xhr.prototype.open;
    xhr.prototype.open = function (method, url, asncFlag, user, password) {
        var _this = this;

        this.onload = function () {
            try {
                if (method == 'POST') {
                    var _nativeURL = _helpers.helpers.parseURL(this.responseURL);

                    //初始化系列
                    if (_nativeURL['__init_token']) {
                        var currentLocation = window.location.href;
                        //查找当前页面所有的等待请求
                        if (window.initManager[_nativeURL['__init_token']].modal) {
                            var child = document.getElementById(window.initManager[_nativeURL['__init_token']].modalTarget);
                            child.parentNode.removeChild(child);

                            (0, _keys2.default)(window.initManager).forEach(function (v, i) {
                                if (window.initManager[v].url == currentLocation) {
                                    window.initManager[v].modal = true;
                                }
                            });
                        }
                        delete window.initManager[_nativeURL['__init_token']];
                    }

                    var response = JSON.parse(this.response);
                    if (!response) {
                        throw 'parse err';
                    }
                }
            } catch (e) {
                // TODO: 狗经常注释掉的地方
                var key = _helpers.helpers.getSystemKey();
                _store2.default.dispatch(key + 'Auth/destory').then(function () {
                    window.location.href = '/' + key + '/login';
                });
            }
        };

        this.method = method;
        if (!/^http/.test(url)) {
            url = _configs.configs.baseUrl + url;
        }
        var nativeURL = _helpers.helpers.parseURL(url);
        if (!nativeURL['__init_token'] && (0, _keys2.default)(nativeURL).findIndex(function (v) {
            return (/init/.test(nativeURL[v])
            );
        }) !== -1) {
            var tmp = makeInitToken(url);
            url = tmp[0];
        }

        var params = _helpers.helpers.parseURL(url);
        if (this.method == 'POST') {
            setTimeout(function () {
                var q = '';
                if (params['__init_token'] && window.initManager[params['__init_token']]) {
                    var _tmp = window.initManager[params['__init_token']];
                    _this.abort();
                    swal('超时了');

                    (0, _keys2.default)(window.initManager).forEach(function (v, i) {
                        if (window.initManager[v].url == _tmp.url) {
                            window.initManager[v].modal = true;
                            var child = document.getElementById(window.initManager[v].modalTarget);
                            child.parentNode.removeChild(child);
                        }
                    });
                    delete window.initManager[params['__init_token']];
                }
            }, params['__init_timeout'] ? parseInt(params['__init_timeout']) : _constants.consts.REQUEST_TIME_OUT);
        }

        if (window.initManager[params['__init_token']] && (0, _keys2.default)(window.initManager).findIndex(function (v) {
            return v.modal;
        }) === -1) {
            window.initManager[params['__init_token']].modal = true;
            window.initManager[params['__init_token']].modalTarget = _helpers.helpers.makeModal(window.initManager[params['__init_token']].target, window.initManager[params['__init_token']].style ? window.initManager[params['__init_token']].style : 1);
        }
        xhrOpen.call(this, method, url, asncFlag, user, password);
    };

    var xhrSend = xhr.prototype.send;
    xhr.prototype.send = function (method, params, asncFlag, user, password) {
        var juid = _store2.default.getters[_helpers.helpers.getSystemKey() + 'Auth/juid'];
        try {
            if (this.method == 'POST' && juid !== '') {
                if (_mLodash2.default.isString(method)) {
                    this.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                }

                this.setRequestHeader('juid', juid);
            }
        } catch (e) {
            console.log(e);
            return;
        }
        xhrSend.call(this, method, params, asncFlag, user, password);
    };
}

// 等 Maxilo 实现，在提交请求的时候出现 waiting 提示。
http.wPost = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var param,
        _args = arguments;
    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    param = _args[2] ? _args[2] : { time: null, target: null, style: 1 };

                    param.style = 2;

                    if (!(_args.length == 1)) {
                        _context.next = 8;
                        break;
                    }

                    _context.next = 5;
                    return http.initPost(_args[0], {}, param);

                case 5:
                    _context.t0 = _context.sent;
                    _context.next = 11;
                    break;

                case 8:
                    _context.next = 10;
                    return http.initPost(_args[0], _args[1], param);

                case 10:
                    _context.t0 = _context.sent;

                case 11:
                    return _context.abrupt('return', _context.t0);

                case 12:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
}));

http.initPost = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var param,
        timeStr,
        _args2 = arguments;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    param = _args2[2] ? _args2[2] : { time: null, target: null, style: 1 };
                    timeStr = param.time ? (_args2[0].indexOf('?') === -1 ? '?' : '&') + '__init_timeout=' + parseInt(param.time) : '';

                    _args2[0] = makeInitToken(_args2[0] + timeStr, param.target, param.style)[0];
                    _context2.next = 5;
                    return http.post.apply(http, _args2);

                case 5:
                    return _context2.abrupt('return', _context2.sent);

                case 6:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _callee2, this);
}));

var makeInitToken = function makeInitToken(url, target, style) {
    console.log(url);
    var token = _helpers.helpers.random('initManage');
    var current = (0, _moment2.default)().format('X');
    window.initManager[token] = { time: current, url: window.location.href, modal: false, target: target, style: style };
    (0, _keys2.default)(window.initManager).forEach(function (v) {
        return current - window.initManager[v].time > _constants.consts.REQUEST_TIME_OUT ? delete window.initManager[v] : '';
    });
    return [url + (url.indexOf('?') === -1 ? '?' : '&' + '__init_token=' + token), token];
};

http.plugins = {
    resolve: function resolve(t) {
        return http.defaults.baseURL.replace(/\/$/, '') + t;
    }
};

var install = function install(Vue) {
    Object.defineProperty(Vue.prototype, '$http', {
        get: function get() {
            return http;
        }
    });
};

exports.default = { http: http, install: install };