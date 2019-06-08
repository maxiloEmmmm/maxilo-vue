export default {
    data: function (vue, fieldsKey = 'dataForm', viewKey = 'dataView') {
        this.vueInstance = vue;
        this.mode = '';
        this.attribute = [];
        this.modeOmit = [];
        this.runTime = {}

        this.fill = async (ds) => {
            await this.vueInstance.$nextTick();
            Object.keys(this.vueInstance[fieldsKey]).forEach(v => {
                this.vueInstance.$set(this.vueInstance[fieldsKey], v, ds[v]);
            });
            return this;
        }

        this.change = async (mode, data = {}) => {
            await this.vueInstance.$nextTick();
            this.mode = mode;
            let runTimeKey = 'is' + mode.substring(0,1).toUpperCase()+mode.substring(1);
            Object.keys(this.runTime).forEach(k => {
                if(runTimeKey != k) {
                    this.vueInstance.$set(this.runTime, k, false);
                }
            })
            this.vueInstance.$set(this.runTime, runTimeKey, true);
            /* 表单存储 */
            let filter = this.modeOmit[mode] !== undefined ? this.modeOmit[mode] : [];
            let attrs = this.attribute.filter(v => filter.indexOf(v) === -1);
            attrs.forEach(v => {
                this.vueInstance.$set(this.vueInstance[fieldsKey], v, data.hasOwnProperty(v) ? data[v] : '');
            });
            await this.vueInstance.$nextTick();

            /* 表单显示 */
            this.vueInstance[viewKey] = {};
            Object.keys(this.vueInstance[fieldsKey]).forEach(v => {
                this.vueInstance.$set(this.vueInstance[viewKey], v, true);
            });
            return this;
        };

        this.changeSection = () => {

        }
    }
}