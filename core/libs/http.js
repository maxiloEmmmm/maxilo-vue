import axios from 'axios';
import store from 'store';
import qs from 'qs';
import _ from 'libs/mLodash';
import { configs } from "configs";
import { helpers } from 'libs/helpers';
import moment from 'moment';
import { consts } from 'libs/constants';

/**
 * Create Axios
 */



export const http = axios.create({
    baseURL: configs.baseUrl
});

window.initManager = {};

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */
http.interceptors.request.use(
    request => {
        // let juid = store.getters[helpers.getSystemKey() + 'Auth/juid'];
        // if (request.method == 'post' && juid !== '') {
        //     if (request.data === undefined) {
        //         request.data = {};
        //     }
        //     request.data['juid'] = juid;
        // }
        return request;
    },
    err => {
        console.log('err: ', err);
    }
);

http.interceptors.response.use(
    response => {
        return response;
    },
    err => {
        console.log('err: ', err);
    }
);

let ie9 = navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE9.0";
if(ie9) {
    alert('请使用360浏览器的极速模式 或 谷歌浏览器 或 火狐浏览器.');
}
// let xhr = ie9 ? XDomainRequest :XMLHttpRequest ;
let xhr = XMLHttpRequest ;

if (xhr) {

    let xhrOpen = xhr.prototype.open;
    xhr.prototype.open = function(method,url,asncFlag,user,password) {
        this.onload = function(){
            try{
                if(method == 'POST') {
                    let nativeURL = helpers.parseURL(this.responseURL);

                    //初始化系列
                    if (nativeURL['__init_token']) {
                        let currentLocation = window.location.href;
                        //查找当前页面所有的等待请求
                        if (window.initManager[nativeURL['__init_token']].modal) {
                            let child = document.getElementById(window.initManager[nativeURL['__init_token']].modalTarget);
                            child.parentNode.removeChild(child);

                            Object.keys(window.initManager).forEach((v, i) => {
                                if (window.initManager[v].url == currentLocation) {
                                    window.initManager[v].modal = true;
                                }
                            });
                        }
                        delete window.initManager[nativeURL['__init_token']];
                    }
                    
                    let response = JSON.parse(this.response);
                    if(!response) {
                        throw 'parse err';
                    }
                }
            }
            catch(e) {
                // TODO: 狗经常注释掉的地方
                let key = helpers.getSystemKey();
                store.dispatch(key + 'Auth/destory').then(() => {
                    window.location.href = '/' + key + '/login';
                });
            }
        };

        this.method = method;
        if(!/^http/.test(url)) {
            url = configs.baseUrl + url;
        }
        let nativeURL = helpers.parseURL(url);
        if (!nativeURL['__init_token'] && Object.keys(nativeURL).findIndex(v => /init/.test(nativeURL[v])) !== -1) {
            let tmp = makeInitToken(url);
            url = tmp[0];
        }

        let params = helpers.parseURL(url);
        if (this.method == 'POST') {
            setTimeout(() => {
                let q = '';
                if (params['__init_token'] && window.initManager[params['__init_token']]) {
                    let tmp = window.initManager[params['__init_token']];
                    this.abort();
                    swal('超时了');

                    Object.keys(window.initManager).forEach((v, i) => {
                        if (window.initManager[v].url == tmp.url) {
                            window.initManager[v].modal = true;
                            let child = document.getElementById(window.initManager[v].modalTarget);
                            child.parentNode.removeChild(child);
                        }
                    });
                    delete window.initManager[params['__init_token']];
                }
            }, params['__init_timeout'] ? parseInt(params['__init_timeout']) : consts.REQUEST_TIME_OUT);
        }

        if (window.initManager[params['__init_token']] && Object.keys(window.initManager).findIndex(v => v.modal) === -1) {
            window.initManager[params['__init_token']].modal = true;
            window.initManager[params['__init_token']].modalTarget = helpers.makeModal(window.initManager[params['__init_token']].target, window.initManager[params['__init_token']].style ? window.initManager[params['__init_token']].style : 1);
        }
        xhrOpen.call(this,method,url,asncFlag,user,password);
    };

    let xhrSend = xhr.prototype.send;
    xhr.prototype.send = function(method,params,asncFlag,user,password) {
        let juid = store.getters[helpers.getSystemKey() + 'Auth/juid'];
        try{
            if(this.method == 'POST' && juid !== '') {
                if(_.isString(method)) {
                    this.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                }

                this.setRequestHeader('juid', juid);
            }
        }catch(e){
            console.log(e);
            return ;
        }
        xhrSend.call(this,method,params,asncFlag,user,password);
    };
}

// 等 Maxilo 实现，在提交请求的时候出现 waiting 提示。
http.wPost = async function() {
    let param = arguments[2] ? arguments[2] : {time: null, target: null, style: 1};
    param.style = 2;

    return arguments.length == 1
            ? await http.initPost(arguments[0], {}, param)
            : await http.initPost(arguments[0], arguments[1], param);
};

http.initPost = async function() {
    let param = arguments[2] ? arguments[2] : {time: null, target: null, style: 1};
    let timeStr = param.time 
                    ? ((arguments[0].indexOf('?') === -1 
                            ? '?' : '&') + '__init_timeout=' + parseInt(param.time)) 
                    : '';
    arguments[0] = makeInitToken(arguments[0] + timeStr, param.target, param.style)[0];
    return await http.post(...arguments);
};

const makeInitToken = (url, target, style) => {
    console.log(url);
    let token = helpers.random('initManage');
    let current = moment().format('X');
    window.initManager[token] = { time: current, url: window.location.href, modal: false, target, style };
    Object.keys(window.initManager).forEach(v => (current - window.initManager[v].time > consts.REQUEST_TIME_OUT) ? delete window.initManager[v] : '');
    return [url + (url.indexOf('?') === -1 ? '?' : '&' + '__init_token=' + token), token];
};

http.plugins = {
    resolve(t) {
        return http.defaults.baseURL.replace(/\/$/, '') + t;
    }
};

const install = function (Vue) {
    Object.defineProperty(Vue.prototype, '$http', {
        get() {
            return http;
        },
    });
};

export default {http, install};
