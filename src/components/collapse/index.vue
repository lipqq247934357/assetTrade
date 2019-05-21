<template>
    <div>
        <blockTitle :isActive="isActive" @click.native="isActive=!isActive">
            <slot name="title"></slot>
        </blockTitle>
        <collapseTrans>
            <div class="collapse-wrap"
                 v-show="isActive">
                <!-- @slot default -->
                <slot></slot>
                <hr :class="$style['bottom-line']"/>
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

<style lang="scss" module>

    .bottom-line {
        background-color: #fff;
        height: 5px;
        border: none;
    }

</style>
