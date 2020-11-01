import Vue from 'vue'
import VueRouter from 'vue-router'
import CommonRouter from './common/index'
import ViewsRouter from './views/index'
import NProgress from "nprogress";
import {checkTokenValid} from "@/api/user";
import store from "@/store/store";
import {getStore} from '@/util/store'

Vue.use(VueRouter);

const router = new VueRouter({
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop;
            }
            return {
                x: 0,
                y: to.meta.savedPosition || 0
            }
        }
    },
    routes: []
});

router.beforeEach((to, from, next) => {
    NProgress.start();
    const meta = to.meta || {};
    if (meta.title) {
        document.title = to.meta.title
    }
    if (meta.isAuth !== true || from.name === 'login') {
        next();
    } else {
        const token = getStore({name: 'token'}), user = getStore({name: 'user'});
        if ('' === token || undefined === token || '' === user || undefined === user) {
            next({path: '/login'});
            return;
        }
        checkTokenValid(user, token).then(res => {
            if (res.ok) {
                next();
            } else {
                throw new Error(res.message);
            }
        }).catch(() => {
            store.dispatch('ClearToken').then(() => {
                next({path: '/login'})
            });
        });
    }
});

router.afterEach(() => {
    NProgress.done();
});

router.addRoutes([...CommonRouter, ...ViewsRouter]);

export default router
