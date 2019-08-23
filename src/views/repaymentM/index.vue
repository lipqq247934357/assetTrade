<template>
    <div class="channel app-container">
        <!--search-->
        <collapse :class="$style['search']">
            <template v-slot:title>
                筛选条件
            </template>
            <template>
                <div>
                    <el-form :model="form" inline ref="form">
                        <el-form-item label="借据号" prop="listId">
                            <el-input placeholder="请输入借据号" v-model="form.listId"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名" prop="custName">
                            <el-input placeholder="请输入姓名" v-model="form.custName"></el-input>
                        </el-form-item>
                        <el-form-item label="证件号码" prop="idNo">
                            <el-input placeholder="请输入证件号码" v-model="form.idNo"></el-input>
                        </el-form-item>
                    </el-form>
                    <div :class="$style['search-btn-box']">
                        <el-button @click="search" icon="el-icon-search" size="medium" type="primary" v-waves>查询
                        </el-button>
                        <el-button @click="resetForm('form')" icon="el-icon-refresh" size="medium" type="primary"
                                   v-waves>重置
                        </el-button>
                    </div>
                </div>
            </template>
        </collapse>
        <!--table-->
        <div :class="$style['content']">
            <blockTitle :hide="trueVal">
                还款管理列表
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
                            min-width="197px"
                            label="借据号"
                            prop="listId">
                    </el-table-column>
                    <el-table-column
                            label="姓名"
                            prop="custName">
                    </el-table-column>
                    <el-table-column
                            min-width="150px"
                            label="证件号码"
                            prop="idNo">
                    </el-table-column>
                    <el-table-column
                            label="渠道"
                            prop="channelName">
                    </el-table-column>
                    <el-table-column
                            label="金融产品"
                            prop="prodName">
                    </el-table-column>
                    <el-table-column
                            min-width="90px"
                            :formatter="formatAmount"
                            label="放款金额"
                            prop="loanAmount">
                    </el-table-column>
                    <el-table-column
                            min-width="90px"
                            :formatter="formatAmount"
                            label="贷款余额"
                            prop="bal">
                    </el-table-column>
                    <el-table-column
                            min-width="95px"
                            label="放款时间"
                            prop="beginDate">
                    </el-table-column>
                    <el-table-column
                            :formatter="formatRepayMethod"
                            label="还款方式"
                            prop="repayMethod">
                    </el-table-column>
                    <el-table-column
                            label="贷款期限"
                            prop="loanTerm">
                    </el-table-column>
                    <el-table-column
                            :formatter="formatAcFlag"
                            label="借据状态"
                            prop="acFlag">
                    </el-table-column>
                    <el-table-column
                            class-name="operate"
                            label="操作"
                            min-width="200px">
                        <template slot-scope="scope">
                            <el-button @click="detail(scope.row)" size="small" type="primary">还款详情</el-button>
                            <el-button @click="record(scope.row)" size="small" type="primary">还款明细</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!--pagination-->
            <div class="pagination">
                <pagination :limit.sync="pagInfo.pageSize"
                            :page-sizes="[10,20,30,50]"
                            :page.sync="pagInfo.currentPage"
                            :total="pagInfo.total"
                            @pagination="getRepaymentList"
                            layout="sizes, prev, pager, next, jumper"
                            v-if="pagInfo.total"
                ></pagination>
            </div>
        </div>
    </div>
</template>

<script>

    import waves from '@/directive/waves';
    import pagination from '@/components/Pagination/index';
    import blockTitle from '@/components/blockTitle/index';
    import collapse from '@/components/collapse/index';
    import formatter from '@/components/mixins/formatter';

    export default {
        name: 'channel',
        components: {pagination, blockTitle, collapse},
        directives: {waves},
        mixins: [formatter],
        data() {
            return {
                form: {
                    listId: '', // 借据号
                    custName: '', // 姓名
                    idNo: '' // 证件号码
                },
                pagInfo: { // 分页数据
                    total: '',
                    currentPage: 1,
                    pageSize: 10
                },
                loading: false,
                data: [], // 表格数据
                trueVal: true
            };
        },
        activated() {
            this.getRepaymentList();// 1.每次进入页面获取数据
        },
        methods: {
            async getRepaymentList() { //发起ajax请求，更改数据
                this.loading = true;
                let data = await this.$api.repaymentM.repaymentquery({
                    // let data = await this.$api.configM.channelquery({
                    body: {
                        ...this.form,
                    },
                    pager: {
                        pageNo: this.pagInfo.currentPage,
                        pageSize: this.pagInfo.pageSize
                    },
                });
                if (data.data.resultCode === '0000') {
                    data = data.data;
                    this.data = data.list;
                    this.pagInfo.total = data.pager.recordNum;
                }
                this.loading = false;
            },
            search() { // 点击查询按钮
                this.pagInfo.currentPage = 1;
                this.getRepaymentList();
            },
            resetForm(formName) { // 重置表单内容
                this.$refs[formName].resetFields();
            },
            detail(row) { // 进入详情页面,根据借据号查询
                this.$router.push({path: "/repayment/detail", query: {id: row.listId}});
            },
            record(row) { // 进入明细页面,根据借据号查询
                this.$router.push({path: "/repayment/recordlist", query: {id: row.listId}});
            }
        }
    }
</script>

<style lang="scss" module>
    @import '../../styles/common/config-list';
</style>
