<template>
    <div class="customer app-container">
        <!--search-->
        <collapse :class="$style['search']">
            <template v-slot:title>
                筛选条件
            </template>
            <template>
                <div>
                    <el-form :model="form" inline label-width="100px" ref="form">
                        <el-form-item label="借据编号" prop="listId">
                            <el-input placeholder="请输入借据编号" v-model="form.listId"></el-input>
                        </el-form-item>
                        <el-form-item label="借款人姓名" prop="custName">
                            <el-input placeholder="请输入借款人姓名" v-model="form.custName"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号" prop="idNo">
                            <el-input placeholder="请输入身份证号" v-model="form.idNo"></el-input>
                        </el-form-item>
                        <el-form-item>
                        </el-form-item>
                    </el-form>
                    <div :class="[$style['search-btn-box'],$style['top60']]">
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
                资产结清列表
            </blockTitle>
            <div :class="$style['table-content']">
                <el-table
                        :data="list"
                        :empty-text="emptyText"
                        border
                        header-cell-class-name="header-cell-class-name"
                        style="width: 100%"
                        v-loading="loading">
                    >
                    <el-table-column
                            label="渠道"
                            prop="channelName"
                    >
                    </el-table-column>
                    <el-table-column
                            label="借款人姓名"
                            prop="custName"
                    >
                    </el-table-column>
                    <el-table-column
                            label="身份证号"
                            prop="idNo"
                    >
                    </el-table-column>
                    <el-table-column
                            label="借据编号"
                            prop="listId"
                    >
                    </el-table-column>
                    <el-table-column
                            label="放款金额"
                            prop="loanAmount"
                    >
                    </el-table-column>
                    <el-table-column
                            :formatter="formatterSex"
                            label="放款开始日期"
                            prop="beginDate"
                    >
                    </el-table-column>
                    <el-table-column
                            label="放款结束日期"
                            prop="endDate"
                    >
                    </el-table-column>
                    <el-table-column
                            label="结清日期"
                            prop="payoffdate"
                    >
                    </el-table-column>
                    <el-table-column
                            :formatter="formatterData"
                            label="总期数"
                            prop="loanTerm"
                    >
                    </el-table-column>
                    <el-table-column
                            :formatter="formatterData"
                            label="是否结清"
                            prop="payoffflag"
                    >
                    </el-table-column>
                </el-table>
            </div>
            <!--pagination-->
            <div class="pagination">
                <pagination :limit.sync="pagInfo.pageSize"
                            :page-sizes="[10,20,30,50]"
                            :page.sync="pagInfo.currentPage"
                            :total="pagInfo.total"
                            @pagination="customerList"
                            layout="sizes, prev, pager, next, jumper"
                            v-if="pagInfo.total"
                ></pagination>
            </div>
        </div>
    </div>
</template>

<script>

    import pagination from '@/components/Pagination';
    import blockTitle from '@/components/blockTitle';
    import collapse from '@/components/collapse';
    import formatter from '@/components/mixins/formatter';

    export default {
        name: 'customer',
        components: {pagination, blockTitle, collapse},
        mixins: [formatter],
        data() {
            return {
                form: {
                    listId: '', // 借据编号
                    idNo: '', // 用户编号
                    custName: '' // 用户姓名
                },
                pagInfo: { // 分页数据
                    total: '',
                    currentPage: 1,
                    pageSize: 10
                },
                loading: false,
                list: [], // 表格内容
                trueVal: true,
                emptyText: ' ' // 没有数据的时候展示的文案
            };
        },
        created() {
        },
        methods: {
            async customerList() {
                //发起ajax请求，更改数据
                this.loading = true;
                let data = await this.$api.assetM.assetPayoffList({
                    pager: {
                        pageNo: this.pagInfo.currentPage,
                        recordNum: this.pagInfo.pageSize
                    },
                    body: this.form
                });
                this.list = data.data.list || [];
                this.pagInfo.total = Number(data.data.pager ? data.data.pager.totalNum : 0);
                this.list.length === 0 && (this.emptyText = '无数据');
                this.loading = false;
            },
            search() {
                this.pagInfo.currentPage = 1;
                this.customerList();
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        }
    }
</script>

<style lang="scss" module>

    @import '../../../styles/common/asset-list';

    div.top60 {
        :global {
            .el-button {
                margin: 60px 25px 0 !important;
            }
        }
    }

</style>
