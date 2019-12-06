<template>
    <div class="cash-output app-container">
        <!--search-->
        <collapse :class="$style['search']">
            <template v-slot:title>
                筛选条件
            </template>
            <template>
                <div>
                    <el-form :model="form" inline ref="form">
                        <el-form-item label="模板输出名称" prop="outputTemName">
                            <el-input placeholder="模板输出名称" v-model="form.outputTemName"></el-input>
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
                资产输出配置列表
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
                            label="输出模板编码"
                            prop="outputTemNo">
                    </el-table-column>
                    <el-table-column
                            label="输出模板名称"
                            prop="outputTemName">
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
                            label="操作"
                            min-width="140px">
                        <template slot-scope="scope">
                            <el-button @click="configDetail(scope.row)" class="config" size="small" type="primary">配置明细
                            </el-button>
                            <el-button @click="update(scope.row)" clas="update" size="small" type="primary">修改
                            </el-button>
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
                            @pagination="getoutput"
                            layout="sizes, prev, pager, next, jumper"
                            v-if="pagInfo.total"
                ></pagination>
            </div>
        </div>
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
    import formatter from "@/components/mixins/formatter";

    @Component({
        name: "cashOutput",
        components: {pagination, blockTitle, collapse},
        mixins: [formatter]
    })
    export default class extends Vue {
        form: any = {
            outputTemName: "" // 资产输出模板名称
        };
        pagInfo: IpagInfo = {
            total: 0,
            currentPage: 1,
            pageSize: 10
        };
        loading: boolean = false;
        data: object[] = [];
        trueVal: boolean = true;

        activated() {
            this.getoutput(); // 获取数据
        }

        async getoutput() {
            //2.发起ajax请求，更改数据
            this.loading = true;
            let data = await this.$api.configM.outputquery({
                outputTemName: this.form.outputTemName,
                pageNum: this.pagInfo.currentPage,
                pageSize: this.pagInfo.pageSize
            });
            if (data.data.resultCode === "0000") {
                data = data.data;
                this.data = data.data;
                this.pagInfo.total = data.dataCount;
            }
            this.loading = false;
        }

        search() {
            this.pagInfo.currentPage = 1;
            this.getoutput();
        }

        add() {
            // 新增渠道
            this.$router.push({path: "/configm/addcashoutput"});
        }

        update(row: any) {
            this.$router.push({
                path: "/configm/updatecashoutput",
                query: {updateId: row.outputTemNo}
            });
        }

        configDetail(row: any) {
            this.$router.push({
                path: "/configm/outputdetail",
                query: {updateId: row.outputTemNo}
            });
        }

        resetForm(formName: string) {
            //@ts-ignore
            this.$refs[formName].resetFields();
        }
    }
</script>

<style lang="scss" module>

    @import '../../../styles/common/config-list';
</style>
