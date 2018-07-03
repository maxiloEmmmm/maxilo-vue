import utils from '../utils/index.js'; 
const config = function(){
    this.name = 'config';
    this.cs = {
        debug: utils.base.env(process.env.DEBUG, true),
        locale: utils.base.env(process.env.LANG, 'zh_cn'),
        baseURL: utils.base.env(process.env.SERVER, 'server'),
        storeKey: 'fuf8u18uhf1huif13uhif2'
    };

    Object.keys(this.cs).forEach(v => {
        Object.defineProperty(this, v, {
            get() {
                return this.cs[v];
            },
            set(val){
                this.cs[v] = val;
            }
        });
    });

    this.add = function(key, v){
        if(this.cs[key] === undefined) {
            Object.defineProperty(this, key, {
                get() {
                    return v;
                },
                set(val) {
                    this.cs[key] = v;
                }
            });
        }
        
        this.cs[key] = v;
    };

    this.merge = function(obj){
        Object.keys(obj).forEach((v) => {
            if (!this.cs[v]) {
                this.add(v, obj[v]);
            }else {
                this.cs[v] = obj[v];
            }
        });
    };

    this.run = function(vue){
        Object.defineProperty(vue.prototype, '$configs', {
            get: () => {
                return this.cs;
            }
        });
    };
};

export default config;