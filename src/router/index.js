import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from "../views/NotFound";

Vue.use(VueRouter);


const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: () => import(/* webpackChunkName: "main" */'../views/AppMainPage'),
        meta: {
            breadcrumb: {name: 'Автомобили Hyundai в наличии'},
            keepComponents: ['MainPage', 'ModelPage'],
        },
    },
    {
        path: '/:model/',
        name: 'ModelPage',
        component: () => import(/* webpackChunkName: "model" */'../views/AppModel.vue'),
        meta: {
            keepComponents: ['MainPage', 'ModelPage'],
        },
    },
    {
        path: '/:model/:id/',
        name: 'DetailPage',
        component: () => import(/* webpackChunkName: "detail" */'../views/AppDetailPage'),
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
        console.log(from)
        history.pushState("", "", '/auto-v-nalichii' + from.path);
    }
})
export default router
