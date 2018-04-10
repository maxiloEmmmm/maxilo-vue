const vue = function () {
    this.name = 'vue';

    this.components = {};

    this.uses = [];

    this.errorHandler = false;

    this.warnHandler = false;

    this.component = function (name, component) {
        if (!this.app.utils._.isString(name) || name == '') {
            if (this.app.utils.base.getType(name) == 'Object' && name.name) {
                name = name.name;
            }else {return ;}
        }
        
        this.components[name] = component;
    };

    this.depComponent = function(mix) {
        if (this.app.utils.base.getType(mix) == 'Object') {
            if (mix.__file) {
                this.component(mix.name, mix);
                return ;
            }
            Object.keys(mix).forEach(i => {
                if (this.app.utils.base.getType(mix) == 'Object') {
                    if (mix[i].__file) {
                        this.component(i, mix[i]);
                    } else {
                        this.depComponent(mix[i]);
                    }
                } else if (this.app.utils.base.getType(mix[i]) == 'Array'){
                    this.depComponent(mix[i]);
                }
            });
        } else if (this.app.utils.base.getType(mix[i]) == 'Array') {
            mix[i].forEach(v => this.depComponent(v));
        }
    };

    this.use = function(t) {
        this.uses.push(t);
    };

    this.run = function (vue) {
        if (this.app.config.debug && this.errorHandler) {
            vue.config.errorHandler = this.errorHandler;
        }

        if (this.app.config.debug && this.warnHandler) {
            vue.config.warnHandler = this.warnHandler;
        }

        vue.config.performance = this.app.config.debug;

        vue.config.devtools = this.app.config.debug;

        Object.keys(this.components).forEach(i => vue.component(i, this.components[i]));
        this.uses.forEach(v => vue.use(v));
    };
};
export default vue;