import utilsLib from './utils/';

const utils = function (modules) {
    this.name = 'utils';
    this.utilMap = { ...utilsLib};

    Object.keys(this.utilMap).forEach(v => {
        Object.defineProperty(this, v, {
            get: () => {
                return this.utilMap[v];
            }
        });
    });

    this.add = function (namespace, func) {
        if (this.app.utils._.isString(namespace) || namespace == '') {
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
            this.utilMap[k] = {};
            Object.defineProperty(this, k, {
                get: () => {
                    return this.utilMap[k];
                }
            });
        }
        this.depNameSpace(this.utilMap, tmp, func);
    };

    this.run = function (vue) {
        Object.defineProperty(vue.prototype, '$utils', {
            get: () => {
                return this.utilMap;
            }
        });
    };

    this.depNameSpace = function(target, space, func){
        let len = space.length;
        if (len === 1) {
            target[space[0]] = func;
        }else {
            this.depNameSpace(target[space[0]], this.app.utils._.slice(space, 1, len), func);
        }
    };
};
export default utils;