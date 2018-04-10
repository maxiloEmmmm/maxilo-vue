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
        return new VueI18n({
            locale: this.locale == '' ? 'zh_cn' : this.locale,
            messages: this.messages,
        });
    };
};
export default i18n;

