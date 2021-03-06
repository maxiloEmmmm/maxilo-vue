import {localize, extend, ValidationProvider, ValidationObserver } from 'vee-validate'
import utils from "./utils/index"
const validator = function () {
    this.name = 'validator';
    this.locale = 'en';
    this.messages = {};
    this.rules = {};

    this.addRule = function(key, v, focre = false){
        if(this.rules[key] && !focre) {
            console.log('[maxilo-vue validator warning]rules is exist: ' + key);
            return ;
        }else {
            if(!v.validate) {
                console.log('[maxilo-vue validator warning]rule validate is not find: ' + key);
                return ;
            }

            if (!v.message) {
                v.message = '{_field_} Error.';
            }

            this.rules[key] = v;
            extend(key, v)
        }
    };

    this.addRules = function (rs) {
        if (utils.tool.getType(rs) == 'Object') {
            Object.keys(rs).forEach(i => {
                this.addRuke(i, rs[i]);
            });
        } else if (utils.tool.getType(mix) == 'Array') {
            rs.forEach(v => {
                if(v.ruleKey && v,ruleBuild) {
                    this.addRule(v.ruleKey, v.ruleBuild);
                }
            });
        }
    };

    this.addLocalize = function (key, v) {
        this.messages[key] = v;
    };

    this.addLocalizes = function(ls){
        this.messages = utils.tool.merge(this.messages, ls);
    };

    this.run = function (app) {
        Object.keys(this.messages).forEach(k => localize(k, {
            name: k,
            messages: this.messages[k]
        }));
        app.make("vue").component('ValidationProvider', ValidationProvider)
        app.make("vue").component('ValidationObserver', ValidationObserver)
        localize(app.make("config").locale)
    };
};
export default validator;

