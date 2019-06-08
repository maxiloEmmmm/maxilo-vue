"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _sort = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/sort"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _mock = _interopRequireDefault(require("./mock.js"));

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var mockService = function mockService() {
  this.mock = _mock.default.mock;
  this.random = _mock.default.Random;
  this.urls = [];
  this.host = '';

  this.resolve = function (url, build) {
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'get';
    var title = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '这是什么呢';
    var reg = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    this.urls.push({
      url: url,
      build: build,
      type: type,
      title: title,
      reg: reg
    });
  };

  this.resolveREG = function (url, res) {
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'get';
    var title = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '这是什么呢';
    this.resolve(url, res, type, title, true);
  };

  this.resolveHelper = {
    page: function page(base) {
      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'page';
      this.resolveREG(base, ((0, _indexOf.default)(base).call(base, '?') === -1 ? '(\\?' : '(&') + key + '=[0-9]+)*');
    }
  };

  this.resolveRap = function (resource) {
    var _this = this;

    var modules = resource.modules;

    if (!modules) {
      console.log('rap data is not isinvalid');
      return;
    }

    var tmpSort = function tmpSort(a, b) {
      return a.priority < b.priority;
    };

    var depPropertie = function depPropertie(ds) {
      var pid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      var items = {};
      (0, _forEach.default)(ds).call(ds, function (v, k) {
        var key = v.name;

        if (v.parentId == pid) {
          var isO = v.type == 'Object';

          if (isO || v.type == 'Array') {
            var _context;

            var tmp = depPropertie((0, _sort.default)(_context = (0, _cloneDeep.default)(ds)).call(_context, tmpSort), v.id);
            var objKey = key + (v.rule ? '|' + v.rule : '');
            items[objKey] = isO ? {} : [{}];

            if (isO) {
              items[objKey] = tmp;
            } else {
              items[objKey][0] = tmp;
            }
          } else {
            switch (v.type) {
              case 'Number':
                {
                  v.value = Number(v.value);
                }
                break;

              case 'Boolean':
                {
                  if (v.value == "true") {
                    v.value = true;
                  } else if (v.value == "false") {
                    v.value = false;
                  } else {
                    v.value = !!v.value;
                  }
                }
                break;
            }

            items[v.name + (v.rule ? '|' + v.rule : '')] = v.value;
          }
        }
      });
      return items;
    };

    (0, _forEach.default)(modules).call(modules, function (v) {
      var _context2;

      (0, _forEach.default)(_context2 = v.interfaces).call(_context2, function ($v) {
        var _context3;

        _this.resolve(/^reg:/.test($v.url) ? $v.url.match(new RegExp('^reg:(.*?)$'))[1] : $v.url, depPropertie((0, _filter.default)(_context3 = $v.properties).call(_context3, function (v) {
          return v.scope == 'response';
        })), $v.method, '[' + v.name + ' - ' + $v.name + ']');
      });
    });
  };

  this.make = function () {
    var _context4,
        _context5,
        _this2 = this;

    var host = /\/$/.test(this.host) ? (0, _slice.default)(_context4 = this.host).call(_context4, 0, -1) : this.host;
    (0, _forEach.default)(_context5 = this.urls).call(_context5, function (v) {
      var url = v.url;
      var hasEnd = /^\//.test(url) || /\/$/.test(host);
      var type = v.type.toLowerCase();
      url = host + (hasEnd ? '' : '/') + url;

      _this2.mock(v.reg ? new RegExp(url + '(\\?.*?)?$', 'g') : url, type, v.build, v.title);
    });
  };

  this.run = function () {
    this.make();
  };
};

var _default = mockService;
exports.default = _default;