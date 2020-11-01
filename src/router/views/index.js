import Index from '@/views/layout/Layout'

export default [
    {
        path: '/',
        redirect: '/home',
        component: Index,
        children: [
            {
                name: 'home',
                path: '/home',
                meta: {
                    isAuth: true,
                    title: '首页'
                },
                component: () => import('@/views/home/Home')
            },
            {
                name: 'driver',
                path: '/driver',
                meta: {
                    isAuth: true,
                    title: '驱动'
                },
                component: () => import('@/views/driver/Driver')
            },
            {
                name: 'driverAttribute',
                path: '/driverAttribute',
                meta: {
                    isAuth: true,
                    title: '驱动属性'
                },
                component: () => import('@/views/driver/DriverAttribute')
            },
            {
                name: 'pointAttribute',
                path: '/pointAttribute',
                meta: {
                    isAuth: true,
                    title: '位号属性'
                },
                component: () => import('@/views/point/PointAttribute')
            },
            {
                name: 'profile',
                path: '/profile',
                meta: {
                    isAuth: true,
                    title: '模版'
                },
                component: () => import('@/views/profile/Profile')
            },
            {
                name: 'driverInfo',
                path: '/driverInfo',
                meta: {
                    isAuth: true,
                    title: '驱动配置'
                },
                component: () => import('@/views/driver/DriverInfo')
            },
            {
                name: 'point',
                path: '/point',
                meta: {
                    isAuth: true,
                    title: '位号'
                },
                component: () => import('@/views/point/Point')
            },
            {
                name: 'group',
                path: '/group',
                meta: {
                    isAuth: true,
                    title: '分组'
                },
                component: () => import('@/views/group/Group')
            },
            {
                name: 'device',
                path: '/device',
                meta: {
                    isAuth: true,
                    title: '设备'
                },
                component: () => import('@/views/device/Device')
            },
            {
                name: 'pointInfo',
                path: '/pointInfo',
                meta: {
                    isAuth: true,
                    title: '位号配置'
                },
                component: () => import('@/views/point/PointInfo')
            },
            {
                name: 'pointValue',
                path: '/pointValue',
                meta: {
                    isAuth: true,
                    title: '数据'
                },
                component: () => import('@/views/point/PointValue')
            }
        ]
    }
]
