<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
                :default-active="$route.path"
                :collapse="isCollapse"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                :active-text-color="variables.menuActiveText"
                :collapse-transition="false"
                mode="vertical"
        >
            <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
        </el-menu>
    </el-scrollbar>
</template>

<script>
    import {mapGetters} from 'vuex'
    import variables from '@/styles/variables.scss'
    import SidebarItem from './SidebarItem'
    import permission from '@/utils/permission';

    export default {
        components: {SidebarItem},
        computed: {
            ...mapGetters([
                'sidebar'
            ]),
            routes() {
                return permission(this.$store.state.user.roles);
            },
            variables() {
                return variables
            },
            isCollapse() {
                return !this.sidebar.opened
            }
        }
    }
</script>
