import Mock from './mock'
import cloneDeep from 'lodash/cloneDeep';

const mockService = function(){
	this.mock   = Mock.mock;
	this.random = Mock.Random;

	this.urls = [];
	this.host = '';
	
	this.resolve = function (url, build, type = 'get', title = '这是什么呢'){
		this.urls.push({
			url,
			build,
			type,
			title
		});
	};

	this.resolveREG = function (url, res, type = 'get', title = '这是什么呢') {
		/* 'reg:' for rap service. */
		this.resolve('reg:' + url, res, type, title);
	};

	this.resolveHelper = {
		page(base, key = 'page') {
			this.resolveREG(base, (base.indexOf('?') === -1 ?
				'(\\?' : '(&') + key + '=[0-9]+)*');
		}
	};

	this.resolveRap = function (resource){
		let modules = resource.modules;
		if (!modules) {
			console.log('rap data is not isinvalid');
			return ;
		}

		const tmpSort = function (a, b) {
			return a.priority < b.priority;
		};

		const depPropertie = function(ds, pid = -1){
			let items = {};
			ds.forEach((v, k) => {
				let key = v.name;
				if (v.parentId == pid) {
					let isO = v.type == 'Object';
					if (isO || v.type == 'Array') {
						let tmp = depPropertie(cloneDeep(ds).sort(tmpSort), v.id);
						let objKey = key + (v.rule ? ('|' + v.rule) : '');
						items[objKey] = isO ? {} : [{}];
						if (isO) {
							items[objKey] = tmp;
						} else {
							items[objKey][0] = tmp;
						}
					}else {
						switch(v.type) {
							case 'Number': {
								v.value = Number(v.value);
							}break;
							case 'Boolean': {
								if(v.value == "true") {
									v.value = true;
								}else if(v.value == "false") {
									v.value = false;
								}else {
									v.value = !!v.value;
								}
							}break;
						}
						items[v.name + (v.rule ? ('|' + v.rule) : '')] = v.value;
					}
				}
			});
			return items;
		};

		modules.forEach(v => {
			v.interfaces.forEach($v => {
				this.resolve($v.url, depPropertie($v.properties.filter(v => v.scope == 'response')), $v.method, '[' + v.name + ' - ' + $v.name + ']');
			});
		});
	};

	this.make = function(){
		let host = /\/$/.test(this.host) ? this.host.slice(0, -1) : this.host;
		this.urls.forEach(v => {
			let url = v.url;
			if(/^reg:/.test(v.url)) {
				url = v.url.match(new RegExp('^reg:(.*?)$'))[1];
			}
			this.mock(new RegExp(host + (/^\//.test(url) ? '' : '/') + url + '(\\?.*?)?$', 'g'), v.type.toLowerCase(), v.build, v.title);
		});
	};

	this.run = function(){
		this.make();
	};
};

export default mockService;