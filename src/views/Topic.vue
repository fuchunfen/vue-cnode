<template>
    <div class="topic-wrap">
        <div class="topic">
            <mt-spinner class="loading" color="#198AC8" type="snake" v-show="loading"></mt-spinner>
            <h1>{{data.title}}</h1>
            <cell
                v-if="data.author"
                :avatarUrl="data.author.avatar_url"
                :userName="data.author.loginname"
            >
                <template slot="left">
                    <div style="margin-bottom: 5px">
                        <span class="put_top" :class="{'active':data.top}">{{data.top?'置顶':type[data.tab]}}</span>
                        <span>{{data.author.loginname}}</span>
                    </div>
                    <span>{{timeTransform(data.create_at)}}创建 {{data.visit_count}}次浏览</span>
                </template>
                <template slot="right">
                    <i @click="topic_collect(data.id)" :class="{'active':data.is_collect}" class="iconfont icon-shoucang"></i>
                </template>
            </cell>
            <div class="topic-content" v-html="data.content"></div>
            <div v-if="data.reply_count">{{data.reply_count}}条回复</div>
            <div v-if="data.content && !data.reply_count" class="no-reply">暂无回复</div>
            <div class="replies" v-for="(d,index) in data.replies" :key="d.id">
                <cell
                    :avatarUrl="d.author.avatar_url"
                    :userName="d.author.loginname"
                >
                    <template slot="left">
                        <div>
                            <span>{{d.author.loginname}}</span>
                        </div>
                        <div>
                            <span style="color:#80bd01">{{index + 1}}楼</span>
                            <span>{{timeTransform(d.create_at)}}</span>
                        </div>

                    </template>
                    <template slot="right">
                        <div>
                            <i @click="ups(d.ups ,d.id)" :class="{'active':is_ups(d.ups).ups}" class="iconfont icon-zan"></i> {{d.ups.length}}&nbsp;
                            <i class="iconfont icon-skip" @click="focus(d.id)"></i>
                        </div>

                    </template>
                </cell>
                <div class="replies-content" v-html="d.content"></div>
            </div>

        </div>
        <edit @send="send" @getEdit="getEdit"></edit>
    </div>

</template>
<script type="text/javascript">
    import axios from 'axios'
    import Cell from '../components/Cell'
    import { timeFormt, timeTransform } from '../utils'
    import { Spinner, Toast } from 'mint-ui'
    import { mapState } from 'vuex'
    import Edit from '../components/Edit'
    export default {
        name: 'topic',
        components: {
            Cell,
            Edit,
            MtSpinner: Spinner
        },
        computed: mapState({
            type: 'tab_type',
            accesstoken: 'accesstoken',
            user: 'user'
        }),
        created () {
            this.fetchData()

        },
        data () {
            return {
                data: {},
                loading: true,
                obj: null,
                reply_id: ''
            }
        },
        methods: {
            fetchData () {
                axios.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`,{
                    params: {
                        accesstoken: this.accesstoken
                    }
                })
                .then(res => {
                    this.data = res.data.data
                    this.loading = false
                })
                .catch(error => {
                    console.log(error)
                })
            },
            timeTransform (time) {
                return timeTransform(time)
            },
            topic_collect (id) {
                if(this.user){
                    let method = this.data.is_collect ? 'de_collect' : 'collect'

                    axios({
                        method: 'post',
                        url: `https://cnodejs.org/api/v1/topic_collect/${method}`,
                        data: {
                            accesstoken: this.accesstoken,
                            topic_id: id
                        }
                    })
                    .then(res => {
                        if(res.data.success) {
                            this.data.is_collect = !this.data.is_collect
                        }
                    })
                }else {
                    this.$router.push('/login')
                }

            },
            is_ups (ups_arr) {
                if(this.user){
                    let obj = {}
                    ups_arr.map((item, index) => {
                        if(item == this.user.id) {
                            obj.ups = true
                            obj.index = index
                        }
                    })
                    return obj
                }
                return {}
            },
            ups (ups_arr, reply_id) {
                if(this.user){
                    axios({
                        method: 'post',
                        url: `https://cnodejs.org/api/v1/reply/${reply_id}/ups`,
                        data: {
                            accesstoken: this.accesstoken
                        }
                    })
                    .then(res => {
                        if(res.data.success) {
                            if(res.data.action == 'up') {
                                ups_arr.push(this.user.id)
                            }else {
                                ups_arr.splice(this.is_ups(ups_arr).index,1)
                            }
                        }
                    })
               }else {
                    this.$router.push('/login')
               }
            },
            focus (reply_id) {
                if(this.user){
                    this.obj.focus()
                    this.reply_id = reply_id
                    var sel = window.getSelection()

                    var tempRange = document.createRange()
                    tempRange.setStart(this.obj.firstChild, this.obj.firstChild.length)

                    sel.removeAllRanges()
                    sel.addRange(tempRange)

                    this.obj.addEventListener('bulr',() => {
                        this.reply_id = null
                    })
                }else {
                    this.$router.push('/login')
                }
            },
            send () {
                if(this.user){
                    let content = this.obj.innerHTML

                    if(content == '写评论' || content == ''){
                        Toast({
                            message: '请输入评论内容',
                            duration: 1000
                        })
                    }else {
                        axios({
                            method: 'post',
                            url: `https://cnodejs.org/api/v1/topic/${this.data.id}/replies`,
                            data: {
                                reply_id: this.reply_id,
                                content: content,
                                accesstoken: this.accesstoken
                            }
                        })
                        .then(res => {
                            if(res.data.success) {
                                this.obj.innerHTML = ''
                                this.reply_id = null
                                this.fetchData()
                            }
                        })
                    }
                }else {
                    this.$router.push('/login')
                }
            },
            getEdit (obj) {
                this.obj = obj
            }
        }
    }
</script>
<style type="text/css" lang="scss">
    .topic-wrap {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .topic {
        padding: 10px;
        height: 100%;
        flex: 1;
        overflow: scroll;
        .cell-wrapper {
            margin: 10px 0;
        }
        a {
            color: #08c;
        }
    }
    .cell-wrapper .user_avatar {
        margin-right: 15px;
    }
    .topic-content{
        font-size: 14px;
        img {
            width: 100%;
        }


    }
    .cell-wrapper-item-2 {
        padding-right: 10px;
    }
    .replies {
        border-bottom: 1px solid #ccc;
        padding-bottom: 5px;
    }
    .replies-content {
        font-size: 14px;

        pre code {
            color: inherit;
            font-size: 12px;
        }
        img {
            width: 100%;
        }
    }
    div pre.prettyprint {
        font-size: 14px;
        border-radius: 0;
        padding: 0 15px;
        border: none;
        margin: 20px -10px;
        border-width: 1px 0;
        background: #f7f7f7;
        -o-tab-size: 4;
        -moz-tab-size: 4;
        tab-size: 4;
    }
    code {
        background-color: transparent;
    }
    p,code {
        word-break: break-all;
        word-wrap: break-word;
        white-space: pre-wrap;
    }
    .no-reply {
        text-align: center;
        margin-top: 10px;
    }
</style>
