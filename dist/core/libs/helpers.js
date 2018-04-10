'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.helpers = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _elementUi = require('element-ui');

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _oh = require('libs/oh');

var _oh2 = _interopRequireDefault(_oh);

var _configs = require('configs');

var _configs2 = _interopRequireDefault(_configs);

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

var _mLodash = require('./mLodash');

var _mLodash2 = _interopRequireDefault(_mLodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lvErr = function lvErr(err, level) {
	level = level ? 2 : level;
	var title = '<h' + level.toString() + '>' + err.data.message + '</h' + level.toString() + '>';
	var content = '<ol style="list-style:none;">';

	(0, _keys2.default)(err.data.errors).map(function (t) {
		content += '<li>' + err.data.errors[t][0] + '</li>';
	});

	return title + content + '</ol>';
};

var randomByTime = function randomByTime() {
	return 'ohaha' + _nodeUuid2.default.v1().replace(/[-\.]/g, "");
};

var otoa = function otoa(t) {
	var p = [];
	(0, _keys2.default)(t).map(function (u) {
		p.push(t[u]);
	});
	return p;
};

var assets = function assets(k1, k2, back) {
	if (k1 !== k2) {
		back();
	}
};

var stoup = function stoup(str) {
	var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	var t = str.split(limit);
	t = t.map(function (v) {
		return _mLodash2.default.upperFirst(v);
	});
	return t.join('');
};

var hotAsset = function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(assets) {
		var _this = this;

		var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

		var t, _ret;

		return _regenerator2.default.wrap(function _callee2$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						t = target ? _elementUi.Loading.service({
							target: target
						}) : false;
						_context3.prev = 1;
						return _context3.delegateYield( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
							var len, result, _loop, i;

							return _regenerator2.default.wrap(function _callee$(_context2) {
								while (1) {
									switch (_context2.prev = _context2.next) {
										case 0:
											len = assets.length, result = [];
											_loop = /*#__PURE__*/_regenerator2.default.mark(function _loop(i) {
												return _regenerator2.default.wrap(function _loop$(_context) {
													while (1) {
														switch (_context.prev = _context.next) {
															case 0:
																_context.next = 2;
																return assets[i]().then(function (r) {
																	return result[i] = r;
																});

															case 2:
															case 'end':
																return _context.stop();
														}
													}
												}, _loop, _this);
											});
											i = 0;

										case 3:
											if (!(i < len)) {
												_context2.next = 8;
												break;
											}

											return _context2.delegateYield(_loop(i), 't0', 5);

										case 5:
											i++;
											_context2.next = 3;
											break;

										case 8:
											if (target) {
												t.close();
											}
											return _context2.abrupt('return', {
												v: result
											});

										case 10:
										case 'end':
											return _context2.stop();
									}
								}
							}, _callee, _this);
						})(), 't0', 3);

					case 3:
						_ret = _context3.t0;

						if (!((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object")) {
							_context3.next = 6;
							break;
						}

						return _context3.abrupt('return', _ret.v);

					case 6:
						_context3.next = 12;
						break;

					case 8:
						_context3.prev = 8;
						_context3.t1 = _context3['catch'](1);

						if (target) {
							t.close();
						}
						return _context3.abrupt('return', _context3.t1);

					case 12:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee2, this, [[1, 8]]);
	}));

	return function hotAsset(_x2) {
		return _ref.apply(this, arguments);
	};
}();

var getValue = function getValue(d) {
	(0, _keys2.default)(d).forEach(function (v) {
		return d[v] = d[v] && d[v].value ? d[v].value : d[v];
	});
	return d;
};

var random = function random() {
	var pre = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	function S4() {
		return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
	}
	function guid() {
		return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
	}
	return pre + guid();
};

var getSystemKey = function getSystemKey() {
	var pathinfo = window.location.pathname.match(/([^\/]+?($|\/))/g);
	if (pathinfo != null) {
		var systemKey = pathinfo[0].replace('\/', '').toLocaleLowerCase();
		if (_configs2.default.configs.systemList.findIndex(function (v) {
			return v == systemKey;
		}) != -1) {
			return systemKey;
		} else {
			return _configs2.default.configs.systemKey;
		}
	} else {
		return _configs2.default.configs.systemKey;
	}
};

var exec = window.eval ? window.eval : window.execScript;

var slotDeepClone = function slotDeepClone(vnodes, createElement) {
	function cloneVNode(vnode) {
		var clonedChildren = vnode.children && vnode.children.map(function (vnode) {
			return cloneVNode(vnode);
		});
		var cloned = createElement(vnode.tag, vnode.data, clonedChildren);
		cloned.text = vnode.text;
		cloned.isComment = vnode.isComment;
		cloned.componentOptions = vnode.componentOptions;
		cloned.elm = vnode.elm;
		cloned.context = vnode.context;
		cloned.ns = vnode.ns;
		cloned.isStatic = vnode.isStatic;
		cloned.key = vnode.key;

		return cloned;
	}
	var clonedVNodes = vnodes.map(function (vnode) {
		return cloneVNode(vnode);
	});
	return clonedVNodes;
};

