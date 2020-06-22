import utilsLib from './utils/index.js';

const utils = function () {
    this.depBind = function(hi){
        let tmp = {}
        Object.keys(hi).forEach(v => {
            if (utilsLib.tool.getType(hi[v]) == 'Object') {
                this.depBind(hi[v]);
            }else {
                tmp[v] = function(){
                    return hi[v].call(this, ...arguments);
                }.bind(this);
            }
        });
        return tmp;
    }

    this.utilMap = utilsLib

    Object.keys(this.utilMap).forEach(v => {
        Object.defineProperty(this, v, {
            get: () => {
                return this.utilMap[v];
            }
        });
    });

    this.add = function (namespace, func, bind = false) {
        if (!utilsLib.tool.isString(namespace) || namespace == '') {
            return ;
        }

        let tmp = namespace.split('.');

        let native = ['add', 'utilMap', 'run', 'depNameSpace'];
        if (native.includes[tmp[0]]) {
            alert(native.join(',') + ' 均为utils根保留关键字, 添加被拒绝.');
            return ;
        }
        
        if (tmp.length == 1 && !this.utilMap[tmp[0]]) {
            let k = tmp[0];
            this.utilMap[k] = func;
            Object.defineProperty(this, k, {
                get: () => {
                    return bind ? function () {
                        return this.utilMap[k].call(this, ...arguments);
                    }.bind(this) : this.utilMap[k];
                }
            });
            return ;
        }
        this.depNameSpace(this.utilMap, tmp, func, bind);
    };

    this.run = function (vue) {
        Object.defineProperty(vue.prototype, '$utils', {
            get: () => {
                return this.utilMap;
            }
        });
    };

    this.depNameSpace = function(target, space, func, bind = false){
        let len = space.length;
        if (len === 1) {
            target[space[0]] = bind ? function() {
                return func.call(this, ...arguments);
            }.bind(this) : func;
        }else {
            if (!target[space[0]]) {
                target[space[0]] = {};
            }
            this.depNameSpace(target[space[0]], space.slice(1, len), func, bind);
        }
    };
};
export default utils;