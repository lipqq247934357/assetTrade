<template>
    <div class="detail app-container">
        <div class="detail-list">
            <ul>
                <li>
                    <span>申请编号</span>
                    <span>{{info.channel}}</span>
                </li>
                <li>
                    <span>渠道</span>
                    <span>{{info.code}}</span>
                </li>
                <li>
                    <span>借款人编号</span>
                    <span>{{info.number}}</span>
                </li>
                <li>
                    <span>借款人姓名</span>
                    <span>{{info.product}}</span>
                </li>
                <li>
                    <span>证件类型</span>
                    <span>{{info.name}}</span>
                </li>
                <li>
                    <span>证件号码</span>
                    <span>{{info.idcode}}</span>
                </li>
                <li>
                    <span>授信额度</span>
                    <span>{{info.mode}}</span>
                </li>
                <li>
                    <span>额度编号</span>
                    <span>{{info.money}}</span>
                </li>
                <li>
                    <span>额度类型</span>
                    <span>{{info.rate}}</span>
                </li>
                <li>
                    <span>额度签署日期</span>
                    <span>{{info.balance}}</span>
                </li>
                <li>
                    <span>额度生效日期</span>
                    <span>{{info.deadline}}</span>
                </li>
                <li>
                    <span>额度到期日期</span>
                    <span>{{info.loanday}}</span>
                </li>
                <li>
                    <span>创建时间</span>
                    <span>{{info.expireday}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'creditDetail',
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
