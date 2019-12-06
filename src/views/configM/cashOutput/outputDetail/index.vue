<template>
    <div class="output-detail app-container">
        <!--search-->
        <collapse :class="$style['search']" v-show.sync="!detail.show">
            <template v-slot:title>
                筛选条件
            </template>
            <template>
                <div>
                    <el-form :model="form" inline ref="form">
                        <el-form-item label="文件编号" prop="fileNo">
                            <el-input placeholder="渠道编码" v-model="form.fileNo"></el-input>
                        </el-form-item>
                        <el-form-item label="文件名称" prop="fileName">
                            <el-input placeholder="文件名称" v-model="form.fileName"></el-input>
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
        <div :class="$style['content']" v-show="!detail.show">
            <blockTitle :hide="trueVal">
                资产输出配置列表
                <el-button @click="add" size="mini" type="primary" v-waves>配置明细
                </el-button>
                <el-button @click="back" class="back-btn" size="mini" type="primary" v-waves>返回
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
                            label="输出模板编码"
                            prop="outputTemNo">
                    </el-table-column>
                    <el-table-column
                            label="文件编号"
                            prop="fileNo">
                    </el-table-column>
                    <el-table-column
                            label="文件名称"
                            prop="fileName">
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
                            label="操作"
                            min-width="140px">
                        <template slot-scope="scope">
                            <el-button @click="outDetail(scope.row)" size="small" type="primary">查看</el-button>
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
                            @pagination="getoutDetail"
                            layout="sizes, prev, pager, next, jumper"
                            v-if="pagInfo.total"
                ></pagination>
            </div>
        </div>
        <editOutputDetail :outputTemNo="form.outputTemNo"
                          :show.sync="detail.show"
                          :type="detail.type"
                          :updateId="detail.updateId"
                          @clearUpdateId="clearUpdateId"
                          @updateData="updateData"></editOutputDetail>
    </div>
</template>

<script lang="ts">

    interface IpagInfo {
        total: number; // 总条数
        currentPage: number; // 当前是第几页
        pageSize: number; // 每页几行
    }

    import {Component, Vue} from "vue-property-decorator";
    import pagination from "@/components/Pagination/index.vue";
    import blockTitle from "@/components/blockTitle/index.vue";
    import collapse from "@/components/collapse/index.vue";
    import editOutputDetail from "./editOutputDetail.vue";
    import formatter from "@/components/mixins/formatter";

    @Component({
        name: 'outputDetail',
        components: {pagination, blockTitle, collapse, editOutputDetail},
        mixins: [formatter]
    })
    export default class extends Vue {
        form: any = {
            fileNo: '', // 文件编号
            fileName: '', // 文件名称
            outputTemNo: '' // 资产输出模板编号
        }
        pagInfo: IpagInfo = {
            total: 0,
            currentPage: 1,
            pageSize: 10
        }
        loading: boolean = false
        data: object[] = []
        trueVal: boolean = true
        detail: {
            show: boolean,
            type: string,
            updateId: string
        } = {
            show: false,
            type: '',
            updateId: ''
        }

        created() {
            // 获得资产输出模板编码
            this.form.outputTemNo = this.$route.query && this.$route.query.updateId;
            this.getoutDetail();
        }

        async getoutDetail() { //发起ajax请求，更改数据
            let mRex = /^[0-9]*$/;
            if (!mRex.test(this.form.fileNo)) {
                this.$message.warning({message: '文件编号无效数字', duration: 2000});
                return;
            }
            this.loading = true;
            let data = await this.$api.configM.outdetailquery({
                outputTemNo: this.form.outputTemNo,
                fileNo: this.form.fileNo,
                fileName: this.form.fileName,
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

        search() {
            this.pagInfo.currentPage = 1;
            this.getoutDetail();
        }

        resetForm(formName: string) {
            //@ts-ignore
            this.$refs[formName].resetFields();
        }

        back() { // 返回资产输出配置
            this.$router.push({path: '/configm/cashoutput'});
        }

        outDetail(row: any) {
            this.updateShow();
            this.detail.type = 'detail';
            this.detail.updateId = row.fileNo;
        }

        add() {
            this.updateShow();
            this.detail.type = 'add';
            this.detail.updateId = '';
        }

        update(row: any) {
            this.updateShow();
            this.detail.type = 'update';
            this.detail.updateId = row.fileNo;
        }

        updateData() {
            this.getoutDetail();
        }

        updateShow() {
            this.detail.show = !this.detail.show;
        }

        clearUpdateId() {
            this.detail.updateId = '';
        }
    }
</script>

<style lang="scss" module>

    @import '../../../../styles/common/config-list';
</style>
