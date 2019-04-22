<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
                :active-text-color="variables.menuActiveText"
                :background-color="variables.menuBg"
                :collapse="isCollapse"
                :collapse-transition="false"
                :default-active="$route.path"
                :text-color="variables.menuText"
                mode="vertical"
        >
            <sidebar-item :item="route" :key="route.menuId" v-for="route in treeData"/>
        </el-menu>
    </el-scrollbar>
</template>

<script>
    import {mapGetters} from 'vuex'
    import variables from '@/styles/variables.scss'
    import SidebarItem from './SidebarItem2'
    import {treeUtil} from '@/utils/utils';

    export default {
        components: {SidebarItem},
        computed: {
            ...mapGetters([
                'sidebar', 'tree'
            ]),
            variables() {
                return variables
            },
            isCollapse() {
                return !this.sidebar.opened
            }
        },
        data() {
            return {treeData: []}
        },
        created() {
            this.treeData = (treeUtil(this.tree));
        }
    }
</script>
