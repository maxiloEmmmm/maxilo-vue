import validator from './validator.js';

export default function(){
    this.register = function(app){
        app.bind("validator", function(app){
            return new validator
        })
    }

    this.boot = function(app){
        app.make("validator").run(app)
    }
}