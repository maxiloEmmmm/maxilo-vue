import axios from 'axios';
import qs from 'qs';
import moment from 'moment';

const http = function(){
    this.name = 'http';
    this.instance = '';
    this.baseURL = '';
    this.xhr = '';
    this.adapter = {};

    this.initMethod = ['POST'];
    this.dueMethod = ['POST'];

    this.run = function(vue){
        this.baseInit();
        this.ie9Init();
        Object.defineProperty(vue.prototype, '$http', {
            get: () => {
                return this.instance;
            }
        });
    };

    this.baseInit = function(){
        this.instance = axios.create({
            baseURL: this.baseURL
        });

        window.initManager = {};

        let _this = this;
        this.instance.wPost = async function () {
            let param = arguments[2] ? arguments[2] : { time: null, target: null, style: 1 };
            param.style = 2;

            return arguments.length == 1
                ? await _this.instance.initPost(arguments[0], {}, param)
                : await _this.instance.initPost(arguments[0], arguments[1], param);
        };

        this.instance.initPost = async function () {
            let param = arguments[2] ? arguments[2] : { time: null, target: null, style: 1 };
            let timeStr = param.time
                ? ((arguments[0].indexOf('?') === -1
                    ? '?' : '&') + '__init_timeout=' + parseInt(param.time))
                : '';
            arguments[0] = _this.makeInitToken(arguments[0] + timeStr, param.target, param.style)[0];
            return await _this.instance.post(...arguments);
        };
    };

    this.ie9Init = function(){
        let ie9 = navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE9.0";
        if (ie9) {
            alert('请使用360浏览器的极速模式 或 谷歌浏览器 或 火狐浏览器.');
        }
    };

    this.xhrOpen = function(){
        let xhrOpen = this.xhr.prototype.open;
        xhr.prototype.open = function (method, params, asncFlag, user, password) {
            if (this.app.utils._.isString(method)) {
                this.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            }
            xhrOpen.call(this, method, url, asncFlag, user, password);
        };
    };

    this.xhrSend = function(){
        let xhrSend = this.xhr.prototype.send;
        _this = this;

        this.xhr.prototype.send = function (method, url, asncFlag, user, password) {
            this.onload = function () {
                try {
                    if (this.initMethod.includes(this.method)) {
                        let nativeURL = this.app.utils.normal.parseURL(this.responseURL);

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
                        if (!response) {
                            throw 'parse err';
                        }
                    }
                }
                catch (e) {
                    this.responseException(e);
                }
            };

            this.method = method;
            if (!/^http/.test(url)) {
                url = this.baseURL + url;
            }
            let nativeURL = this.app.utils.normal.parseURL(url);
            if (!nativeURL['__init_token'] && Object.keys(nativeURL).findIndex(v => /init/.test(nativeURL[v])) !== -1) {
                let tmp = _this.makeInitToken(url);
                url = tmp[0];
            }

            let params = this.app.utils.normal.parseURL(url);
            if (this.initMethod.includes(this.method)) {
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
                window.initManager[params['__init_token']].modalTarget = this.app.utils.normal.makeModal(window.initManager[params['__init_token']].target, window.initManager[params['__init_token']].style ? window.initManager[params['__init_token']].style : 1);
            }
            xhrSend.call(this, method, params, asncFlag, user, password);
        };
    };

    this.makeInitToken = (url, target, style) => {
        let token = utils.normal.random('initManage');
        let current = moment().format('X');
        window.initManager[token] = { time: current, url: window.location.href, modal: false, target, style };
        Object.keys(window.initManager).forEach(v => (current - window.initManager[v].time > consts.REQUEST_TIME_OUT) ? delete window.initManager[v] : '');
        return [url + (url.indexOf('?') === -1 ? '?' : '&' + '__init_token=' + token), token];
    };

    this.xhrGlobalInit = function(){
        this.xhr = XMLHttpRequest;

        if (this.xhr) {
            this.xhrOpen();
            this.xhrSend();            
        }
        //TODO !if to due
    };

    this.responseException = function(e){
        this.adapter.responseErrorException ? 
            this.adapter.responseErrorException(e) : console.log(e);
    }
};

export default http;


