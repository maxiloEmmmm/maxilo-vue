import Mock from './mock'
import { http } from 'libs/http'

let urlHead = http.defaults.baseURL;

let resolveREG = function(t, q) {
	//console.log('^' + urlHead.replace(/([\/\.\$\?])/g, '\\$1') + t.replace(/([\/\.\$\?])/g, '\\$1') + q.replace(/([\/])/g, '\\$1') + '$')
	return new RegExp('^' + urlHead.replace(/([\/\.\$\?])/g, '\\$1') + t.replace(/([\/\.\$\?])/g, '\\$1') + q.replace(/([\/])/g, '\\$1') + '$', 'i')
};

let resolve = function(t) {
	//console.log(t)
	return urlHead + t
};

let core = Mock.mock;

let random = Mock.Random

let resolveHelper = {
	page(base, key = 'page'){
		return resolveREG(base, (base.indexOf('?') === -1 ?
									'(\\?' : '(&') + key + '=[0-9]+)*');
	}
};

export default {
	http,
	resolve,
	resolveREG,
	resolveHelper,
	core,
	random
};