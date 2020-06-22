import maxiloVue from './core/libs/application';
import utils from './core/utils/index.js';

import router from './core/routerServiceProvider';
import store from './core/storeServiceProvider';
import i18n from './core/i18nServiceProvider';
import config from './core/configServiceProvider';
import utilsClass from './core/utilsServiceProvider';
import vue from './core/vueServiceProvider';

const maxiloVueModule = new maxiloVue();
try {
    maxiloVueModule.register(new config);
    maxiloVueModule.register(new utilsClass);
    maxiloVueModule.register(new store);
    maxiloVueModule.register(new router);
    maxiloVueModule.register(new i18n);
    maxiloVueModule.register(new vue);
} catch (error) {
    utils.system.notice(error);
}

export default (function(){
    return maxiloVueModule;
})();