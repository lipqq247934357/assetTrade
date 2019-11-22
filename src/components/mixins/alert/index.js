export default {
    methods: {
        alertParamterError() {
            this.$alert('参数异常,没有找到id对应的数据，点击确定返回上一页', '提示', {
                showClose: false,
                confirmButtonText: '确定',
                callback: () => {
                    window.history.back()
                }
            });
        }
    }
}
