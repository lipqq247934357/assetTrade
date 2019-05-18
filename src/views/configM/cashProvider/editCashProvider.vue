<template>
    <div class="edit-provider app-container">
        <div :class="$style['edit-content']">
            <div :class="$style['content-border']">
                <el-form :model="form" ref="form">
                    <div :class="$style['row']">
                        <div :class="$style['name']" class="must-choose">资金方编码</div>
                        <div :class="$style['content']">
                            <el-form-item prop="contributiveNo">
                                <el-input v-model="form.contributiveNo"></el-input>
                            </el-form-item>
                        </div>
                        <div :class="$style['name']" class="must-choose">资金方名称</div>
                        <div :class="[$style['content'],$style['last-box']]">
                            <el-form-item prop="contributiveName">
                                <el-input v-model="form.contributiveName"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div :class="$style['row']">
                        <div :class="$style['name']" class="must-choose">资产输出模板</div>
                        <div :class="$style['content']">
                            <el-form-item prop="outputTemNo">
                                <el-select placeholder="请选择" size="max" v-model="form.outputTemNo">
                                    <el-option
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                            v-for="item in dicts">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div :class="$style['name']" class="must-choose">是否启用</div>
                        <div :class="[$style['content'],$style['last-box']]">
                            <el-form-item prop="useYn">
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
                    </div>
                    <div :class="$style['row']">
                        <div :class="$style['name']">创建人</div>
                        <div :class="$style['content']">
                            <el-form-item prop="creator">
                                <el-input :disabled="trueVal" v-model="form.inputUser"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
                <div :class="$style['btn-action']">
                    <el-button @click="back" size="medium" type="primary">返回</el-button>
                    <el-button @click="submit('form')" size="medium" type="primary">提交</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import schema from 'async-validator';
    import alert from '../../../components/mixins/alert';

    export default {
        name: 'editProvider',
        mixins:[alert],
        data() {
            return {
                form: {
                    contributiveNo: '', // 资金方编码
                    contributiveName: '', // 资金方名称
                    outputTemNo: '', // 输出模板编码
                    useYn: '',
                    inputUser: '',
                    updateUser: ''
                },
                rules: {
                    contributiveNo: [{required: true, message: '请输入资金方编码'}],
                    contributiveName: [{required: true, message: '请输入资金方名称'}],
                    outputTemNo: [{required: true, message: '请选择输出模板编码'}],
                    useYn: [{required: true, message: '请选择是否启用'}],
                },
                dicts: [], // 资金方字典 {code:xx,codeName:xx}
                "useYnList": [{
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
            this.dicts = []; // 重置字典
            this.getDict();
            this.form = {};
            // 获取updateId,如果有值说明是更新
            let params = this.$route.query;
            // 主键查询，有值是修改，将主键保存，否则设置增加人为自己
            if (params.updateId) {
                this.updateId = params.updateId;
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
            async query(contributiveNo) { // 查询用户信息
                //发起ajax请求，更改数据
                let data = await this.$api.configM.cashproviderquery({
                    contributiveNo: contributiveNo,
                    pageNum: 1,
                    pageSize: 10
                });
                if (data.data.resultCode === '0000') {
                    data = data.data;
                    if (data.data.length === 0) {
                        this.alertParamterError();
                    } else {
                        this.form = data.data[0];
                    }
                }
            },
            async getDict() {
                let data = await this.$api.configM.dictQuery({dictType: "outputTem"});
                for (let item of data.data.dicts) {
                    let obj = {};
                    obj.value = item.code;
                    obj.label = item.codeName;
                    this.dicts.push(obj);
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
                let form = this.form;
                let data = await this.$api.configM.cashprovideradd({
                    contributiveNo: form.contributiveNo,
                    contributiveName: form.contributiveName,
                    outputTemNo: form.outputTemNo,
                    useYn: form.useYn,
                    inputUser: this.form.inputUser
                });
                if (data.data.resultCode === '0000') {
                    this.$router.go(-1);
                }
                this.isSubmit = false;
            },
            async update() {
                let form = this.form;
                let data = await this.$api.configM.cashproviderupdate({
                    contributiveNo: form.contributiveNo,
                    contributiveName: form.contributiveName,
                    outputTemNo: form.outputTemNo,
                    useYn: form.useYn,
                    updateUser: this.userInfo.username
                });
                if (data.data.resultCode === '0000') {
                    this.$router.go(-1);
                }
            }
        }
    }

</script>

<style lang="scss" module>

    @import '../../../styles/common/config-detail';
</style>
