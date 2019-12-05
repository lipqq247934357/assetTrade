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
                            label="序号"
                            prop="channelNo">
                    </el-table-column>
                    <el-table-column
                            label="渠道名称"
                            prop="channelName">
                    </el-table-column>
                    <el-table-column
                            :formatter="formatterChannelType"
                            label="短信模板ID"
                            prop="channelType">
                    </el-table-column>
                    <el-table-column
                            label="短信模板名称"
                            prop="channelSymbol">
                    </el-table-column>
                    <el-table-column
                            :formatter="formatterUseYn"
                            label="短信状态"
                            prop="useYn">
                    </el-table-column>
                    <el-table-column
                            label="短信类型"
                            prop="inputUser">
                    </el-table-column>
                    <el-table-column
                            class-name="operate"
                            label="操作"
                            min-width="150px">
                        <template slot-scope="scope">
                            <el-button @click="update(scope.row)" size="small" type="primary">修改</el-button>
                            <el-button @click="detail(scope.row)" size="small" type="primary">查看</el-button>
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

<script lang="ts">
    // @ts-ignore
    import {Component, Vue} from 'vue-property-decorator'
    import pagination from '../../../components/Pagination/index.vue';
    import blockTitle from '../../../components/blockTitle/index.vue';
    import collapse from '../../../components/collapse/index.vue';
    // @ts-ignore
    import formatter from '../../../components/mixins/formatter/index.js';

    @Component({
        components: {
            pagination,
            blockTitle,
            collapse
        },
        mixins: [formatter]
    })

    export default class Sms extends Vue {

        form: { channelNo: string, channelName: string } = {channelNo: '', channelName: ''}; // 渠道编码，渠道名称
        pagInfo: { total: number, currentPage: number, pageSize: number } = {total: 0, currentPage: 1, pageSize: 10}; // 分页数据
        channelDicts: Array<object> = []; // 渠道字典
        loading: boolean = false; // 加载状态
        data: Array<object> = []; // 表格数据
        trueVal: boolean = true;

        activated() {
            this.getDict();
            this.getChannel();// 每次进入页面获取数据
        }

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
        }

        search() { // 点击查询按钮
            this.pagInfo.currentPage = 1;
            this.getChannel();
        }

        async getDict() {
            let data = await this.$api.configM.dictQuery({dictType: "channel"});
            this.channelDicts = data.data.dicts;
        }

        resetForm(formName: string) { // 重置表单内容
            //@ts-ignore
            this.$refs[formName].resetFields();
        }

        add() { //进入新增页面
            this.$router.push({path: '/configm/updateSms'});
        }

        update(row: any) { // 进入修改页面
            this.$router.push({path: "/configm/updateSms", query: {updateId: row.channelNo, disabled: '2'}});
        }

        detail(row: any) {// 进入详情页面
            this.$router.push({path: "/configm/updateSms", query: {updateId: row.channelNo, disabled: '1'}});
        }
    }

</script>

<style lang="scss" module>

    @import '../../../styles/common/config-list';
</style>
