export default {
    getType(o){
        let str = Object.prototype.toString.call(o);
        return str.slice(8, str.length-1);
    }
}