import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login.vue"
import Index from "../components/Index.vue"
import Home from "../components/Home.vue"
import Welcome from '../components/HomeComponents/Welcome.vue'
import Users from '../components/HomeComponents/Users.vue'
import Roles from '../components/HomeComponents/Roles.vue'
import Rights from '../components/HomeComponents/Rights.vue'
import Categories from '../components/HomeComponents/Categories.vue'
import Params from '../components/HomeComponents/Params.vue'
import Goods from '../components/HomeComponents/Goods.vue'
<<<<<<< HEAD
import addGoods from '../components/HomeComponents/Goods/add.vue'
import Orders from '../components/HomeComponents/Orders.vue'
import Reports from '../components/HomeComponents/Reports.vue'
=======
import Orders from '../components/HomeComponents/Orders.vue'

>>>>>>> e4efb11fd18f7c242296b58c44e198b8a9927848
Vue.use(VueRouter)

const routes = [
  // { path: "/", redirect: "/login" },
  { path: '/', component: Home },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',

    children: [
<<<<<<< HEAD
      {
        path: '/welcome',
        component: Welcome
      }, {
        path: '/users',
        component: Users
      }, {
        path: '/roles',
        component: Roles
      }, {
        path: "/rights",
        component: Rights
      }, {
        path: '/categories',
        component: Categories
      }, {
        path: '/params',
        component: Params
      },
      {
        path: '/orders',
        component: Orders
      },      {
        path: '/reports',
        component: Reports
      }, {
        path: '/goods',
        component: Goods,
      }, {
        path: '/goods/add',
        component: addGoods
      }

    ]
=======
    {
      path: '/welcome',
      component: Welcome
    }, {
      path: '/users',
      component: Users
    }, {
      path: '/roles',
      component: Roles
    }, {
      path: "/rights",
      component: Rights
    }, {
      path: '/categories',
      component: Categories
    },{
      path: '/params',
      component: Params
    },{
      path:'/goods',
      component: Goods
    },{
      path:'/orders',
      component: Orders
    },{
      path:'/reports',
      component:()=>import("../components/HomeComponents/Reports.vue")
    }]
>>>>>>> e4efb11fd18f7c242296b58c44e198b8a9927848
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