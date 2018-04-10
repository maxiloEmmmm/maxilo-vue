import { Message, Loading } from 'element-ui';
import uuid from 'node-uuid';
import oh from 'libs/oh';
import config from 'configs';
import store from 'store';

let lvErr = function(err, level) {
	level = level ? 2 : level;
	let title   = '<h' + level.toString() + '>' + err.data.message + '</h' + level.toString() + '>';
	let content = '<ol style="list-style:none;">';

	Object.keys(err.data.errors).map(t => {
		content += '<li>' + err.data.errors[t][0] + '</li>';
	});

	return title + content + '</ol>';
};

let randomByTime = function(){
	return 'ohaha' + uuid.v1().replace(/[-\.]/g, "");
};

let otoa = function(t) {
	let p = [];
	Object.keys(t).map((u) => {
		p.push(t[u]);
	});
	return p;
};

let assets = function(k1, k2, back) {
	if(k1 !== k2) {
		back();
	}
};

let stoup = function(str, limit = '') {
	let t = str.split(limit);
	t = t.map(v => _.upperFirst(v));
	return t.join('');
};

let hotAsset = async function(assets, target = false) {
	let t = target ? Loading.service({
		target
	}) : false;
	try {
		let len = assets.length, result = [];

		for(let i = 0; i < len; i++) {
			await assets[i]().then(r => result[i]=r);
		}
		if (target) { t.close(); }
		return result;
	}catch(e) {
		if (target) { t.close(); }
		return e;
	}
};

let getValue = function(d){
	Object.keys(d).forEach(v => d[v] = (d[v] && d[v].value) ? d[v].value : d[v]);
	return d;
};

let random = function(pre = ''){
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    function guid() {
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
    return pre + guid();
};

let getSystemKey = function(){	
	let pathinfo = window.location.pathname.match(/([^\/]+?($|\/))/g);
	if (pathinfo != null) {
		let systemKey = pathinfo[0].replace('\/', '').toLocaleLowerCase();
		if (config.configs.systemList.findIndex((v) => { return v == systemKey; }) != -1) {
			return systemKey;
		} else {
			return config.configs.systemKey;
		}
	} else {
		return config.configs.systemKey;
	}
};

let exec = window.eval ? window.eval : window.execScript;

let slotDeepClone = (vnodes, createElement) => {
    function cloneVNode (vnode) {
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
    const clonedVNodes = vnodes.map(vnode => cloneVNode(vnode));
    return clonedVNodes;
};

let parseURL = function(url){
	let tmp = {};
	url.replace(/^.*?\?/, '').split('&').forEach(v => {
		let t = v.split('=');
		tmp[t[0]] = t[1] ? t[1] : '';
	});
	return tmp;
};

let getStoreAuth = (key = false) => {
	return key ? store.getters[getSystemKey() + 'Auth/'+key] : store.getters[getSystemKey() + 'Auth'];
};

let makeModal = (t, style) => {
	let target = helpers.random('__init_modal');
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
    opacity: ${style==1 ? 1: 0.8};
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

import _ from './mLodash';

const all = {
	lvErr,
	message: Message,
	loading: Loading.service,
	otoa,
	uuid,
	randomByTime,
	assets,
	stoup,
	oh,
	hotAsset,
	_,
	exec,
	getSystemKey,
    slotDeepClone,
    random,
    getValue,
	getStoreAuth,
	parseURL,
	makeModal
};

const install = function(Vue) {
	Vue.use(Loading);
    Object.defineProperty(Vue.prototype, '$utils', {
        get() {
            return all;
        },
    });

    Object.defineProperty(Vue.prototype, '$tts', {
        get() {
            return function (...tmp) {
				    var len = tmp.length, msg = '';
				    for (var i = 0; i < len; i++) {
				      msg += Array.isArray(tmp[i]) ? this.$t(tmp[i][0], ...tmp[i].slice(1, -1)) : this.$t(tmp[i]);
				    }
				    return msg;
				  };
        },
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

    Vue.component('el_message', Message);
    Vue.component('el_loading', Loading);
};

export const helpers = all;

export default {install, helpers};