<template>
    <div class="credit app-container">
        <!--search-->
        <collapse class="search">
            <template v-slot:title>
                筛选条件
            </template>
            <template>
                <div>
                    <el-form :model="form" inline label-width="100px" ref="form">
                        <el-form-item label="渠道名称" prop="channelNo">
                            <el-input placeholder="请输入渠道名称" v-model="form.channelNo"></el-input>
                        </el-form-item>
                        <el-form-item label="借款人姓名" prop="custName">
                            <el-input placeholder="请输入借款人姓名" v-model="form.custName"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号" prop="idNo">
                            <el-input placeholder="请输入身份证号" v-model="form.idNo"></el-input>
                        </el-form-item>
                        <el-form-item label="申请日期">
                            <el-date-picker
                                    class="datetime"
                                    placeholder="请选择日期"
                                    type="date"
                                    v-model="form.startDate"
                                    value-format="yyyy-MM-dd">
                            </el-date-picker>
                            &nbsp;-&nbsp;
                            <el-date-picker
                                    class="datetime"
                                    placeholder="请选择日期"
                                    type="date"
                                    v-model="form.endDate"
                                    value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                    <div class="search-btn-box">
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
        <div class="content">
            <blockTitle :hide="trueVal">
                资产列表
            </blockTitle>
            <div class="table-content">
                <el-table
                        :data="list"
                        border
                        empty-text="暂无数据"
                        header-cell-class-name="header-cell-class-name"
                        style="width: 100%"
                        v-loading="loading">
                    >
                    <el-table-column
                            label="申请编号"
                            prop="applyId"
                    >
                    </el-table-column>
                    <el-table-column
                            :formatter="formatterData"
                            label="申请日期"
                            prop="curDate"
                    >
                    </el-table-column>
                    <el-table-column
                            label="渠道名称"
                            prop="channelName"
                    >
                    </el-table-column>
                    <el-table-column
                            label="借款人编号"
                            prop="custId"
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
                            :formatter="formatAmount"
                            label="额度状况"
                            prop="InitialAmount"
                    >
                    </el-table-column>
                    <el-table-column
                            :formatter="formatterData"
                            label="创建时间"
                            prop="createTime"
                    >
                    </el-table-column>
                    <el-table-column
                            class-name="operate"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button @click="detail(scope.row)" size="small" type="primary">详情</el-button>
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
                            @pagination="getData"
                            layout="sizes, prev, pager, next, jumper"
                            v-if="pagInfo.total"
                ></pagination>
            </div>
        </div>
    </div>
</template>

<script>

    import waves from '@/directive/waves';
    import pagination from '@/components/Pagination';
    import blockTitle from '@/components/blockTitle';
    import collapse from '@/components/collapse';
    import formatter from '@/components/mixins/formatter';

    export default {
        name: 'credit',
        components: {pagination, blockTitle, collapse},
        directives: {waves},
        mixins: [formatter],
        data() {
            return {
                form: {
                    custName: '', // 借款人姓名
                    idNo: '', // 身份证号
                    channelNo: '', // 渠道编号
                    startDate: '', // 申请开始时间
                    endDate: '' // 申请结束时间
                },
                pagInfo: {
                    total: '',
                    currentPage: 1,
                    pageSize: 10
                },
                loading: false,
                list: [],
                trueVal: true
            };
        },
        methods: {
            async getData() {
                //发起ajax请求，更改数据
                this.loading = true;
                let data = await this.$api.assetM.creditList({
                    pager: {
                        pageNo: this.pagInfo.currentPage,
                        recordNum: this.pagInfo.pageSize
                    },
                    body: this.form
                });
                this.list = data.data.list;
                this.pagInfo.total = Number(data.data.pager ? data.data.pager.totalNum : 0);
                this.loading = false;
            },
            search() {
                this.pagInfo.currentPage = 1;
                this.getData();
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            detail(row) {
                this.$router.push({path: '/assetmanage/creditdetail', query: {updateId: row.applyId}});                // 新增渠道,跳转存储默认值
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>


    .search, .content {
        background: #fff;
        border-radius: 5px;
    }

    .search {
        .el-form {
            margin: 20px 20px 0;
        }

        .el-form-item {
            width: 32%;

            &:last-child {
                width: 60%;
            }
        }

        .el-input {
            width: 100%;
        }

        .datetime {
            display: inline-block;
            width: 180px;
        }

        .el-date-editor--date {
            display: inline-block;
        }

        .search-btn-box {
            text-align: center;

            .el-button {
                margin: 0 25px;
            }
        }
    }

    .content {
        margin-top: 50px;

        .table-content {
            width: 98%;
            margin: 19px auto 0;
            padding-bottom: 20px;
        }

        /*给配置按钮定位*/
        .el-button--mini {
            margin-left: 10px;
            position: absolute !important;
            top: 4px;
        }
    }

    /*操作的宽度太高*/
    /deep/ .operate {
        padding: 6px 0;
    }

    /*修改标题默认字体*/
    /deep/ .header-cell-class-name {
        background: #f4f4f5;
    }

    // 取消校验成功绿色样式
    .is-success /deep/ .el-input__inner {
        border-color: #DCDFE6 !important;
    }

    // 修改校验成功获取焦点的颜色
    .is-success /deep/ .el-input__inner:focus {
        border-color: #409EFF !important;
    }

</style>
