<template>
    <div class="edit-cash-output app-container">
        <div class="edit-content">
            <div class="content-border">
                <el-form :model="form" ref="form">
                    <div class="row">
                        <div class="name must-choose">模板名称</div>
                        <div class="content">
                            <el-form-item prop="outputTemName">
                                <el-input v-model="form.outputTemName"></el-input>
                            </el-form-item>
                        </div>
                        <div class="name must-choose">是否启用</div>
                        <div class="content last-box">
                            <el-form-item prop="useYn">
                                <el-select placeholder="请选择" size="max" v-model="form.useYn">
                                    <el-option
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                            v-for="item in useStatus">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="row">
                        <div class="name">创建人</div>
                        <div class="content">
                            <el-form-item prop="inputUser">
                                <el-input disabled v-model="form.inputUser"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
                <div class="btn-action">
                    <el-button @click="configDetail" size="medium" type="primary" v-if="updateId">配置明细
                    </el-button>
                    <el-button @click="back" size="medium" type="primary">返回</el-button>
                    <el-button @click="submit('form')" size="medium" type="primary">提交</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {urlParse} from '@/utils/utils';
    import {mapGetters} from 'vuex';
    import schema from 'async-validator';

    export default {
        name: 'editCashOutput',
        data() {
            return {
                form: {
                    outputTemName: '', // 资产输出模板名称
                    useYn: '',
                    inputUser: ''
                },
                rules: {
                    outputTemName: [{required: true, message: '请输入模板名称'}],
                    useYn: [{required: true, message: '请选择是否启用'}]
                },
                "channelType": [{
                    value: 1,
                    label: '自营'
                }, {
                    value: 2,
                    label: '三方'
                }],
                "useStatus": [{
                    value: "Y",
                    label: '启用'
                }, {
                    value: "N",
                    label: '禁用'
                }],
                trueVal: true,
                updateId: '',
                isSubmit: false // 是否正在提交，防止多次提交
            }
        },
        activated() {
            this.form = {
                outputTemName: '',
                useYn: '',
                inputUser: ''
            };
            // 获取updateId,如果有值说明是更新
            let params = urlParse();
            // 主键查询，有值是修改，将主键保存，否则设置增加人为自己
            this.updateId = params.updateId;
            if (this.updateId) {
                this.query(params.updateId);
            } else {
                this.updateId = '';
                this.form.inputUser = this.userInfo.username;
            }
            this.isSubmit = false;
        },
        computed: {
            ...mapGetters(['userInfo'])
        },
        methods: {
            async query(params) { // 查询用户信息
                //发起ajax请求，更改数据
                let data = await this.$api.configM.outputquery({
                    outputTemNo: params,
                    pageNum: 1,
                    pageSize: 10
                });
                if (data.data.resultCode === '0000') {
                    this.form = data.data.data[0];
                }
            },
            back() {
                this.$router.go(-1);
            },
            submit() {
                let validator = new schema(this.rules);
                validator.validate(this.form, (errors) => {
                    if (errors) {
                        this.$message.warning({message: errors[0].message, duration: 2000});
                    } else {
                        if (this.updateId) { //如果updateId不为空，是更新，否则是新增
                            this.confirmSubmit();
                        } else {
                            this.add();
                        }
                    }
                })
            },
            confirmSubmit() {
                this.$confirm('是否确认修改?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.update();
                }).catch(() => {
                });
            },
            async add() {
                if (this.isSubmit) {
                    return;
                }
                this.isSubmit = true;
                let data = await this.$api.configM.outputadd({
                    outputTemName: this.form.outputTemName,
                    useYn: this.form.useYn,
                    inputUser: this.form.inputUser // 这个值是当前用户
                });
                if (data.data.resultCode === '0000') {
                    this.$router.go(-1);
                }
                this.isSubmit = false;
            },
            async update() {
                let data = await this.$api.configM.outputupdate({
                    outputTemNo: this.updateId,
                    outputTemName: this.form.outputTemName,
                    useYn: this.form.useYn,
                    updateUser: this.userInfo.username
                });
                if (data.data.resultCode === '0000') {
                    this.$router.go(-1);
                }
            },
            configDetail() {
                this.$router.push({path: "/configm/outputdetail", query: {updateId: this.updateId}});
            },
        }
    }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>


    .edit-content {
        min-height: calc(100vh - 90px);
        border-top: 3px solid #83c5fc;
        border-radius: 4px 2px 0 0;
        background: #fff;
        padding: 20px 0;
        position: relative;
    }


    .content-border {
        border: 1px solid #f4f4f5;
        width: 94%;
        margin: 0 auto;
        min-height: calc(100vh - 130px);

        .btn-action {
            position: absolute;
            right: 60px;
            bottom: 40px;
        }

        .el-button {
            margin-left: 60px;
        }

    }

    .row {
        overflow: hidden;
        text-align: right;
        line-height: 40px;
        font-size: 14px;

        .name, .content {
            float: left;
            border-right: 1px solid #f4f4f5;
            border-bottom: 1px solid #f4f4f5;
            height: 40px;
        }

        .name {
            width: 18%;
            padding-right: 30px;
        }

        .content {
            width: 32%;
            text-align: center;
            padding: 0 20px;
        }

        div.last-box {
            border-right: 0;
        }
    }


    /*修改input框的默认样式*/
    /deep/ .el-input__inner, .el-select-dropdown__list {
        height: 28px;
        font-size: 14px;
    }

    /*选择框宽度*/
    .el-select--max {
        width: 100%;
    }

    /*修改下拉框的字体*/
    .el-select-dropdown__item {
        font-size: 14px;
    }

    /*选择框右侧箭头*/
    .el-select__caret {
        font-size: 12px;
    }


</style>
