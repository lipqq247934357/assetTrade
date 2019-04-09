<template>
    <div class="edit-split-rules app-container">
        <div class="edit-content">
            <div class="content-border">
                <el-form :model="form" ref="form">
                    <div class="row">
                        <div class="name must-choose">拆分方式</div>
                        <div class="content">
                            <el-form-item prop="assetSplitWay">
                                <el-select v-model="form.assetSplitWay" placeholder="请选择" size="max">
                                    <el-option
                                            v-for="item in splitWay"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
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
                                <el-select v-model="form.contributiveNo" multiple placeholder="请选择" size="max">
                                    <el-option
                                            v-for="item in assetProvider"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="name must-choose">尾差归属方</div>
                        <div class="content last-box">
                            <el-form-item prop="qdType">
                                <el-select v-model="form.pennyDifferenceBelongs" placeholder="请选择" size="max">
                                    <el-option
                                            v-for="item in assetProvider"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="row">
                        <div class="name must-choose">是否启用</div>
                        <div class="content">
                            <el-form-item prop="status">
                                <el-select v-model="form.useYn" placeholder="请选择" size="max">
                                    <el-option
                                            v-for="item in useYnList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="name">创建人</div>
                        <div class="content last-box">
                            <el-form-item prop="creator">
                                <el-input v-model="form.inputUser" :disabled="trueVal"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
                <div class="btn-action">
                    <el-button @click="back" type="primary" size="medium">返回</el-button>
                    <el-button @click="submit('form')" type="primary" size="medium">提交</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {urlParse} from '@/utils/utils';
    import {splitRulesquery, splitRulesadd, splitRulesupdate} from "@/api/configM";

    export default {
        name: 'editSplitRules',
        data() {
            return {
                form: {
                    assetSplitWay: '', //
                    assetSplitValue: '',
                    contributiveNo: [],
                    channelSymbol: '',
                    useYn: '',
                    inputUser: '',
                    updateUser: ''
                },
                rules: {},
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
                assetProvider: [],
                trueVal: true,
                updateId: ''
            }
        },
        activated() {
            // 获取updateId,如果有值说明是更新
            let params = urlParse();
            // 主键查询，有值是修改，将主键保存，否则设置增加人为自己
            if (params.updateId) {
                this.query(params.updateId);
            } else {
                this.form.inputUser = this.inputUser;
                this.form.assetSplitWay = '';
                this.form.assetSplitValue = '';
                this.form.contributiveNo = [];
                this.form.channelSymbol = '';
                this.form.useYn = '';
                this.form.inputUser = '';
                this.form.updateUser = ''
            }
        },
        methods: {
            async query(assetSplitNo) { // 查询用户信息
                //发起ajax请求，更改数据
                let data = await splitRulesquery(assetSplitNo);
                if (data.data.resultCode === '0000') {
                    data = data.data;
                    if (data.dataCount > 0) {// 存在
                        this.updateId = data.data[0].assetSplitNo;
                        let item = data.data[0];
                        this.addAssetProvider(data);
                        item.contributiveNo = item.contributiveNo.split(',');
                        Object.assign(this.form, data.data[0]);
                    } else {
                        console.log('没有找到assetSplitNo为' + assetSplitNo + '的内容');
                    }
                }
            },
            back() {
                this.$router.go(-1);
            },
            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //如果updateId不为空，是更新，否则是新增
                        if (this.updateId) {
                            this.update();
                        } else {
                            this.add();
                        }
                    } else {
                    }
                });
            },
            async add() {
                let form = this.form;
                let data = await splitRulesadd(form.assetSplitNo, form.channelSymbol, form.useYn, this.inputUser);
                if (data.data.resultCode === '0000') {
                    this.$router.go(-1);
                }
            },
            async update() {
                let form = this.form;
                let data = await splitRulesupdate(form.channelNo, form.channelName, form.useYn, this.inputUser);
                if (data.data.resultCode === '0000') {
                    this.$router.go(-1);
                }
            },
            addAssetProvider(data) {
                // 将字典的内容放入到下拉列表中
                let tmp = [];
                for (let item of data.dicts) {
                    let obj = {};
                    obj.value = item.code;
                    obj.label = item.codeName;
                    tmp.push(obj);
                }
                this.assetProvider = tmp;
            }
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
