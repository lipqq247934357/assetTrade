<template>
    <div class="user-detail-pop">
        <div class="header">
            <span class="title">个人信息</span>
            <span class="cancel" @click="closePop">x</span>
        </div>
        <div class="content">
            <div class="line1">
                <div>用户名:</div>
                <div>姓名:</div>
                <div>手机号:</div>
                <div>邮箱:</div>
                <div>职位:</div>
            </div>
            <div class="line2">
                <div>{{userInfo.username}}</div>
                <div>{{userInfo.name}}</div>
                <div>{{userInfo.phone}}</div>
                <div>{{userInfo.email}}</div>
                <div>{{userInfo.job}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "userDetailPop",
        data() {
            return {}
        },
        props: ["userInfo"],
        methods: {
            closePop() {
                this.$emit('update:visibleUD', false);
            }
        }
    }
</script>

<style lang="scss" scoped>

    .user-detail-pop {
        position: absolute;
        z-index: 2;
        width: 400px;
        height: 300px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .header {
            overflow: hidden;
            background: #278db9;
            height: 30px;
            line-height: 30px;
            color: #ffffff;
            padding: 0 20px;

            .title {
                float: left;
            }

            .cancel {
                float: right;
                cursor: pointer;
            }
        }

    }

    .content {
        height: 170px;
        background: #ffffff;
        border: 1px solid #ccc;

        div {
            margin-top: 12px;
        }

        .line1 {
            float: left;
            text-align: right;
            width: 20%;
            margin-right: 10px;
        }

        .line2 {
            width: 50%;
            float: left;
        }
    }

</style>
