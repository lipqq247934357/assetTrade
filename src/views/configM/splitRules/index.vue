<template>
    <div class="split-rules app-container">
        <!--search-->
        <collapse class="search">
            <template v-slot:title>
                筛选条件
            </template>
            <template>
                <div>
                    <el-form :model="form" inline ref="form">
                        <el-form-item label="拆分方式" prop="assetSplitWay">
                            <el-input placeholder="拆分方式" v-model.number="form.assetSplitWay"></el-input>
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
                拆分规则配置列表
                <el-button @click="add" size="mini" type="primary" v-waves>配置
                </el-button>
            </blockTitle>
            <div class="table-content">
                <el-table
                        :data="data"
                        border
                        empty-text="无数据"
                        header-cell-class-name="header-cell-class-name"
                        style="width: 100%"
                        v-loading="loading">
                    <el-table-column
                            label="拆分规则编码"
                            prop="assetSplitNo">
                    </el-table-column>
                    <el-table-column
                            :formatter="formatterSplitWay"
                            label="拆分方式"
                            prop="assetSplitWay">
                    </el-table-column>
                    <el-table-column
                            :formatter="formatterCashProvider"
                            label="资金方"
                            prop="contributiveNo">
                    </el-table-column>
                    <el-table-column
                            label="拆分值"
                            prop="assetSplitValue">
                    </el-table-column>
                    <el-table-column
                            :formatter="formatterBelongs"
                            label="尾差归属资金方"
                            prop="pennyDifferenceBelongs">
                    </el-table-column>
                    <el-table-column
                            label="创建人"
                            prop="inputUser">
                    </el-table-column>
                    <el-table-column
                            :formatter="formatterData"
                            label="创建时间"
                            prop="createTime">
                    </el-table-column>
                    <el-table-column
                            label="更新人"
                            prop="updateUser">
                    </el-table-column>
                    <el-table-column
                            :formatter="formatterData"
                            label="更新时间"
                            prop="updateTime">
                    </el-table-column>
                    <el-table-column
                            :formatter="formatterUseYn"
                            label="是否启用"
                            prop="useYn">
                    </el-table-column>
                    <el-table-column
                            class-name="operate"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button @click="update(scope.row)" size="small" type="primary">修改</el-button>
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
                            @pagination="getInfo"
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
        name: 'splitRules',
        components: {pagination, blockTitle, collapse},
        directives: {waves},
        mixins: [formatter],
        data() {
            return {
                form: {
                    assetSplitWay: '' // 拆分方式
                },
                pagInfo: {
                    total: '',
                    currentPage: 1,
                    pageSize: 10
                },
                loading: false,
                data: [],
                trueVal: true,
                chashProivderDicts: []
            };
        },
        activated() {
            this.getSplRules();// 获取数据
        },
        methods: {
            async getSplRules() {
                //发起ajax请求，更改数据
                this.loading = true;
                let data = await this.$api.configM.splitRulesquery({
                    assetSplitWay: this.form.assetSplitWay,
                    pageNum: this.pagInfo.currentPage,
                    pageSize: this.pagInfo.pageSize
                });
                if (data.data.resultCode === '0000') {
                    data = data.data;
                    this.chashProivderDicts = data.dicts; // 字典
                    this.data = data.data;
                    this.pagInfo.total = data.dataCount;
                }
                this.loading = false;
            },
            search() {
                this.pagInfo.currentPage = 1;
                this.getSplRules();
            },
            getInfo() {
                this.$refs.form.validate((valid) => { //1.校验参数是否合法
                    if (valid) {
                        this.getSplRules();
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            add() {
                this.$router.push({path: '/configm/addsplitrules'});
            },
            update(row) {
                this.$router.push({path: "/configm/updatesplitrules", query: {updateId: row.assetSplitNo}});
            },
            formatterBelongs(row, column, cellValue) {
                return this.getName(this.chashProivderDicts, cellValue)
            },
            formatterCashProvider(row, column, cellValue) {
                let arr = [];
                cellValue.split(',').forEach(item => {
                    arr.push(this.getName(this.chashProivderDicts, item));
                })
                return arr.join(',')
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
        }

        .el-input {
            width: 100%;
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
