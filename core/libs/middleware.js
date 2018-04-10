import store from 'store';
import middlewares from 'route/middleware';
import { helpers } from 'libs/helpers';

export const middleware = function(router, middlewares){
	router.beforeEach(bootstrap);
};

const bootstrap = function(to, from, next) {
	let ms = middlewares[helpers.getSystemKey() + 'Middlewares'];
	let toMiddle = [];
	to.matched.forEach((v) => {
		if(v.meta.middlewares && v.meta.middlewares != 0) {
			toMiddle.push(...v.meta.middlewares);
		}
	});

	let n = true;
	let len = toMiddle.length;
    if(len != 0) {
    	for(let i = 0; i < len; i++) {
    		let v = toMiddle[i];
    		if(ms[v]) {
    			if(!ms[v](store, to, from, next)) {
    				n = false;
    				break;
    			}
    		}
    	}
    	n ? next() : '';
    }else {next();}
};