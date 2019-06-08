"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));

var _findIndex = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find-index"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _parseInt2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/parse-int"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _defineProperty = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _axios = _interopRequireDefault(require("axios"));

var _qs = _interopRequireDefault(require("qs"));

var _moment = _interopRequireDefault(require("moment"));

var http = function http() {
  var _this5 = this;

  this.name = 'http';
  this.instance = '';
  this.baseURL = null;
  this.xhr = '';
  this.adapter = {};
  this.request_time_out = 60000;
  this.initMethod = ['POST'];
  this.dueMethod = ['POST'];

  this.run = function (vue) {
    var _this2 = this;

    this.baseInit();
    this.ie9Init();
    this.xhrGlobalInit();
    (0, _defineProperty.default)(vue.prototype, '$http', {
      get: function get() {
        return _this2.instance;
      }
    });
  };

  this.baseInit = function () {
    var _context,
        _this3 = this;

    var _this = this;

    if (this.baseURL === null) {
      this.baseURL = this.app.config.baseURL;
    }

    this.instance = _axios.default.create({
      baseURL: this.baseURL
    });
    (0, _forEach.default)(_context = ['get', 'post']).call(_context, function (p) {
      var tmp = _this3.instance[p];
      _this3.instance[p] =
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        var response,
            _args = arguments;
        return _regenerator.default.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return tmp.apply(void 0, _args);

              case 2:
                response = _context2.sent;

                if (_this.adapter.dataAdapter) {
                  response = _this.adapter.dataAdapter(response);
                }

                return _context2.abrupt("return", response);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee);
      }));
    });
    window.initManager = {};
    this.instance.wPost =
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2() {
      var param,
          _args2 = arguments;
      return _regenerator.default.wrap(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              param = _args2[2] ? _args2[2] : {
                time: null,
                target: null,
                style: 1
              };
              param.style = 2;

              if (!(_args2.length == 1)) {
                _context3.next = 8;
                break;
              }

              _context3.next = 5;
              return _this.instance.initPost(_args2[0], {}, param);

            case 5:
              _context3.t0 = _context3.sent;
              _context3.next = 11;
              break;

            case 8:
              _context3.next = 10;
              return _this.instance.initPost(_args2[0], _args2[1], param);

            case 10:
              _context3.t0 = _context3.sent;

            case 11:
              return _context3.abrupt("return", _context3.t0);

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee2);
    }));
    this.instance.initPost =
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3() {
      var _context4, _this$instance;

      var param,
          timeStr,
          _args3 = arguments;
      return _regenerator.default.wrap(function _callee3$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              param = _args3[2] ? _args3[2] : {
                time: null,
                target: null,
                style: 1
              };
              timeStr = param.time ? ((0, _indexOf.default)(_context4 = _args3[0]).call(_context4, '?') === -1 ? '?' : '&') + '__init_timeout=' + (0, _parseInt2.default)(param.time) : '';
              _args3[0] = _this.makeInitToken(_args3[0] + timeStr, param.target, param.style)[0];
              _context5.next = 5;
              return (_this$instance = _this.instance).post.apply(_this$instance, _args3);

            case 5:
              return _context5.abrupt("return", _context5.sent);

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee3);
    }));
  };

  this.ie9Init = function () {
    var ie9 = navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE9.0";

    if (ie9) {
      alert('请使用360浏览器的极速模式 或 谷歌浏览器 或 火狐浏览器.');
    }
  };

  this.xhrSend = function () {
    var xhrSend = this.xhr.prototype.send;

    var _this = this;

    this.xhr.prototype.send = function (method, params, asncFlag, user, password) {
      if (_this.app.utils._.isString(method)) {
        this.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      }

      _this.requestFilter(this);

      xhrSend.call(this, method, params, asncFlag, user, password);
    };
  };

  this.xhrOpen = function () {
    var xhrOpen = this.xhr.prototype.open;

    var _this = this;

    this.xhr.prototype.open = function (method, url, asncFlag, user, password) {
      var _context8,
          _context9,
          _this4 = this,
          _context11;

      this.onload = function () {
        try {
          var _context6;

          if ((0, _includes.default)(_context6 = _this.initMethod).call(_context6, this.method)) {
            var _nativeURL = _this.app.utils.tool.parseURL(this.responseURL); //初始化系列


            if (_nativeURL['__init_token']) {
              var currentLocation = window.location.href; //查找当前页面所有的等待请求

              if (window.initManager[_nativeURL['__init_token']].modal) {
                var _context7;

                var child = document.getElementById(window.initManager[_nativeURL['__init_token']].modalTarget);
                child.parentNode.removeChild(child);
                (0, _forEach.default)(_context7 = (0, _keys.default)(window.initManager)).call(_context7, function (v, i) {
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
            } else {
              _this.responseFilter(this);
            }
          }
        } catch (e) {
          _this.responseException(e);
        }
      };

      this.method = method; //todo fix webpack hot update use relative path dont need to repair, ps: write list. 

      if (!/^http/.test(url) && !/hot-update\.json$/.test(url)) {
        url = _this.baseURL + url;
      }

      var nativeURL = _this.app.utils.tool.parseURL(url);

      if (!nativeURL['__init_token'] && (0, _findIndex.default)(_context8 = (0, _keys.default)(nativeURL)).call(_context8, function (v) {
        return /init/.test(nativeURL[v]);
      }) !== -1) {
        var tmp = _this.makeInitToken(url);

        url = tmp[0];
      }

      var params = _this.app.utils.tool.parseURL(url);

      if ((0, _includes.default)(_context9 = _this.initMethod).call(_context9, _this.method)) {
        (0, _setTimeout2.default)(function () {
          var q = '';

          if (params['__init_token'] && window.initManager[params['__init_token']]) {
            var _context10;

            var _tmp = window.initManager[params['__init_token']];

            _this4.abort();

            swal('超时了');
            (0, _forEach.default)(_context10 = (0, _keys.default)(window.initManager)).call(_context10, function (v, i) {
              if (window.initManager[v].url == _tmp.url) {
                window.initManager[v].modal = true;
                var child = document.getElementById(window.initManager[v].modalTarget);
                child.parentNode.removeChild(child);
              }
            });
            delete window.initManager[params['__init_token']];
          }
        }, params['__init_timeout'] ? (0, _parseInt2.default)(params['__init_timeout']) : _this.request_time_out);
      }

      if (window.initManager[params['__init_token']] && (0, _findIndex.default)(_context11 = (0, _keys.default)(window.initManager)).call(_context11, function (v) {
        return v.modal;
      }) === -1) {
        window.initManager[params['__init_token']].modal = true;
        window.initManager[params['__init_token']].modalTarget = _this.app.utils.tool.makeModal(window.initManager[params['__init_token']].target, window.initManager[params['__init_token']].style ? window.initManager[params['__init_token']].style : 1);
      }

      xhrOpen.call(this, method, url, asncFlag, user, password);
    };
  };

  this.makeInitToken = function (url, target, style) {
    var _context12;

    var token = _this5.app.utils.tool.random('initManage');

    var current = (0, _moment.default)().format('X');
    window.initManager[token] = {
      time: current,
      url: window.location.href,
      modal: false,
      target: target,
      style: style
    };
    (0, _forEach.default)(_context12 = (0, _keys.default)(window.initManager)).call(_context12, function (v) {
      return current - window.initManager[v].time > _this5.request_time_out ? delete window.initManager[v] : '';
    });
    return [url + ((0, _indexOf.default)(url).call(url, '?') === -1 ? '?' : '&' + '__init_token=' + token), token];
  };

  this.xhrGlobalInit = function () {
    this.xhr = XMLHttpRequest;

    if (this.xhr) {
      this.xhrOpen();
      this.xhrSend();
    } //TODO !if to due

  };

  this.responseException = function (e) {
    this.adapter.responseErrorException ? this.adapter.responseErrorException(e) : '';
  };

  this.requestFilter = function (a) {
    this.adapter.beforeRequest ? this.adapter.beforeRequest(a) : '';
  };

  this.responseFilter = function (a) {
    this.adapter.afterResponse ? this.adapter.afterResponse(a) : '';
  };
};

var _default = http;
exports.default = _default;