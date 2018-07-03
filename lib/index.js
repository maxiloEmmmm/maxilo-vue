'use strict';

var _application = require('./core/libs/application');

var _application2 = _interopRequireDefault(_application);

var _index = require('./core/utils/index.js');

var _index2 = _interopRequireDefault(_index);

var _router = require('./core/router');

var _router2 = _interopRequireDefault(_router);

var _store = require('./core/store');

var _store2 = _interopRequireDefault(_store);

var _i18n = require('./core/i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _validator = require('./core/validator');

var _validator2 = _interopRequireDefault(_validator);

var _http = require('./core/http');

var _http2 = _interopRequireDefault(_http);

var _config = require('./core/config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('./core/utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _vue = require('./core/vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var maxiloVueModule = new _application2.default();
try {
    maxiloVueModule.register(new _config2.default());
    maxiloVueModule.register(new _utils2.default());
    maxiloVueModule.register(new _store2.default());
    maxiloVueModule.register(new _router2.default());
    maxiloVueModule.register(new _i18n2.default());
    maxiloVueModule.register(new _validator2.default());
    maxiloVueModule.register(new _http2.default());
    maxiloVueModule.register(new _vue2.default());
} catch (error) {
    _index2.default.system.notice(error);
}

module.exports = maxiloVueModule;
