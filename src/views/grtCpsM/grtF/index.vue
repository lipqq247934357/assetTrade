<template>
    <div class="asset app-container">
        <collapse :class="$style['search']">
            <template v-slot:title>
                筛选条件
            </template>
            <template>
                <div>
                    <el-form :model="form" inline label-width="100px" ref="form">
                        <el-form-item label="渠道名称" prop="channelNo">
                            <el-select placeholder="请选择" size="max" v-model="form.channelNo">
                                <el-option
                                        :key="item.code"
                                        :label="item.codeName"
                                        :value="item.code"
                                        v-for="item in channelDicts">
                                </el-option>
                            </el-select>
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
                资产列表
            </blockTitle>
            <div :class="$style['table-content']">
                <el-table
                        :data="list"
                        border
                        empty-text="无数据"
                        header-cell-class-name="header-cell-class-name"
                        style="width: 100%"
                        v-loading="loading">
                    <el-table-column
                            label="渠道名称"
                            prop="CHANNELNAME">
                    </el-table-column>
                    <el-table-column
                            label="累计收取担保费"
                            prop="SUMGETASSUREAMT">
                    </el-table-column>
                    <el-table-column
                            label="累计理赔担保费"
                            prop="SUMSETTLEASSUREAMT">
                    </el-table-column>
                    <el-table-column
                            label="累计支付通道费"
                            prop="SUMPAIDCHANNELAMT">
                    </el-table-column>
                    <el-table-column
                            label="当前剩余担保费"
                            prop="SUMREMAINASSUREAMT">
                    </el-table-column>
                </el-table>
            </div>
            <!--pagination-->
            <div class="pagination">
                <pagination :limit.sync="pagInfo.pageSize"
                            :page-sizes="[10,20,30,50]"
                            :page.sync="pagInfo.currentPage"
                            :total="pagInfo.total"
                            @pagination="assetList"
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
        name: 'grtF',
        components: {pagination, blockTitle, collapse},
        directives: {waves},
        mixins: [formatter],
        data() {
            return {
                form: {
                    channelNo: '' // 渠道编号
                },
                channelDicts: [], // 渠道字典
                pagInfo: { // 分页数据
                    total: '', // 总条数
                    currentPage: 1, // 当前是第几页
                    pageSize: 10 // 每页几行
                },
                loading: false, // 是否正在加载中
                list: [], // 列表数据
                trueVal: true
            };
        },
        created() {
            this.getDict();
        },
        methods: {
            async assetList() { // 查询资产列表
                debugger;
                //发起ajax请求，更改数据
                this.loading = true;
                let res = await this.$api.configM.cpsDetail({
                    channelNo: this.form.channelNo,
                    pageNum: this.pagInfo.currentPage,
                    pageSize: this.pagInfo.pageSize
                });
                if (res.data.resultCode === '0000') {
                    let data = res.data;
                    this.list = data.data;
                    this.pagInfo.total = data.dataCount;
                }
                this.loading = false;
            },
            async getDict() {
                let data = await this.$api.configM.dictQuery({dictType: "channel"});
                this.channelDicts = data.data.dicts;
            },
            search() { // 点击查询按钮
                this.pagInfo.currentPage = 1;
                this.assetList();
            },
            resetForm(formName) { // 重置表单
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="scss" module>
    @import '../../../styles/common/asset-list';
</style>
