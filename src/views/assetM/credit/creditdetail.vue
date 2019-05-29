<template>
    <div class="detail app-container">
        <div :class="$style['detail-list']">
            <ul>
                <li>
                    <span>申请编号</span>
                    <span>{{info.applyId}}</span>
                </li>
                <li>
                    <span>渠道名称</span>
                    <span>{{info.channelName}}</span>
                </li>
                <li>
                    <span>借款人编号</span>
                    <span>{{info.custId}}</span>
                </li>
                <li>
                    <span>借款人姓名</span>
                    <span>{{info.custName}}</span>
                </li>
                <li>
                    <span>证件类型</span>
                    <span>{{info.custIdType}}</span>
                </li>
                <li>
                    <span>证件号码</span>
                    <span>{{info.idNo}}</span>
                </li>
                <li>
                    <span>授信额度</span>
                    <span>{{formatAmount(0,0,info.initialAmount)}}</span>
                </li>
                <li>
                    <span>额度编号</span>
                    <span>{{info.limitNo}}</span>
                </li>
                <li>
                    <span>额度类型</span>
                    <span>{{info.limitType}}</span>
                </li>
                <li>
                    <span>额度签署日期</span>
                    <span>{{formatterData(0,0,info.startDt)}}</span>
                </li>
                <li>
                    <span>额度生效日期</span>
                    <span>{{formatterData(0,0,info.startDt)}}</span>
                </li>
                <li>
                    <span>额度到期日期</span>
                    <span>{{formatterData(0,0,info.endDt)}}</span>
                </li>
                <li>
                    <span>创建时间</span>
                    <span>{{formatterData(0,0,info.curDate)}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>


    import formatter from '@/components/mixins/formatter';

    export default {
        name: 'creditDetail',
        mixins: [formatter],
        data() {
            return {
                info: {}
            }
        },
        activated() {
            this.getInfo();
        },
        methods: {
            async getInfo() {
                let data = await this.$api.assetM.creditDetail({
                    body: {
                        applyId: this.$route.query.updateId // 获取updateId,然后查找内容
                    }
                });
                this.info = data.data.detail;
            }
        }
    }


</script>

<style lang="scss" module>
    @import '../../../styles/common/asset-detail';
</style>
