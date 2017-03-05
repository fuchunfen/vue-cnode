<template>
    <footer v-show="url != 'topic'">
        <router-link :class="{active:cs('index')}" :to="{name:'index'}">
            <i class="iconfont icon-home"></i>
            <span>主页</span>
        </router-link>
        <router-link :class="{active:cs('send')}" :to="{name:'send'}">
            <i class="iconfont icon-send"></i>
            <span>发表</span>
        </router-link>
        <router-link :class="{active:cs('message')}" :to="{name:'message'}">
            <i class="iconfont icon-message"></i>
            <span>消息</span>
        </router-link>
        <a :class="{active:cs('user')}" @click="toUser">
            <i class="iconfont icon-account"></i>
            <span>我的</span>
        </a>
    </footer>
</template>

<script type="text/javascript">
    export default {
        name: 'footer',
        computed: {
            user () {
                return this.$store.state.user
            },
            url () {
                return this.$route.name
            }
        },
        methods: {
            cs (name) {
                return this.$route.name == name
            },
            toUser () {
                if(this.user) {
                    this.$router.push({name:'user',params:{userName:this.user.loginname}})
                }else {
                    this.$router.push('/login')
                }

            }
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    footer {
        display: flex;
        background: #45AFE8;
        height: 55px;
    }
    a {
        width: 25%;
        display: flex;
        flex-direction: column;
        text-align: center;
        color: #fff;
        &.active {
            background: #198AC8;
        }
        i {
            font-size: 20px;
        }
        span {
            font-size: 14px;
            margin-top: -5px;
        }
    }
</style>
