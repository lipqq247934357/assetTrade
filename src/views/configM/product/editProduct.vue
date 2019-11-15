<template>
    <div class="edit-product app-container">
        <div :class="$style['edit-content']">
            <div :class="$style['content-border']">
                <el-form :model="form" ref="form">
                    <div :class="$style['row']">
                        <div :class="$style['name']" class="must-choose">渠道名称</div>
                        <div :class="$style['content']">
                            <el-form-item prop="channelNo">
                                <el-select placeholder="请选择" size="max" v-model="form.channelNo">
                                    <el-option
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                            v-for="item in channelList">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div :class="$style['name']" class="must-choose">金融产品编号</div>
                        <div :class="[$style['content'],$style['last-box']]">
                            <el-form-item prop="prodNo">
                                <el-input disabled v-if="updateId" v-model="form.prodNo"></el-input>
                                <el-input v-else v-model="form.prodNo"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div :class="$style['row']">
                        <div :class="$style['name']" class="must-choose">金融产品名称</div>
                        <div :class="[$style['content']]">
                            <el-form-item prop="prodName">
                                <el-input v-model="form.prodName"></el-input>
                            </el-form-item>
                        </div>
                        <div :class="$style['name']" class="must-choose">是否启用</div>
                        <div :class="[$style['content'],$style['last-box']]">
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
                    </div>
                    <div :class="$style['row']">
                        <div :class="$style['name']">是否征信报送</div>
                        <div :class="$style['content']">
                            <el-form-item prop="fileType">
                                <el-select placeholder="请选择" size="max" v-model="form.isSubmitPCI">
                                    <el-option
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                            v-for="item in isSubmitPCIList">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>

                        <div :class="$style['name']">文件类型</div>
                        <div :class="[$style['content'],$style['last-box']]">
                            <el-form-item prop="fileType">
                                <el-input v-model="form.fileType"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div :class="$style['row']">
                        <div :class="$style['name']">产品描述</div>
                        <div :class="$style['content']">
                            <el-form-item prop="prodDesc">
                                <el-input v-model="form.prodDesc"></el-input>
                            </el-form-item>
                        </div>

                        <div :class="$style['name']" class="must-choose">创建人</div>
                        <div :class="[$style['content'],$style['last-box']]">
                            <el-form-item prop="inputUser">
                                <el-input disabled v-model="form.inputUser"></el-input>
                            </el-form-item>
                        </div>
                    </div>

                    <div :class="$style['row']">
                        <div :class="$style['name']">担保费率(年)</div>
                        <div :class="$style['content']">
                            <el-form-item prop="prodDesc">
                                <el-input v-model="form.guarFeeRate"></el-input>
                            </el-form-item>
                        </div>

                        <div :class="$style['name']">担保开始时间</div>
                        <div :class="[$style['content'],$style['last-box']]">
                            <el-form-item prop="inputUser">
                                <el-date-picker
                                        :class="$style['datetime']"
                                        type="date"
                                        v-model="form.startDate"
                                        value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                    </div>


                    <div :class="$style['row']">
                        <div :class="$style['name']">担保结束时间</div>
                        <div :class="$style['content']">
                            <el-form-item prop="prodDesc">
                                <el-date-picker
                                        :class="$style['datetime']"
                                        type="date"
                                        v-model="form.endDate"
                                        value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>

                <div style="margin: 20px 0 80px;" v-show="this.updateId">
                    <div style="margin-left: 10px;padding-bottom: 20px;font-size: 14px;">操作历史</div>
                    <el-table
                            :data="data"
                            border
                            empty-text="无数据"
                            header-cell-class-name="header-cell-class-name"
                            size="medium"
                            style="width: 100%">
                        <el-table-column
                                label="序号"
                                type="index"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                :formatter="foramtChannel"
                                label="渠道名称"
                                prop="CHANNELNO">
                        </el-table-column>
                        <el-table-column
                                label="渠道编码"
                                prop="CHANNELNO">
                        </el-table-column>
                        <el-table-column
                                label="产品名称"
                                prop="PRODNAME">
                        </el-table-column>
                        <el-table-column
                                label="担保费率(年)"
                                prop="GUARFEERATE">
                        </el-table-column>
                        <el-table-column
                                label="担保开始时间"
                                prop="STARTDATE">
                        </el-table-column>
                        <el-table-column
                                label="担保结束时间"
                                prop="ENDDATE">
                        </el-table-column>
                        <el-table-column
                                label="操作人"
                                prop="INPUTUSER">
                        </el-table-column>
                        <el-table-column
                                label="操作日期"
                                prop="CREATETIME">
                        </el-table-column>
                    </el-table>
                </div>


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
    import {getProp} from '@/utils/utils'

    export default {
        name: 'editProduct',
        mixins: [alert],
        data() {
            return {
                form: {
                    channelNo: '', // 渠道编号
                    prodNo: '', // 金融产品编号
                    prodName: '', // 金融产品名称
                    fileType: '', // 文件类型
                    prodDesc: '', // 产品描述
                    useYn: '',
                    isSubmitPCI: '', // 是否报送
                    inputUser: '', // 创建人
                    guarFeeRate: '', // 担保费率
                    startDate: '', // 担保开始时间
                    endDate: '' // 担保结束时间
                },
                data: [], // 操作历史
                rules: { // 校验规则
                    channelNo: [{required: true, message: '请选择渠道'}],
                    prodNo: [{required: true, message: '请输入金融产品编号'}],
                    prodName: [{required: true, message: '请输入金融产品名称'}],
                    fileType: [{required: true, message: '请输入文件类型'}],
                    useYn: [{required: true, message: '请选择是否启用'}],
                },
                "useYnList": [{
                    value: "Y",
                    label: '启用'
                }, {
                    value: "N",
                    label: '禁用'
                }],
                "isSubmitPCIList": [{
                    value: "1",
                    label: '是'
                }, {
                    value: "0",
                    label: '否'
                }],
                channelList: [], // 渠道列表
                trueVal: true,
                updateId: '', //如果是要更新，这里放到更新id
                isSubmit: false // 是否正在提交
            }
        },
        activated() {
            this.form = {};
            this.channelList = [];
            this.getDict();
            // 获取updateId,如果有值说明是更新
            let params = this.$route.query;
            // 主键查询，有值是修改，将主键保存，否则console.log提示
            if (params.updateId) {
                this.updateId = params.updateId;
                this.query(params.updateId);
            } else {
                this.updateId = '';
                this.form.inputUser = this.userInfo.username = 'YiGeDaShuaiBi';
            }
            this.isSubmit = false;
        },
        computed: {
            ...mapGetters(['userInfo'])
        },
        methods: {
            async query(productNo) { // 查询用户信息
                //发起ajax请求，更改数据
                let data = await this.$api.configM.productqueryforUpdate({
                    prodNo: productNo,
                    pageNum: 1,
                    pageSize: 10
                });
                if (data.data.resultCode === '0000') {
                    data = data.data;
                    if (data.data.length === 0) {
                        this.alertParamterError();
                    } else {
                        console.log(data.data);
                        let propData = {};
                        propData.channelNo = data.data.prodData[0].CHANNELNO;
                        propData.prodNo = data.data.prodData[0].PRODNO;
                        propData.prodName = data.data.prodData[0].PRODNAME;
                        propData.useYn = data.data.prodData[0].USEYN;
                        propData.isSubmitPCI = data.data.prodData[0].ISSUBMITPCT;
                        propData.fileType = data.data.prodData[0].FILETYPE;
                        propData.prodDesc = data.data.prodData[0].PRODDESC;
                        propData.inputUser = data.data.prodData[0].INPUTUSER;
                        propData.guarFeeRate = data.data.prodData[0].GUARFEERATE;
                        propData.startDate = data.data.prodData[0].STARTDATE;
                        propData.endDate = data.data.prodData[0].ENDDATE;

                        this.form = propData;
                        this.data = data.data.prodHisData;
                    }
                }
            },
            async getDict() {
                let data = await this.$api.configM.dictQuery({dictType: "channel"});
                for (let item of data.data.dicts) {
                    let obj = {};
                    obj.value = item.code;
                    obj.label = item.codeName;
                    this.channelList.push(obj);
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
                let data = await this.$api.configM.productadd({
                    channelNo: form.channelNo,
                    prodNo: form.prodNo,
                    prodName: form.prodName,
                    fileType: form.fileType,
                    prodDesc: form.prodDesc,
                    isSubmitPCI: form.isSubmitPCI,
                    useYn: form.useYn,
                    inputUser: form.inputUser,
                    guarFeeRate: form.guarFeeRate,
                    startDate: form.startDate,
                    endDate: form.endDate
                });
                if (data.data.resultCode === '0000') {
                    this.$router.go(-1);
                }
                this.isSubmit = false;
            },
            async update() {
                let form = this.form;
                let data = await this.$api.configM.productupdate({
                    channelNo: form.channelNo,
                    prodNo: form.prodNo,
                    prodName: form.prodName,
                    fileType: form.fileType,
                    prodDesc: form.prodDesc,
                    isSubmitPCI: form.isSubmitPCI,
                    useYn: form.useYn,
                    updateUser: this.userInfo.username,
                    guarFeeRate: form.guarFeeRate,
                    startDate: form.startDate,
                    endDate: form.endDate
                });
                if (data.data.resultCode === '0000') {
                    this.$router.go(-1);
                }
            },
            foramtChannel(row, column, cellValue) {
                return getProp(this.channelList, 'value', cellValue, 'label');
            }
        }
    }

</script>

<style lang="scss" module>

    @import '../../../styles/common/config-detail';
</style>
