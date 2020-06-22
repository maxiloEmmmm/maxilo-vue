import vue from './vue';

export default function(){
    this.register = function(app){
        app.bind("vue", function(app){
            return new vue
        })
    }

    this.boot = function(app){
        app.make("vue").run(app.vue, app.make("config").debug)
    }
}