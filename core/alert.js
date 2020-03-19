import utils from './utils/base';
const alert = function () {
    this.name = 'alert';
    this.typeKey = 'icon';
    this.base = function (options) {
        return new Promise((ok, nok) => {
            ok(window.alert(this.getMsg(options)));
        });
    };

    this.confirm = function(options) {
        return new Promise((ok, nok) => {
            ok(confirm(this.getMsg(options)));
        });
    };

    this.prompt = function(options) {
        return new Promise((ok, nok) => {
            ok(prompt(this.getMsg(options)));
        });
    };

    this.getMsg = function(options){
        if(options === undefined) {return '';}
        return this.app.utils.base.getType(options) === 'String'
            ? options
            : options.text
                ? options.text
                : (options.title
                    ? options.title
                    : (options.toString
                        ? options.toString()
                        : '')
                );
    }

    this.run = function () {
        
    };
};
export default alert;

