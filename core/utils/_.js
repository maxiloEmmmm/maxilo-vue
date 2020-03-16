


import base from './base'


export default {
    isArray: Array.isArray,
    merge(){
        return Object.assign({}, ...arguments)
    },
    //lang
    isString(item){
        return base.getType(item) === 'String'
    },
    isObject(item){
        return base.getType(item) === 'Object'
    },
}