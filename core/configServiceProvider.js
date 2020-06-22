import config from "./config/index"
export default function(){
    this.register = function(app){
        app.bind("config", function(){
            return new config
        })
    }

    this.boot = function(app){
        Object.defineProperty(app.vue.prototype, '$configs', {
            get: () => {
                return app.make("config");
            }
        });
    }
}