<template>
    <div class="edit-channel app-container">
        <div :class="$style['edit-content']">
            <div :class="$style['content-border']">
                <el-form :model="form" ref="form">
                    <div :class="$style['row']">
                        <div :class="$style['name']" class="must-choose">渠道编码</div>
                        <div :class="$style['content']">
                            <el-form-item prop="channelNo">
                                <el-input :disabled="trueVal" v-if="updateId" v-model="form.channelNo"></el-input>
                                <el-input v-else v-model="form.channelNo"></el-input>
                            </el-form-item>
                        </div>
                        <div :class="$style['name']" class="must-choose">渠道名称</div>
                        <div :class="[$style['content'],$style['last-box']]">
                            <el-form-item prop="channelName">
                                <el-input v-model="form.channelName"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div :class="$style['row']">
                        <div :class="$style['name']" class="must-choose">渠道类型</div>
                        <div :class="$style['content']">
                            <el-form-item prop="qdType">
                                <el-select placeholder="请选择" size="max" v-model="form.channelType">
                                    <el-option
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                            v-for="item in channelTypeList">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                        </div>
                        <div :class="$style['name']" class="must-choose">渠道标识</div>
                        <div :class="[$style['content'],$style['last-box']]">
                            <el-form-item prop="channelSymbol">
                                <el-input v-model="form.channelSymbol"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div :class="$style['row']">
                        <div :class="$style['name']" class="must-choose">是否启用</div>
                        <div :class="$style['content']">
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
                        <div :class="$style['name']">创建人</div>
                        <div :class="[$style['content'],$style['last-box']]">
                            <el-form-item prop="creator">
                                <el-input disabled v-model="form.inputUser"></el-input>
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
    import {mapGetters} from 'vuex'
    import schema from 'async-validator';
    import alert from '../../../components/mixins/alert';

    export default {
        name: 'editChannel',
        mixins: [alert],
        data() {
            return {
                form: {
                    channelNo: '', // 渠道编码
                    channelName: '', // 渠道名称
                    channelType: '', // 渠道类型
                    channelSymbol: '', // 渠道标识
                    useYn: '', //是否启用
                    inputUser: '', // 创建用户
                    updateUser: '' // 创建时间
                },
                rules: { // 校验规则
                    channelNo: [{required: true, message: '请输入渠道编码'}],
                    channelName: [{required: true, message: '请输入渠道名称'}],
                    channelType: [{required: true, message: '请选择渠道类型'}],
                    channelSymbol: [{required: true, message: '请输入渠道标识'}],
                    useYn: [{required: true, message: '请选择是否启用'}],
                },
                "channelTypeList": [{
                    value: "1",
                    label: '自营'
                }, {
                    value: "2",
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
                updateId: '', // 如果是更新数据，这里放置更新id
                isSubmit: false // 是否正在提交，防止多次提交
            }
        },
        computed: {
            ...mapGetters(['userInfo'])
        },
        activated() {
            this.form = {}; // 每次进入页面重置表单内容
            // 获取updateId
            let params = this.$route.query;
            // 主键查询 设置内容，没有对数据为空情况的处理
            if (params.updateId) {
                this.updateId = params.updateId; //设置更新id，判断是新增还是修改
                this.query(params.updateId);
            } else { // 当没有数据的时候说明该页面是新增，从vuex中取数据
                this.updateId = '';
                this.form.inputUser = this.userInfo.username;
            }
            this.isSubmit = false;
        },
        methods: {
            async query(channelNo) { // 查询
                let data = await this.$api.configM.channelquery({ //发起ajax请求，更改数据
                    channelNo: channelNo,
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
            back() { // 返回上一级
                this.$router.go(-1);
            },
            submit() { // 提交表单
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
            async add() { // 新增数据
                if (this.isSubmit) {
                    return;
                }
                this.isSubmit = true;
                let form = this.form;
                let data = await this.$api.configM.channeladd({
                    channelNo: form.channelNo,
                    channelName: form.channelName,
                    channelType: form.channelType,
                    channelSymbol: form.channelSymbol,
                    useYn: form.useYn,
                    inputUser: this.form.inputUser
                });
                if (data.data.resultCode === '0000') {
                    this.$router.go(-1);
                }
                this.isSubmit = false;
            },
            async update() { // 修改数据
                let form = this.form;
                let data = await this.$api.configM.channelupdate({
                    channelNo: form.channelNo,
                    channelName: form.channelName,
                    channelType: form.channelType,
                    channelSymbol: form.channelSymbol,
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
