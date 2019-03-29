<template>
    <div>
        <blockTitle @click.native="isActive=!isActive" :isActive="isActive">
            <slot name="title"></slot>
        </blockTitle>
        <collapseTrans>
            <div class="collapse-wrap"
                 v-show="isActive">
                <!-- @slot default -->
                <slot></slot>
                <hr class="bottom-line"/>
            </div>
        </collapseTrans>
    </div>
</template>

<script>

    import blockTitle from '../blockTitle';
    import collapseTrans from '@/utils/collapseTrans';

    export default {
        name: 'collapse',
        components: {blockTitle, collapseTrans},
        data() {
            return {isActive: true}
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

    .bottom-line {
        background-color: #fff;
        height: 20px;
        border: none;
    }

</style>
