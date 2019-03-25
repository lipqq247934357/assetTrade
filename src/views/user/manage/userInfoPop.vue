<template>
    <div class="user-detail-pop">
        <div>
            <div class="icon"><img :src="userInfo.iconAddress" alt=""></div>
            <p class="roles">{{userInfo.name}}·{{userInfo.rolesName}}</p>
            <p class="desc">{{userInfo.desc}}</p>
        </div>
        <div class="btn">
            <el-button class="detail-info-btn" size="mini" @click="getUserDetail">个人信息</el-button>
            <el-button class="log-out-btn" size="mini" @click="logOut">退出</el-button>
        </div>
    </div>
</template>

<script>

    import store from '../../../store';
    import Cookies from 'js-cookie';

    export default {
        name: "userInfoPop",
        props: ["visibleUI", "userInfo"],
        methods: {
            logOut() {
                Cookies.remove('admin-token');
                store.commit('logOut');
                location.reload();
            },
            getUserDetail() {
                this.$emit('showVisibleUD');
            }
        }
    }
</script>

<style lang="scss" scoped>

    .user-detail-pop {
        background: #278db9;
        text-align: center;

        div, p {
            margin: 5px 0;
        }

        img {
            margin-top: 5px;
            width: 60px;
            height: 60px;
        }

        .roles {
            color: #ffffff;
            font-size: 10px;
        }

        .desc {
            color: yellow;
            font-size: 15px;
        }

        .btn {
            background: #ffffff;
            padding: 10px;
            overflow: hidden;
        }

        .detail-info-btn {
            float: left;
        }

        .log-out-btn {
            float: right;
        }

    }

</style>
