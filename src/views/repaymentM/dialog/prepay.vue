<template>
    <div>
        <el-dialog
                :show-close="false"
                :visible.sync="centerDialogVisible"
                center
                custom-class="repay-pop-custom-class"
                width="50%">
            <!--title内容-->
            <template v-slot:title>
                <div :class="$style['pop-title']">
                    <div>提前结清</div>
                </div>
            </template>
            <!--content-->
            <template>
                <div style="padding: 10px 0;">
                    <ul :class="$style['repay-table']">
                        <li><span>借据号</span></li>
                        <li>
                            <span>{{ info.listId }}</span>
                        </li>

                        <li><span>姓名</span></li>
                        <li>
                            <span>{{ info.custName }}</span>
                        </li>

                        <li><span>期次</span></li>
                        <li>
                            <span>{{ info.sTerm }}</span>
                        </li>

                        <li><span>应还本金</span></li>
                        <li>
                            <span>{{ info.sCapi }}</span>
                        </li>

                        <li><span>应还利息</span></li>
                        <li>
                            <span>{{ info.sInte }}</span>
                        </li>

                        <li><span>应还提前还款违约金</span></li>
                        <li>
                            <span>{{ info.sOtherFee }}</span>
                        </li>

                        <li :class="$style['bottom-0']"><span>本次应还总额</span></li>
                        <li :class="$style['bottom-0']">
                            <span>{{ info.sAmt }}</span>
                        </li>
                    </ul>
                    <div :class="$style['pop-footer']">
                        <span style="margin-right: 40px;">资金是否到账</span>
                        <el-radio label="Y" v-model="status">是</el-radio>
                        <el-radio label="N" style="margin-right: 40px;" v-model="status">否</el-radio>
                        <el-button @click="submit" plain size="mini" style="margin-right: 20px;" type="primary">确认还款
                        </el-button>
                        <el-button @click="closePop" plain size="mini" type="primary">取消</el-button>
                    </div>
                </div>
            </template>
            <!--footer内容-->
            <template v-slot:footer>
                <!--     注释掉footer在content中放footer           -->
                <!--        <span class="dialog-footer" slot="footer" style="display: inline-block;margin-top: -70px;">-->
                <!--          <el-button @click="centerDialogVisible = false" size="mini">取 消</el-button>-->
                <!--          <el-button @click="addUpdate" size="mini" type="primary" plain>确 定</el-button>-->
                <!--        </span>-->
            </template>
        </el-dialog>
    </div>
</template>
<script>

    import {mapGetters} from 'vuex'

    export default {
        props: ['show', 'listId', 'reloadPlan'], // 是否展示，key,是否重新加载
        data() {
            return {
                info: {},
                status: ''
            }
        },
        computed: {
            centerDialogVisible: {
                get() {
                    return this.show;
                },
                set(val) {
                    this.$emit('update:show', val);
                    setTimeout(() => {
                        this.info = {};
                        this.status = '';
                    }, 301)
                }
            },
            ...mapGetters(['userInfo'])
        },
        watch: {
            show(val) { // 当show为true的时候获取数据
                if (val) {
                    this.getData(); // 调用还款计划列表接口，传递期次

                }
            }
        },
        methods: {
            async getData() { // 使用倒数第三个提前结清接口查询数据
                let data = await this.$api.repaymentM.prepayTrial({
                    listId: this.listId
                });
                if (data.data.resultCode === '0000') {
                    this.info = data.data;
                }
            },
            submit() { // 提交
                if (!this.status) { // 未选择资金是否到账
                    this.$alert('请确认资金是否到账', '温馨提示', {confirmButtonText: '确定'});
                } else if (this.status === 'N') { // 资金未到账
                    this.$alert('资金未到账，不可操作提前还款', '温馨提示', {confirmButtonText: '确定'});
                } else { // 确认弹框
                    this.$confirm('是否确认提前结清?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.toSubmit();
                    })
                }
            },
            async toSubmit() { // 提交，和按期还款一样接口一样
                let data = await this.$api.repaymentM.repay({
                    listId: this.listId,
                    repayAmt: this.info.sAmt,
                    listType: '06', // 还款类型 05-按期还款，06-提前结清
                    operName: this.userInfo.username // 获取当前用户(操作人)

                });
                if (data.data.resultCode === '0000') {
                    // 提交成功，需要页面重新发起ajax请求
                    this.$emit('update:reloadPlan', true); // 更新弹框状态
                    this.$emit('update:perpayBtnShow', true); //更新按钮状态
                    this.centerDialogVisible = false;
                }
            },
            closePop() {
                this.centerDialogVisible = false;
            }
        }
    }


</script>
<style lang="scss" module>

    $color: #f5f5f5;
    .repay-table {
        width: 80%;
        margin: 0 auto 20px;
        border: 1px solid $color;
        padding: 0;
        display: flex;
        flex-wrap: wrap;

        li {
            width: 70%;
            list-style: none;
            line-height: 30px;
            border-bottom: 1px solid $color;
            border-right: 1px solid $color;
            display: inline-block;
            text-align: center;
            font-size: 14px;

            &:nth-child(odd) {
                width: 30%;
            }

            &:nth-child(2n) {
                border-right: 0;
            }
        }

        .bottom-0 {
            border-bottom: 0;
        }
    }

    :global {
        /*修改标题默认字体*/
        .header-cell-class-name {
            background: #f4f4f5 !important;
        }

        // 修改弹框默认样式
        .repay-pop-custom-class {

            .el-dialog__header {
                padding: 0;
            }

            .el-dialog__body {
                padding: 0;
            }

            .el-dialog__footer {
                padding: 0;
            }

        }
    }

    .pop-title {
        border-bottom: 2px solid #cccccc;
        overflow: hidden;

        & > div {
            float: left;
            margin: 10px 0 10px 10px;
        }
    }

    .pop-footer {
        width: 80%;
        margin: 30px auto 30px;

        :global {
            .el-button {
                box-shadow: 0 1px 0 #cccccc;
            }
        }
    }

</style>
