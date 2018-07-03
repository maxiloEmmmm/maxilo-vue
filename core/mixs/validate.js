export default {
    methods: {
        async areaValidate(target, keys = [], child = false){
            child = child ? child : target.$children;

            let len = child.length;
            let result = true;
            for (let i = 0; i < len; i++) {
                if (keys.findIndex(q => q._uid == child[i]._uid) != -1 || child[i].$validator === undefined) {
                    continue;
                }

                let sr = await child[i].$validator.validateAll();
                if (sr) {
                    if (child[i].$children.length != 0) {
                        if (!await this.areaValidate(null, keys, child[i].$children)) {
                            result = false;
                        }
                    }
                } else {
                    result = false;
                }
            }
            return result;
        },
        async clearTipValidate(target, child = false) {
            child = child ? child : target.$children;

            let len = child.length;
            for (let i = 0; i < len; i++) {
                await child[i].$validator.reset();
                if (child[i].$children.length != 0) {
                    await this.clearTipValidate(null, child[i].$children);
                }
            }
        }
    }
};