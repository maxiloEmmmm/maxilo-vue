const storeKey = 'aVqsCo0US9hnP6W';

const config = function(){
    this.name = 'config';
    this.cs = {
        storeKey,
        debug: process.env.DEBUG ? true : false,
        lang: 'zh_cn',
        systemKey: 'platform',
        systemList: ['platform'],
        baseUrl: process.env.SERVER ? ('http://' + process.env.SERVER) : 'http://localhost:13133',
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

    this.run = function(vue){
        Object.defineProperty(vue.prototype, '$configs', {
            get: () => {
                return this.cs;
            }
        });
    };
};

export default config;