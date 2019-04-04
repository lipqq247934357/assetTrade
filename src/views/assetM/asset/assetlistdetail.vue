<template>
    <div class="detail app-container">
        <div class="detail-list">
            <ul>
                <li>
                    <span>渠道</span>
                    <span>{{info.channel}}</span>
                </li>
                <li>
                    <span>借据编码</span>
                    <span>{{info.code}}</span>
                </li>
                <li>
                    <span>借款人编号</span>
                    <span>{{info.number}}</span>
                </li>
                <li>
                    <span>金融产品</span>
                    <span>{{info.product}}</span>
                </li>
                <li>
                    <span>借款人姓名</span>
                    <span>{{info.name}}</span>
                </li>
                <li>
                    <span>身份号</span>
                    <span>{{info.idcode}}</span>
                </li>
                <li>
                    <span>还款方式</span>
                    <span>{{info.mode}}</span>
                </li>
                <li>
                    <span>借款金额</span>
                    <span>{{info.money}}</span>
                </li>
                <li>
                    <span>日利率</span>
                    <span>{{info.rate}}</span>
                </li>
                <li>
                    <span>贷款余额</span>
                    <span>{{info.balance}}</span>
                </li>
                <li>
                    <span>还款期限</span>
                    <span>{{info.deadline}}</span>
                </li>
                <li>
                    <span>放款日</span>
                    <span>{{info.loanday}}</span>
                </li>
                <li>
                    <span>到期日</span>
                    <span>{{info.expireday}}</span>
                </li>
                <li>
                    <span>起息日</span>
                    <span>{{info.deadline}}</span>
                </li>
                <li>
                    <span>拆分方式</span>
                    <span>{{info.beginrate}}</span>
                </li>
                <li>
                    <span>拆分比例</span>
                    <span>{{info.splitproportion}}</span>
                </li>
                <li>
                    <span>出资方</span>
                    <span>{{info.provide}}</span>
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
                info: { // 列表详情数据模拟
                    "id": 1,
                    "channel": "百度",
                    "code": "BD001",
                    "number": "JKR001",
                    "name": "张三",
                    "money": "10000.00",
                    "mode": "等额本息",
                    "rate": "0.06%",
                    "balance": "190000",
                    "deadline": "12",
                    "loanday": "2018-5-02",
                    "expireday": "2019-5-01",
                    "beginrate": "2018-5-02",
                    "splitmode": "按比例",
                    "splitproportion": "3：7",
                    "provide": "消金，哈银",
                    "idcode": "123123123123123",
                    "product": "贷款"
                }
            }
        },
        created() {

        }
    }


</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import '../../../styles/asset-detail';
</style>
