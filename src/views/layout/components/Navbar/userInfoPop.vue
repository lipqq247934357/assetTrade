<template>
    <div class="navbar">
        <el-dialog
                title="个人信息"
                :visible.sync="vis"
                width="25%">
            <div class="cc">
                <table>
                    <tr>
                        <td>用户名:</td>
                        <td>1</td>
                    </tr>

                    <tr>
                        <td>姓名:</td>
                        <td>2</td>
                    </tr>

                    <tr>
                        <td>手机号:</td>
                        <td>3</td>
                    </tr>

                    <tr>
                        <td>邮箱:</td>
                        <td>4</td>
                    </tr>

                    <tr>
                        <td>职位:</td>
                        <td>5</td>
                    </tr>
                </table>
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


    tr {

        td:nth-child(1){
            width: 90px;
            text-align: right;
        }
        td:nth-child(2){
            border-left: 40px solid #ffffff;
        }
        line-height: 24px;
        height: 10px;
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

