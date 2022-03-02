import Vue from 'vue'
import VueRouter from 'vue-router'
import AppMainPage from '../views/AppMainPage'
import AppModel from '../views/AppModel'
import AppDetailPage from "../views/AppDetailPage";
import NotFound from "../views/NotFound";

Vue.use(VueRouter);

const urlPath = '/auto-v-nalichii-new/';
const routes = [
  {
    path: '/',
    redirect: urlPath,
    name: 'BasePage',
  },
  {
    path: urlPath,
    name: 'MainPage',
    component: AppMainPage,
    meta: {
      breadcrumb: {name: 'Автомобили Hyundai в наличии'}
    },
  },
  {
    path: urlPath + ':model/',
    name: 'ModelPage',
    component: AppModel,
  },
  {
    path:  urlPath + ':model/:id/',
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
