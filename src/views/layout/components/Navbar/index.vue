<template>
    <div :class="$style.navbar">
        <hamburger :class="$style['hamburger-container']" :is-active="sidebar.opened" :toggle-click="toggleSideBar"/>
        <breadcrumb/>
        <el-dropdown :class="$style['avatar-container']" trigger="click">
            <div :class="$style['avatar-wrapper']">
                <img :class="$style['user-avatar']" src="/touxiang.jpg">
                <i class="el-icon-caret-bottom"/>
            </div>
            <el-dropdown-menu class="user-dropdown" slot="dropdown">
                <el-dropdown-item @click.native="userInfoPop">
                    <div>个人信息</div>
                </el-dropdown-item>
                <el-dropdown-item @click.native="logout" divided>
                    <div style="display:block;">退出登录</div>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <userInfoPop :dialogVisible.sync="dialogVisible"></userInfoPop>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import Breadcrumb from '@/components/Breadcrumb'
    import Hamburger from '@/components/Hamburger'
    import userInfoPop from './userInfoPop'

    export default {
        components: {
            Breadcrumb,
            Hamburger,
            userInfoPop
        },
        data() {
            return {dialogVisible: false}
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'avatar'
            ])
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('ToggleSideBar')
            },
            logout() {
                console.log('pp')
                this.$store.dispatch('LogOut').then(() => {
                    window.location.reload();
                })
            },
            userInfoPop() {
                this.dialogVisible = true;
            }
        }
    }
</script>

<style lang="scss" module>
    .navbar {
        height: 50px;
        line-height: 50px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);

        .hamburger-container {
            line-height: 58px;
            height: 50px;
            float: left;
            padding: 0 10px;
        }

        .screenfull {
            position: absolute;
            right: 90px;
            top: 16px;
            color: red;
        }

        .avatar-container {
            height: 50px;
            display: inline-block;
            position: absolute;
            right: 35px;

            .avatar-wrapper {
                cursor: pointer;
                margin-top: 5px;
                position: relative;
                line-height: initial;

                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }

                .el-icon-caret-bottom {
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
</style>

