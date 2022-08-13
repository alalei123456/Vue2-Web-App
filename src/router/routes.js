export default [

    {
        // 重定向
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        //路由懒加载
        component: () => import('../pages/Home'),
        // component: Home
        //配置路由元信息
        meta: {
            //底部的显示与隐藏
            isShow: true
        }
    },
    {
        //?表示可以不传
        path: '/search/:keyword?',
        //命名路由，简化跳转
        name: 'sousuo',
        component: () => import('../pages/Search'),
        meta: {
            //底部的显示与隐藏
            isShow: true
        },
        //路由的props配置，简化接收参数
        //布尔值写法，路由跳转的时候只能传params参数
        props: true
        //函数法
        // props($route) {
        //     return {
        //         keyword: $route.params.keyword
        //     }
        // }
    },
    {
        // 商品详情模块
        path: '/detail/:skuId',
        //路由懒加载
        name: 'detail',
        component: () => import('../pages/Detail'),
        props: true,
        meta: {
            //底部的显示与隐藏
            isShow: true
        }
    },
    {
        // 商品添加到购物车成功
        path: '/addCartSuccess',
        //路由懒加载
        name: 'addCartSuccess',
        component: () => import('../pages/AddCartSuccess'),
        meta: {
            //底部的显示与隐藏
            isShow: true
        },
        beforeEnter: (to, from, next) => {
            // if (to.)
            // console.log(to)
            if (to.query.skuNum && sessionStorage.getItem('skuInfo')) {
                next()
            } else {
                next('/home')
            }
        }
    },
    {
        // 购物车列表
        path: '/shopCart',
        //路由懒加载
        name: 'shopCart',
        component: () => import('../pages/ShopCart'),
        meta: {
            //底部的显示与隐藏
            isShow: true
        }
    },
    {
        // 注册
        path: '/register',
        //路由懒加载
        name: 'register',
        component: () => import('../pages/Register'),
        meta: {
            //底部的显示与隐藏
            isShow: true
        }
    },
    {
        // 登录
        path: '/login',
        //路由懒加载
        name: 'login',
        component: () => import('../pages/Login'),
        meta: {
            //底部的显示与隐藏
            isShow: true
        }
    },
    {   //结算页面
        path: '/trade',
        name: 'trade',
        component: () => import('../pages/Trade'),
        meta: {
            isShow: true
        },
        beforeEnter: (to, from, next) => {
            // if (to.)
            console.log(from)
            if (from.name == 'shopCart') {
                next()
            } else {
                next('/shopCart')
            }
        }

    },
    {   //支付页面
        path: '/pay',
        name: 'pay',
        component: () => import('../pages/Pay'),
        meta: {
            isShow: true
        },
        beforeEnter: (to, from, next) => {
            // if (to.)
            console.log(from)
            if (from.name == 'trade') {
                next()
            } else {
                next('/shopCart')
            }
        }

    },
    {   //支付成功页面
        path: '/paysuccess',
        name: 'paysuccess',
        component: () => import('../pages/PaySuccess'),
        meta: {
            isShow: true
        },
        beforeEnter: (to, from, next) => {
            console.log(from)
            if (from.name == 'pay') {
                next()
            } else {
                next('/shopCart')
            }
        }
    },
    {   //个人中心页面
        path: '/center',
        name: 'center',
        component: () => import('../pages/Center'),
        meta: {
            isShow: true
        },
        // 二级路由：children配置项中
        children: [
            {
                // 我的订单
                path: 'myorder',//二级路由不用写/
                name: 'myorder',
                component: () => import('../pages/Center/Myorder'),
            },
            {
                // 团购订单
                path: 'grouporder',
                name: 'grouporder',
                component: () => import('../pages/Center/Grouporder'),
            },
            {   //在children里面写重定向
                //重定向
                path: '/center',
                redirect: '/center/myorder'
            }]
    },
]