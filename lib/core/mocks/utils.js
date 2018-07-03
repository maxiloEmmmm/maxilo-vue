'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mock = require('./mock');

var _mock2 = _interopRequireDefault(_mock);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mockService = function mockService() {
	this.mock = _mock2.default.mock;
	this.random = _mock2.default.Random;

	this.urls = [];
	this.host = '';

	this.resolve = function (url, build) {
		var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'get';
		var title = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '这是什么呢';

		this.urls.push({
			url: url,
			build: build,
			type: type,
			title: title
		});
	};

	this.resolveREG = function (url, res) {
		var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'get';
		var title = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '这是什么呢';

		/* 'reg:' for rap service. */
		this.resolve('reg:' + url, res, type, title);
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
						var tmp = depPropertie((0, _cloneDeep2.default)(ds).sort(tmpSort), v.id);
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
								}break;
							case 'Boolean':
								{
									if (v.value == "true") {
										v.value = true;
									} else if (v.value == "false") {
										v.value = false;
									} else {
										v.value = !!v.value;
									}
								}break;
						}
						items[v.name + (v.rule ? '|' + v.rule : '')] = v.value;
					}
				}
			});
			return items;
		};

		modules.forEach(function (v) {
			v.interfaces.forEach(function ($v) {
				_this.resolve($v.url, depPropertie($v.properties.filter(function (v) {
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
			if (/^reg:/.test(v.url)) {
				url = v.url.match(new RegExp('^reg:(.*?)$'))[1];
			}
			_this2.mock(new RegExp(host + (/^\//.test(url) ? '' : '/') + url + '(\\?.*?)?$', 'g'), v.type.toLowerCase(), v.build, v.title);
		});
	};

	this.run = function () {
		this.make();
	};
};

exports.default = mockService;