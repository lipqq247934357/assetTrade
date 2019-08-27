<template>
    <div>
        <el-dialog
                :show-close="false"
                :visible.sync="centerDialogVisible"
                center
                custom-class="repay-pop-custom-class"
                top="10vh"
                width="60%">
            <!--title内容-->
            <template v-slot:title>
                <div :class="$style['pop-title']">
                    <div>息费减免</div>
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

                        <li><span>账单日期</span></li>
                        <li>
                            <span>{{ info.sDate }}</span>
                        </li>

                        <li><span>减免罚息</span></li>
                        <li>
                            <span><el-input size="mini" style="width: 40%;" v-model="reduceFX"/></span>
                        </li>

                        <li :class="$style['bottom-0']"><span>减免利息</span></li>
                        <li :class="$style['bottom-0']">
                            <span><el-input size="mini" style="width: 40%;" v-model="reduceLX"/></span>
                        </li>
                    </ul>
                    <div :class="$style['pop-footer']">
                        <el-button @click="calcu" plain size="mini" style="margin-right: 20px;" type="primary">计算
                        </el-button>
                        <el-button @click="reset" plain size="mini" type="primary">重置</el-button>
                    </div>

                    <ul :class="$style['reduce-table']">
                        <li><span>期次</span></li>
                        <li>
                            <span>应还日期</span>
                        </li>

                        <li><span>应还总金额</span></li>
                        <li>
                            <span>应还本金</span>
                        </li>

                        <li><span>应还利息</span></li>
                        <li>
                            <span>应还罚息</span>
                        </li>

                        <li><span>减免后需还罚息</span></li>
                        <li>
                            <span>减免后需还利息</span>
                        </li>

                        <li :class="$style['bottom-0']"><span>{{ info.sTerm }}</span></li>
                        <li :class="$style['bottom-0']">
                            <span>{{ info.sDate }}</span>
                        </li>

                        <li :class="$style['bottom-0']"><span>{{ info.sAmt }}</span></li>
                        <li :class="$style['bottom-0']">
                            <span>{{ info.sCapi }}</span>
                        </li>

                        <li :class="$style['bottom-0']"><span>{{ info.sInte }}</span></li>
                        <li :class="$style['bottom-0']">
                            <span>{{ info.saFine }}</span>
                        </li>

                        <li :class="$style['bottom-0']"><span>{{ newFX }}</span></li>
                        <li :class="$style['bottom-0']">
                            <span>{{ newLX }}</span>
                        </li>
                    </ul>


                    <div :class="$style['pop-footer']">
                        <el-button @click="closePop" plain size="mini" style="margin-right: 20px;" type="primary">取消
                        </el-button>
                        <el-button @click="submit" plain size="mini" type="primary">提交</el-button>
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
        props: ['show', 'listId', 'sTerm'], // 是否展示,key,期数
        data() {
            return {
                info: {},
                reduceFX: 0, // 减免罚息
                reduceLX: 0, // 减免利息
                newFX: '', // 新的罚息
                newLX: '' // 新的利息
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
                        this.reduceFX = 0; // 减免利息
                        this.reduceLX = 0; // 减免罚息
                        this.newFX = ''; // 新的罚息
                        this.newLX = ''; // 新的利息
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
            async getData() {
                let data = await this.$api.repaymentM.repaymentdetail({
                    listId: this.listId,
                    sTerm: this.sTerm
                });
                if (data.data.resultCode === '0000') {
                    this.info = data.data.bills[0];
                }
            },
            submit() {
                this.$confirm('是否确认息费减免?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.toSubmit();
                })
            },
            async toSubmit() { // 调用倒数第一个减免接口
                let data = await this.$api.repaymentM.repayRelief({
                    listId: this.listId, // 借据号
                    sTerm: this.sTerm, // 期数
                    dFine: this.reduceFX, // 减免罚息
                    dInte: this.reduceLX, // 减免利息
                    operName: this.userInfo.username // 获取当前用户(操作人)
                });
                if (data.data.resultCode === '0000') {
                    // 提交成功，需要页面重新发起ajax请求
                    this.$emit('update:reloadPlan', true);
                    this.centerDialogVisible = false;
                }
            },
            calcu() { // 计算减免后的值
                // 校验数据类型
                if (isNaN(Number(this.reduceLX)) || isNaN(Number(this.reduceFX))) {
                    this.$message.warning({message: '请输入正确的数据类型', duration: 2000});
                    return;
                }

                if (Number(this.reduceLX) === 0 && Number(this.reduceFX) === 0) {
                    this.$message.warning({message: '金额不能为0', duration: 2000});
                    return;
                }

                if (this.info.sInte < this.reduceLX || this.info.saFine < this.reduceFX) { // 如果减免的值大于原来值，报错
                    this.$message.warning({message: '减免后的利息和罚息不能小于0', duration: 2000});
                    return;
                }
                this.newLX = this.info.sInte - this.reduceLX;
                this.newFX = this.info.saFine - this.reduceFX;
            },
            reset() { // 重置弹框和内容
                this.reduceLX = this.reduceFX = 0;
                this.newLX = this.newFX = ''
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


    .reduce-table {
        width: 95%;
        margin: 0 auto 20px;
        border: 1px solid $color;
        padding: 0;
        display: flex;
        flex-wrap: wrap;

        li {
            width: 12.5%;
            list-style: none;
            line-height: 30px;
            border-bottom: 1px solid $color;
            border-right: 1px solid $color;
            display: inline-block;
            text-align: center;
            font-size: 14px;

            &:nth-child(8n) {
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
        width: 50%;
        margin: 30px auto 30px;
        display: flex;
        justify-content: space-around;

        :global {
            .el-button {
                box-shadow: 0 1px 0 #cccccc;
                border-radius: 5px;
            }
        }

    }

</style>
