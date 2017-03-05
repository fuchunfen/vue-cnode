<template>
    <div class="my-header" v-show="url != 'index'">
        <div class="my-header-left">
            <i class="iconfont icon-back" @click="back"></i>
        </div>
        <div class="my-header-title">{{title}}</div>
        <div class="my-header-right">
            <i class="iconfont icon-off" @click="logout" v-if="offShow"></i>
            <i class="iconfont icon-send" v-if="url == 'send'"></i>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        name: 'header',
        props: ['title'],
        computed: {
            url () {
                return this.$route.name
            },
            title () {
                if(this.url == 'user') {
                    return this.offShow ? '个人中心' : `${this.userName}的个人中心`
                }
                return this.urlName[this.url]
            },
            loginname () {
                return this.$store.state.user.loginname
            },
            userName () {
                return this.$route.params.userName
            },
            offShow () {
                if(this.$store.state.user) {
                    return this.userName == this.loginname
                }
            }
        },
        data () {
            return {
                urlName: {
                    topic: '详情',
                    message: '消息',
                    send: '发表主题',
                    login: '登录'
                }
            }
        },
        methods: {
            back () {
                this.$router.go(-1)
            },
            logout () {
                this.$store.commit({
                    type: 'logout'
                })
            }
        }
    }
</script>
<style type="text/css" lang="scss">
    .my-header {
        height: 50px;
        display: flex;
        align-items: center;
        background: #45AFE8;
        padding: 0 10px;
        color: #fff;
        i {
          font-size: 24px;
          color: #fff;
        }
    }
    .my-header-left {
        flex: 0.5;
    }
    .my-header-title {
        flex: 1;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        text-align: center;
    }
    .my-header-right {
        flex: 0.5;
        text-align: right;
    }

</style>
