import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { storage } from '../../utils'
import { MessageBox } from 'mint-ui';
import router from '../../router'

Vue.use(Vuex)

const user = storage.get('user')
const accesstoken  = storage.get('accesstoken')

export default new Vuex.Store({
    state: {
        tab_type: {
            ask: '问答',
            share: '分享',
            job: '招聘',
            good: '精华'
        },
        user: user,
        accesstoken: accesstoken
    },
    mutations: {
        login (state, payload) {
            state.user = payload.user
            state.accesstoken = payload.accesstoken

            storage.set('user',payload.user)
            storage.set('accesstoken',payload.accesstoken)

            router.push({name:'user',params:{userName:state.user.loginname}})
        },
        logout (state) {
            state.user = null
            state.accesstoken = null

            storage.set('user',null)
            storage.set('accesstoken',null)

            router.push('/')
        }
    },
    actions: {
        login ({ commit }, payload) {
            axios({
                method: 'post',
                url: 'https://cnodejs.org/api/v1/accesstoken',
                data: {
                    accesstoken: payload.accesstoken
                }
            })
            .then(res => {
                commit({
                    type: 'login',
                    user: res.data,
                    accesstoken: payload.accesstoken
                })
            })
            .catch(res => {
                alert('登录失败，请输入正确的accesstoken')
            })
        }
    }
})
