let parseURL = function (url) {
    let tmp = {};
    url.replace(/^.*?\?/, '').split('&').forEach(v => {
        let t = v.split('=');
        tmp[t[0]] = t[1] ? t[1] : '';
    });
    return tmp;
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

const get = function (obj, path, d = null) {
    let value = has(obj, path, true, null)
    return value === null ? d : value
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

const getRender = (d, context, options = d) => {
    return typeof(context) == "function" ? context.call(d, options) : context
}

const byte2Size = (bytes) => {
    if (bytes === 0) return '0 B';
    let k = 1024;
    let sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = Math.floor(Math.log(bytes) / Math.log(k));
    i = Object.is(Infinity, i) || Object.is(-Infinity, i) ? 0 : i
    let num = bytes / Math.pow(k, i);
    return num.toPrecision(3) + ' ' + sizes[i];
}

const subQuery = (url, qs) => {
    if(!url) {
        return ''
    }
    let urlTarget = url.split("#")
    let urlInfo = urlTarget[0].split("?")
    let path = urlInfo[0], query = urlInfo[1]
    let querys = parseURL(query)
    querys = Object.assign({}, ...querys, ...qs)
    return path + "?" + Object.keys(querys).map(query => `${query}=${querys[query]}`).join("&") + (urlTarget[1] ? `#${urlTarget[1]}` : "")
}

const limitAction = function(time, cb) {
    let ok = true
    return function() {
        if(ok) {
            ok = false
            setTimeout(() => {
                ok = true
            }, time * 1000)
            cb.call(this)
        }
    }
}

const makeKey = (arr, k) => {
    let m = {};
    Array.isArray(arr) && arr.forEach((item) => {
        m[item[k]] = item
    })
    return m
}

const keyBy = (arr, k) => {
    let m = {};
    Array.isArray(arr) && arr.forEach((item) => {
        if(m[item[k]] === undefined) {
            m[item[k]] = [item]
        }else {
            m[item[k]].push(item)
        }
    })
    return m
}

const MapMap = (obj, cb) => {
    return Object.keys(obj).map(k => cb(obj[k], k))
}

const numberFloat = (v, d = 0) => {
    return parseFloat(selfNumber(v).toFixed(d))
}

const selfNumber = (value) => {
    return value === undefined || isNaN(value) ? 0 : Number(value)
}

export default {
    parseURL,
    random,
    stopPropagation,
    getBroswer,
    resize,
    get,
    set,
    has,
    cloneDeep,
    bind,
    getType,
    env,
    isArray,
    isString,
    isObject,
    getRender,
    byte2Size,
    subQuery,
    limitAction,
    makeKey,
    keyBy,
    MapMap,
    float: numberFloat,
    number: selfNumber
}