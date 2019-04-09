<template>
    <div class="channel app-container">
        <!--search-->
        <collapse class="search">
            <template v-slot:title>
                筛选条件
            </template>
            <template>
                <div>
                    <el-form :model="form" ref="form" inline>
                        <el-form-item prop="channelNo" label="渠道编码">
                            <el-input v-model.number="form.channelNo" placeholder="渠道编码"></el-input>
                        </el-form-item>
                        <el-form-item prop="channelName" label="渠道名称">
                            <el-input v-model="form.channelName" placeholder="渠道名称"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="search-btn-box">
                        <el-button v-waves type="primary" icon="el-icon-search" size="medium" @click="getInfo">查询
                        </el-button>
                        <el-button v-waves type="primary" icon="el-icon-refresh" size="medium"
                                   @click="resetForm('form')">重置
                        </el-button>
                    </div>
                </div>
            </template>
        </collapse>
        <!--table-->
        <div class="content">
            <blockTitle :hide="trueVal">
                渠道配置列表
                <el-button type="primary" v-waves @click="add" size="mini">配置
                </el-button>
            </blockTitle>
            <div class="table-content">
                <el-table
                        border
                        v-loading="loading"
                        :data="data"
                        style="width: 100%"
                        header-cell-class-name="header-cell-class-name">
                    <el-table-column
                            prop="channelNo"
                            label="渠道编码">
                    </el-table-column>
                    <el-table-column
                            prop="channelName"
                            label="渠道名称">
                    </el-table-column>
                    <el-table-column
                            prop="channelType"
                            :formatter="formatterChannelType"
                            label="渠道类型">
                    </el-table-column>
                    <el-table-column
                            prop="channelSymbol"
                            label="渠道标识">
                    </el-table-column>
                    <el-table-column
                            prop="useYn"
                            :formatter="formatterUseYn"
                            label="是否启用">
                    </el-table-column>
                    <el-table-column
                            prop="inputUser"
                            label="创建人">
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            :formatter="formatterData"
                            label="创建时间">
                    </el-table-column>
                    <el-table-column
                            prop="updateUser"
                            label="更新人">
                    </el-table-column>
                    <el-table-column
                            prop="updateTime"
                            :formatter="formatterData"
                            label="更新时间">
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
                <pagination v-if="pagInfo.total"
                            :page.sync="pagInfo.currentPage"
                            :page-sizes="[10,20,30,50]"
                            :limit.sync="pagInfo.pageSize"
                            layout="sizes, prev, pager, next, jumper"
                            :total="pagInfo.total"
                            @pagination="getInfo"
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
    import {channelquery} from "@/api/configM";
    import formatter from '@/components/mixins/formatter';

    export default {
        name: 'channel',
        components: {pagination, blockTitle, collapse},
        directives: {waves},
        mixins: [formatter],
        data() {
            return {
                form: {
                    channelNo: '',
                    channelName: '',
                },
                pagInfo: {
                    total: '',
                    currentPage: 1,
                    pageSize: 10
                },
                loading: false,
                data: [],
                trueVal: true
            };
        },
        activated() {
            this.getChannel();// 获取数据
        },
        methods: {
            async getChannel() { //发起ajax请求，更改数据
                this.loading = true;
                let data = await channelquery(this.form.qdNo, this.form.qdName, this.pagInfo.currentPage, this.pagInfo.pageSize);
                if (data.data.resultCode === '0000') {
                    data = data.data;
                    this.data = data.data;
                    this.pagInfo.total = data.dataCount;
                }
                this.loading = false;
            },
            getInfo() {
                this.$refs.form.validate((valid) => { //1.校验参数是否合法
                    if (valid) {
                        this.getChannel();
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            add() {
                // 新增渠道,跳转存储默认值
                this.$router.push({path: '/configm/addchannel'});
            },
            update(row) {
                // 修改渠道,跳转存储默认值
                this.$router.push({path: "/configm/addchannel", query: {updateId: row.channelNo}});
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
