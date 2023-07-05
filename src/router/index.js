import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login/index.vue')
    },
    {
        path: '/',
        name: '/',
        meta: {
            title: '首页'
        },
        component: () => import('../layout/index.vue'),
        redirect: '/users',
        children: [
            {
                path: '/users',
                name: 'users',
                meta: {
                    keepAlive: false,
                    title: '用户列表'
                },
                component: () => import('@/views/users/index.vue')
            },
            {
                path: '/categories',
                name: 'categories',
                meta: {
                    title: '商品分类'
                },
                component: () => import('@/views/categories/index.vue')
            },
            {
                path: '/goods',
                name: 'goods',
                meta: {
                    title: '商品分类'
                },
                component: () => import('@/views/goods/index.vue')
            },
            {
                path: '/orders',
                name: 'orders',
                meta: {
                    title: '订单列表'
                },
                component: () => import('@/views/orders/index.vue')
            },
            {
                path: '/params',
                name: 'params',
                meta: {
                    title: '分类参数'
                },
                component: () => import('@/views/params/index.vue')
            },
            {
                path: '/reports',
                name: 'reports',
                meta: {
                    title: '数据报表'
                },
                component: () => import('@/views/reports/index.vue')
            },
            {
                path: '/rights',
                name: 'rights',
                meta: {
                    title: '权限列表'
                },
                component: () => import('@/views/rights/index.vue')
            },
            {
                path: '/roles',
                name: 'roles',
                meta: {
                    title: '角色列表'
                },
                component: () => import('@/views/roles/index.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
