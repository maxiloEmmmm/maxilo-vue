'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mock = require('./mock');

var _mock2 = _interopRequireDefault(_mock);

var _http = require('libs/http');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var urlHead = _http.http.defaults.baseURL;

var resolveREG = function resolveREG(t, q) {
	//console.log('^' + urlHead.replace(/([\/\.\$\?])/g, '\\$1') + t.replace(/([\/\.\$\?])/g, '\\$1') + q.replace(/([\/])/g, '\\$1') + '$')
	return new RegExp('^' + urlHead.replace(/([\/\.\$\?])/g, '\\$1') + t.replace(/([\/\.\$\?])/g, '\\$1') + q.replace(/([\/])/g, '\\$1') + '$', 'i');
};

var resolve = function resolve(t) {
	//console.log(t)
	return urlHead + t;
};

var core = _mock2.default.mock;

var random = _mock2.default.Random;

var resolveHelper = {
	page: function page(base) {
		var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'page';

		return resolveREG(base, (base.indexOf('?') === -1 ? '(\\?' : '(&') + key + '=[0-9]+)*');
	}
};

exports.default = {
	http: _http.http,
	resolve: resolve,
	resolveREG: resolveREG,
	resolveHelper: resolveHelper,
	core: core,
	random: random
};