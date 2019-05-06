<template>
    <div class="edit-split-rules app-container">
        <div class="edit-content">
            <div class="content-border">
                <el-form :model="form" ref="form">
                    <div class="row">
                        <div class="name must-choose">拆分方式</div>
                        <div class="content">
                            <el-form-item prop="assetSplitWay">
                                <el-select placeholder="请选择" size="max" v-model="form.assetSplitWay">
                                    <el-option
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                            v-for="item in splitWay">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="name must-choose">拆分值</div>
                        <div class="content last-box">
                            <el-form-item prop="assetSplitValue">
                                <el-input v-model="form.assetSplitValue"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="row">
                        <div class="name must-choose">资金方</div>
                        <div class="content">
                            <el-form-item prop="contributiveNo">
                                <el-select multiple placeholder="请选择" size="max" v-model="form.contributiveNo">
                                    <el-option
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                            v-for="item in assetProvider">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="name must-choose">尾差归属方</div>
                        <div class="content last-box">
                            <el-form-item prop="qdType">
                                <el-select placeholder="请选择" size="max" v-model="form.pennyDifferenceBelongs">
                                    <el-option
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                            v-for="item in assetProvider">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="row">
                        <div class="name must-choose">是否启用</div>
                        <div class="content">
                            <el-form-item prop="status">
                                <el-select placeholder="请选择" size="max" v-model="form.useYn">
                                    <el-option
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                            v-for="item in useYnList">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="name">创建人</div>
                        <div class="content last-box">
                            <el-form-item prop="creator">
                                <el-input disabled v-model="form.inputUser"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
                <div class="btn-action">
                    <el-button @click="back" size="medium" type="primary">返回</el-button>
                    <el-button @click="submit('form')" size="medium" type="primary">提交</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import schema from 'async-validator';
    import alert from '../../../components/mixins/alert';

    export default {
        name: 'editSplitRules',
        mixins: [alert],
        data() {
            return {
                form: {
                    assetSplitWay: '', // 拆分方式
                    assetSplitValue: '', // 拆分值
                    contributiveNo: [], // 资金方编码
                    pennyDifferenceBelongs: '', // 尾差归属方
                    useYn: '',
                    inputUser: '',
                    updateUser: ''
                },
                rules: {
                    assetSplitWay: [{required: true, message: '请选择拆分方式'}],
                    assetSplitValue: [{required: true, message: '请输入拆分值'}],
                    contributiveNo: [{required: true, message: '请选择资金方编码'}],
                    pennyDifferenceBelongs: [{required: true, message: '请选择尾差归属方'}],
                    useYn: [{required: true, message: '请选择是否启用'}],
                },
                "useYnList": [{
                    value: "Y",
                    label: '启用'
                }, {
                    value: "N",
                    label: '禁用'
                }],
                "splitWay": [{
                    value: "01",
                    label: '按比例拆分'
                }, {
                    value: "02",
                    label: '按固定值拆分'
                }],
                assetProvider: [], // 资金方数组
                trueVal: true,
                updateId: '', // 如果有值就是更新操作
                isSubmit: false
            }
        },
        activated() {
            this.assetProvider = [];
            this.getDict();
            // 获取updateId,如果有值说明是更新
            let params = this.$route.query;
            // 主键查询，有值是修改，将主键保存，否则设置增加人为自己
            if (params.updateId) {
                this.updateId = params.updateId;
                this.query(params.updateId);
            } else {
                this.updateId = '';
                this.form.assetSplitWay = '';
                this.form.assetSplitValue = '';
                this.form.contributiveNo = [];
                this.form.pennyDifferenceBelongs = '';
                this.form.useYn = '';
                this.form.inputUser = this.userInfo.username;
                this.form.updateUser = ''
            }
            this.isSubmit = false;
        },
        computed: {
            ...mapGetters(['userInfo'])
        },
        methods: {
            async query(assetSplitNo) { // 查询用户信息
                //发起ajax请求，更改数据
                let data = await this.$api.configM.splitRulesquery({
                    assetSplitNo: assetSplitNo,
                    pageNum: 1,
                    pageSize: 10
                });
                if (data.data.resultCode === '0000') {
                    data = data.data;
                    if (data.data.length === 0) {
                        this.alertParamterError();
                    } else {
                        let item = data.data[0];
                        item.contributiveNo = item.contributiveNo.split(',');
                        Object.assign(this.form, data.data[0]);
                    }
                }
            },
            async getDict() {
                let data = await this.$api.configM.dictQuery({dictType: "contributive"});
                for (let item of data.data.dicts) {
                    let obj = {};
                    obj.value = item.code;
                    obj.label = item.codeName;
                    this.assetProvider.push(obj);
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
                let data = await this.$api.configM.splitRulesadd({
                    assetSplitWay: this.form.assetSplitWay, //
                    assetSplitValue: this.form.assetSplitValue,
                    contributiveNo: this.form.contributiveNo.join(','),
                    pennyDifferenceBelongs: this.form.pennyDifferenceBelongs,
                    inputUser: this.form.inputUser,
                    useYn: this.form.useYn
                });
                if (data.data.resultCode === '0000') {
                    this.$router.go(-1);
                }
                this.isSubmit = false;
            },
            async update() {
                let data = await this.$api.configM.splitRulesupdate({
                        assetSplitNo: this.updateId,
                        assetSplitWay: this.form.assetSplitWay, //
                        assetSplitValue: this.form.assetSplitValue,
                        contributiveNo: this.form.contributiveNo.join(','),
                        pennyDifferenceBelongs: this.form.pennyDifferenceBelongs,
                        updateUser: this.userInfo.username,
                        useYn: this.form.useYn
                    }
                );
                if (data.data.resultCode === '0000') {
                    this.$router.go(-1);
                }
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
        height: 28px !important;
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
