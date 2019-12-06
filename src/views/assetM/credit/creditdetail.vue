<template>
    <div class="detail app-container">
        <div :class="$style['detail-list']">
            <ul>
                <li><span>申请编号</span></li>
                <li>
                    <span>{{ info.applyId }}</span>
                </li>

                <li><span>渠道名称</span></li>
                <li>
                    <span>{{ info.channelName }}</span>
                </li>

                <li><span>借款人编号</span></li>
                <li>
                    <span>{{ info.custId }}</span>
                </li>

                <li><span>借款人姓名</span></li>
                <li>
                    <span>{{ info.custName }}</span>
                </li>

                <li><span>证件类型</span></li>
                <li>
                    <span>{{ info.custIdType }}</span>
                </li>

                <li><span>证件号码</span></li>
                <li>
                    <span>{{ info.idNo }}</span>
                </li>

                <li><span>授信额度</span></li>
                <li>
                    <span>{{ formatAmount(0, 0, info.initialAmount) }}</span>
                </li>

                <li><span>额度编号</span></li>
                <li>
                    <span>{{ info.limitNo }}</span>
                </li>

                <li><span>额度类型</span></li>
                <li>
                    <span>{{ info.limitType }}</span>
                </li>

                <li><span>额度签署日期</span></li>
                <li>
                    <span>{{ formatterData(0, 0, info.startDt) }}</span>
                </li>

                <li><span>额度生效日期</span></li>
                <li>
                    <span>{{ formatterData(0, 0, info.startDt) }}</span>
                </li>

                <li><span>额度到期日期</span></li>
                <li>
                    <span>{{ formatterData(0, 0, info.endDt) }}</span>
                </li>

                <li :class="$style['bottom-0']"><span>创建时间</span></li>
                <li :class="$style['bottom-0']">
                    <span>{{ formatterData(0, 0, info.curDate) }}</span>
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

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import formatter from "@/components/mixins/formatter";

    @Component({
        name: "creditDetail",
        mixins: [formatter]
    })
    export default class extends Vue {
        info: object = {};

        activated() {
            this.getInfo();
        }

        async getInfo() {
            let data = await this.$api.assetM.creditDetail({
                body: {
                    applyId: this.$route.query.updateId // 获取updateId,然后查找内容
                }
            });
            this.info = data.data.detail;
        }

        back() {
            this.$router.go(-1);
        }
    }
</script>

<style lang="scss" module>
    @import '../../../styles/common/asset-detail';
</style>
