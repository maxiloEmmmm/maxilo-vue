import axios from 'axios';

const http = function(){
    this.name = 'http';
    this.instance = '';
    this.baseURL = null;

    this.run = function(vue){
        this.baseInit();
        Object.defineProperty(vue.prototype, '$http', {
            get: () => {
                return this.instance;
            }
        });
    };

    this.baseInit = function(){
        let _this = this;
        if(this.baseURL === null) {
            this.baseURL = this.app.config.baseURL;
        }
        this.instance = axios.create({
            baseURL: this.baseURL
        });
    };
};

export default http;


