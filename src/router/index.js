import Vue from 'vue'
import VueRouter from 'vue-router'
import AppMainPage from '../views/AppMainPage'
import AppModel from '../views/AppModel'
import AppDetailPage from "../views/AppDetailPage";

Vue.use(VueRouter)

const routes = [
  {
    path: '/auto-v-nalichii-new/',
    name: 'MainPage',
    component: AppMainPage
  },
  {
    path: '/auto-v-nalichii-new/:model/',
    name: 'ModelPage',
    component: AppModel
  },
  {
    path: '/auto-v-nalichii-new/detail/',
    name: 'DetailPage',
    component: AppDetailPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
