<template>
    <div class="detail app-container">
        <div class="detail-list">
            <ul>
                <li>
                    <span>渠道</span>
                    <span>{{info.channelName}}</span>
                </li>
                <li>
                    <span>借据编码</span>
                    <span>{{info.listId}}</span>
                </li>
                <li>
                    <span>借款人编号</span>
                    <span>{{info.custId}}</span>
                </li>
                <li>
                    <span>金融产品</span>
                    <span>{{info.prodName}}</span>
                </li>
                <li>
                    <span>借款人姓名</span>
                    <span>{{info.custName}}</span>
                </li>
                <li>
                    <span>身份号</span>
                    <span>{{info.idNo}}</span>
                </li>
                <li>
                    <span>还款方式</span>
                    <span>{{info.repayMethod}}</span>
                </li>
                <li>
                    <span>借款金额</span>
                    <span>{{info.loanAmount}}</span>
                </li>
                <li>
                    <span>日利率</span>
                    <span>{{info.interestType}}</span>
                </li>
                <li>
                    <span>贷款余额</span>
                    <span>{{info.Bal}}</span>
                </li>
                <li>
                    <span>还款期限</span>
                    <span>{{info.loanTerm}}</span>
                </li>
                <li>
                    <span>放款日</span>
                    <span>{{info.beginDate}}</span>
                </li>
                <li>
                    <span>到期日</span>
                    <span>{{info.endDate}}</span>
                </li>
                <li>
                    <span>起息日</span>
                    <span>{{info.endDate}}</span>
                </li>
                <li>
                    <span>拆分方式</span>
                    <span>{{info.assetSpiltWay}}</span>
                </li>
                <li>
                    <span>拆分比例</span>
                    <span>{{info.assetSpiltValue}}</span>
                </li>
                <li>
                    <span>出资方</span>
                    <span>{{info.contributiveName}}</span>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'assetDetail',
        data() {
            return {
                info: {}// 列表详情数据
            }
        },
        activated() {
            this.getInfo();
        },
        methods: {
            async getInfo() {
                let data = await this.$api.assetM.assetDetail({
                    listId: this.$route.query.updateId // 获取updateId,然后查找内容
                });
                this.info = data.data.detail;
            }
        }
    }


</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import '../../../styles/asset-detail';
</style>
