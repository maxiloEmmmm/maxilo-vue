import maxiloVue from '../../index.js';

import testOne from './test/one.vue';


maxiloVue.vue.component(testOne.name, testOne);
//maxiloVue.vue.depComponent({testOne});

//example for dep

// maxiloVue.vue.depComponent({
//     testOne, 
//     a: b, 
//     a1: [b2,b3,b4], 
//     c: {
//         d1,
//         d2,
//         d3,
//         d4: d5
//     }
// });

//like this
// maxiloVue.vue.component('testOne', testOne);
// maxiloVue.vue.component('a', b);
// maxiloVue.vue.component(b2.name, b2);
// maxiloVue.vue.component(b3.name, b3);
// maxiloVue.vue.component(b4.name, b4);
// maxiloVue.vue.component(d1, d1);
// maxiloVue.vue.component(d2, d2);
// maxiloVue.vue.component(d3, d3);
// maxiloVue.vue.component(d4, d5);