var parseURL = function parseURL(url) {
	var tmp = {};
	url.replace(/^.*?\?/, '').split('&').forEach(function (v) {
		var t = v.split('=');
		tmp[t[0]] = t[1] ? t[1] : '';
	});
	return tmp;
};

var getStoreAuth = function getStoreAuth() {
	var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	return key ? _store2.default.getters[getSystemKey() + 'Auth/' + key] : _store2.default.getters[getSystemKey() + 'Auth'];
};

var makeModal = function makeModal(t, style) {
	var target = helpers.random('__init_modal');
	var d = t ? t : document.body;
	var dom = d.appendChild(document.createElement('div'));
	dom.id = target;
	dom.className = 'init';
	dom.innerHTML = '<style>.init {position: fixed;\n    width: 100%;\n    height: 100%;\n    /* top: 50%; */\n    right: 0;\n    bottom: 0;\n    left: 0;\n    margin: auto;\n    opacity: ' + (style == 1 ? 1 : 0.8) + ';\n    background: #cecece;\n    z-index: 100000;}</style>' + (style == 1 ? '<div class="sk-spinner sk-spinner-wave" style="margin-top:35%">\n\t\t\t\t<div class="sk-rect1"></div>\n                <div class="sk-rect2"></div>\n                <div class="sk-rect3"></div>\n                <div class="sk-rect4"></div>\n\t\t\t\t<div class="sk-rect5"></div>\n\t\t\t\n\t</div>' : '<div class="sk-spinner sk-spinner-fading-circle" style="margin-top:35%">\n\t\t<div class="sk-circle1 sk-circle"></div>\n\t\t<div class="sk-circle2 sk-circle"></div>\n\t\t<div class="sk-circle3 sk-circle"></div>\n\t\t<div class="sk-circle4 sk-circle"></div>\n\t\t<div class="sk-circle5 sk-circle"></div>\n\t\t<div class="sk-circle6 sk-circle"></div>\n\t\t<div class="sk-circle7 sk-circle"></div>\n\t\t<div class="sk-circle8 sk-circle"></div>\n\t\t<div class="sk-circle9 sk-circle"></div>\n\t\t<div class="sk-circle10 sk-circle"></div>\n\t\t<div class="sk-circle11 sk-circle"></div>\n\t\t<div class="sk-circle12 sk-circle"></div>\n\t</div>');
	return target;
};

var all = {
	lvErr: lvErr,
	message: _elementUi.Message,
	loading: _elementUi.Loading.service,
	otoa: otoa,
	uuid: _nodeUuid2.default,
	randomByTime: randomByTime,
	assets: assets,
	stoup: stoup,
	oh: _oh2.default,
	hotAsset: hotAsset,
	_: _mLodash2.default,
	exec: exec,
	getSystemKey: getSystemKey,
	slotDeepClone: slotDeepClone,
	random: random,
	getValue: getValue,
	getStoreAuth: getStoreAuth,
	parseURL: parseURL,
	makeModal: makeModal
};

var install = function install(Vue) {
	Vue.use(_elementUi.Loading);
	Object.defineProperty(Vue.prototype, '$utils', {
		get: function get() {
			return all;
		}
	});

	Object.defineProperty(Vue.prototype, '$tts', {
		get: function get() {
			return function () {
				for (var _len = arguments.length, tmp = Array(_len), _key = 0; _key < _len; _key++) {
					tmp[_key] = arguments[_key];
				}

				var len = tmp.length,
				    msg = '';
				for (var i = 0; i < len; i++) {
					msg += Array.isArray(tmp[i]) ? this.$t.apply(this, [tmp[i][0]].concat((0, _toConsumableArray3.default)(tmp[i].slice(1, -1)))) : this.$t(tmp[i]);
				}
				return msg;
			};
		}
	});

	//    //零时全局组建
	// Vue.mixin({
	//   $tts: function (...tmp) {
	//     var len = tmp.length, msg = ''
	//     for (var i = len; i >= 0; i--) {
	//       msg += Array.isArray(tmp[i]) ? this.$t(tmp[i][0], ...tmp[i].slice(1, -1)) : this.$t(tmp[i])
	//     }
	//     return msg
	//   }
	// })

	Vue.component('el_message', _elementUi.Message);
	Vue.component('el_loading', _elementUi.Loading);
};

var helpers = exports.helpers = all;

exports.default = { install: install, helpers: helpers };