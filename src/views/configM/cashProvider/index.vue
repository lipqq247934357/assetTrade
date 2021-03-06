<template>
    <div class="cash-provider app-container">
        <!--search-->
        <collapse :class="$style['search']">
            <template v-slot:title>
                筛选条件
            </template>
            <template>
                <div>
                    <el-form :model="form" inline ref="form">
                        <el-form-item label="资金方名称" prop="contributiveName">
                            <el-input placeholder="资金方名称" v-model="form.contributiveName"></el-input>
                        </el-form-item>
                    </el-form>
                    <div :class="$style['search-btn-box']">
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
                资金方配置列表
                <el-button @click="add" size="mini" type="primary" v-waves>配置
                </el-button>
            </blockTitle>
            <div :class="$style['table-content']">
                <el-table
                        :data="data"
                        border
                        empty-text="无数据"
                        header-cell-class-name="header-cell-class-name"
                        style="width: 100%"
                        v-loading="loading">
                    <el-table-column
                            label="资金方编号"
                            prop="contributiveNo">
                    </el-table-column>
                    <el-table-column
                            label="资金方名称"
                            prop="contributiveName">
                    </el-table-column>
                    <el-table-column
                            :formatter="formatterOutputTemp"
                            label="资产输出模板"
                            prop="outputTemNo">
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

    import pagination from '@/components/Pagination';
    import blockTitle from '@/components/blockTitle';
    import collapse from '@/components/collapse';
    import formatter from '@/components/mixins/formatter';

    export default {
        name: 'cashProivder',
        components: {pagination, blockTitle, collapse},
        mixins: [formatter],
        data() {
            return {
                form: {
                    contributiveName: '' // 资金提供方名称
                },
                pagInfo: {
                    total: '',
                    currentPage: 1,
                    pageSize: 10
                },
                loading: false,
                data: [],
                trueVal: true,
                outputTempDicts: [] // 输出模板字典 {code:xx,codeName:xx}
            };
        },
        activated() {
            this.getProvider();// 获取数据
        },
        methods: {
            async getProvider() {
                //发起ajax请求，更改数据
                this.loading = true;
                let data = await this.$api.configM.cashproviderquery({
                    contributiveName: this.form.contributiveName,
                    pageNum: this.pagInfo.currentPage,
                    pageSize: this.pagInfo.pageSize
                });
                if (data.data.resultCode === '0000') {
                    data = data.data;
                    this.data = data.data;
                    this.outputTempDicts = data.dicts; // 字典
                    this.pagInfo.total = data.dataCount;
                }
                this.loading = false;
            },
            search() {
                this.pagInfo.currentPage = 1;
                this.getProvider();
            },
            getInfo() {
                this.$refs.form.validate((valid) => { //1.校验参数是否合法
                    if (valid) {
                        this.getProvider();
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            add() {
                // 新增渠道
                this.$router.push({path: '/configm/addprovider'});
            },
            update(row) {
                // 修改渠道
                this.$router.push({path: "/configm/addprovider", query: {updateId: row.contributiveNo}});
            },
            formatterOutputTemp(row, column, cellValue) {
                return this.getName(this.outputTempDicts, cellValue)
            }
        }
    }
</script>

<style lang="scss" module>

    @import '../../../styles/common/config-list';
</style>
