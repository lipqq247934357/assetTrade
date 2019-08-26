<template>
    <div class="detail app-container">
        <!--    借据基本信息    -->
        <div>
            <template>
                <div :class="$style['detail-list']">
                    <div :class="$style['title']">
                        借据基本信息
                    </div>
                    <ul>
                        <li><span>借据号</span></li>
                        <li>
                            <span>{{ info.listId }}</span>
                        </li>

                        <li><span>渠道</span></li>
                        <li>
                            <span>{{ info.channelName }}</span>
                        </li>

                        <li><span>姓名</span></li>
                        <li>
                            <span>{{ info.custName }}</span>
                        </li>

                        <li><span>金融产品</span></li>
                        <li>
                            <span>{{ info.prodName }}</span>
                        </li>

                        <li><span>证件号码</span></li>
                        <li>
                            <span>{{ info.idNo }}</span>
                        </li>

                        <li><span>放款金额</span></li>
                        <li>
                            <span>{{ formatAmount(0,0,info.loanAmount) }}</span>
                        </li>

                        <li><span>贷款期限</span></li>
                        <li>
                            <span>{{ info.loanTerm }}</span>
                        </li>

                        <li><span>借据状态</span></li>
                        <li>
                            <span>{{ formatAcFlag(0,0,info.acFlag) }}</span>
                        </li>

                        <li><span>放款时间</span></li>
                        <li>
                            <span>{{info.beginDate}}</span>
                        </li>

                        <li><span>贷款余额</span></li>
                        <li>
                            <span>{{ formatAmount(0,0,info.bal) }}</span>
                        </li>

                        <li :class="$style['bottom-0']"><span>还款方式</span></li>
                        <li :class="$style['bottom-0']">
                            <span>{{ formatRepayMethod(0,0,info.repayMethod) }}</span>
                        </li>

                        <li :class="$style['bottom-0']"><span>当前所属期次</span></li>
                        <li :class="$style['bottom-0']">
                            <span>{{ info.sTerm }}</span>
                        </li>
                    </ul>
                </div>
            </template>

            <!--    还款计划    -->
            <div :class="[$style['content'],$style['repayment-list']]">
                <blockTitle :hide="trueVal">
                    还款计划
                    <el-button @click="prepay" size="mini" type="primary" v-if="prepayBtnShow">提前结清
                    </el-button>
                </blockTitle>
                <div :class="$style['table-content']">
                    <el-table
                            :data="data"
                            border
                            empty-text="无数据"
                            header-cell-class-name="header-cell-class-name"
                            style="width: 100%"
                            v-loading="loading">
                        <el-table-column
                                label="期次"
                                prop="sTerm">
                        </el-table-column>
                        <el-table-column
                                label="还款状态"
                                prop="compreStatus">
                        </el-table-column>
                        <el-table-column
                                label="应还日期"
                                min-width="95px"
                                prop="sDate">
                        </el-table-column>
                        <el-table-column
                                label="应还本金"
                                prop="sCapi">
                        </el-table-column>
                        <el-table-column
                                label="应还利息"
                                prop="sInte">
                        </el-table-column>
                        <el-table-column
                                label="应还罚息"
                                prop="saFine">
                        </el-table-column>
                        <el-table-column
                                label="应还提前还款违约金"
                                prop="sOtherFee">
                        </el-table-column>
                        <el-table-column
                                label="实还日期"
                                prop="rDate">
                        </el-table-column>
                        <el-table-column
                                label="实还本金"
                                prop="rCapi">
                        </el-table-column>
                        <el-table-column
                                label="实还利息"
                                prop="rInte">
                        </el-table-column>
                        <el-table-column
                                label="实还罚息"
                                prop="raFine">
                        </el-table-column>
                        <el-table-column
                                label="实还提前还款违约金"
                                prop="rOtherFee">
                        </el-table-column>
                        <el-table-column
                                class-name="operate"
                                label="操作"
                                min-width="200px">
                            <template slot-scope="scope">
                                <el-button v-if="scope.row.payoffflag === '00'" @click="reduce(scope.row)" size="small" type="primary">息费减免</el-button>
                                <el-button v-if="scope.row.payoffflag === '00'" @click="settle(scope.row)" size="small" type="primary">按期还款</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <!--      返回     -->
                <div :class="$style['back']">
                    <el-button @click="back" size="small" style="width: 100px;" type="primary">
                        <span style="font-size: 14px;">返&nbsp;回</span>
                    </el-button>
                </div>
            </div>
        </div>
        <!--提前结清-->
        <!--    key,重新加载，弹框展示    -->
        <prepayDialog :listId="listId" :reloadPlan.sync="reloadPlan" :show.sync="showPrepay" :perpayBtnShow.sync="prepayBtnShow"/>
        <!--按期还款-->
        <!--  sTerm:期数     -->
        <settleDialog :listId="listId" :reloadPlan.sync="reloadPlan" :sTerm="sTerm" :show.sync="showSettle"/>
        <!--税费减免-->
        <reduceDialog :listId="listId" :reloadPlan.sync="reloadPlan" :sTerm="sTerm" :show.sync="showReduce"/>
    </div>
