<template>
    <div class="detail app-container">
        <div :class="$style['detail-list']">
            <ul>
                <li><span>渠道</span></li>
                <li>
                    <span>{{ info.channelName }}</span>
                </li>

                <li><span>借据编码</span></li>
                <li>
                    <span>{{ info.listId }}</span>
                </li>

                <li><span>借款人编号</span></li>
                <li>
                    <span>{{ info.custId }}</span>
                </li>

                <li><span>金融产品</span></li>
                <li>
                    <span>{{ info.prodName }}</span>
                </li>

                <li><span>借款人姓名</span></li>
                <li>
                    <span>{{ info.custName }}</span>
                </li>

                <li><span>身份证号</span></li>
                <li>
                    <span>{{ info.idNo }}</span>
                </li>

                <li><span>还款方式</span></li>
                <li>
                    <span>{{ info.repayMethod }}</span>
                </li>

                <li><span>借款金额</span></li>
                <li>
                    <span>{{ formatAmount(0, 0, info.loanAmount) }}</span>
                </li>

                <li><span>利率类型</span></li>
                <li>
                    <span>{{info.interestType}}</span>
                </li>

                <li><span>利率</span></li>
                <li>
                    <span>{{ formatRate(0, 0, info.interestRate) }}</span>
                </li>

                <li><span>贷款余额</span></li>
                <li>
                    <span>{{ formatAmount(0, 0, info.bal) }}</span>
                </li>

                <li><span>还款期限</span></li>
                <li>
                    <span>{{ info.loanTerm }}</span>
                </li>

                <li><span>放款日</span></li>
                <li>
                    <span>{{ formatterData(0, 0, info.beginDate) }}</span>
                </li>

                <li><span>到期日</span></li>
                <li>
                    <span>{{ formatterData(0, 0, info.endDate) }}</span>
                </li>

                <li><span>起息日</span></li>
                <li>
                    <span>{{ formatterData(0, 0, info.beginDate) }}</span>
                </li>

                <li><span>拆分方式</span></li>
                <li>
                    <span>{{ info.assetSpiltWay }}</span>
                </li>

                <li :class="$style['bottom-0']"><span>拆分比例</span></li>
                <li :class="$style['bottom-0']">
                    <span>{{ info.assetSpiltValue }}</span>
                </li>

                <li :class="$style['bottom-0']"><span>出资方</span></li>
                <li :class="$style['bottom-0']">
                    <span>{{ info.contributiveName }}</span>
                </li>
            </ul>

            <div style="width: 100%;text-align: center;padding-top: 30px;">
                <el-button @click="back" size="small" style="width: 100px;" type="primary">
                    <span style="font-size: 14px;">返&nbsp;回</span>
                </el-button>
            </div>



        </div>

    </div>
</template>

<script>

    import formatter from '@/components/mixins/formatter';

    export default {
        name: 'assetDetail',
        mixins: [formatter],
        data() {
            return {
                info: {}// 列表详情数据
            }
        },
        activated() {
            this.getInfo();
        },
        methods: {
            async getInfo() { // 根据id获取数据
                let data = await this.$api.assetM.assetDetail({
                    body: {
                        listId: this.$route.query.updateId // 获取updateId,然后查找内容
                    }
                });
                this.info = data.data.detail;
            },
            back() {
                this.$router.go(-1);
            }
        }
    }


</script>

<style lang="scss" module>
    @import '../../../styles/common/asset-detail';
</style>
