import base from './base';
export default {
    isNotEmpty(v){
        return !this.isEmpty(v);
    },
    isEmpty(v){
        let type = base.getType(v);
        if (type === 'Number' || type === 'Function' || type === 'Boolean') {
            return false;
        }else if(type === 'String' && v.length != 0) {
            return false;
        }else if(type === 'Object'){
            return Object.keys(v).length === 0;
        }else if (type === 'Set' || type === 'Map'){
            return v.size === 0;
        }else if(type === 'Array') {
            return v.length === 0;
        }
        //Null or Undefined
        return true;
    }
};