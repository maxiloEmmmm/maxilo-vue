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

const bind = function _bind(struct, data) {
    let type = Object.prototype.toString.call(struct)
    if(type == '[object Object]') {
        let _struct = {}
        Object.keys(struct).forEach(k => {
            let hasRelationKey = k.indexOf('->') > -1
            let sourceK = k
            let destK = k
            if(hasRelationKey) {
                let keys = k.split('->')
                sourceK = keys[0]
                destK = keys[1]
            }

            let stype =  Object.prototype.toString.call(struct[k])
            let val = data[destK]
            if(stype == '[object Array]') {
                let s = struct[k][0]
                if(Object.prototype.toString.call(val) == '[object Array]') {
                    let childItems = []
                    val.forEach(child => {
                        childItems.push(_bind(s, child))
                    })
                    _struct[destK] = childItems
                }else {
                    _struct[destK] = []
                }
            }else {
                _struct[destK] = stype == '[object Object]' ? _bind(data, val) : struct[k](val)
            }
        })

        return _struct
    }else {
        return null
    }
}

const cloneDeep = function _cloneDeep(data){
    let type = Object.prototype.toString.call(data)
    if (!['[object Array]', '[object Object]'].includes(type)) {
        return data
    }else {
        if(type == '[object Array]') {
            let items = []
            data.forEach(item => {
                items.push(_cloneDeep(item))
            })
            return item
        }else {
            let obj = {...data}
            let _obj = {}
            Object.keys(obj).forEach(k => {
                _obj[k] = _cloneDeep(obj[k])
            })
            return _obj
        }
    }
}

const has = function (
    obj,
    path,
    returnValue = false,
    endValue = false,
    failBack = null) {
    let pathInfo = path.split('.')
    let x = []
    let tmp = {}
    pathInfo.forEach(v => {
        if (/\[/.test(v)) {
            //find [a]b[c] | b[a]c | [a][b]c => a.b.c
            let arrayPathInfo = v.match(/(\[([^\[\]]+?)\]|[^\[\]]+)+?/g)
            if (arrayPathInfo !== null) {
                arrayPathInfo.forEach(q => {
                    x.push(q.replace('[', '').replace(']', ''))
                })
            }
        } else {
            x.push(v)
        }
    })
    let x_len = x.length
    for (let i = 0; i < x_len; i++) {
        let v = x[i]
        if (!['[object Array]', '[object Object]'].includes(Object.prototype.toString.call(obj))
            || !(v in obj)) {
            if (failBack !== null) {
                failBack(obj, x.slice(i))
            }
            return endValue
        }
        tmp = obj
        obj = obj[v]
    }
    if (failBack !== null) {
        failBack(tmp, [x[x_len - 1]])
    }
    return returnValue ? obj : true
}

const get = function (obj, path, d = undefined) {
    let value = has(obj, path, true, undefined)
    return value === undefined ? d : value
}

const set = function (obj, path, d) {
    has(obj, path, false, false, function (obj, pathInfo) {
        let p_len = pathInfo.length
        for (let i = 0; i < p_len; i++) {
            let v = pathInfo[i]
            if (i + 1 < p_len) {
                let tmp = {}
                obj = obj[v] = tmp
            } else {
                obj[v] = d
            }
        }
    })
}

const resize = function(el, cb, _c) {
    let iframe = document.createElement('iframe')

    if(_c) {
        iframe.setAttribute('class', _c)
    }

    iframe.setAttribute('style', `
            width: 100%;
            height: 100 %;
            position: absolute;
            visibility: hidden;
            margin: 0;
            padding: 0;
            border: 0;`)

    el.appendChild(iframe)

    let oldWidth = el.offsetWidth
    let oldHeight = el.offsetHeight

    function sizeChange() {
        let width = el.offsetWidth
        let height = el.offsetHeight
        if (width !== oldWidth || height !== oldHeight) {
            cb({ width: width, height: height }, { width: oldWidth, height: oldHeight })
            oldWidth = width
            oldHeight = height
        }
    }

    let timer = 0;
    iframe.contentWindow.onresize = function () {
        clearTimeout(timer)
        timer = setTimeout(sizeChange, 20)
    };
}

const notice = function(msg, alert = false){
    let __color_1 = 'background-image:-webkit-gradient( linear, left top, right top,font-weight:bold;-webkit-background-clip: text;font-size:5em;'
    let __color_2 = 'color:red'
    let __color_3 = 'color: green'
    console.group && console.group("需要注意的: ");
    console.log('| %c%s', (alert ? __color_3 : __color_2), msg);
    console.group && console.groupEnd();
}

const getType = function(o){
    let str = Object.prototype.toString.call(o);
    return str.slice(8, str.length-1);
}

const env = function(ds, d){
    if (ds === undefined || ds === '') {
        return d;
    }
    return true ? ds : d;
}

const isArray = Array.isArray

const isString = function(item){
    return getType(item) === 'String'
}
const isObject = function(item){
    return getType(item) === 'Object'
}

export default {
    parseURL,
    makeModal,
    random,
    stopPropagation,
    slotDeepClone,
    getBroswer,
    getSlot,
    resize,
    get,
    set,
    has,
    cloneDeep,
    bind,
    notice,
    getType,
    env,
    isArray,
    isString,
    isObject
}