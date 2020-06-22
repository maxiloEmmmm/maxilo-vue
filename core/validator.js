import VeeValidate, {Validator} from 'vee-validate';
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

            if (!v.getMessage) {
                v.getMessage = (v, args) => key + ' Error.';
            }

            this.rules[key] = v;
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
        Object.keys(this.rules).forEach(k => Validator.extend(k, this.rules[k]));
        Object.keys(this.messages).forEach(k => Validator.localize(k, {
            name: k,
            messages: this.messages[k]
        }));

        let localize = VeeValidate.Validator 
            ? Validator.localize
            : VeeValidate.localize
        localize(app.make("config").locale)
        app.vue.use(VeeValidate);
    };
};
export default validator;

