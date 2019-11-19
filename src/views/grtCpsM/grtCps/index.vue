<template>
    <div class="channel app-container">
        <!--search-->
        <collapse :class="$style['search']">
            <template v-slot:title>
                筛选条件
            </template>
            <template>
                <div>
                    <!-- 条件 -->
                    <el-form :model="form" :rules="rules" inline label-width="90px" ref="form">
                        <el-form-item label="渠道名称" prop="channelNo">
                            <el-select placeholder="请选择" size="max" v-model="form.channelNo">
                                <el-option
                                        :key="item.code"
                                        :label="item.codeName"
                                        :value="item.code"
                                        v-for="item in channelDicts">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="借据号" prop="listId">
                            <el-input placeholder="借据号" v-model="form.listId"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号" prop="idNo">
                            <el-input placeholder="身份证号" v-model="form.idNo"></el-input>
                        </el-form-item>

                        <el-form-item label="担保状态" prop="assureStatus">
                            <el-select placeholder="请选择" size="max" v-model="form.assureStatus">
                                <el-option
                                        :key="item.code"
                                        :label="item.codeName"
                                        :value="item.code"
                                        v-for="item in guaranteeDicts">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="放款日期" style="width: 60%">
                            <el-col :span="11">
                                <el-form-item prop="loanDateMin">
                                    <el-date-picker
                                            :class="$style['datetime']"
                                            type="date"
                                            v-model="form.loanDateMin"
                                            value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            &nbsp;<el-col :span="1" style="margin-left: 0.25px;">&nbsp;-&nbsp;</el-col>
                            <el-col :span="11">
                                <el-form-item prop="loanDateMax">
                                    <el-date-picker
                                            :class="$style['datetime']"
                                            type="date"
                                            v-model="form.loanDateMax"
                                            value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-form-item>


                        <el-form-item label="申报日期" prop="declareDate">
                            <el-date-picker
                                    placeholder="请选择日期"
                                    type="date"
                                    v-model="form.declareDate"
                                    value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="逾期天数" style="width: 60%">
                            <el-col :span="11">
                                <el-form-item prop="overDaysMin">
                                    <el-input :class="$style['datetime']" placeholder=""
                                              v-model="form.overDaysMin"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" style="margin-left: 3px;">&nbsp;-</el-col>
                            <el-col :span="11">
                                <el-form-item prop="overDaysMax">
                                    <el-input :class="$style['datetime']" placeholder=""
                                              v-model="form.overDaysMax"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-form-item>


                        <el-form-item label="代偿日期" prop="compensateDate">
                            <el-date-picker
                                    placeholder="请选择日期"
                                    type="date"
                                    v-model="form.compensateDate"
                                    value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="待赔付金额" style="width: 60%">
                            <el-col :span="11">
                                <el-form-item prop="sPaidAmountMin">
                                    <el-input :class="$style['datetime']" placeholder=""
                                              v-model="form.sPaidAmountMin"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" style="margin-left: 3px;">&nbsp;-</el-col>
                            <el-col :span="11">
                                <el-form-item prop="sPaidAmountMax">
                                    <el-input :class="$style['datetime']" placeholder=""
                                              v-model="form.sPaidAmountMax"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-form-item>

                    </el-form>
                    <!-- 按钮 -->
                    <div :class="$style['search-btn-box']">
                        <el-button :loading="loadingBtn.search" @click="search" icon="el-icon-search" size="medium"
                                   type="primary" v-waves>查询
                        </el-button>
                        <el-button :loading="loadingBtn.export" @click="exportExcelConfirm" icon="el-icon-download"
                                   size="medium" type="primary"
                                   v-waves>导出
                        </el-button>
                        <el-button :loading="loadingBtn.declaration" @click="declarationConfirm"
                                   class="iconfont icon-piliang-copy"
                                   size="medium"
                                   style="font-size: 14px;" type="primary"
                                   v-waves>批量申报
                        </el-button>
                        <el-button :loading="loadingBtn.compensation" @click="compensationConfirm"
                                   class="iconfont icon-piliang-copy"
                                   size="medium"
                                   style="font-size: 14px;" type="primary"
                                   v-waves>批量代偿
                        </el-button>
                        <el-button @click="resetForm('form')" icon="el-icon-refresh" size="medium" type="primary"
                                   v-waves>重置
                        </el-button>
                    </div>
                </div>
            </template>
        </collapse>
        <!--表格-->
        <div :class="$style['content']">
            <blockTitle :hide="trueVal">
                担保代偿列表
            </blockTitle>
            <div :class="$style['table-content']">
                <el-table
                        :data="data"
                        :row-key="getRowKeys"
                        border
                        empty-text="无数据"
                        header-cell-class-name="header-cell-class-name"
                        ref="singleTable"
                        size="medium"
                        style="width: 100%"
                        v-loading="loading">
                    <el-table-column
                            :reserve-selection="trueVal"
                            label="借据号"
                            prop="LISTID"
                            type="selection"
                    ></el-table-column>
                    <el-table-column
                            label="渠道名称"
                            prop="CHANNELNAME"
                    ></el-table-column>
                    <el-table-column
                            label="产品名称"
                            prop="PRODNAME">
                    </el-table-column>
                    <el-table-column
                            label="姓名"
                            prop="CUSTNAME">
                    </el-table-column>
                    <el-table-column
                            label="证件号码"
                            min-width="165px"
                            prop="IDNO">
                    </el-table-column>
                    <el-table-column
                            label="借款金额"
                            prop="LOANAMOUNT">
                    </el-table-column>
                    <el-table-column
                            label="借款期限"
                            prop="LOANTERM">
                    </el-table-column>
                    <el-table-column
                            label="放款日期"
                            min-width="100px"
                            prop="BEGINDATE">
                    </el-table-column>
                    <el-table-column
                            label="担保费率"
                            prop="GUARFEERATE"
                    ></el-table-column>
                    <el-table-column
                            label="借款费率（年）"
                            prop="INTERESTRATE"
                    ></el-table-column>
                    <el-table-column
                            label="应收担保费"
                            prop="SASSUREAMOUNT"
                    ></el-table-column>
                    <el-table-column
                            label="应付通道费"
                            prop="SCHANNELAMOUNT"
                    ></el-table-column>
                    <el-table-column
                            label="实收担保费"
                            prop="RASSUREAMOUNT"
                    ></el-table-column>
                    <el-table-column
                            label="应还日期"
                            min-width="100px"
                            prop="SDATE">
                    </el-table-column>
                    <el-table-column
                            label="逾期天数"
                            prop="OVERDAYS">
                    </el-table-column>
                    <el-table-column
                            label="逾期利息"
                            prop="BINTE">
                    </el-table-column>
                    <el-table-column
                            label="实还总金额"
                            prop="RAMOUNT">
                    </el-table-column>
                    <el-table-column
                            label="实还本金"
                            prop="RCAPI">
                    </el-table-column>
                    <el-table-column
                            label="实还利息"
                            prop="RINTE">
                    </el-table-column>
                    <el-table-column
                            label="实还罚息"
                            prop="RFINE">
                    </el-table-column>
                    <el-table-column
                            label="实还违约金"
                            prop="RFOUL">
                    </el-table-column>
                    <el-table-column
                            label="贷款余额"
                            prop="BAL">
                    </el-table-column>
                    <el-table-column
                            label="待赔付金额"
                            prop="SPAIDAMOUNT"
                    ></el-table-column>
                    <el-table-column
                            label="应收理赔本金"
                            prop="SSETTLEBAL"
                    ></el-table-column>
                    <el-table-column
                            label="应收理赔利息"
                            prop="SSETTLEINTE"
                    ></el-table-column>
                    <el-table-column
                            label="实收理赔本金"
                            prop="RSETTLEBAL"
                    ></el-table-column>
                    <el-table-column
                            label="实收理赔利息"
                            prop="RSETTLEINTE"
                    ></el-table-column>
                    <el-table-column
                            :formatter="formatAcFlag"
                            label="借据状态"
                            prop="ACFLAG">
                    </el-table-column>
                    <el-table-column
                            :formatter="formatAssureStatus"
                            label="担保状态"
                            prop="ASSURESTATUS"
                    ></el-table-column>
                    <el-table-column
                            label="申报日期"
                            min-width="100px"
                            prop="DECLAREDATE"
                    ></el-table-column>
                    <el-table-column
                            label="代偿日期"
                            min-width="100px"
                            prop="COMPENSATEDATE"
                    ></el-table-column>
                    <el-table-column
                            label="操作"
                            min-width="210px"
                            prop=""
                    >
                        <template slot-scope="scope">
                            <el-button @click="detail(scope.row)" size="small" type="primary">查询</el-button>
                            <el-button @click="declarationOne(scope.row)" size="small"
                                       type="primary" v-if="scope.row.ASSURESTATUS == '0'">申报
                            </el-button>
                            <el-button @click="compensationOne(scope.row)" size="small"
                                       type="primary" v-if="scope.row.ASSURESTATUS == '2'">代偿
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!--分页-->
            <div class="pagination">
                <pagination :limit.sync="pagInfo.pageSize"
                            :page-sizes="[10,20,30,50]"
                            :page.sync="pagInfo.currentPage"
                            :total="pagInfo.total"
                            @pagination="getData"
                            layout="sizes, prev, pager, next, jumper"
                            v-if="pagInfo.total"
                ></pagination>
            </div>
        </div>
    </div>
