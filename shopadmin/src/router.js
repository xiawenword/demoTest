import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Index from './views/Index.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: Index
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/index',
            redirect: Index
        }
    ]
})