'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var http = function http() {
    this.name = 'http';
    this.instance = '';
    this.baseURL = '';
    this.xhr = '';
    this.adapter = {};

    this.initMethod = ['POST'];
    this.dueMethod = ['POST'];

    this.run = function (vue) {
        var _this2 = this;

        this.baseInit();
        this.ie9Init();
        Object.defineProperty(vue.prototype, '$http', {
            get: function get() {
                return _this2.instance;
            }
        });
    };

    this.baseInit = function () {
        this.instance = _axios2.default.create({
            baseURL: this.baseURL
        });

        window.initManager = {};

        var _this = this;
        this.instance.wPost = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
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
                            return _this.instance.initPost(_args[0], {}, param);

                        case 5:
                            _context.t0 = _context.sent;
                            _context.next = 11;
                            break;

                        case 8:
                            _context.next = 10;
                            return _this.instance.initPost(_args[0], _args[1], param);

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

        this.instance.initPost = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            var _this$instance;

            var param,
                timeStr,
                _args2 = arguments;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            param = _args2[2] ? _args2[2] : { time: null, target: null, style: 1 };
                            timeStr = param.time ? (_args2[0].indexOf('?') === -1 ? '?' : '&') + '__init_timeout=' + parseInt(param.time) : '';

                            _args2[0] = _this.makeInitToken(_args2[0] + timeStr, param.target, param.style)[0];
                            _context2.next = 5;
                            return (_this$instance = _this.instance).post.apply(_this$instance, _args2);

                        case 5:
                            return _context2.abrupt('return', _context2.sent);

                        case 6:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));
    };

    this.ie9Init = function () {
        var ie9 = navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE9.0";
        if (ie9) {
            alert('请使用360浏览器的极速模式 或 谷歌浏览器 或 火狐浏览器.');
        }
    };

    this.xhrOpen = function () {
        var xhrOpen = this.xhr.prototype.open;
        xhr.prototype.open = function (method, params, asncFlag, user, password) {
            if (this.app.utils._.isString(method)) {
                this.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            }
            xhrOpen.call(this, method, url, asncFlag, user, password);
        };
    };

    this.xhrSend = function () {
        var xhrSend = this.xhr.prototype.send;
        _this = this;

        this.xhr.prototype.send = function (method, url, asncFlag, user, password) {
            var _this3 = this;

            this.onload = function () {
                try {
                    if (this.initMethod.includes(this.method)) {
                        var _nativeURL = this.app.utils.normal.parseURL(this.responseURL);

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
                    this.responseException(e);
                }
            };

            this.method = method;
            if (!/^http/.test(url)) {
                url = this.baseURL + url;
            }
            var nativeURL = this.app.utils.normal.parseURL(url);
            if (!nativeURL['__init_token'] && (0, _keys2.default)(nativeURL).findIndex(function (v) {
                return (/init/.test(nativeURL[v])
                );
            }) !== -1) {
                var tmp = _this.makeInitToken(url);
                url = tmp[0];
            }

            var params = this.app.utils.normal.parseURL(url);
            if (this.initMethod.includes(this.method)) {
                setTimeout(function () {
                    var q = '';
                    if (params['__init_token'] && window.initManager[params['__init_token']]) {
                        var _tmp = window.initManager[params['__init_token']];
                        _this3.abort();
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
                }, params['__init_timeout'] ? parseInt(params['__init_timeout']) : consts.REQUEST_TIME_OUT);
            }

            if (window.initManager[params['__init_token']] && (0, _keys2.default)(window.initManager).findIndex(function (v) {
                return v.modal;
            }) === -1) {
                window.initManager[params['__init_token']].modal = true;
                window.initManager[params['__init_token']].modalTarget = this.app.utils.normal.makeModal(window.initManager[params['__init_token']].target, window.initManager[params['__init_token']].style ? window.initManager[params['__init_token']].style : 1);
            }
            xhrSend.call(this, method, params, asncFlag, user, password);
        };
    };

    this.makeInitToken = function (url, target, style) {
        var token = utils.normal.random('initManage');
        var current = (0, _moment2.default)().format('X');
        window.initManager[token] = { time: current, url: window.location.href, modal: false, target: target, style: style };
        (0, _keys2.default)(window.initManager).forEach(function (v) {
            return current - window.initManager[v].time > consts.REQUEST_TIME_OUT ? delete window.initManager[v] : '';
        });
        return [url + (url.indexOf('?') === -1 ? '?' : '&' + '__init_token=' + token), token];
    };

    this.xhrGlobalInit = function () {
        this.xhr = XMLHttpRequest;

        if (this.xhr) {
            this.xhrOpen();
            this.xhrSend();
        }
        //TODO !if to due
    };

    this.responseException = function (e) {
        this.adapter.responseErrorException ? this.adapter.responseErrorException(e) : console.log(e);
    };
};

exports.default = http;