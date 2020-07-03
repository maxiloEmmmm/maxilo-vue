import VueI18n from 'vue-i18n';

export default function(){
    this.register = function(app){
        app.bind("i18n", function(app){
            return new VueI18n({
                locale: app.make("config").locale
            })
        })
    }

    this.boot = function(app){
        app.vue.use(VueI18n);

        Object.defineProperty(app.vue.prototype, '$tts', {
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

        app.addHook('i18n', app.make("i18n"))
    }
}