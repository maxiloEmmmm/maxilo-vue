
export default {
    getType(o){
        let str = Object.prototype.toString.call(o);
        return str.slice(8, str.length-1);
    },
    env(ds, d){
        if (ds === undefined || ds === '') {
            return d;
        }
        return process.env.DEVELOP ? ds : d;
    }
}