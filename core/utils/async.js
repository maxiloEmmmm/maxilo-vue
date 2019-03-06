import diy from './diy';
export default {
    normalNotice: async function (ds, s = 0, sMsg = {}) {
        if (ds.status === s) {
            await this.app.alert.base({ type: 'success', title: '操作成功' });
        } else if (ds.status === 600) {
            await this.app.alert.base({ type: 'warning', title: '信息有误!', text: this.$utils.lumen.validateErr(ds.err), time: 1000, html: true });
        } else {
            await this.app.alert.base({ type: 'warning', title: sMsg[ds.status] !== undefined ? sMsg[ds.status] : '操作失败' });
        }
    }
}