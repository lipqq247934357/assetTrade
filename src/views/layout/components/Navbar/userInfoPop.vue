<template>
    <div class="navbar">
        <el-dialog
                :visible.sync="vis"
                title="个人信息"
                width="25%">
            <div :class="$style['cc']">
                <table>
                    <tr>
                        <td>用户名:</td>
                        <td>{{userInfo.username}}</td>
                    </tr>

                    <tr>
                        <td>登录用:</td>
                        <td>{{userInfo.loginname}}</td>
                    </tr>

                    <tr>
                        <td>角色:</td>
                        <td>{{userInfo.roleNameArr}}</td>
                    </tr>

                    <tr>
                        <td>邮箱:</td>
                        <td>{{userInfo.email}}</td>
                    </tr>
                    <tr>
                    </tr>
                </table>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        props: ['dialogVisible'],
        computed: {
            ...mapGetters(['userInfo']),
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

<style lang="scss" module>


    .cc {
        overflow: hidden;
        margin-top: -50px;

        tr {

            td:nth-child(1) {
                width: 90px;
                text-align: right;
            }

            td:nth-child(2) {
                border-left: 40px solid #ffffff;
            }

            line-height: 24px;
            height: 10px;
        }

    }

    :global {
        /*修改个人信息标题和x号水平*/
        .el-dialog__header {
            padding: 5px 20px 10px;
        }

        /*修改弹框body部分*/
        .el-dialog__body {
            padding: 30px 20px 10px;
        }
    }

</style>

