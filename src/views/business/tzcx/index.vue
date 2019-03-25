<template>
    <div class="tzcx-container">
        <!--搜索-->
        <div class="search">
            <el-input placeholder="借据编号" v-model="params.listId"/>
            <el-input placeholder="借款人姓名" v-model="params.custName"/>
            <el-input placeholder="贷款账号" v-model="params.loanAcNo"/>
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="search">search
            </el-button>
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-edit">add</el-button>
        </div>
        <!--表格-->
        <div class="content">
            <el-table
                    v-loading="loading"
                    :data="pageData"
                    border
                    style="width: 600px">
                <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址"
                >
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="normal" style="width: 80px;">查看
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
                    @pagination="search"
            >
            </pagination>
        </div>
        <!--弹框-->
        <el-dialog
                title="收货地址"
                :visible.sync="dialogTableVisible"
                custom-class="pop-custom-class"
                :fullscreen="t"
        >
            <el-table :data="popTableData">
                <el-table-column property="name" label="姓名" width="150"></el-table-column>
                <el-table-column property="age" label="年龄" width="200"></el-table-column>
                <el-table-column property="sex" label="性别"></el-table-column>
            </el-table>
        </el-dialog>

    </div>
</template>

<script>

    import waves from '@/directive/waves';
    import pagination from '@/components/Pagination';
    import {tzcx, tzcxDt} from '@/api';

    export default {
        name: 'tzcx',
        components: {pagination},
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
                pageSize: 20,
                total: 0,
                pageData: [],
                dialogTableVisible: false,
                popTableData: [],
                t:true
            }
        },
        methods: {
            valid() {// 校验用户输入的数据是否满足条件

            },
            async search() {
                this.loading = true;
                let res = await tzcx(this.currentPage, this.pageSize);
                this.total = res.data.total;
                this.currentPage = res.data.currentPage;
                this.pageSize = res.data.pageSize;
                this.pageData = res.data.pageData;
                this.loading = false;
            },
            async handleClick(row) {
                let id = row.id;
                // 通过id获取详细信息
                let res = await tzcxDt();
                console.log(res.data);
                this.popTableData = res.data;
                this.dialogTableVisible = true;
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .tzcx {
        &-container {
            margin: 30px;
        }
    }

    .search {
        .el-input {
            margin-left: 10px;
            width: 200px;
        }

        .el-button {
            margin-left: 20px;
        }
    }

    .content {
        margin-top: 30px;
    }

    .pagination {
        margin-top: 40px;
        margin-bottom: 50px;
    }

</style>
