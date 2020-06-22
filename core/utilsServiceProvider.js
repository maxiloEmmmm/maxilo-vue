import utils from './utils.js';

export default function(){
    this.register = function(app){
        app.bind("utils", function(app){
            return new utils
        })
    }

    this.boot = function(app){
        app.make("utils").run(app.vue)
    }
}