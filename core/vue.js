import utils from "./utils/index"
const vue = function () {
    this.name = 'vue';

    this.instance = null;

    this.components = {};

    this.uses = [];

    this.errorHandler = false;

    this.warnHandler = false;

    this.component = function (name, component) {
        if (!utils.tool.isString(name) || name == '') {
            if (utils.tool.getType(name) == 'Object' && name.name) {
                name = name.name;
            }else {return ;}
        }
        
        this.components[name] = component;
    };

    this.depComponent = function(mix) {
        if (utils.tool.getType(mix) == 'Object') {
            if (mix.__file || mix._compiled || mix.functional || mix._scopeId) {
                this.component(mix.name, mix);
                return ;
            }
            Object.keys(mix).forEach(i => {
                if (utils.tool.getType(mix[i]) == 'Object') {
                    if (mix[i].__file || mix[i]._compiled || mix[i].functional || mix[i]._scopeId) {
                        this.component(i, mix[i]);
                    } else {
                        this.depComponent(mix[i]);
                    }
                } else if (utils.tool.getType(mix[i]) == 'Array'){
                    this.depComponent(mix[i]);
                }
            });
        } else if (utils.tool.getType(mix) == 'Array') {
            mix.forEach(v => this.depComponent(v));
        }
    };

    this.use = function(t, param) {
        this.uses.push([t, param]);
    };

    this.run = function (vuep, debug) {
        this.instance = vuep; 
        
        if (debug && this.errorHandler) {
            vuep.config.errorHandler = this.errorHandler;
        }

        if (debug && this.warnHandler) {
            vuep.config.warnHandler = this.warnHandler;
        }

        vuep.config.performance = debug;

        vuep.config.devtools = debug;

        Object.keys(this.components).forEach(i => vuep.component(i, this.components[i]));
        this.uses.forEach(v => vuep.use(v[0], v[1]));
    };
};
export default vue;