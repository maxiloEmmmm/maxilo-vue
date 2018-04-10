'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var parseURL = function parseURL(url) {
    var tmp = {};
    url.replace(/^.*?\?/, '').split('&').forEach(function (v) {
        var t = v.split('=');
        tmp[t[0]] = t[1] ? t[1] : '';
    });
    return tmp;
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
    var clonedVNodes = vnodes.map(function (vnode) {
        return cloneVNode(vnode);
    });
    return clonedVNodes;
};

exports.default = {
    parseURL: parseURL,
    makeModal: makeModal,
    random: random,
    stopPropagation: stopPropagation,
    slotDeepClone: slotDeepClone
};