</template>

<script>

    import waves from '@/directive/waves';
    import pagination from '@/components/Pagination';
    import blockTitle from '@/components/blockTitle';
    import collapse from '@/components/collapse';
    import formatter from '@/components/mixins/formatter';
    import {getProp} from '@/utils/utils';
    import _ from 'lodash';


    export default {
        name: 'channel',
        components: {pagination, blockTitle, collapse},
        directives: {waves},
        mixins: [formatter],
        data() {
            return {
                form: {
                    listId: '', // 借据号
                    idNo: '', // 身份证号
                    declareDate: '', // 申报日期
                    compensateDate: '', // 代偿日期
                    channelNo: '', // 渠道名称
                    overDaysMin: '', // 逾期天数范围下限
                    overDaysMax: '', // 逾期天数范围上限
                    sPaidAmountMin: '', // 待赔付金额范围下限
                    sPaidAmountMax: '', // 待赔付金额范围上限
                    loanDateMin: '', // 放款日期范围下限
                    loanDateMax: '', // 放款日期范围上限
                    assureStatus: '' // 担保状态
                },
                pagInfo: { // 分页数据
                    total: '',
                    currentPage: 1,
                    pageSize: 10
                },
                channelDicts: [], // 渠道字典
                guaranteeDicts: [ // 保证状态字典
                    {
                        code: '0',
                        codeName: '待申报'
                    }, {
                        code: '1',
                        codeName: '已申报'
                    }, {
                        code: '2',
                        codeName: '待赔付'
                    }, {
                        code: 'S',
                        codeName: '代偿结清'
                    }],
                loading: false,
                data: [], // 表格数据
                rules: {
                    idNo: [
                        {
                            required: false,
                            pattern: '^\\d{6}(18|19|20)\\d{2}(0\\d|10|11|12)([0-2]\\d|30|31)\\d{3}(\\d|X|x)$',
                            message: '请输入正确的身份证号',
                            trigger: 'blur'
                        }
                    ],
                    overDaysMin: [
                        {
                            required: false,
                            pattern: '(?:^[-]?[1-9]\\d{0,4}(?:$|(?:,\\d{3})*(?:$|(\\.\\d{1,2}$))))|(?:(?:^[0](\\.\\d{1,2})?)|(?:^[-][0]\\.\\d{1,2}))$',
                            message: '请输入正确的天数',
                            trigger: 'blur'
                        }
                    ],
                    overDaysMax: [
                        {
                            required: false,
                            pattern: '(?:^[-]?[1-9]\\d{0,4}(?:$|(?:,\\d{3})*(?:$|(\\.\\d{1,2}$))))|(?:(?:^[0](\\.\\d{1,2})?)|(?:^[-][0]\\.\\d{1,2}))$',
                            message: '请输入正确的天数',
                            trigger: 'blur'
                        }
                    ],
                    sPaidAmountMin: [
                        {
                            required: false,
                            pattern: '(?:^[1-9]([0-9]+)?(?:\\.[0-9]{1,2})?$)|(?:^(?:0){1}$)|(?:^[0-9]\\.[0-9](?:[0-9])?$)',
                            message: '请输入正确的金额',
                            trigger: 'blur'
                        }
                    ],
                    sPaidAmountMax: [
                        {
                            required: false,
                            pattern: '(?:^[1-9]([0-9]+)?(?:\\.[0-9]{1,2})?$)|(?:^(?:0){1}$)|(?:^[0-9]\\.[0-9](?:[0-9])?$)',
                            message: '请输入正确的金额',
                            trigger: 'blur'
                        }
                    ]
                },
                loadingBtn: { //
                    search: false, // 搜索
                    export: false, // 导出
                    declaration: false, //申报状态
                    compensation: false, // 代偿状态
                    declarationOne: false, // 申报一个
                    compensationOne: false // 代偿一个
                },
                trueVal: true
            }
        },
        activated() {
            this.getData(); // 每次进入页面获取数据
            this.getDict(); // 获取渠道字典
        },
        deactivated() {
            this.$refs.singleTable && this.$refs.singleTable.clearSelection(); // 清除选中元素
        },
        methods: {
            async getData() { //发起ajax请求，更改数据
                this.loadingBtn.search = true;
                this.loading = true;

                let res = await this.$api.grtCps.cpsList({
                    ...this.form,
                    pageNum: this.pagInfo.currentPage,
                    pageSize: this.pagInfo.pageSize
                });
                try {
                    if (res.data.resultCode === '0000') {
                        let data = res.data;
                        this.data = data.data;
                        this.pagInfo.total = data.dataCount;
                    }
                    this.loading = false;
                    this.loadingBtn.search = false;
                } catch (e) {
                    this.loading = false;
                    this.loadingBtn.search = false;
                }
            },
            getDataInfo() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.getData();
                    } else {
                        return false;
                    }
                });
            },
            async getDict() { // 获取渠道字典
                let data = await this.$api.configM.dictQuery({dictType: "channel"});
                this.channelDicts = data.data.dicts;
            },
            search: _.throttle(function () { // 点击查询按钮
                this.pagInfo.currentPage = 1;
                this.getDataInfo();
            }, 1500),
            getRowKeys(row) { // 设置每一行的key
                return row.LISTID;
            },
            resetForm(formName) { // 重置表单内容
                this.$refs[formName].resetFields();
            },
            exportExcelConfirm() {
                let list = this.getIds(); // 获取id集合
                if (list.length <= 0) { // 没有选中内容
                    let haveVal = false; // 表单至少有一项有值
                    Object.keys(this.form).forEach(item => {
                        if (this.form[item] !== '') {
                            haveVal = true;
                        }
                    });
                    if (!haveVal) { // 没有值也没有筛选条件，不进行处理
                        this.$message.warning({message: '请填写筛选条件或勾选需要导出数据', duration: 2000});
                        return;
                    }
                }

                this.$confirm('是否确认导出?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.exportExcel(list);
                }).catch(() => {
                });
            },
            async exportExcel(list) { // 导出按钮点击

                this.loadingBtn.export = true;
                import('@/vendor/Export2Excel').then(async excel => {
                    const tHeader = ['借据号', '渠道名称', '产品名称', '姓名', '证件号码', '借款金额', '借款期限', '放款日期', '担保费率', '借款费率（年）', '应收担保费', '应付通道费', '实收担保费', '应还日期', '逾期天数', '逾期利息', '实还总金额', '实还本金', '实还利息', '实还罚息', '实还违约金', '贷款余额', '待赔付金额', '应收理赔本金', '应收理赔利息', '实收理赔本金', '实收理赔利息', '借据状态', '担保状态', '申报日期', '代偿日期'];
                    const filterVal = ['LISTID', 'CHANNELNAME', 'PRODNAME', 'CUSTNAME', 'IDNO', 'LOANAMOUNT', 'LOANTERM', 'BEGINDATE', 'ASSUREFEERATE', 'INTERESTRATE', 'SASSUREAMOUNT', 'SCHANNELAMOUNT', 'RASSUREAMOUNT', 'SDATE', 'OVERDAYS', 'BINTE', 'RAMOUNT', 'RCAPI', 'RINTE', 'RFINE', 'RFOUL', 'BAL', 'SPAIDAMOUNT', 'SSETTLEBAL', 'SSETTLEINTE', 'RSETTLEBAL', 'RSETTLEINTE', 'ACFLAG', 'ASSURESTATUS', 'DECLAREDATE', 'COMPENSATEDATE']
                    let data = await this.$api.grtCps.exportExcel({...this.form, listIds: list});
                    try {
                        data = this.formatJson(filterVal, data.data.data);
                        excel.export_json_to_excel({
                            header: tHeader,
                            data,
                            filename: this.filename,
                            autoWidth: this.autoWidth,
                            bookType: this.bookType
                        });
                        this.loadingBtn.export = false;
                    } catch (e) {
                        this.loadingBtn.export = false;
                    }
                });
            },
            formatJson(filterVal, jsonData) {

                return jsonData.map(v => filterVal.map(j => {
                    return v[j]
                }))
            },
            declarationConfirm() {

                let list = this.$refs.singleTable.store.states.selection; // 选中的元素
                // 1.至少选择一项内容
                if (list.length <= 0) {
                    this.$message.warning({message: '请至少选择一项内容', duration: 2000});
                    return;
                }

                let ids = [];
                let channel = new Set();
                let assureStatus = new Set();
                for (let i = 0; i < list.length; i++) {
                    ids[i] = list[i].LISTID;
                    channel.add(list[i].CHANNELNAME);
                    assureStatus.add(list[i].ASSURESTATUS);
                }

                // 2.所有数据都应该来自同一个渠道
                if (channel.size > 1) {
                    this.$message.warning({message: '选中数据必须是同一个渠道', duration: 2000});
                    return;
                }

                // 3.所有数据的状态都应该是对的
                if (!(assureStatus.has(0) && assureStatus.size === 1)) {
                    this.$message.warning({message: '选中数据状态有误', duration: 2000});
                    return;
                }

                this.$confirm(`共选中${ids.length}条数据,是否确认申报?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.declaration(ids);
                }).catch(() => {
                });
            },
            async declaration(ids) { // 批量申报

                this.loadingBtn.declaration = true;
                let res = await this.$api.grtCps.declareList({listIds: ids});
                try {
                    if (res.data.resultCode === '0000') { // 更新成功，刷新数据
                        this.$refs.singleTable.clearSelection(); // 清除选中
                        this.getData();
                    }
                    this.loadingBtn.declaration = false;
                } catch (e) {
                    this.loadingBtn.declaration = false;
                }
            },
            compensationConfirm() {
                let list = this.$refs.singleTable.store.states.selection; // 选中的元素
                // 1.至少选择一项内容
                if (list.length <= 0) {
                    this.$message.warning({message: '请至少选择一项内容', duration: 2000});
                    return;
                }

                let ids = [];
                let channel = new Set();
                let assureStatus = new Set();
                for (let i = 0; i < list.length; i++) {
                    ids[i] = list[i].LISTID;
                    channel.add(list[i].CHANNELNAME);
                    assureStatus.add(list[i].ASSURESTATUS);
                }

                // 2.所有数据都应该来自同一个渠道
                if (channel.size > 1) {
                    this.$message.warning({message: '选中数据必须是同一个渠道', duration: 2000});
                    return;
                }

                // 3.所有数据的状态都应该是对的
                if (!(assureStatus.has('2') && assureStatus.size === 1)) {
                    this.$message.warning({message: '选中数据状态有误', duration: 2000});
                    return;
                }
                this.$confirm(`共选中${ids.length}条数据,是否确认代偿?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.compensation(ids);
                }).catch(() => {
                });
            },
            async compensation(ids) { // 批量代偿
                this.loadingBtn.compensation = true;
                let res = await this.$api.grtCps.assureList({listIds: ids});
                try {
                    if (res.data.resultCode === '0000') { // 更新成功，刷新数据
                        this.$refs.singleTable.clearSelection(); // 清除选中
                        this.getData();
                    }
                    this.loadingBtn.compensation = false;
                } catch (e) {
                    this.loadingBtn.compensation = false;
                }
            },
            detail(row) {
                this.$router.push({path: "/guaranteeM/detail", query: {listId: row.LISTID, channelId: row.CHANNELID}});
            },
            async declarationOne(row) { // 代偿按钮
                this.loadingBtn.declarationOne = true;
                let ids = [row.LISTID];
                let res = await this.$api.grtCps.declareList({listIds: ids});
                try {
                    if (res.data.resultCode === '0000') { // 更新成功，刷新数据
                        this.getData();
                    }
                    this.loadingBtn.declarationOne = false;
                } catch (e) {
                    this.loadingBtn.declarationOne = false;
                }
            },
            async compensationOne(row) { // 申报按钮
                this.loadingBtn.compensationOne = true;
                let ids = [row.LISTID];
                let res = await this.$api.grtCps.assureList({listIds: ids});
                try {
                    if (res.data.resultCode === '0000') { // 更新成功，刷新数据
                        this.getData();
                    }
                    this.loadingBtn.compensationOne = false;
                } catch (e) {
                    this.loadingBtn.compensationOne = false;
                }
            },
            getIds() { // 获取选中元素id的list
                let list = this.$refs.singleTable.store.states.selection; // 选中的元素
                let ids = [];
                list.forEach(item => {
                    ids.push(item.LISTID);
                });
                return ids;
            },
            formatAssureStatus(row, column, cellValue) {
                return getProp(this.guaranteeDicts, 'code', cellValue + '', 'codeName');
            }
        }
    }
</script>

<style lang="scss" module>
    @import '../../../styles/common/asset-list';

    :global {
        .icon-piliang-copy:before {
            margin-right: 6px;
            font-size: 12px;
        }
    }
</style>
