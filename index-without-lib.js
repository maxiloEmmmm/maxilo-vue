import maxiloVue from './core/libs/application';
import utils from './core/utils/index.js';

import router from './core/router';
import store from './core/store';
import i18n from './core/i18n';
import config from './core/config';
import utilsClass from './core/utils.js';
import vue from './core/vue';
import alert from './core/alert';

const maxiloVueModule = new maxiloVue();
try {
    maxiloVueModule.register(new config);
    maxiloVueModule.register(new utilsClass);
    maxiloVueModule.register(new store);
    maxiloVueModule.register(new router);
    maxiloVueModule.register(new i18n);
    maxiloVueModule.register(new alert);
    maxiloVueModule.register(new vue);
} catch (error) {
    utils.system.notice(error);
}

export default (function(){
    return maxiloVueModule;
})();