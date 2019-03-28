<template>
    <div class="navbar">
        <el-dialog
                title="个人信息"
                :visible.sync="visib"
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
            visib: {
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
        width: 40%;
        text-align: right;
        div {
            height: 25px;

        }

    }
    .content {
        float: right;
        width: 57%;
        text-align: left;
        div {
            height: 25px;
        }
    }


</style>

