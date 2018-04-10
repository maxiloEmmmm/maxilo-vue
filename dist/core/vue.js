'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vue = function vue() {
    this.name = 'vue';

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
            if (mix.__file) {
                this.component(mix.name, mix);
                return;
            }
            (0, _keys2.default)(mix).forEach(function (i) {
                if (_this.app.utils.base.getType(mix) == 'Object') {
                    if (mix[i].__file) {
                        _this.component(i, mix[i]);
                    } else {
                        _this.depComponent(mix[i]);
                    }
                } else if (_this.app.utils.base.getType(mix[i]) == 'Array') {
                    _this.depComponent(mix[i]);
                }
            });
        } else if (this.app.utils.base.getType(mix[i]) == 'Array') {
            mix[i].forEach(function (v) {
                return _this.depComponent(v);
            });
        }
    };

    this.use = function (t) {
        this.uses.push(t);
    };

    this.run = function (vue) {
        var _this2 = this;

        if (this.app.config.debug && this.errorHandler) {
            vue.config.errorHandler = this.errorHandler;
        }

        if (this.app.config.debug && this.warnHandler) {
            vue.config.warnHandler = this.warnHandler;
        }

        vue.config.performance = this.app.config.debug;

        vue.config.devtools = this.app.config.debug;

        (0, _keys2.default)(this.components).forEach(function (i) {
            return vue.component(i, _this2.components[i]);
        });
        this.uses.forEach(function (v) {
            return vue.use(v);
        });
    };
};
exports.default = vue;