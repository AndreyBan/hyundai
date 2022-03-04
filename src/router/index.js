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
            breadcrumb: {name: 'Автомобили Hyundai в наличии'},
            keepComponents: ['MainPage', 'ModelPage'],
        },
    },
    {
        path: urlPath + ':model/',
        name: 'ModelPage',
        component: AppModel,
        meta: {
            keepComponents: ['MainPage', 'ModelPage'],
        },
    },
    {
        path: urlPath + ':model/:id/',
        name: 'DetailPage',
        component: AppDetailPage,
        meta: {
            keepComponents: ['MainPage', 'ModelPage'],
        }
    },
    {
        path: '/:NotFound(.*)*',
        name: 'NotFound',
        component: NotFound,
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.name === 'MainPage') {
        to.meta.keepComponents = [to.name]
    } else if (to.name === 'ModelPage') {
        to.meta.keepComponents = ['MainPage', 'ModelPage'];
    }
    next()
})

router.afterEach((to, from) => {
    if (to.name === 'NotFound'){
        window.history.pushState("", "", from.path);
    }
})
export default router
