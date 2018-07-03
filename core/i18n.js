import VueI18n from 'vue-i18n';
const i18n = function () {
    this.name = 'i18n';
    this.locale = '';
    this.messages = {};

    this.add = function(key, ls){
        if(this.app.utils._.isString(key) && !this.messages[key]) {
            this.messages[key] = this.app.utils._.isObject(ls) ? ls : {};
        }
    };

    this.run = function (vue) {
        vue.use(VueI18n);

        Object.defineProperty(vue.prototype, '$tts', {
            get() {
                return function (...tmp) {
                    var len = tmp.length, msg = '';
                    for (var i = 0; i < len; i++) {
                        msg += Array.isArray(tmp[i]) ? this.$t(tmp[i][0], ...tmp[i].slice(1, -1)) : this.$t(tmp[i]);
                    }
                    return msg;
                };
            },
        });
        return new VueI18n({
            locale: this.locale == '' ? this.app.config.locale : this.locale,
            messages: this.messages,
        });
    };
};
export default i18n;

