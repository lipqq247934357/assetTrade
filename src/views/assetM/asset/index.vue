<template>
    <div class="asset">
        <!--搜索-->
        <div class="search">
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
                            <el-button type="primary" v-waves @click="getInfo" icon="el-icon-warning" size="medium">重置
                            </el-button>
                        </div>
                    </div>
                </template>
            </collapse>
        </div>
        <!--表格-->
        <div class="channel-content">
            <blockTitle :hide="trueVal">
                资产列表
                </el-button>
            </blockTitle>
            <div class="table-content">
                <el-table
                        border
                        size="small"
                        v-loading="loading"
                        :data="data.pageData"
                        style="width: 100%"
                        header-cell-class-name="header-cell-class-name">
                    <el-table-column
                            prop="qdNo"
                            label="渠道">
                    </el-table-column>
                    <el-table-column
                            prop="qdName"
                            label="借据编码">
                    </el-table-column>
                    <el-table-column
                            prop="qdType"
                            label="金融产品">
                    </el-table-column>
                    <el-table-column
                            prop="creator"
                            label="借据人编号">
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="借据人姓名">
                    </el-table-column>
                    <el-table-column
                            prop="updateUser"
                            label="身份证号">
                    </el-table-column>
                    <el-table-column
                            prop="updateTime"
                            label="借款金额">
                    </el-table-column>
                    <el-table-column
                            prop="updateTime"
                            label="还款方式">
                    </el-table-column>
                    <el-table-column
                            prop="updateTime"
                            label="日利率">
                    </el-table-column>
                    <el-table-column
                            prop="updateTime"
                            label="贷款余额">
                    </el-table-column>
                    <el-table-column
                            prop="updateTime"
                            label="还款期限">
                    </el-table-column>
                    <el-table-column
                            prop="updateTime"
                            label="放款日">
                    </el-table-column>
                    <el-table-column
                            prop="updateTime"
                            label="到期日">
                    </el-table-column>
                    <el-table-column
                            prop="updateTime"
                            label="起息日">
                    </el-table-column>
                    <el-table-column
                            prop="updateTime"
                            label="拆分方式">
                    </el-table-column>
                    <el-table-column
                            prop="updateTime"
                            label="拆分比例">
                    </el-table-column>
                    <el-table-column
                            prop="updateTime"
                            label="出资方">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
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
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!--pagination-->
            <div class="pagination">
                <pagination v-if="data.total"
                            :page.sync="data.currentPage"
                            :page-sizes="[10,20,30,50]"
                            :limit.sync="data.pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="data.total"
                            @pagination="getInfo"
                ></pagination>
            </div>
        </div>
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
                trueVal: true,
                data: {},
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
.channel-content {
    margin-top: 50px;
    /*border-top: 1px solid red;*/

    /*给配置按钮定位*/
    .el-button--mini {
        margin-left: 10px;
        position: absolute !important;
        top: 5px;
    }

    /*给修改按钮定位*/
    .el-button--small {
        position: absolute !important;
        top: 8px;
    }
}
</style>
