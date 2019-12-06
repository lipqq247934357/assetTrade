<template>
    <div class="split-rules app-container">
        <!--search-->
        <collapse :class="$style['search']">
            <template v-slot:title>
                筛选条件
            </template>
            <template>
                <div>
                    <el-form :model="form" inline ref="form">
                        <el-form-item label="拆分方式" prop="assetSplitWay">
                            <el-select placeholder="请选择" size="max" v-model="form.assetSplitWay">
                                <el-option
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        v-for="item in assetSplitWayArray">
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
                拆分规则配置列表
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
        name: "splitRules",
        components: {pagination, blockTitle, collapse},
        mixins: [formatter]
    })
    export default class extends Vue {
        form: any = {
            assetSplitWay: "" // 拆分方式
        };
        pagInfo: IpagInfo = {
            // 分页数据
            total: 0,
            currentPage: 1,
            pageSize: 10
        };
        loading: boolean = false;
        assetSplitWayArray: object[] = [
            {value: "01", label: "按比例拆分"},
            {value: "02", label: "按固定值拆分"}
        ];
        data: object[] = [];
        trueVal: boolean = true;
        chashProivderDicts: object[] = []; // 资金方字典 {code:xx,codeName:xx}

        activated() {
            this.getSplRules(); // 获取数据
        }

        async getSplRules() {
            //发起ajax请求，更改数据
            this.loading = true;
            let data = await this.$api.configM.splitRulesquery({
                assetSplitWay: this.form.assetSplitWay,
                pageNum: this.pagInfo.currentPage,
                pageSize: this.pagInfo.pageSize
            });
            if (data.data.resultCode === "0000") {
                data = data.data;
                this.chashProivderDicts = data.dicts; // 字典
                this.data = data.data;
                this.pagInfo.total = data.dataCount;
            }
            this.loading = false;
        }

        search() {
            this.pagInfo.currentPage = 1;
            this.getSplRules();
        }

        getInfo() {
            //@ts-ignore
            this.$refs.form.validate(valid => {
                //1.校验参数是否合法
                if (valid) {
                    this.getSplRules();
                }
            });
        }

        resetForm(formName: string) {
            // 重置表单内容
            //@ts-ignore
            this.$refs[formName].resetFields();
        }

        add() {
            this.$router.push({path: "/configm/addsplitrules"});
        }

        update(row: any) {
            this.$router.push({
                path: "/configm/updatesplitrules",
                query: {updateId: row.assetSplitNo}
            });
        }

        //@ts-ignore
        formatterBelongs(row, column, cellValue) {
            //@ts-ignore
            return this.getName(this.chashProivderDicts, cellValue);
        }

        //@ts-ignore
        formatterCashProvider(row, column, cellValue) {
            let arr: any = [];
            cellValue.split(",").forEach((item: any) => {
                //@ts-ignore
                arr.push(this.getName(this.chashProivderDicts, item));
            });
            return arr.join(",");
        }
    }
</script>

<style lang="scss" module>

    @import '../../../styles/common/config-list';
</style>
