let tmp = {
    alert: {
        base: function(options) {
            return this.app.alert.base(options);
        },
        prompt: function (options) {
            return this.app.alert.prompt(options)
        },
        confirm: function (options) {
            return this.app.alert.confirm(options);
        },
        confirmWithCheck: function (options) {
            if (ds.length !== 0) {
                return this.app.alert.confirm(options);
            } else {
                return this.app.alert.base({
                    title: '未选择',
                    ...getType(this.app.alert.typeKey, 'info')
                });
            }
        }
    }
};

tmp.alert.success = tmp.alert.ok = function(options) {
    return tmp.alert.base(tmpFunc(options, getType(this.app.alert.typeKey, 'success')));
};
tmp.alert.info =  function(options) {
    return tmp.alert.base(tmpFunc(options, getType(this.app.alert.typeKey, 'info')));
};
tmp.alert.error = tmp.alert.err = function(options) {
    return tmp.alert.base(tmpFunc(options, getType(this.app.alert.typeKey, 'error')));
};
tmp.alert.warning = tmp.alert.warn =  function(options) {
    return tmp.alert.base(tmpFunc(options, getType(this.app.alert.typeKey, 'warning')));
};
import utils from './base';
import _ from './_';
let tmpFunc = function(obj, sub = {}){
    return _.merge({}, 
        utils.getType(obj) === 'String' 
            ? {title: obj} : obj, sub)
}

let getType = function (key, v){
    let tmp = {};
    tmp[key] = v;
    return tmp;
}
export default tmp;