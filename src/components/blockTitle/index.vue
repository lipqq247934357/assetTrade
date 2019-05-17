<template>
    <div :class="$style['content-top-title']">
        <slot></slot>
        <div v-if="hide !== true">
            <i class="el-icon-arrow-down" :class="$style['icon-trans']" v-if="isActive"></i>
            <i class="el-icon-arrow-down" :class="[$style['icon-trans'],$style.rotate90]" v-else></i>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'blockTitle',
        props: ['isActive', 'hide']
    }
</script>

<style lang="scss" module>
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

        i {
            position: absolute;
            right: 10px;
            top: 10px;
        }

    }

    .icon-trans {
        transition: transform .3s;
    }

    .rotate90 {
        transform: rotateZ(-90deg);
    }


</style>
