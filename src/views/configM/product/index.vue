<template>
    <div class="product app-container">
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
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        v-for="item in channeSelect">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="金融产品名称" prop="prodName">
                            <el-input placeholder="金融产品名称" v-model="form.prodName"></el-input>
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
                金融产品配置列表
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
                            :formatter="formatterPCI"
                            label="是否征信报送"
                            prop="isSubmitPCI">
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
        name: "product",
        components: {pagination, blockTitle, collapse},
        mixins: [formatter]
    })
    export default class extends Vue {
        form: any = {
            channelNo: "", // 渠道编号
            prodName: "" // 金融产品名称
        };
        pagInfo: IpagInfo = {
            // 分页数据
            total: 0,
            currentPage: 1,
            pageSize: 10
        };
        loading: boolean = false;
        data: object[] = []; // 表格数据
        trueVal: boolean = true; // 可以被优化，暂时没动
        channelDicts: object[] = []; // 渠道字典 {code:xx,codeName:xx}
        channeSelect: object[] = []; // 渠道列表
        firstIncome: boolean = true;

        activated() {
            this.firstIncome = true;
            this.getProduct();
        }

        async getProduct() {
            //发起ajax请求，更改数据
            this.loading = true;
            let data = await this.$api.configM.productquery({
                channelNo: this.form.channelNo,
                prodName: this.form.prodName,
                pageNum: this.pagInfo.currentPage,
                pageSize: this.pagInfo.pageSize
            });
            if (data.data.resultCode === "0000") {
                data = data.data;
                this.data = data.data;
                this.channelDicts = data.dicts; // 字典
                if (this.firstIncome === true) {
                    this.firstIncome = false;
                    //@ts-ignore
                    this.channelList(this.channelDicts);
                }
                this.pagInfo.total = data.dataCount;
            }
            this.loading = false;
        }

        search() {
            this.pagInfo.currentPage = 1;
            this.getProduct();
        }

        getInfo() {
            this.getProduct();
        }

        resetForm(formName: string) {
            //@ts-ignore
            this.$refs[formName].resetFields();
        }

        add() {
            // 新增
            this.$router.push({path: "/configm/addproduct"});
        }

        update(row: any) {
            //修改
            this.$router.push({
                path: "/configm/updateproduct",
                query: {updateId: row.prodNo}
            });
        }

        //@ts-ignore
        formatterChannelName(row, column, cellValue) {
            //@ts-ignore
            return this.getName(this.channelDicts, cellValue);
        }

        channelList(channelDicts: { code: any, codeName: string }[]) {
            this.channeSelect = [];
            for (let item of channelDicts) {
                let obj: { value: any, label: string } = {value: '', label: ''};
                obj.value = item.code;
                obj.label = item.codeName;
                this.channeSelect.push(obj);
            }
        }
    }
</script>

<style lang="scss" module>

    @import '../../../styles/common/config-list';
</style>
