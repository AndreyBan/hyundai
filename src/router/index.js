import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../views/MainPage'
import Model from '../views/Model'
import Detail from "../views/Detail";

Vue.use(VueRouter)

const routes = [
  {
    path: '/auto-v-nalichii-new/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/auto-v-nalichii-new/:model/',
    name: 'model',
    component: Model
  },
  {
    path: '/auto-v-nalichii-new/detail/',
    name: 'Detail',
    component: Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
