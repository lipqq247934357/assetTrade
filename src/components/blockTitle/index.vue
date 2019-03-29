<template>
    <div class="content-top-title">
        <slot></slot>
        <div v-if="hide !== true">
            <i v-if="isActive" class="el-icon-arrow-down"></i>
            <i v-else class="el-icon-arrow-right"></i>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'blockTitle',
        props: ['isActive', 'hide']
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .content-top-title {
        position: relative;
        height: 40px;
        width: 100%;
        padding-left: 20px;
        line-height: 38px;
        background: #99cffc;
        border-top: 2px solid #83c5fc;
        border-radius: 2px 2px 5px 5px;
        font-weight: 500;
    }

    i {
        position: absolute;
        right: 10px;
        top: 10px;
    }

</style>
