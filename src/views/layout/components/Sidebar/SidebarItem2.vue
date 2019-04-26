<template>
    <div class="menu-wrapper">
        <template v-if="hasOneShowingChild(item.children,item)">
            <router-link :to="item.menuUrl">
                <el-menu-item :index="item.menuUrl">
                    <i v-if="isNest" class="el-icon-tickets svg-icon"></i>
                    <i v-else class="el-icon-menu svg-icon"></i>
                    <span slot="title">{{item.menuName}}</span>
                </el-menu-item>
            </router-link>
        </template>

        <el-submenu v-else ref="subMenu" :index="item.menuId" popper-append-to-body>
            <template slot="title">
                <i class="el-icon-menu svg-icon"></i>
                <span slot="title">{{item.menuName}}</span>
            </template>
            <sidebar-item
                    v-for="child in item.children"
                    :item="child"
                    :isNest="true"
                    :key="child.menuId"
                    class="nest-menu"/>
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