</template>

<script>

    import blockTitle from '@/components/blockTitle/index';
    import formatter from '@/components/mixins/formatter';
    // 提前结清
    import prepayDialog from '@/views/repaymentM/dialog/prepay';
    // 按期还款
    import settleDialog from '@/views/repaymentM/dialog/settle';
    // 息费减免
    import reduceDialog from '@/views/repaymentM/dialog/reduce';

    export default {
        name: 'assetDetail',
        components: {blockTitle, prepayDialog, settleDialog, reduceDialog},
        mixins: [formatter],
        data() {
            return {
                info: {}, // 列表详情数据
                listId: '', // key
                sTerm: '', // 期数
                loading: false,
                data: [], // 表格数据
                trueVal: true,
                reloadPlan: '', // 数据发生变化重新加载数据
                showReduce: false, // 展示息费减免
                showPrepay: false, // 展示提前结清
                showSettle: false, // 展示按期还款
                prepayBtnShow: false // 是否展示提前结清按钮
            }
        },
        activated() {
            this.listId = this.$route.query.id; // 获取url上的listId
            this.getInfo(); // 获取还款详情
            this.getRepaymentdetail();// 获取还款计划页面数据
        },
        watch: {
            reloadPlan(val) {
                if (val) { // 当弹框提交的内容发生改变重新加载数据
                    this.getRepaymentdetail();
                    this.reloadPlan = false;
                }
            }
        },
        methods: {
            async getInfo() { // 根据listId获取借据基本数据
                let data = await this.$api.repaymentM.repaymentquery({
                    body: {
                        listId: this.listId
                    },
                    pager: {
                        pageNo: '',
                        pageSize: ''
                    },
                });
                if (data.data.resultCode === '0000') {
                    this.info = data.data.list[0];
                    console.log(this.info);
                    if (this.info.acFlag !== 'e') {
                        this.prepayBtnShow = true;
                    }
                }
            },
            async getRepaymentdetail() { //根据listId获取还款计划list
                this.loading = true;
                let data = await this.$api.repaymentM.repaymentdetail({
                    listId: this.listId
                });
                if (data.data.resultCode === '0000') {
                    // 对data进行处理，新增一个字段，表示数据的状态
                    this.handleData(data.data.bills);
                    this.data = data.data.bills;
                }
                this.loading = false;
            },
            settle(row) { // 按期还款
                this.sTerm = row.sTerm;
                this.showSettle = true;
            },
            reduce(row) { // 息费减免
                this.sTerm = row.sTerm;
                this.showReduce = true;
            },
            prepay() { // 提前结清
                this.showPrepay = true;
            },
            back() {
                this.$router.go(-1);
            },
            handleData(data) {
                for (let item of data) {
                    item.compreStatus = '';
                    if (item.payoffflag === '00') { // 未结清
                        if (item.overflag === '0') {
                            item.compreStatus = '正常';
                        } else {
                            item.compreStatus = '逾期';
                        }
                    } else {
                        if (item.payoffflag === '10') {
                            item.compreStatus = '正常结清';

                        } else if (item.payoffflag === '20') {
                            item.compreStatus = '提前结清';
                        } else {
                            item.compreStatus = '逾期结清';
                        }
                    }
                }
            }
        }
    }


</script>

<style lang="scss" module>
    @import '../../styles/common/config-list';

    $color: #f5f5f5;

    .detail-list {
        margin: 0 auto;
        background: #fff;
        padding: 30px 0 15px;

        > .title {
            margin: -10px 0 20px 20px;
            font-weight: 500;
        }

        ul {
            width: 90%;
            margin: 0 auto 20px;
            border: 1px solid $color;
            padding: 0;
            display: flex;
            flex-wrap: wrap;

            li {
                width: 35%;
                list-style: none;
                line-height: 30px;
                border-bottom: 1px solid $color;
                border-right: 1px solid $color;
                display: inline-block;
                text-align: center;
                font-size: 14px;

                &:nth-child(odd) {
                    width: 15%;
                }

                &:nth-child(4n) {
                    border-right: 0;
                }
            }

            .bottom-0 {
                border-bottom: 0;
            }
        }
    }

    .back {
        width: 100%;
        text-align: center;
        padding-top: 30px;
        padding-bottom: 40px;
    }


</style>
