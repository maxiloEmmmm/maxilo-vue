import isString from 'lodash/isString';
export const route = function(){
    this.routes = [];

    this.more = [];
    this.middlewares = [];
    this.currentIndex = 0;
    this.mGroup = false;

    this.merge = (b) => {
        this.routes.push(...b);
    };

    this.add = (path, component) => {
        let params = {
            path,
            component,
            meta: {}
        };
        if(this.middleware.length != 0) {
            params['meta']['middlewares'] = this.middlewares;
            this.middlewares = [];
        }
        this.currentIndex = this.routes.push(params);
        return this.mgroup ? this.currentIndex : this;
    };

    this.group = (path, component, callback) => {
        let group = {
            path,
            meta: {}
        };

        if(component != '') {
            group.component = component;
        }

        if(this.middleware.length != 0) {
            group['meta']['middlewares'] = this.middlewares;
            this.middlewares = [];
        }

        let tmp = new routeItem();
        callback(tmp);
        group.children = tmp.getRoutes();
        this.currentIndex = this.routes.push(group);
        return this.mgroup ? this.currentIndex : this;
    };

    this.middleware = (ms) => {
        this.middlewares = [];
        if(isString(ms)) {
            ms = [ms];
        }

        this.middlewares = ms;
        return this;
    },

    this.middlewareGroup = (ms, rs) => {
        this.mgroup = true;
        if(isString(ms)) {
            ms = [ms];
        }
        let r = rs();
        r.forEach((v) => {
            this.currentIndex = v;
            this.addMiddleware(ms);
        });
        this.mgroup = false;
    };

    this.addMiddleware = (ms) => {
        if(this.currentIndex == 0) {return; }

        if(isString(ms)) {
            ms = [ms];
        }

        this.routes[this.currentIndex - 1]['meta'].middlewares = ms;
        this.currentIndex = 0;
    };

    this.getRoutes = () => {
        return this.routes;
    };
};

let routeItem = function() {
    this.items = [];
    this.add = (path, component) => {
        this.items.push({
            path,
            component,
        });
    };

    this.group = (path, component, callback) => {
        let group = {
            path
        };

        if(component != '') {
            group.component = component;
        }

        let tmp = new routeItem();
        callback(tmp);
        group.children = tmp.getRoutes();
        this.items.push(group);
    };

    this.getRoutes = () => {
        return this.items;
    };
};

export default route;