"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.function.name");

require("core-js/modules/web.dom.iterable");

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
      this.resolveREG(base, (base.indexOf('?') === -1 ? '(\\?' : '(&') + key + '=[0-9]+)*');
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
      ds.forEach(function (v, k) {
        var key = v.name;

        if (v.parentId == pid) {
          var isO = v.type == 'Object';

          if (isO || v.type == 'Array') {
            var tmp = depPropertie((0, _cloneDeep.default)(ds).sort(tmpSort), v.id);
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

    modules.forEach(function (v) {
      v.interfaces.forEach(function ($v) {
        _this.resolve(/^reg:/.test($v.url) ? $v.url.match(new RegExp('^reg:(.*?)$'))[1] : $v.url, depPropertie($v.properties.filter(function (v) {
          return v.scope == 'response';
        })), $v.method, '[' + v.name + ' - ' + $v.name + ']');
      });
    });
  };

  this.make = function () {
    var _this2 = this;

    var host = /\/$/.test(this.host) ? this.host.slice(0, -1) : this.host;
    this.urls.forEach(function (v) {
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