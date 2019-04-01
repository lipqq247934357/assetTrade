<template>
    <div class="details">
        <h3>资产列表详情</h3>
        <!-- 列表详情 -->
        <div class="detailslist">
            <ul>
                <li>
                    <span>渠道</span>
                    <span>{{details.channel}}</span>
                </li>
                <li>
                    <span>借据编码</span>
                    <span>{{details.code}}</span>
                </li>
                <li>
                    <span>借款人编号</span>
                    <span>{{details.number}}</span>
                </li>
                <li>
                    <span>金融产品</span>
                    <span>{{details.product}}</span>
                </li>
                <li>
                    <span>借款人姓名</span>
                    <span>{{details.name}}</span>
                </li>
                <li>
                    <span>身份号</span>
                    <span>{{details.idcode}}</span>
                </li>
                <li>
                    <span>还款方式</span>
                    <span>{{details.mode}}</span>
                </li>
                <li>
                    <span>借款金额</span>
                    <span>{{details.money}}</span>
                </li>
                <li>
                    <span>日利率</span>
                    <span>{{details.rate}}</span>
                </li>
                <li>
                    <span>贷款余额</span>
                    <span>{{details.balance}}</span>
                </li>
                <li>
                    <span>还款期限</span>
                    <span>{{details.deadline}}</span>
                </li>
                <li>
                    <span>放款日</span>
                    <span>{{details.loanday}}</span>
                </li>
                <li>
                    <span>到期日</span>
                    <span>{{details.expireday}}</span>
                </li>
                <li>
                    <span>起息日</span>
                    <span>{{details.deadline}}</span>
                </li>
                <li>
                    <span>拆分方式</span>
                    <span>{{details.beginrate}}</span>
                </li>
                <li>
                    <span>拆分比例</span>
                    <span>{{details.splitproportion}}</span>
                </li>
                <li>
                    <span>出资方</span>
                    <span>{{details.provide}}</span>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            details: { // 列表详情数据模拟
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
    .details {
        h3 {
            font-size: 18px;
            color: #909399;
            margin-left: 10px;
            padding-bottom: 10px;
        }
        .detailslist {
            width: 98%;
            margin: 0 auto;
            background: #fff;
            padding: 30px 0px;
            border-radius: 5px;
            border-top: 2px solid #43b9e2;
            ul {
                width: 90%;
                margin: 0 auto 20px;
                border: 1px solid #909399;
                padding: 0;
                li {
                    list-style: none;
                    height: 30px;
                    line-height: 30px;
                    border-bottom: 1px solid #909399;
                    border-right: 1px solid #909399;
                    color: #909399;
                    width: 50%;
                    display: inline-block;
                    text-align: center;
                    font-size: 14px;
                    &:last-child {
                        border-bottom: 0;
                    }
                    &:nth-child(even) {
                        border-right: 0;
                    }
                    span {
                        width: 30%;
                        display: inline-block;
                        border-right: 1px solid #909399;
                        &:nth-child(even) {
                            border-right: 0;
                            width: 70%;
                        }
                    }
                }
            }
        }
    }
</style>
