<template>
    <div class="product app-container">
        <!--search-->
        <collapse class="search">
            <template v-slot:title>
                筛选条件
            </template>
            <template>
                <div>
                    <el-form :model="form" inline ref="form">
                        <el-form-item label="渠道名称" prop="channelName">
                            <el-input placeholder="渠道名称" v-model.number="form.channelName"></el-input>
                        </el-form-item>
                        <el-form-item label="金融产品名称" prop="prodName">
                            <el-input placeholder="金融产品名称" v-model="form.prodName"></el-input>
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
                金融产品配置列表
                <el-button @click="add" size="mini" type="primary" v-waves>配置
                </el-button>
            </blockTitle>
            <div class="table-content">
                <el-table
                        :data="data"
                        border
                        header-cell-class-name="header-cell-class-name"
                        style="width: 100%"
                        v-loading="loading">
                    <el-table-column
                            :formatter="formatterChannelName"
                            label="渠道名称"
                            prop="channelNo"
                    >
                    </el-table-column>
                    <el-table-column
                            label="金融产品编号"
                            prop="prodNo">
                    </el-table-column>
                    <el-table-column
                            label="金融产品名称"
                            prop="prodName"
                    >
                    </el-table-column>
                    <el-table-column
                            label="产品描述"
                            prop="prodDesc">
                    </el-table-column>
                    <el-table-column
                            :formatter="formatterUseYn"
                            label="是否启用"
                            prop="useYn">
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
        name: 'product',
        components: {pagination, blockTitle, collapse},
        directives: {waves},
        mixins: [formatter],
        data() {
            return {
                form: {
                    channelName: '', // 渠道名称
                    prodName: '', // 金融产品名称
                },
                pagInfo: {
                    total: '',
                    currentPage: 1,
                    pageSize: 10
                },
                loading: false,
                data: [],
                trueVal: true, // 可以被优化，暂时没动
                channelDicts: []
            };
        },
        activated() {
            this.getProduct();
        },
        methods: {
            async getProduct() {
                //发起ajax请求，更改数据
                this.loading = true;
                let data = await this.$api.configM.productquery({
                    qdNo: this.form.qdNo,
                    qdName: this.form.qdName,
                    pageNum: this.pagInfo.currentPage,
                    pageSize: this.pagInfo.pageSize
                });
                if (data.data.resultCode === '0000') {
                    data = data.data;
                    this.data = data.data;
                    this.channelDicts = data.dicts; // 字典
                    this.pagInfo.total = data.dataCount;
                }
                this.loading = false;
            },
            search() {
                this.pagInfo.currentPage = 1;
                this.getProduct();
            },
            getInfo() {
                this.productquery();
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            add() {// 新增
                this.$router.push({path: '/configm/addproduct'});
            },
            update(row) { //修改
                this.$router.push({path: "/configm/updateproduct", query: {updateId: row.prodNo}});
            },
            formatterChannelName(row, column, cellValue) {
                return this.getName(this.channelDicts, cellValue)
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
            margin: 20px 20px 50px;
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
