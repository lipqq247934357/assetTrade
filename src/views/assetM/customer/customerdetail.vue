<template>
    <div class="detail app-container">
        <div :class="$style['detail-list']">
            <ul>
                <li>
                    <span>渠道</span>
                </li>
                <li>
                    <span>{{ info.channelName }}</span>
                </li>

                <li>
                    <span>借款人姓名</span>
                </li>
                <li>
                    <span>{{ info.custName }}</span>
                </li>

                <li>
                    <span>借款人编号</span>
                </li>
                <li>
                    <span>{{ info.custId }}</span>
                </li>

                <li>
                    <span>证件号码</span>
                </li>
                <li>
                    <span>{{ info.idNo }}</span>
                </li>

                <li>
                    <span>证件类型</span>
                </li>
                <li>
                    <span>{{ info.idType }}</span>
                </li>

                <li>
                    <span>通讯地址</span>
                </li>
                <li>
                    <span>{{ info.address }}</span>
                </li>

                <li>
                    <span>联系电话</span>
                </li>
                <li>
                    <span>{{ info.mobilePhone }}</span>
                </li>

                <li>
                    <span>婚姻状况</span>
                </li>
                <li>
                    <span>{{ info.maritalStatus }}</span>
                </li>

                <li>
                    <span>性别</span>
                </li>
                <li>
                    <span>{{ info.gender }}</span>
                </li>

                <li>
                    <span>最高学位</span>
                </li>
                <li>
                    <span>{{ info.Degree }}</span>
                </li>

                <li>
                    <span>最高学历</span>
                </li>
                <li>
                    <span>{{ info.education }}</span>
                </li>

                <li>
                    <span>单位地址</span>
                </li>
                <li>
                    <span>{{ info.companyAddress }}</span>
                </li>

                <li>
                    <span>单位名称</span>
                </li>
                <li>
                    <span>{{ info.companyName }}</span>
                </li>

                <li>
                    <span>个人月收入</span>
                </li>
                <li>
                    <span>{{ info.indmonthIncome }}</span>
                </li>

                <li>
                    <span>单位电话</span>
                </li>
                <li>
                    <span>{{ info.companyPhone }}</span>
                </li>

                <li>
                    <span>配偶姓名</span>
                </li>
                <li>
                    <span>{{ info.spouseName }}</span>
                </li>

                <li :class="$style['bottom-0']">
                    <span>配偶证件类型</span>
                </li>
                <li :class="$style['bottom-0']">
                    <span>{{ info.spouseIdType }}</span>
                </li>

                <li :class="$style['bottom-0']">
                    <span>配偶联系电话</span>
                </li>
                <li :class="$style['bottom-0']">
                    <span>{{ info.spouseMobilePhone }}</span>
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
    export default {
        name: "customerDetail",
        data() {
            return {
                info: {}
            };
        },
        activated() {
            this.getInfo();
        },
        methods: {
            async getInfo() {
                let data = await this.$api.assetM.customerDetail({
                    body: {
                        custId: this.$route.query.updateId // 获取updateId,然后查找内容
                    }
                });
                this.info = data.data.detail;
            },
            back() {
                this.$router.go(-1);
            }
        }
    };
</script>

<style lang="scss" module>
    @import "../../../styles/common/asset-detail";
</style>
