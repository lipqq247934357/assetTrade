<template>
    <div class="detail app-container">
        <div :class="$style['detail-list']">
            <ul>
                <li>
                    <span>渠道</span>
                    <span>{{info.channelName}}</span>
                </li>
                <li>
                    <span>借款人姓名</span>
                    <span>{{info.custName}}</span>
                </li>
                <li>
                    <span>借款人编号</span>
                    <span>{{info.custId}}</span>
                </li>
                <li>
                    <span>证件号码</span>
                    <span>{{info.idNo}}</span>
                </li>
                <li>
                    <span>证件类型</span>
                    <span>{{info.idType}}</span>
                </li>
                <li>
                    <span>通讯地址</span>
                    <span>{{info.address}}</span>
                </li>
                <li>
                    <span>联系电话</span>
                    <span>{{info.mobilePhone}}</span>
                </li>
                <li>
                    <span>婚姻状况</span>
                    <span>{{info.maritalStatus}}</span>
                </li>
                <li>
                    <span>性别</span>
                    <span>{{info.gender}}</span>
                </li>
                <li>
                    <span>最高学位</span>
                    <span>{{info.Degree}}</span>
                </li>
                <li>
                    <span>最高学历</span>
                    <span>{{info.education}}</span>
                </li>
                <li>
                    <span>单位地址</span>
                    <span>{{info.companyAddress}}</span>
                </li>
                <li>
                    <span>单位名称</span>
                    <span>{{info.companyName}}</span>
                </li>
                <li>
                    <span>个人月收入</span>
                    <span>{{info.indmonthIncome}}</span>
                </li>
                <li>
                    <span>单位电话</span>
                    <span>{{info.companyPhone}}</span>
                </li>
                <li>
                    <span>配偶姓名</span>
                    <span>{{info.spouseName}}</span>
                </li>
                <li>
                    <span>配偶证件类型</span>
                    <span>{{info.spouseIdType}}</span>
                </li>
                <li>
                    <span>配偶联系电话</span>
                    <span>{{info.spouseMobilePhone}}</span>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'customerDetail',
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
                let data = await this.$api.assetM.customerDetail({
                    body: {
                        listId: this.$route.query.updateId // 获取updateId,然后查找内容
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
