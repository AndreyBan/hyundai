import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from "../views/NotFound";
import AppModel from "../views/AppModel";
import AppDetailPage from "../views/AppDetailPage";
Vue.use(VueRouter);


const routes = [
    {
        path: '/:model/',
        name: 'ModelPage',
        component: AppModel,
        meta: {
            keepComponents: ['MainPage', 'ModelPage'],
        },
    },
    {
        path: '/:model/:id/',
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
        history.pushState("", "", '/auto-v-nalichii' + from.path);
    }
})
export default router
