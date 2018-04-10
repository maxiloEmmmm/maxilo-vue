import VeeValidate, { Validator } from 'vee-validate';

const validator = function () {
    this.name = 'validator';
    this.locale = '';
    this.messages = {};
    this.rules = {};

    this.addRules = function(key, v){
        this.rules[key] = v;
    };

    this.addLocalize = function (key, v) {
        this.messages[key] = v;
    };

    this.run = function (vue) {
        vue.use(VeeValidate);
        //todo merge rules and localize
    };
};
export default validator;

