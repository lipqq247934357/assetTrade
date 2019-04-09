<template>
    <div class="edit-cash-output app-container">
        <div class="edit-content">
            <div class="content-border">
                <el-form :model="form" :rules="rules" ref="form">
                    <div class="row">
                        <div class="name must-choose">模板名称</div>
                        <div class="content">
                            <el-form-item prop="qdNo">
                                <el-input v-model="form.qdNo"></el-input>
                            </el-form-item>
                        </div>
                        <div class="name must-choose">是否启用</div>
                        <div class="content last-box">
                            <el-form-item prop="status">
                                <el-select v-model="form.status" placeholder="请选择" size="max">
                                    <el-option
                                            v-for="item in useYn"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="row">
                        <div class="name">创建人</div>
                        <div class="content">
                            <el-form-item prop="creator">
                                <el-input v-model="form.creator" :disabled="trueVal"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
                <div class="btn-action">
                    <el-button @click="configDetail" type="primary" size="medium">配置明细</el-button>
                    <el-button @click="back" type="primary" size="medium">返回</el-button>
                    <el-button @click="submit('form')" type="primary" size="medium">提交</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {urlParse} from '@/utils/utils';
    import {outputquery} from "@/api/configM";

    export default {
        name: 'editCashOutput',
        data() {
            return {
                form: {
                    "qdNo": '',
                    "qdName": '',
                    "qdType": '',
                    "qdTag": '',
                    "status": '',
                    "creator": ''
                },
                rules: {},
                "channelType": [{
                    value: 1,
                    label: '自营'
                }, {
                    value: 2,
                    label: '三方'
                }],
                "useYn": [{
                    value: "Y",
                    label: '启用'
                }, {
                    value: "N",
                    label: '禁用'
                }],
                trueVal: true,
                updateId: ''
            }
        },
        activated() {
            this.form = {};
            // 获取updateId,如果有值说明是更新
            let params = urlParse();
            // 主键查询，有值是修改，将主键保存，否则设置增加人为自己
            console.log(params.updateId);
            if (params.updateId) {
                this.query(params.updateId);
            } else {
                this.form.inputUser = this.inputUser;
            }
        },
        methods: {
            async query(channelNo) { // 查询用户信息
                //发起ajax请求，更改数据
                let data = await outputquery(channelNo);
                if (data.total > 0) {// 存在
                    this.updateId = data.data[0].channelNo;
                    this.form = data.data[0];
                } else {
                    console.log('没有找到channelNo为' + channelNo + '的内容');
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
                let res = await addChannel();
                console.log(res);
                this.$router.go(-1);
            },
            async udpate() {
                let res = await addChannel();
                console.log(res);
                this.$router.go(-1);
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
