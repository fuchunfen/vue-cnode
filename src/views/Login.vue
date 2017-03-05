<template>
    <div class="login">
        <form @submit.prevent="login">
            <input type="text" placeholder="access token" v-model="accesstoken"><br/>
            <input type="submit" value="登录">
        </form>
    </div>
</template>
<script type="text/javascript">
    import axios from 'axios'
    export default {
        name: 'login',
        data () {
            return {
                accesstoken: ''
            }
        },
        methods: {
            login () {
                this.$store.dispatch({
                    type: 'login',
                    accesstoken: this.accesstoken
                })
            }
        }
    }
</script>
<style type="text/css" lang="scss">
    .login {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        form {
            width: 300px;
            margin-top: -100px;
            input {
                width: 100%;
                height: 40px;
                line-height: 40px;
            }
            input[type=text] {
                border: 1px solid #ccc;
                text-indent: 15px;
            }
            input[type=submit] {
                background: #45AFE8;
                border: none;
                margin-top: 15px;
                color: #fff;
                border-radius: 5px;
            }
        }
    }
</style>
