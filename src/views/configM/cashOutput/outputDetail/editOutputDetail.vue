<template>
    <div class="edit-out-detail app-container">
        <div class="edit-content">
            <div class="content-border">
                <el-form :model="form" :rules="rules" ref="form">
                    <div class="row">
                        <div class="name must-choose">输出模版编号</div>
                        <div class="content">
                            <el-form-item prop="outputTemNo">
                                <el-input v-model="form.outputTemNo"></el-input>
                            </el-form-item>
                        </div>
                        <div class="name must-choose">文件名称</div>
                        <div class="content last-box">
                            <el-form-item prop="filename">
                                <el-input v-model="form.filename"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="row">
                        <div class="name must-choose">列分隔符</div>
                        <div class="content">
                            <el-form-item prop="colSplitSymbol">
                                <el-input v-model="form.colSplitSymbol"></el-input>
                            </el-form-item>
                        </div>
                        <div class="name must-choose">文件字符编码</div>
                        <div class="content last-box">
                            <el-form-item prop="fileWordCode">
                                <el-select v-model="form.fileWordCode" placeholder="请选择" size="max">
                                    <el-option
                                            v-for="item in fileWordCode"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                        </div>
                    </div>
                    <div class="row">
                        <div class="name sql-name must-choose">SQL语句</div>
                        <div class="content sql-content last-box">
                            <el-form-item class="sql-textarea" prop="sqlSentence">
                                <el-input type="textarea" v-model="form.sqlSentence" rows="5"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="row">
                        <div class="name">文件描述</div>
                        <div class="content last-box desc">
                            <el-form-item prop="fileDesc">
                                <el-input v-model="form.fileDesc"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="row">
                        <div class="name">创建人</div>
                        <div class="content">
                            <el-form-item prop="inputUser">
                                <el-input v-model="form.inputUser" :disabled="trueVal"></el-input>
                            </el-form-item>
                        </div>
                        <div class="name last-box"></div>
                        <div class="content last-box">
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
    import {channel, addChannel} from "@/api";

    export default {
        name: 'editOutDetail',
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
                "useYn": [{
                    value: "Y",
                    label: '启用'
                }, {
                    value: "N",
                    label: '禁用'
                }],
                fileWordCode: [{
                    value: "utf-8",
                    label: 'utf-8'
                }, {
                    value: "gbk",
                    label: 'gbk'
                }, {
                    value: "gb2312",
                    label: 'gb2312'
                }],
                trueVal: true,
                updateId: ''
            }
        },
        props: ['show']
        ,
        created() {
            // 获取updateId,如果有值说明是更新
            let params = urlParse();
            // 主键查询，有值是修改，将主键保存，否则console.log提示
            params.channelNo && this.query(params.channelNo);
        },
        methods: {
            async query(channelNo) { // 查询用户信息
                //发起ajax请求，更改数据
                let data = await channel(channelNo);
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
            }
        }
    }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>


    .edit-out-detail {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1;

    }

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


        .name.sql-name, .content.sql-content {
            height: 140px;
        }

        .content.sql-content, .content.desc {
            width: 82%;
        }

        .sql-textarea {
            margin-top: 10px;
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
