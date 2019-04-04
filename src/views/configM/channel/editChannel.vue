<template>
    <div class="edit-channel app-container">
        <div class="edit-content">
            <div class="content-border">
                <el-form :model="form" :rules="rules" ref="form">
                    <div class="row">
                        <div class="name must-choose">渠道编码</div>
                        <div class="content">
                            <el-form-item prop="channelNo">
                                <el-input v-model="form.channelNo"></el-input>
                            </el-form-item>
                        </div>
                        <div class="name must-choose">渠道名称</div>
                        <div class="content last-box">
                            <el-form-item prop="channelName">
                                <el-input v-model="form.channelName"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="row">
                        <div class="name must-choose">渠道类型</div>
                        <div class="content">
                            <el-form-item prop="qdType">
                                <el-select v-model="form.channelType" placeholder="请选择" size="max">
                                    <el-option
                                            v-for="item in channelTypeList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                        </div>
                        <div class="name must-choose">渠道标识</div>
                        <div class="content last-box">
                            <el-form-item prop="channelSymbol">
                                <el-input v-model="form.channelSymbol"></el-input>
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
    import {channelquery, channeladd, channelupdate} from "@/api/configM";
    import {mapGetters} from 'vuex'

    export default {
        name: 'editChannel',
        data() {
            return {
                form: {
                    channelNo: '',
                    channelName: '',
                    channelType: '',
                    channelSymbol: '',
                    useYn: '',
                    inputUser: '',
                    updateUser: ''
                },
                rules: {},
                "channelTypeList": [{
                    value: 1,
                    label: '自营'
                }, {
                    value: 2,
                    label: '三方'
                }],
                "useYnList": [{
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
        computed: {
            ...mapGetters({
                    inputUser: 'name'
                }
            )
        },
        created() {
            // 获取updateId,如果有值说明是更新
            let params = urlParse();
            // 主键查询，有值是修改，将主键保存，否则console.log提示
            if (params.updateId) {
                this.query(params.updateId);
            } else {
                this.form.inputUser = this.inputUser;
            }
        },
        methods: {
            async query(channelNo) { // 查询用户信息
                //发起ajax请求，更改数据
                let data = await channelquery(channelNo);
                if (data.total > 0) {// 存在
                    this.updateId = data.data[0].channelNo;
                    this.form = data.data[0];
                } else {
                    console.log('没有找到channelNo为' + channelNo + '的内容');
                }
            },
            back() {
                this.$router.push({ // 返回上个页面，将参数传过去
                    name: "channel",
                    params: urlParse()
                });
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
                let res = await channeladd(form.channelNo, form.channelName, form.channelType, form.channelSymbol, form.useYn, this.inputUser);
            },
            async udpate() {
                let form = this.form;
                let res = await channelupdate(form.channelNo, form.channelName, form.channelType, form.channelSymbol, form.useYn, this.inputUser);
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
