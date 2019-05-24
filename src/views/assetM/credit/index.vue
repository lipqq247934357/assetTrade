<template>
    <div class="credit app-container">
        <!--search-->
        <collapse :class="$style['search']">
            <template v-slot:title>
                筛选条件
            </template>
            <template>
                <div>
                    <el-form :model="form" inline label-width="100px" ref="form">
                        <el-form-item label="渠道名称" prop="channelNo">
                            <el-input placeholder="请输入渠道名称" v-model="form.channelNo"></el-input>
                        </el-form-item>
                        <el-form-item label="借款人姓名" prop="custName">
                            <el-input placeholder="请输入借款人姓名" v-model="form.custName"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号" prop="idNo">
                            <el-input placeholder="请输入身份证号" v-model="form.idNo"></el-input>
                        </el-form-item>
                        <el-form-item label="申请日期">
                            <el-col :span="11">
                                <el-form-item prop="startDate">
                                    <el-date-picker
                                            :class="$style['datetime']"
                                            placeholder="请选择日期"
                                            type="date"
                                            v-model="form.startDate"
                                            value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            &nbsp;<el-col :span="1">&nbsp;-&nbsp;</el-col>
                            <el-col :span="11">
                                <el-form-item prop="endDate">
                                    <el-date-picker
                                            :class="$style['datetime']"
                                            placeholder="请选择日期"
                                            type="date"
                                            v-model="form.endDate"
                                            value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
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
                授信信息列表
            </blockTitle>
            <div :class="$style['table-content']">
                <el-table
                        :data="list"
                        :empty-text="emptyText"
                        border
                        header-cell-class-name="header-cell-class-name"
                        style="width: 100%"
                        v-loading="loading">
                    >
                    <el-table-column
                            label="申请编号"
                            prop="applyId"
                    >
                    </el-table-column>
                    <el-table-column
                            :formatter="formatterData"
                            label="申请日期"
                            prop="curDate"
                    >
                    </el-table-column>
                    <el-table-column
                            label="渠道名称"
                            prop="channelName"
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
                            label="身份证号"
                            prop="idNo"
                    >
                    </el-table-column>
                    <el-table-column
                            :formatter="formatAmount"
                            label="额度状况"
                            prop="initialAmount"
                    >
                    </el-table-column>
                    <el-table-column
                            :formatter="formatterData"
                            label="创建时间"
                            prop="createTime"
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
                            @pagination="getData"
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
        name: 'credit',
        components: {pagination, blockTitle, collapse},
        directives: {waves},
        mixins: [formatter],
        data() {
            return {
                form: {
                    custName: '', // 借款人姓名
                    idNo: '', // 身份证号
                    channelNo: '', // 渠道编号
                    startDate: '', // 申请开始时间
                    endDate: '' // 申请结束时间
                },
                pagInfo: { // 分页数据
                    total: '', // 总条数
                    currentPage: 1, // 当夜是第几页
                    pageSize: 10 // 每页的大小
                },
                loading: false,
                list: [], // 列表数据
                trueVal: true,
                emptyText: ' '// 没有数据的时候展示的文案
            };
        },
        methods: {
            async getData() {
                //发起ajax请求，更改数据
                this.loading = true;
                let data = await this.$api.assetM.creditList({
                    pager: {
                        pageNo: this.pagInfo.currentPage,
                        recordNum: this.pagInfo.pageSize
                    },
                    body: this.form
                });
                this.list = data.data.list;
                this.pagInfo.total = Number(data.data.pager ? data.data.pager.totalNum : 0);
                this.list.length === 0 && (this.emptyText = '无数据');
                this.loading = false;
            },
            search() {
                this.pagInfo.currentPage = 1;
                this.getData();
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            detail(row) {
                this.$router.push({path: '/assetmanage/creditdetail', query: {updateId: row.applyId}});                // 新增渠道,跳转存储默认值
            }
        }
    }
</script>

<style lang="scss" module>
    @import '../../../styles/common/asset-list';
</style>
