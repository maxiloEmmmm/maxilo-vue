import VeeValidate, { Validator } from 'vee-validate';
import validateMix from './mixs/validate';

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

            if (!v.getMessage) {
                v.getMessage = (v, args) => key + ' Error.';
            }

            this.rules[key] = v;
        }
    };

    this.addRules = function (rs) {
        if (this.app.utils.base.getType(rs) == 'Object') {
            Object.keys(rs).forEach(i => {
                this.addRuke(i, rs[i]);
            });
        } else if (this.app.utils.base.getType(mix) == 'Array') {
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
        this.messages = this.app.utils._.merge(this.messages, ls);
    };

    this.run = function (vue) {
        Object.keys(this.rules).forEach(k => Validator.extend(k, this.rules[k]));
        Object.keys(this.messages).forEach(k => Validator.localize(k, {
            name: k,
            messages: this.messages[k]
        }));
        Validator.localize(this.app.config.locale);
        vue.use(VeeValidate);
        vue.mixin(validateMix);
    };
};
export default validator;

