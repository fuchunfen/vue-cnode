import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index'
import Topic from '../views/Topic'
import User from '../views/User'
import Message from '../views/Message'
import Send from '../views/Send'
import Login from '../views/Login'
import store from '../vuex/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/topic/:id',
      name: 'topic',
      component: Topic
    },
    {
      path: '/user/:userName',
      name: 'user',
      component: User,
    },
    {
      path: '/message',
      name: 'message',
      component: Message,
      meta: { requiresAuth: true }
    },
    {
      path: '/send',
      name: 'send',
      component: Send,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
    console.log(store)
    if(to.meta.requiresAuth && store.state.user == null){
        next('login')
    }else if(to.name == 'login' && store.state.user != null) {
        next('/')
    }else {
        next()
    }
})

export default router
