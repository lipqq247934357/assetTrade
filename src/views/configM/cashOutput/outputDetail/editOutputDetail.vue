<template>
    <div class="edit-out-detail app-container" v-show="show">
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
                            <el-form-item prop="fileName">
                                <el-input v-model="form.fileName"></el-input>
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
                                <el-select placeholder="请选择" size="max" v-model="form.fileWordCode">
                                    <el-option
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                            v-for="item in fileWordCode">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                        </div>
                    </div>
                    <div class="row">
                        <div class="name sql-name must-choose">SQL语句</div>
                        <div class="content sql-content last-box">
                            <el-form-item class="sql-textarea" prop="sqlSentence">
                                <el-input rows="5" type="textarea" v-model="form.sqlSentence"></el-input>
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
                                <el-input :disabled="trueVal" v-model="form.inputUser"></el-input>
                            </el-form-item>
                        </div>
                        <div class="name last-box"></div>
                        <div class="content last-box">
                        </div>
                    </div>
                </el-form>
                <div class="btn-action">
                    <el-button @click="back" size="medium" type="primary">返回</el-button>
                    <el-button @click="submit('form')" size="medium" type="primary" v-if="type !== 'detail'">提交
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {urlParse} from '@/utils/utils';
    import {mapGetters} from 'vuex';

    export default {
        name: 'editOutDetail',
        data() {
            return {
                form: {
                    "outputTemNo": '',
                    "fileName": '',
                    "fileDesc": '',
                    "useYn": '',
                    "fileWordCode": '',
                    "colSplitSymbol": '',
                    "sqlSentence": '',
                    "inputUser": ''
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
            }
        },
        props: ['show', 'type', 'updateId']
        ,
        computed: {
            ...mapGetters(['userInfo'])
        },
        created() {
            this.form.inputUser = this.userInfo.username;
        },
        watch: {
            updateId: async function (val) {
                if (!val) {
                    this.form = {
                        "outputTemNo": '',
                        "fileName": '',
                        "fileDesc": '',
                        "useYn": '',
                        "fileWordCode": '',
                        "colSplitSymbol": '',
                        "sqlSentence": '',
                        "inputUser": this.userInfo.username
                    }
                } else {
                    let data = await this.$api.configM.outdetailquery({
                        fileNo: val,
                        pageNum: 1,
                        pageSize: 10
                    });
                    if (data.data.resultCode === '0000') {
                        data = data.data;
                        this.form = data.data[0];
                    }
                }
            }
        },
        methods: {
            back() {
                this.updateShow();
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
                let data = await this.$api.configM.outdetailadd({
                    "outputTemNo": this.form.outputTemNo,
                    "fileName": this.form.fileName,
                    "fileDesc": this.form.fileDesc,
                    "fileWordCode": this.form.fileWordCode,
                    "colSplitSymbol": this.form.colSplitSymbol,
                    "sqlSentence": this.form.sqlSentence,
                    "inputUser": this.form.inputUser // 当前用户
                });
                if (data.data.resultCode === '0000') {
                    this.$emit('updateData');
                    this.updateShow();
                }
            },
            async update() {
                let data = await this.$api.configM.outdetailupdate({
                    "fileNo": this.updateId,
                    "outputTemNo": this.form.outputTemNo,
                    "fileName": this.form.fileName,
                    "fileDesc": this.form.fileDesc,
                    "fileWordCode": this.form.fileWordCode,
                    "colSplitSymbol": this.form.colSplitSymbol,
                    "sqlSentence": this.form.sqlSentence,
                    "updateUser": this.userInfo.username
                });
                if (data.data.resultCode === '0000') {
                    this.$emit('updateData');
                    this.updateShow();
                }
            },
            updateShow() {
                this.$emit('update:show', !this.show);
                this.$emit('clearUpdateId');
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
