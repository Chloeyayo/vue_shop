import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login.vue"
import Index from "../components/Index.vue"
import Home from "../components/Home.vue"
import Welcome from '../components/HomeComponents/Welcome.vue'
import Users from '../components/HomeComponents/Users.vue'
import Roles from '../components/HomeComponents/Roles.vue'
Vue.use(VueRouter)

const routes = [
  // { path: "/", redirect: "/login" },
  { path: '/', component: Index },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',

    children: [
    {
      path: '/welcome',
      component: Welcome
    }, {
      path: '/users',
      component: Users
    },{
      path: '/roles',
      component: Roles
    }]
  },
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, _from, next) => {
  if (to.path == "/login") {
    return next()
  }
  const token = window.sessionStorage.getItem('token')
  if (!token) {
    return next('/login')
  }
  next()
})
export default router