import maxiloVue from '../index.js';
import './component';
import App from './pages/test/one.vue';
maxiloVue.targetComponent = App;

import component from './store/test';
maxiloVue.store.once('maxilo-bootstrap-component', component);
maxiloVue.run();