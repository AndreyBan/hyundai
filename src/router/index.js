import Vue from 'vue'
import VueRouter from 'vue-router'
import AppMainPage from '../views/AppMainPage'
import AppModel from '../views/AppModel'
import AppDetailPage from "../views/AppDetailPage";
import NotFound from "../views/NotFound";

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
    path: '/auto-v-nalichii-new/:model/:id/',
    name: 'DetailPage',
    component: AppDetailPage
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
  }, {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
