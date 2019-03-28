<template>
    <div class="customer">
        <!--搜索-->
        <div class="search">
            <h2>筛选条件</h2>
            <el-input placeholder="订单号" />
            <el-input placeholder="身份证号" />
            <el-button
                v-waves
                class="filter-item"
                type="primary"
                icon="el-icon-search" @click="search">
                查询
            </el-button>
        </div>

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
                    label="身份证"
                >
                </el-table-column>
                <el-table-column
                    prop="mode"
                    label="证件号码"
                >
                </el-table-column>
                <el-table-column
                    prop="rate"
                    label="性别"
                >
                </el-table-column>
                <el-table-column
                    prop="balance"
                    label="联系电话"
                >
                </el-table-column>
                <el-table-column
                    prop="deadline"
                    label="通讯地址"
                >
                </el-table-column>
                <el-table-column
                    prop="loanday"
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
    export default {
        name: "customer",
        directives: {waves},
        components: {pagination},
        data() {
            return {
                loading: false,
                currentPage: 1,
                pageSize: 10,
                total: 0,
                pageData: [], // 表格数据
                dialogTableVisible: false,
                popTableData: []
            }
        },
        created() {
            this.list();
        },
        methods: {
            search() {

            },
            pagesearch(val) {
                console.log(val);
            },
            async list() {
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
                name: 'customerdetails',
                    query: { // 数据传递

                    }
                });

            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.customer h3 {
    font-size: 18px;
    color: #909399;
    background: #409EFF;
    color: #fff;
    padding: 10px;
}
.search {
    border-top: 2px solid #409EFF;
    border-bottom: 2px solid #409EFF;
    padding: 0px 0 10px 0;
    margin-top: 10px;
    h2 {
        background: #409EFF;
        color: #fff;
        margin: 0 0 20px 0;
        padding: 10px;
        font-size: 18px;
    }
    .el-input {
        margin: 20px 0 0 35px;
        width: 20%;
    }

    .el-button {
        display: block;
        margin: 50px auto 10px;
    }
}

</style>
