<template>
    <div class="credit app-container">
        <!--search-->
        <collapse class="search">
            <template v-slot:title>
                筛选条件
            </template>
            <template>
                <div>
                    <el-form :model="form" ref="form" inline label-width="100px">
                        <el-form-item prop="qdNo" label="姓名" class="aa">
                            <el-input placeholder="请输入姓名" v-model="form.qdNo"></el-input>
                        </el-form-item>
                        <el-form-item prop="qdName" label="身份证号">
                            <el-input placeholder="请输入身份证号" v-model="form.qdName"></el-input>
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
                资产列表
            </blockTitle>
            <div class="table-content">
                <el-table
                        border
                        v-loading="loading"
                        :data="data.pageData"
                        style="width: 100%"
                        header-cell-class-name="header-cell-class-name">
                >
                    <el-table-column
                            prop="channel"
                            label="申请编号"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="code"
                            label="申请日期"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="number"
                            label="渠道"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="借款人编号"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="money"
                            label="借款人姓名"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="mode"
                            label="身份证号"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="rate"
                            label="决策结果"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="balance"
                            label="风控策略码"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="deadline"
                            label="创建时间"
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

    export default {
        name: 'credit',
        components: {pagination, blockTitle, collapse},
        directives: {waves},
        data() {
            // 渠道No校验
            let qdNoValid = function (rule, value, callback) { // 校验渠道编号规则
                if (value && !Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    qdNo: '',
                    qdName: '',
                    qdName2: '',
                    qdName3: '',
                    startDate: '',
                    endDate: ''
                },
                rules: {
                    channelNo: [
                        {validator: qdNoValid, trigger: 'blur'}
                    ]
                },
                pagInfo: {
                    total: '',
                    currentPage: 1,
                    pageSize: 10
                },
                loading: false,
                data: {},
                trueVal: true
            };
        },
        created() {
        },
        methods: {
            async getChannel() {
                //发起ajax请求，更改数据
                this.loading = true;
                let data = await channelquery(this.form.qdNo, this.form.qdName);
                this.data = data.data;
                this.pagInfo.total = data.totalPage;
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
            detail() {
                let obj = this.remainParam();
                obj.updateId = 2;
                this.$router.push({path: '/assetmanage/creditdetail', query: obj});                // 新增渠道,跳转存储默认值
            },
            remainParam() { // 获取默认参数
                let obj = {};
                Object.keys(this.form).forEach((key) => {
                    if (this.form[key]) obj[key] = this.form[key];
                });
                return obj;
            },
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

            &:last-child {
                width: 60%;
            }
        }

        .el-input {
            width: 100%;
        }

        .datetime {
            display: inline-block;
            width: 180px;
        }

        .el-date-editor--date {
            display: inline-block;
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
