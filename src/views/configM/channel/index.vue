<template>
    <div class="channel app-container">
        <!--search-->
        <collapse :class="$style['search']">
            <template v-slot:title>
                筛选条件
            </template>
            <template>
                <div>
                    <el-form :model="form" inline ref="form">
                        <el-form-item label="渠道编码" prop="channelNo">
                            <el-input placeholder="渠道编码" v-model="form.channelNo"></el-input>
                        </el-form-item>
                        <el-form-item label="渠道名称" prop="channelName">
                            <el-input placeholder="渠道名称" v-model="form.channelName"></el-input>
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
                渠道配置列表
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
                            label="渠道编码"
                            prop="channelNo">
                    </el-table-column>
                    <el-table-column
                            label="渠道名称"
                            prop="channelName">
                    </el-table-column>
                    <el-table-column
                            :formatter="formatterChannelType"
                            label="渠道类型"
                            prop="channelType">
                    </el-table-column>
                    <el-table-column
                            label="渠道标识"
                            prop="channelSymbol">
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
                            @pagination="getChannel"
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
        name: 'channel',
        components: {pagination, blockTitle, collapse},
        directives: {waves},
        mixins: [formatter],
        data() {
            return {
                form: {
                    channelNo: '', // 渠道编码
                    channelName: '', // 渠道名称
                },
                pagInfo: { // 分页数据
                    total: '',
                    currentPage: 1,
                    pageSize: 10
                },
                loading: false,
                data: [], // 表格数据
                trueVal: true
            };
        },
        activated() {
            this.getChannel();// 每次进入页面获取数据
        },
        methods: {
            async getChannel() { //发起ajax请求，更改数据
                this.loading = true;
                let data = await this.$api.configM.channelquery({
                    channelNo: this.form.channelNo,
                    channelName: this.form.channelName,
                    pageNum: this.pagInfo.currentPage,
                    pageSize: this.pagInfo.pageSize
                });
                if (data.data.resultCode === '0000') {
                    data = data.data;
                    this.data = data.data;
                    this.pagInfo.total = data.dataCount;
                }
                this.loading = false;
            },
            search() { // 点击查询按钮
                this.pagInfo.currentPage = 1;
                this.getChannel();
            },
            resetForm(formName) { // 重置表单内容
                this.$refs[formName].resetFields();
            },
            add() { //进入新增页面
                this.$router.push({path: '/configm/addchannel'});
            },
            update(row) { // 进入修改页面
                this.$router.push({path: "/configm/addchannel", query: {updateId: row.channelNo}});
            }
        }
    }
</script>

<style lang="scss" module>

    @import '../../../styles/common/config-list';
</style>
