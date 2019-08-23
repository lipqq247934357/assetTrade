<template>
    <div class="channel app-container">
        <div :class="[$style['detail-list'],$style['tabel-data']]">
            <el-table
                    :data="data"
                    border
                    empty-text="无数据"
                    header-cell-class-name="header-cell-class-name"
                    style="width: 100%"
                    v-loading="loading">
                <el-table-column
                        label="期次"
                        prop="sTerm">
                </el-table-column>
                <el-table-column
                        label="金额所属类型"
                        prop="amtType">
                </el-table-column>
                <!--<el-table-column-->
                <!--        label="应还日期"-->
                <!--        prop="channelType">-->
                <!--</el-table-column>-->
                <el-table-column
                        label="实还日期"
                        prop="rDate">
                </el-table-column>
                <el-table-column
                        label="操作时间"
                        prop="createTime">
                </el-table-column>
                <el-table-column
                        label="操作人"
                        prop="operId">
                </el-table-column>
                <el-table-column
                        :formatter="formatterListType"
                        label="还款方式"
                        prop="listType">
                </el-table-column>
                <el-table-column
                        label="金额"
                        prop="amt">
                </el-table-column>
            </el-table>
            <!--      返回     -->
            <div :class="$style['back']">
                <el-button @click="back" size="small" style="width: 100px;" type="primary">
                    <span style="font-size: 14px;">返&nbsp;回</span>
                </el-button>
            </div>

        </div>
    </div>
</template>

<script>

    import waves from '@/directive/waves';
    import formatter from '@/components/mixins/formatter';

    export default {
        name: 'channel',
        directives: {waves},
        mixins: [formatter],
        data() {
            return {
                loading: false,
                data: [], // 表格数据
            };
        },
        activated() {
            this.getRecordList();// 每次进入页面获取数据
        },
        methods: {
            async getRecordList() { //发起ajax请求，更改数据
                this.loading = true;
                let data = await this.$api.repaymentM.repaymentrecord({
                    listId: this.$route.query.id
                });
                if (data.data.resultCode === '0000') {
                    this.data = this.deal(data.data.bills); // deal data
                }
                this.loading = false;
            },
            back() { // 返回上一级
                this.$router.go(-1);
            },
            deal(res) { // 处理值发生变化的时候的方案
                let newList = [];
                let obj = {
                    'rInte': '实还利息',
                    'raFine': '实还罚息',
                    'dFine': '减免罚息',
                    'rOtherFee': '实还违约金',
                    'dInte': '减免利息',
                    'rCapi': '实还本金'
                };

                let arr = Object.keys(obj); // 获取遍历数组
                /**
                 * 根据res数组的每一项进行处理，6个参数，哪一行数据不为0，根据这个数据生成一行记录
                 */
                res.forEach((item) => {
                    arr.forEach((arrItem) => {
                        if (item[arrItem] !== 0) { // 这条数据需要作为新行展示
                            let l = {};
                            Object.assign(l, item);
                            l.amtType = obj[arrItem];  // 设置金额所属类型
                            l.amt = item[arrItem];
                            newList.push(l);
                        }
                    })
                });
                return newList;
            }
        }
    }
</script>

<style lang="scss" module>
    @import '../../styles/common/asset-detail';

    .tabel-data {
        padding: 20px 20px 0;
    }

    .back {
        width: 100%;
        text-align: center;
        padding-top: 30px;
        padding-bottom: 40px;
    }


</style>
