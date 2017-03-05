<template>
    <div class="index-wrap">
        <nav class="index-nav">
          <router-link :class="{'active':cs()}" :to="{path:'/'}">全部</router-link>
          <router-link :class="{'active':cs('good')}" :to="{path:'/',query:{tab:'good'}}">精华</router-link>
          <router-link :class="{'active':cs('share')}" :to="{path:'/',query:{tab:'share'}}">分享</router-link>
          <router-link :class="{'active':cs('ask')}" :to="{path:'/',query:{tab:'ask'}}">问答</router-link>
          <router-link :class="{'active':cs('job')}" :to="{path:'/',query:{tab:'job'}}">招聘</router-link>
        </nav>
        <mt-loadmore class="cell-box"

             :top-method="loadTop"
             @top-status-change="handleTopChange"
             ref="loadmore"
        >
            <div slot="top" class="mint-loadmore-top">
              <mt-spinner class="loading" color="#198AC8" type="snake"></mt-spinner>
            </div>
            <div v-infinite-scroll="loadMore"
             infinite-scroll-immediate-check="false"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="10">
                <mt-spinner class="loading" color="#198AC8" type="snake" v-show="firstLoading"></mt-spinner>
                <router-link class="topics-cell" :to="`/topic/${d.id}`" v-for="d in data" :key="d.id">
                    <div class="topics-cell-top">
                        <span class="put_top" :class="{'active':d.top}">{{d.top?'置顶':type[d.tab]}}</span>
                        <span class="title">{{d.title}}</span>
                    </div>
                    <cell
                        :avatarUrl="d.author.avatar_url"
                        :userName="d.author.loginname"
                    >
                        <template slot="left">
                            <span>{{d.author.loginname}}</span>
                            <span>创建于{{timeFormt(d.create_at)}}</span>
                        </template>
                        <template slot="right">
                            <span><em class="count_of_replies">{{d.reply_count}} </em>/ {{d.visit_count}}</span>
                            <span>{{timeTransform(d.last_reply_at)}}</span>
                        </template>
                    </cell>
                </router-link>
                <mt-spinner class="loading" color="#198AC8" type="snake" v-show="loading"></mt-spinner>
            </div>


        </mt-loadmore>

    </div>

</template>
<script type="text/javascript">
import axios from 'axios'
import Vue from 'vue'
import { timeFormt, timeTransform } from '../utils'
import Cell from '../components/Cell'
import { InfiniteScroll, Spinner, Loadmore } from 'mint-ui'
Vue.use(InfiniteScroll)
export default {
    created () {
        this.init()
    },
    watch: {
        $route: function () {
            this.firstLoading = true
            this.init()
        }
    },
    components: {
        Cell,
        MtSpinner: Spinner,
        MtLoadmore: Loadmore
    },
    computed: {
        type () {
            return this.$store.state.tab_type
        }
    },
    data () {
        return {
            data: [],
            page: 1,
            loading: false,
            firstLoading: true,
            topStatus: ''
        }
    },
    methods: {
        init (fn) {
            this.page = 1;
            this.data = [];
            this.fetchData(()=>{
                this.firstLoading = false
                fn&&fn()
            })
        },
        fetchData(fn) {
            axios.get('https://cnodejs.org/api/v1/topics',{
                params: {
                    page: this.page++,
                    tab: this.$route.query.tab,
                    limit: 20
                }
            })
            .then(res => {
                this.data = [...this.data,...res.data.data]
                fn&&fn()
            })
            .catch(error => {
                console.log(error)
            })
        },
        timeFormt (time) {
            return timeFormt(time)
        },
        timeTransform (time) {
            return timeTransform(time)
        },
        loadMore () {
            if(!this.firstLoading){
                this.loading = true;
                this.fetchData(()=>{
                    this.loading = false
                })
            }

        },
        loadTop () {
            this.init(()=>{
                this.$refs.loadmore.onTopLoaded()
            })
        },
        handleTopChange (status) {
            this.topStatus = status
        },
        cs (tabName) {
            return this.$route.query.tab == tabName
        }
    }
}
</script>

<style type="text/css" lang="scss">
.index-wrap {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.index-nav {
    height: 40px;
    line-height: 40px;
    background: #45AFE8;
    display: flex;
    a {
        width: 20%;
        text-align: center;
        color: #fff;
        &.active {
            background: #198AC8;
        }
    }
}

.cell-box {
    flex: 1;
    height: 100%;
    overflow: scroll !important;
}
.topics-cell {
    border-bottom: 1px solid #eee;
    display: flex;
    flex-direction: column;
    padding: 10px;
}
.topics-cell-top {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    .put_top {
        margin-right: 5px;
    }
    .title {
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        flex: 1;
    }
}

</style>
