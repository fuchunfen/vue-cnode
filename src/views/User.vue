<template>
    <div class="user-wrap">
        <div class="user_header">
            <div class="user_avatar">
                <img :src="data.avatar_url">
            </div>
            <div class="user_name">{{data.loginname}}</div>
            <div class="user_info">
                <span>积分{{data.score}}</span>
                <span class="create_at">注册于{{timeTransform(data.create_at)}}</span>
            </div>
        </div>
        <div class="recent">
            <span :class="{'active': now == 'topics'}" @click="show('topics')">主题</span>
            <span :class="{'active': now == 'replies'}" @click="show('replies')">回复</span>
        </div>
        <div class="recent_list recent_topics" v-show="now == 'topics'">
            <router-link :to="`/topic/${d.id}`" key="d.id" v-for="d in data.recent_topics">
                <span class="content">{{d.title}}</span>
                <span class="last_reply_at">{{timeTransform(d.last_reply_at)}}</span>
            </router-link>
        </div>
        <div class="recent_list recent_replies" v-show="now == 'replies'">
            <router-link :to="`/topic/${d.id}`" :key="d.id" v-for="d in data.recent_replies">
                <span class="content">{{d.title}}</span>
                <span class="last_reply_at">{{timeTransform(d.last_reply_at)}}</span>
            </router-link>
        </div>
    </div>
</template>

<script type="text/javascript">
    import axios from 'axios'
    import { timeTransform } from '../utils'
    export default {
        name: 'user',
        created () {
            this.fetchData()
        },
        data () {
            return {
                data: {
                    recent_topics: []
                },
                now: ''
            }
        },
        methods: {
            fetchData () {
                axios.get(`https://cnodejs.org/api/v1/user/${this.$route.params.userName}`)
                .then( res => {
                    this.data = res.data.data
                    this.now = this.data.recent_topics.length > 0 ? 'topics' : 'replies'
                })
            },
            timeTransform (time) {
                return timeTransform(time)
            },
            show (type) {
                this.now = type
            }
        }
    }
</script>

<style type="text/css" lang="scss">
    .user-wrap {
        overflow: scroll;
        height: 100%;
    }
    .user_header {
        background: #45AFE8;;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
        color: #fff;
    }
    .user_avatar {
        width: 80px;
        height: 80px;
        overflow: hidden;
        border-radius: 100%;
        margin-bottom: 10px;
        img {
            width: 100%;
        }
    }
    .user_name {
        line-height: 24px;
    }
    .user_info {
        font-size: 14px;
        .create_at {
            margin-left: 10px;
        }
    }
    .recent {
        display: flex;
        background: #eee;
        span {
            width: 50%;
            text-align: center;
            height: 50px;
            line-height: 50px;
            &.active {
                border-bottom: 3px solid #45AFE8;;
            }
        }
    }
    .recent_list {
        & > a {
            border-bottom: 1px solid #ccc;
            font-size: 14px;
            height: 40px;
            line-height: 40px;
            display: flex;
            justify-content: space-between;
            padding: 0 10px;
        }
        .content {
            flex: 1;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        .last_reply_at {
            width: 80px;
            text-align: right;
        }
    }
</style>
