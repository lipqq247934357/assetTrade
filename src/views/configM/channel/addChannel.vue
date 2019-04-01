<template>
    <div class="add-channel app-container">
        <div class="add-channel-content">
            <div class="channel-form">
                <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                    <el-form-item label="渠道编码" prop="qdNo">
                        <el-input v-model="form.qdNo"></el-input>
                    </el-form-item>
                    <el-form-item label="渠道名称" prop="qdName">
                        <el-input v-model="form.qdName"></el-input>
                    </el-form-item>
                    <el-form-item label="渠道类型" prop="qdType">
                        <el-select v-model="form.qdType" placeholder="请选择" size="max">
                            <el-option
                                    v-for="item in qdTag"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="渠道标识" prop="qdTag">
                        <el-input v-model="form.qdTag"></el-input>
                    </el-form-item>
                    <el-form-item label="是否启用" prop="status">
                        <el-switch
                                v-model="form.status"
                                active-color="#13ce66"
                                inactive-color="#cccccc">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="创建人" prop="creator">
                        <el-input v-model="form.creator"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="btn-action">
                <el-button @click="back" type="primary" size="medium">返回</el-button>
                <el-button @click="submit('form')" type="primary" size="medium">提交</el-button>
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
                }]
            }
        },
        created() {
        },
        methods: {
            back() {
                this.$router.push({
                    name: "channelconfig",
                    params: urlParse()
                });
            },
            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.add();
                    } else {
                    }
                });
            },
            async add() {
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
        padding-top: 20px;
    }

    .channel-form {
        width: 350px;
    }

    .el-select--max {
        width: 100%;
    }

    .btn-action {
        margin-left: 30px;
        margin-top: 35px;
        .el-button {
            margin-left: 80px;
        }
    }

</style>
