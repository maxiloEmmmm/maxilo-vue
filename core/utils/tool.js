let parseURL = function (url) {
    let tmp = {};
    url.replace(/^.*?\?/, '').split('&').forEach(v => {
        let t = v.split('=');
        tmp[t[0]] = t[1] ? t[1] : '';
    });
    return tmp;
};

let makeModal = (t, style) => {
    let target = random('__init_modal');
    let d = t ? t : document.body;
    let dom = d.appendChild(document.createElement('div'));
    dom.id = target;
    dom.className = 'init';
    dom.innerHTML = `<style>.init {position: fixed;
    width: 100%;
    height: 100%;
    /* top: 50%; */
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    opacity: ${style == 1 ? 1 : 0.8};
    background: #cecece;
    z-index: 100000;}</style>` + (style == 1 ? `<div class="sk-spinner sk-spinner-wave" style="margin-top:35%">
				<div class="sk-rect1"></div>
                <div class="sk-rect2"></div>
                <div class="sk-rect3"></div>
                <div class="sk-rect4"></div>
				<div class="sk-rect5"></div>
			
	</div>` : `<div class="sk-spinner sk-spinner-fading-circle" style="margin-top:35%">
		<div class="sk-circle1 sk-circle"></div>
		<div class="sk-circle2 sk-circle"></div>
		<div class="sk-circle3 sk-circle"></div>
		<div class="sk-circle4 sk-circle"></div>
		<div class="sk-circle5 sk-circle"></div>
		<div class="sk-circle6 sk-circle"></div>
		<div class="sk-circle7 sk-circle"></div>
		<div class="sk-circle8 sk-circle"></div>
		<div class="sk-circle9 sk-circle"></div>
		<div class="sk-circle10 sk-circle"></div>
		<div class="sk-circle11 sk-circle"></div>
		<div class="sk-circle12 sk-circle"></div>
	</div>`);
    return target;
};

let random = function (pre = '') {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    function guid() {
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
    return pre + guid();
};

let stopPropagation = function(e){
    window.event ? window.event.cancelBubble = true : e.stopPropagation();
};

let slotDeepClone = (vnodes, createElement) => {
    function cloneVNode(vnode) {
        const clonedChildren = vnode.children && vnode.children.map(vnode => cloneVNode(vnode));
        const cloned = createElement(vnode.tag, vnode.data, clonedChildren);
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
    if (!vnodes) {return [];}
    const clonedVNodes = vnodes.map(vnode => cloneVNode(vnode));
    return clonedVNodes;
};

let getSlot = function(target, i, clone = false){
    if (target === undefined || !Array.isArray(target)) { return '' }
    let s = target.filter(v => v.tag)[i];
    if (!s) { return ''; }
    return clone ? slotDeepClone([s], clone)[0] : s;
};

import md5 from 'blueimp-md5';

let getBroswer = function() {
    var sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/edge\/([\d.]+)/)) ? sys.edge = s[1] :
        (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] :
            (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
                (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
                    (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
                        (s = ua.match(/opera.([\d.]+)/)) ? sys.opera = s[1] :
                            (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;

    if (sys.edge) return { broswer: "Edge", version: sys.edge };
    if (sys.ie) return { broswer: "IE", version: sys.ie };
    if (sys.firefox) return { broswer: "Firefox", version: sys.firefox };
    if (sys.chrome) return { broswer: "Chrome", version: sys.chrome };
    if (sys.opera) return { broswer: "Opera", version: sys.opera };
    if (sys.safari) return { broswer: "Safari", version: sys.safari };

    return { broswer: "", version: "0" };
}

export default {
    parseURL,
    makeModal,
    random,
    stopPropagation,
    slotDeepClone,
    md5,
    getBroswer,
    getSlot
}