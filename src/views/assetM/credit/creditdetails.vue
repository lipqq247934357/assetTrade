<template>
    <div class="details">
        <h3>授信详信息情</h3>
        <!-- 列表详情 -->
        <ul>
            <li>
                <span>申请编号</span>
                <span>{{details.channel}}</span>
            </li>
            <li>
                <span>渠道</span>
                <span>{{details.code}}</span>
            </li>
            <li>
                <span>借款人编号</span>
                <span>{{details.number}}</span>
            </li>
            <li>
                <span>借款人姓名</span>
                <span>{{details.product}}</span>
            </li>
            <li>
                <span>证件类型</span>
                <span>{{details.name}}</span>
            </li>
            <li>
                <span>证件号码</span>
                <span>{{details.idcode}}</span>
            </li>
            <li>
                <span>授信额度</span>
                <span>{{details.mode}}</span>
            </li>
            <li>
                <span>额度编号</span>
                <span>{{details.money}}</span>
            </li>
            <li>
                <span>额度类型</span>
                <span>{{details.rate}}</span>
            </li>
            <li>
                <span>额度签署日期</span>
                <span>{{details.balance}}</span>
            </li>
            <li>
                <span>额度生效日期</span>
                <span>{{details.deadline}}</span>
            </li>
            <li>
                <span>额度到期日期</span>
                <span>{{details.loanday}}</span>
            </li>
            <li>
                <span>创建时间</span>
                <span>{{details.expireday}}</span>
            </li>
        </ul>
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
        ul {
            width: 90%;
            margin: 0 auto 20px;
            border: 1px solid #909399;
            padding: 0;
            li {
                list-style: none;
                height: 50px;
                line-height: 50px;
                border-bottom: 1px solid #909399;
                color: #909399;
                width: 100%;
                text-align: center;
                &:last-child {
                    border: 0;
                }
                &:nth-child(even) {
                    background: #f5f7fa;
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
</style>
