<template>
    <div class="navbar">
        <el-dialog
                title="个人信息"
                :visible.sync="vis"
                width="20%">
            <div class="cc">
                <div class="name">
                    <div>用户名:</div>
                    <div>姓名:</div>
                    <div>手机号:</div>
                    <div>邮箱:</div>
                    <div>职位:</div>
                    <div></div>
                </div>
                <div class="content">
                    <div>111</div>
                    <div>222</div>
                    <div>333</div>
                    <div>444</div>
                    <div>555</div>
                    <div></div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props: ['dialogVisible'],
        computed: {
            vis: {
                get() {
                    return this.dialogVisible;
                },
                set(val) {
                    this.$emit('update:dialogVisible', val)
                }
            }
        }

    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>


    .cc {
        overflow: hidden;
        margin-top: -50px;
    }

    .name {
        float: left;
        width: 30%;
        text-align: right;
    }

    .content {
        float: right;
        width: 67%;
        text-align: left;
    }

    .name, .content {
        div {
            height: 28px;
        }
    }


    /*修改个人信息标题和x号水平*/
    /deep/ .el-dialog__header {
        padding: 5px 20px 10px;
    }

    /*修改弹框body部分*/
    /deep/ .el-dialog__body {
        padding: 30px 20px 10px;
    }

</style>

