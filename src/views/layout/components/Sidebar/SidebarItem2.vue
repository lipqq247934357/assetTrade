<template>
    <div class="menu-wrapper">
        <template v-if="hasOneShowingChild(item.children,item)">
            <router-link :to="item.menuUrl">
                <el-menu-item :index="item.menuUrl">
                    <i class="el-icon-tickets svg-icon" v-if="isNest"></i>
                    <i class="el-icon-menu svg-icon" v-else></i>
                    <span slot="title">{{item.menuName}}</span>
                </el-menu-item>
            </router-link>
        </template>

        <el-submenu :index="item.menuId" popper-append-to-body ref="subMenu" v-else>
            <template slot="title">
                <i class="el-icon-menu svg-icon"></i>
                <span slot="title">{{item.menuName}}</span>
            </template>
            <sidebar-item
                    :isNest="true"
                    :item="child"
                    :key="child.menuId"
                    class="nest-menu"
                    v-for="child in item.children"/>
        </el-submenu>
    </div>
</template>

<script>

    export default {
        name: 'SidebarItem',
        props: {
            // route object
            item: {
                type: Object,
                required: true
            },
            isNest: {
                type: Boolean,
                default: false
            },
        },
        data() {
            // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
            this.onlyOneChild = null
            return {}
        },
        methods: {
            hasOneShowingChild(children = [], parent) {
                const showingChildren = children.filter(item => {
                    // Temp set(will be used if only has one showing child)
                    this.onlyOneChild = item;
                    return true
                });

                // When there is only one child router, the child router is displayed by default
                if (showingChildren.length === 1) {
                    return true
                }

                // Show parent if there are no child router to display
                if (showingChildren.length === 0) {
                    this.onlyOneChild = {...parent, path: '', noShowingChildren: true}
                    return true
                }
                return false
            }
        }
    }
</script>
