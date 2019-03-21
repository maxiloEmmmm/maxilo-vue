"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _blueimpMd = _interopRequireDefault(require("blueimp-md5"));

var parseURL = function parseURL(url) {
  var tmp = {};
  url.replace(/^.*?\?/, '').split('&').forEach(function (v) {
    var t = v.split('=');
    tmp[t[0]] = t[1] ? t[1] : '';
  });
  return tmp;
};

var makeModal = function makeModal(t, style) {
  var target = random('__init_modal');
  var d = t ? t : document.body;
  var dom = d.appendChild(document.createElement('div'));
  dom.id = target;
  dom.className = 'init';
  dom.innerHTML = "<style>.init {position: fixed;\n    width: 100%;\n    height: 100%;\n    /* top: 50%; */\n    right: 0;\n    bottom: 0;\n    left: 0;\n    margin: auto;\n    opacity: ".concat(style == 1 ? 1 : 0.8, ";\n    background: #cecece;\n    z-index: 100000;}</style>") + (style == 1 ? "<div class=\"sk-spinner sk-spinner-wave\" style=\"margin-top:35%\">\n\t\t\t\t<div class=\"sk-rect1\"></div>\n                <div class=\"sk-rect2\"></div>\n                <div class=\"sk-rect3\"></div>\n                <div class=\"sk-rect4\"></div>\n\t\t\t\t<div class=\"sk-rect5\"></div>\n\t\t\t\n\t</div>" : "<div class=\"sk-spinner sk-spinner-fading-circle\" style=\"margin-top:35%\">\n\t\t<div class=\"sk-circle1 sk-circle\"></div>\n\t\t<div class=\"sk-circle2 sk-circle\"></div>\n\t\t<div class=\"sk-circle3 sk-circle\"></div>\n\t\t<div class=\"sk-circle4 sk-circle\"></div>\n\t\t<div class=\"sk-circle5 sk-circle\"></div>\n\t\t<div class=\"sk-circle6 sk-circle\"></div>\n\t\t<div class=\"sk-circle7 sk-circle\"></div>\n\t\t<div class=\"sk-circle8 sk-circle\"></div>\n\t\t<div class=\"sk-circle9 sk-circle\"></div>\n\t\t<div class=\"sk-circle10 sk-circle\"></div>\n\t\t<div class=\"sk-circle11 sk-circle\"></div>\n\t\t<div class=\"sk-circle12 sk-circle\"></div>\n\t</div>");
  return target;
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

var stopPropagation = function stopPropagation(e) {
  window.event ? window.event.cancelBubble = true : e.stopPropagation();
};

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

  if (!vnodes) {
    return [];
  }

  var clonedVNodes = vnodes.map(function (vnode) {
    return cloneVNode(vnode);
  });
  return clonedVNodes;
};

var getSlot = function getSlot(target, i) {
  var clone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (target === undefined || !Array.isArray(target)) {
    return '';
  }

  var s = target.filter(function (v) {
    return v.tag;
  })[i];

  if (!s) {
    return '';
  }

  return clone ? slotDeepClone([s], clone)[0] : s;
};

var getBroswer = function getBroswer() {
  var sys = {};
  var ua = navigator.userAgent.toLowerCase();
  var s;
  (s = ua.match(/edge\/([\d.]+)/)) ? sys.edge = s[1] : (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] : (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] : (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] : (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] : (s = ua.match(/opera.([\d.]+)/)) ? sys.opera = s[1] : (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
  if (sys.edge) return {
    broswer: "Edge",
    version: sys.edge
  };
  if (sys.ie) return {
    broswer: "IE",
    version: sys.ie
  };
  if (sys.firefox) return {
    broswer: "Firefox",
    version: sys.firefox
  };
  if (sys.chrome) return {
    broswer: "Chrome",
    version: sys.chrome
  };
  if (sys.opera) return {
    broswer: "Opera",
    version: sys.opera
  };
  if (sys.safari) return {
    broswer: "Safari",
    version: sys.safari
  };
  return {
    broswer: "",
    version: "0"
  };
};

var _default = {
  parseURL: parseURL,
  makeModal: makeModal,
  random: random,
  stopPropagation: stopPropagation,
  slotDeepClone: slotDeepClone,
  md5: _blueimpMd.default,
  getBroswer: getBroswer,
  getSlot: getSlot
};
exports.default = _default;