<template>
    <div class="customer app-container">
        <!--search-->
        <collapse class="search">
            <template v-slot:title>
                筛选条件
            </template>
            <template>
                <div>
                    <el-form :model="form" inline label-width="100px" ref="form">
                        <el-form-item class="aa" label="姓名" prop="custName">
                            <el-input placeholder="请输入姓名" v-model="form.custName"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号" prop="idNo">
                            <el-input placeholder="请输入身份证号" v-model="form.idNo"></el-input>
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
                        :empty-text="emptyText"
                        header-cell-class-name="header-cell-class-name"
                        style="width: 100%"
                        v-loading="loading">
                    >
                    <el-table-column
                            label="渠道"
                            prop="channelNo"
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
                            label="证件类型"
                            prop="idType"
                    >
                    </el-table-column>
                    <el-table-column
                            label="证件号码"
                            prop="idNo"
                    >
                    </el-table-column>
                    <el-table-column
                            :formatter="formatterSex"
                            label="性别"
                            prop="gender"
                    >
                    </el-table-column>
                    <el-table-column
                            label="联系电话"
                            prop="mobilePhone"
                    >
                    </el-table-column>
                    <el-table-column
                            label="通讯地址"
                            prop="address"
                    >
                    </el-table-column>
                    <el-table-column
                            :formatter="formatterData"
                            label="创建时间"
                            prop="curDate"
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
                            @pagination="customerList"
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
        name: 'customer',
        components: {pagination, blockTitle, collapse},
        directives: {waves},
        mixins: [formatter],
        data() {
            return {
                form: {
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
                emptyText:' ' // 没有数据的时候展示的文案
            };
        },
        created() {
        },
        methods: {
            async customerList() {
                //发起ajax请求，更改数据
                this.loading = true;
                let data = await this.$api.assetM.customerList({
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
            detail(row) {
                this.$router.push({path: '/assetmanage/customerdetail', query: {updateId: row.custId}});
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
            margin: 20px 20px 60px;
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
