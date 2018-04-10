<template>
    <div>
        <h1>测试i18n: {{ $t('base.key1') }} (看到value1 而不是base.key1)</h1>
        <h1>测试路由: /path/to 得到当前页面</h1>
        <button @click="t">测试store: 点击后填充store 刷新页面, store内容依旧存在.</button>
        <div>
            测试验证1: 
            <input 
                type="text" 
                v-model="d" 
                data-vv-name="测试验证"
                v-validate="'required|numeric|min_value:5'"
            />
            <div v-show="errors.has('测试验证')" class="warning">{{ errors.first('测试验证') }}.</div>
        </div>
        <div>
            <h1>测试mock(将.mock.example 复制一份重命名 .mock):</h1>
            请求: {{ u }}
            方法: POST
            响应: {{ response ? '√' + (response) : '✘' }}
        </div>
    </div>
</template>

<script>
import { TEST } from '../../api/test';
export default {
    data(){
        return {
            d: '',
            response: '',
            u: TEST.MOCK
        };
    },
    async mounted(){
        let { data } = await this.$http.post(this.u);
        this.response = JSON.stringify(data);
    },
    methods: {
        t(){
            this.$store.dispatch('testAuth/test', {u:123});
        }
    }
}
</script>

<style>
    .warning {
        color: red;
    }
</style>


