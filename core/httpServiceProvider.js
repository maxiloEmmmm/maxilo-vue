import axios from "axios"
export default function(){
    this.register = function(app){
        app.bind("http", function(app){
            return axios.create({
                baseURL: app.make("config").baseURL
            })
        })
    }

    this.boot = function(app){
        Object.defineProperty(app.vue.prototype, '$http', {
            get: () => {
                return app.make("http")
            }
        });
    }
}