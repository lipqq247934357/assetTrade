<template>
    <div class="credit">
        <div class="search">
            <collapse class="channel-search">
                <template v-slot:title>
                    筛选条件
                </template>
                <template>
                    <div>
                        <el-form :model="form" ref="form" inline>
                            <el-form-item prop="qdNo" label="姓名" class="aa">
                                <el-input placeholder="请输入姓名"></el-input>
                            </el-form-item>
                            <el-form-item prop="qdName" label="身份证号">
                                <el-input placeholder="请输入身份证号"></el-input>
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
        <!-- <h3>资产列表</h3>
        <div class="content"> -->
        <div class="channel-content">
            <blockTitle :hide="trueVal">
                授信信息列表
                </el-button>
            </blockTitle>
            <div class="table-content">
                <el-table
                    v-loading="loading"
                    :data="pageData"
                    size="small"
                    class="listtable"
                    border
                    >
                    <el-table-column
                        prop="channel"
                        label="申请编号"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="code"
                        label="申请日期"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="number"
                        label="渠道"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="借款人编号"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="money"
                        label="借款人姓名"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="mode"
                        label="身份证号"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="rate"
                        label="决策结果"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="balance"
                        label="风控策略码"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="deadline"
                        label="创建时间"
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
        components: {
            pagination,
            collapse,
            blockTitle
        },
        directives: {
            waves
        },
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
                trueVal: true,
            }
        },
        created() {
            // this.search();
        },
        methods: {
            valid() {// 校验用户输入的数据是否满足条件

            },
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
                name: 'creditdetails',
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
.search-btn-box {
    text-align: center;
    .el-button {
        margin:0 25px;
    }
}

</style>
