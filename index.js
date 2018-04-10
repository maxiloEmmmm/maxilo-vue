import "babel-polyfill";
import maxiloVue from './core/libs/application';
import utils from './core/utils';

import router from './core/router';
import store from './core/store';
import i18n from './core/i18n';
import validator from './core/validator';
import http from './core/http';
import config from './core/config';
import utilsClass from './core/utils.js';
import vue from './core/vue';

let maxiloVueModule = new maxiloVue();
try {
    maxiloVueModule.register(new config);
    maxiloVueModule.register(new utilsClass);
    maxiloVueModule.register(new router);
    maxiloVueModule.register(new store);
    maxiloVueModule.register(new i18n);
    maxiloVueModule.register(new validator);
    maxiloVueModule.register(new http);
    maxiloVueModule.register(new vue);
} catch (error) {
    utils.system.notice(error);
}

export default maxiloVueModule;