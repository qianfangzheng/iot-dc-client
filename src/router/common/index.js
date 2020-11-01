export default [
    {
        path: '*',
        redirect: '/404'
    },
    {
        name: 'login',
        path: '/login',
        meta: {
            isAuth: false,
            title: 'DC3 物联万物,智控未来!'
        },
        component: () => import('@/views/login/Login')
    },
    {
        name: 'index',
        path: '/',
        redirect: '/home',
        meta: {
            isAuth: true
        }
    },
    {
        name: '404',
        path: '/404',
        meta: {
            isAuth: false,
            title: '404'
        },
        component: () => import('@/components/error/404')

    },
    {
        name: '403',
        path: '/403',
        meta: {
            isAuth: false,
            title: '403'
        },
        component: () => import('@/components/error/403')
    },
    {
        name: '500',
        path: '/500',
        meta: {
            isAuth: false,
            title: '500'
        },
        component: () => import('@/components/error/500')
    }
]
