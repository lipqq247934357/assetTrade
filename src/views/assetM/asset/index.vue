<template>
    <div class="asset">
        <!--搜索-->
        <div class="search">
            <!-- <h2>筛选条件</h2>
            <el-input placeholder="借据编号" v-model="params.listId"/>
            <el-input placeholder="借款人姓名" v-model="params.custName"/>
            <el-input placeholder="贷款账号" v-model="params.loanAcNo"/>
            <el-button
                v-waves
                class="filter-item"
                type="primary"
                icon="el-icon-search" @click="search">
                查询
            </el-button> -->
            <!-- <el-button v-waves class="filter-item" type="primary" icon="el-icon-edit" @click="handleClick">add
            </el-button> -->
            <!--search-->
            <collapse class="channel-search">
                <template v-slot:title>
                    筛选条件
                </template>
                <template>
                    <div>
                        <el-form :model="form" ref="form" inline>
                            <el-form-item prop="qdNo" label="渠道" class="aa">
                                <el-input placeholder="请输入渠道"></el-input>
                            </el-form-item>
                            <el-form-item prop="qdName" label="借据编号">
                                <el-input placeholder="请输入借据编号"></el-input>
                            </el-form-item>
                            <el-form-item prop="qdName" label="借款人姓名">
                                <el-input placeholder="请输入借款人姓名"></el-input>
                            </el-form-item>
                            <el-form-item prop="qdName" label="身份证号">
                                <el-input placeholder="请输入身份证号"></el-input>
                            </el-form-item>
                            <el-form-item prop="qdName" label="放款日期">
                                <el-date-picker
                                    v-model="value1"
                                    class="datetime"
                                    type="date"
                                    placeholder="请选择日期">
                               </el-date-picker>
                               -
                               <el-date-picker
                                   v-model="value1"
                                   class="datetime"
                                   type="date"
                                   placeholder="请选择日期">
                              </el-date-picker>
                          </el-form-item>
                        </el-form>
                        <div class="search-btn-box">
                            <el-button type="primary" v-waves @click="getInfo" icon="el-icon-search" size="medium">查询
                            </el-button>
                        </div>
                    </div>
                </template>
            </collapse>
        </div>
        <!--表格-->
        <h3>资产列表</h3>
        <div class="content">
            <el-table
                v-loading="loading"
                :data="pageData"
                size="small"
                class="listtable"
                border
                >
                <el-table-column
                    prop="channel"
                    label="渠道"
                    >
                </el-table-column>
                <el-table-column
                    prop="code"
                    label="借据编码"
                    >
                </el-table-column>
                <el-table-column
                    prop="number"
                    label="借据人编号"
                >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="借款人姓名"
                >
                </el-table-column>
                <el-table-column
                    prop="money"
                    label="借款金额"
                >
                </el-table-column>
                <el-table-column
                    prop="mode"
                    label="还款方式"
                >
                </el-table-column>
                <el-table-column
                    prop="rate"
                    label="日利率"
                >
                </el-table-column>
                <el-table-column
                    prop="balance"
                    label="贷款余额"
                >
                </el-table-column>
                <el-table-column
                    prop="deadline"
                    label="还款期限"
                >
                </el-table-column>
                <el-table-column
                    prop="loanday"
                    label="放款日"
                >
                </el-table-column>
                <el-table-column
                    prop="expireday"
                    label="到期日"
                >
                </el-table-column>
                <el-table-column
                    prop="beginrate"
                    label="起息日"
                >
                </el-table-column>
                <el-table-column
                    prop="splitmode"
                    label="拆分方式"
                >
                </el-table-column>
                <el-table-column
                    prop="splitproportion"
                    label="拆分比例"
                >
                </el-table-column>
                <el-table-column
                    prop="provide"
                    label="出资方"
                >
                </el-table-column>
                <el-table-column
                    label="操作"
                    >
                    <template slot-scope="scope">
                        <el-button
                            @click="handleClick(scope.row)"
                            type="text"
                            size="normal"
                            style="width: 80px;">
                            查看详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <div class="pagination">
            <pagination
                :page.sync="currentPage"
                :page-sizes="[10,20,30,50]"
                :limit.sync="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @pagination="pagesearch"
            >
            </pagination>
        </div>
        <!-- 分页end -->
    </div>
</template>

<script>

    import waves from '@/directive/waves';
    import pagination from '@/components/Pagination';
    import {tzcx, tzcxDt} from '@/api';

    import blockTitle from '@/components/blockTitle';
    import collapse from '@/components/collapse';

    export default {
        name: 'asset',
        components: {pagination, collapse,blockTitle},
        directives: {waves},
        data() {
            return {
                params: {
                    listId: "",
                    custName: "",
                    loanAcNo: ""
                },
                loading: false,
                currentPage: 1,
                pageSize: 10,
                total: 0,
                pageData: [], // 表格数据
                dialogTableVisible: false,
                popTableData: [],
                form: {
                    qdNo: '',
                    qdName: '',
                },
                value1: '', //日期控件
            }
        },
        created() {
            // this.search();
        },
        methods: {
            valid() {// 校验用户输入的数据是否满足条件

            },
            // 查询按钮
            getInfo() {

            },
            async search() {
                this.loading = true;
                let res = await tzcx(this.currentPage, this.pageSize);
                console.log(res);
                this.total = res.data.total;
                this.currentPage = res.data.currentPage;
                this.pageSize = res.data.pageSize;
                this.pageData = res.data.pageData;
                this.loading = false;
            },
            async handleClick(row) {
                // let id = row.id;
                // // 通过id获取详细信息
                // let res = await tzcxDt();
                // console.log(res.data);
                // this.popTableData = res.data;
                // this.dialogTableVisible = true;

                this.$router.push({
                name: 'assetlistdetails',
                    query: { // 数据传递

                    }
                });
            },
            pagesearch(val) {
                console.log(val);
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.channel-search {
    .el-form {
        margin: 20px 20px 50px;
    }
    .el-form-item {
        width: 30%;
        &:last-child {
            width: 60%;
        }

    }
    .el-form--inline .el-form-item__content {
        width: 250px;
    }
    .el-input {
        width: 100%;
    }
    .search-btn-box {
        text-align: center;
    }
    .el-form-item__content {
        width: 100%;
    }
    .el-date-editor--date {
        display: inline-block;
    }
    .datetime {
        display: inline-block;
        width: 180px;
    }
}
.tzcx {
    &-container {
        margin: 30px;
    }
}
.asset h3 {
    font-size: 18px;
    color: #909399;
    background: #409EFF;
    color: #fff;
    padding: 10px;
    margin-bottom: 0;
}
.search {
    border-top: 2px solid #409EFF;
    border-bottom: 2px solid #409EFF;
    padding: 0px 0 10px 0;
    margin-top: 10px;
    background: #fff;
    h2 {
        background: #409EFF;
        color: #fff;
        margin: 0 0 20px 0;
        padding: 10px;
        font-size: 18px;
    }
    // .el-input {
    //     margin: 20px 0 0 35px;
    //     width: 20%;
    // }

    .el-button {
        display: block;
        margin: 50px auto 10px;
    }
}

.content {
     .listtable {

    }
}

.pagination {
    margin-top: 40px;
    margin-bottom: 50px;
}

/deep/ .pop-custom-class {
    position: fixed;
    bottom: 10%;
    top: 10%;
    left: 10%;
    right: 10%;
}

</style>
