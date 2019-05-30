<template>
    <div :class="$style['edit-out-detail']" class="edit-out-detail app-container" v-show="show">
        <div :class="$style['edit-content']">
            <div :class="$style['content-border']">
                <el-form :model="form" ref="form">
                    <div :class="$style['row']">
                        <div :class="$style['name']" class="must-choose">输出模版编号</div>
                        <div :class="$style['content']">
                            <el-form-item prop="outputTemNo">
                                <el-input :disabled="true" v-model="form.outputTemNo"></el-input>
                            </el-form-item>
                        </div>
                        <div :class="$style['name']" class="must-choose">文件名称</div>
                        <div :class="[$style['content'],$style['last-box']]">
                            <el-form-item prop="fileName">
                                <el-input v-model="form.fileName"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div :class="$style['row']">
                        <div :class="$style['name']" class="must-choose">列分隔符</div>
                        <div :class="$style['content']">
                            <el-form-item prop="colSplitSymbol">
                                <el-input v-model="form.colSplitSymbol"></el-input>
                            </el-form-item>
                        </div>
                        <div :class="$style['name']" class="must-choose">文件字符编码</div>
                        <div :class="[$style['content'],$style['last-box']]">
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
                    <div :class="$style['row']">
                        <div :class="[$style['name'],$style['sql-name']]" class="must-choose">SQL语句</div>
                        <div :class="[$style['content'],$style['sql-content'],$style['last-box']]">
                            <el-form-item :class="$style['sql-textarea']" prop="sqlSentence">
                                <el-input rows="5" type="textarea" v-model="form.sqlSentence"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div :class="$style['row']">
                        <div :class="$style['name']">文件描述</div>
                        <div :class="[$style['content'],$style['last-box'],$style['desc']]">
                            <el-form-item prop="fileDesc">
                                <el-input v-model="form.fileDesc"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div :class="$style['row']">
                        <div :class="$style['name']">创建人</div>
                        <div :class="$style['content']">
                            <el-form-item prop="inputUser">
                                <el-input :disabled="trueVal" v-model="form.inputUser"></el-input>
                            </el-form-item>
                        </div>
                        <div :class="[$style['name'],$style['last-box']]"></div>
                        <div :class="[$style['content'],$style['last-box']]">
                        </div>
                    </div>
                </el-form>
                <div :class="$style['btn-action']">
                    <el-button @click="back" size="medium" type="primary">返回</el-button>
                    <el-button @click="submit('form')" size="medium" type="primary" v-if="type !== 'detail'">提交
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import schema from 'async-validator';

    export default {
        name: 'editOutDetail',
        data() {
            return {
                form: {
                    "outputTemNo": this.outputTemNo, // 输出模板编号
                    "fileName": '', // 文件名称
                    "fileDesc": '', // 文件描述
                    "fileWordCode": '', // 文件字符编码
                    "colSplitSymbol": '', // SQL语句
                    "sqlSentence": '', // 列分隔符
                    "inputUser": ''
                },
                rules: {
                    outputTemNo: [{required: true, message: '请输入输出模板编号'}],
                    fileName: [{required: true, message: '请输入文件名称'}],
                    fileWordCode: [{required: true, message: '请选择文件字符编码'}],
                    colSplitSymbol: [{required: true, message: '请输入列分隔符'}],
                    sqlSentence: [{required: true, message: '请输入SQL语句'}],
                },
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
        props: ['show', 'type', 'updateId', 'outputTemNo']
        ,
        computed: {
            ...mapGetters(['userInfo'])
        },
        created() {
            this.form.inputUser = this.userInfo.username;
        },
        watch: {
            updateId: async function (val) {
                if (val) {
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
                let data = await this.$api.configM.outdetailadd({
                    outputTemNo: this.form.outputTemNo,
                    fileName: this.form.fileName,
                    fileDesc: this.form.fileDesc,
                    fileWordCode: this.form.fileWordCode,
                    colSplitSymbol: this.form.colSplitSymbol,
                    sqlSentence: this.form.sqlSentence,
                    inputUser: this.form.inputUser // 当前用户
                });
                if (data.data.resultCode === '0000') {
                    this.$emit('updateData');
                    this.updateShow();
                }
            },
            async update() {
                let data = await this.$api.configM.outdetailupdate({
                    fileNo: this.updateId,
                    outputTemNo: this.form.outputTemNo,
                    fileName: this.form.fileName,
                    fileDesc: this.form.fileDesc,
                    fileWordCode: this.form.fileWordCode,
                    colSplitSymbol: this.form.colSplitSymbol,
                    sqlSentence: this.form.sqlSentence,
                    updateUser: this.userInfo.username
                });
                if (data.data.resultCode === '0000') {
                    this.$emit('updateData');
                    this.updateShow();
                }
            },
            updateShow() {
                this.$emit('update:show', !this.show);
                this.$emit('clearUpdateId');
                this.form = {
                    outputTemNo: this.outputTemNo, // 输出模板编号
                    fileName: '', // 文件名称
                    fileDesc: '', // 文件描述
                    fileWordCode: '', // 文件字符编码
                    colSplitSymbol: '', // 列分隔符
                    sqlSentence: '', // sql语句
                    inputUser: this.userInfo.username
                }
            }
        }
    }

</script>

<style lang="scss" module>


    .edit-out-detail {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1;


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

            :global {
                .el-button {
                    margin-left: 60px;
                }
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

        :global {
            /*修改input框的默认样式*/
            .el-input, .el-input__inner, .el-select-dropdown__list {
                line-height: 28px;
                height: 28px !important;
                font-size: 14px !important;
            }

            .el-input__icon {
                line-height: 28px;
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

        }

    }


</style>
