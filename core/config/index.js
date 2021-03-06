import utils from '../utils/index.js'; 
const config = function(){
    this.cs = {
        debug: true,
        locale: 'zh_cn',
        baseURL: '/',
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
};

export default config;