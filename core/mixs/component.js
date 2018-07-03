export default {
    methods: {
        async resetComponent(target, child = false) {
            child = child ? child : target.$children;

            let len = child.length;
            for (let i = 0; i < len; i++) {
                if (child[i].reset) {
                    await child[i].reset();
                }
                child[i].$validator.reset();

                if (child[i].$children.length != 0) {
                    this.resetComponent(null, child[i].$children);
                }
            }
        }
    }
}