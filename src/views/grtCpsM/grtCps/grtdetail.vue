<template>
    <div class="detail app-container">
        <div :class="$style['detail-list']">
            <div :class="$style['content-table']">
                <el-table
                        :data="data"
                        border
                        empty-text="无数据"
                        header-cell-class-name="header-cell-class-name"
                        size="medium"
                        style="width: 100%">
                    <el-table-column label="借据号" prop="listId">
                    </el-table-column>
                    <el-table-column label="期次" prop="term">
                    </el-table-column>
                    <el-table-column label="应还日期" prop="sDate">
                    </el-table-column>
                    <el-table-column label="应还本金" prop="sCapi">
                    </el-table-column>
                    <el-table-column label="应还利息" prop="sInte">
                    </el-table-column>
                    <el-table-column label="应收担保费" prop="sAssureAmt">
                    </el-table-column>
                    <el-table-column label="实还日期" prop="rDate">
                    </el-table-column>
                    <el-table-column label="实还本金" prop="rCapi">
                    </el-table-column>
                    <el-table-column label="实还利息" prop="rInte">
                    </el-table-column>
                    <el-table-column label="实收担保费" prop="rAssureAmt">
                    </el-table-column>
                </el-table>
            </div>

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
                data: []
            }
        },
        activated() {
            let listId = this.$route.query.listId;
            let channelId = this.$route.query.channelId;
            if (listId && channelId) {
                this.getInfo(listId,channelId);
            } else {
                this.$message.warning({message: '参数异常', duration: 2000});
                setTimeout(() => {
                    this.back();
                }, 1000)
            }
        },
        methods: {
            async getInfo(listId,channelId) { // 根据id获取数据
                let res = await this.$api.grtCps.billsDetail({listId,channelId});
                this.data = res.data.data;
            },
            back() {
                this.$router.go(-1);
            }
        }
    }


</script>

<style lang="scss" module>
    @import '../../../styles/common/asset-detail';

    .content-table {
        width: 90%;
        margin: 0 auto 20px;
    }
</style>
