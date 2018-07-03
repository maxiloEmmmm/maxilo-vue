'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require('./mixs/component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vue = function vue() {
    this.name = 'vue';

    this.instance = null;

    this.components = {};

    this.uses = [];

    this.errorHandler = false;

    this.warnHandler = false;

    this.component = function (name, component) {
        if (!this.app.utils._.isString(name) || name == '') {
            if (this.app.utils.base.getType(name) == 'Object' && name.name) {
                name = name.name;
            } else {
                return;
            }
        }

        this.components[name] = component;
    };

    this.depComponent = function (mix) {
        var _this = this;

        if (this.app.utils.base.getType(mix) == 'Object') {
            if (mix.__file || mix._compiled || mix.functional) {
                this.component(mix.name, mix);
                return;
            }
            Object.keys(mix).forEach(function (i) {
                if (_this.app.utils.base.getType(mix[i]) == 'Object') {
                    if (mix[i].__file || mix[i]._compiled || mix[i].functional) {
                        _this.component(i, mix[i]);
                    } else {
                        _this.depComponent(mix[i]);
                    }
                } else if (_this.app.utils.base.getType(mix[i]) == 'Array') {
                    _this.depComponent(mix[i]);
                }
            });
        } else if (this.app.utils.base.getType(mix) == 'Array') {
            mix.forEach(function (v) {
                return _this.depComponent(v);
            });
        }
    };

    this.use = function (t, param) {
        this.uses.push([t, param]);
    };

    this.run = function (vue) {
        var _this2 = this;

        this.instance = vue;

        if (this.app.config.debug && this.errorHandler) {
            vue.config.errorHandler = this.errorHandler;
        }

        if (this.app.config.debug && this.warnHandler) {
            vue.config.warnHandler = this.warnHandler;
        }

        vue.config.performance = this.app.config.debug;

        vue.config.devtools = this.app.config.debug;

        Object.keys(this.components).forEach(function (i) {
            return vue.component(i, _this2.components[i]);
        });
        this.uses.forEach(function (v) {
            return vue.use(v[0], v[1]);
        });
        vue.mixin(_component2.default);
    };
};
exports.default = vue;