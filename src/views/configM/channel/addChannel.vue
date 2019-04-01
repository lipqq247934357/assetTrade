<template>
    <div class="add-channel app-container">
        <div class="add-channel-content">
            <div class="content-border">
                <el-form :model="form" :rules="rules" ref="form">
                    <div class="row">
                        <div class="name must-choose">渠道编码</div>
                        <div class="content">
                            <el-form-item prop="qdNo">
                                <el-input v-model="form.qdNo"></el-input>
                            </el-form-item>
                        </div>
                        <div class="name must-choose">渠道名称</div>
                        <div class="content last-box">
                            <el-form-item prop="qdName">
                                <el-input v-model="form.qdName"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="row">
                        <div class="name must-choose">渠道类型</div>
                        <div class="content">
                            <el-form-item prop="qdType">
                                <el-select v-model="form.qdType" placeholder="请选择" size="max">
                                    <el-option
                                            v-for="item in qdTag"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                        </div>
                        <div class="name must-choose">渠道标识</div>
                        <div class="content last-box">
                            <el-form-item prop="qdTag">
                                <el-input v-model="form.qdTag"></el-input>
                            </el-form-item>

                        </div>
                    </div>
                    <div class="row">
                        <div class="name must-choose">是否启用</div>
                        <div class="content">
                            <div class="h32px">
                                <el-form-item prop="status">
                                    <el-select v-model="form.status" placeholder="请选择" size="max">
                                        <el-option
                                                v-for="item in qdTag"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="name">创建人</div>
                        <div class="content last-box">
                            <el-form-item prop="creator">
                                <el-input v-model="form.creator" :disabled="trueVal"></el-input>
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
    import {addChannel} from "../../../api";

    export default {
        name: 'addChannel',
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
                "qdTag": [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                trueVal: true,
                updateId: ''
            }
        },
        created() {
            // 获取是updateId,如果有值，说明是更新操作
            let params = urlParse();
            // 查询id为这个值的一行，如果返回的值不为空，说明确实是修改，将更新id保存下来，否则console.log提示
            this.query(params.updateId);
        },
        methods: {
            back() {
                this.$router.push({name: "channelconfig", params: urlParse()});
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
            async query(id) { // 查询用户信息

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
            }

        }
    }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>


    .add-channel-content {
        min-height: calc(100vh - 90px);
        background: #fff;
        padding: 20px 0;
        border-top: 3px solid #83c5fc;
        border-radius: 4px 2px 0 0;
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

    .h32px {
        height: 32px;
    }

</style>
