//路由文件里面也要引入Vue
// import Vue from "vue";
// Vue.use(VueRouter)
import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store/index'
import routes from '@/router/routes'
Vue.use(VueRouter)
//重写push方法
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        //call，apply 都可以调用函数一次，篡改函数的上下文一次
        // call传递参数，用逗号隔开，apply传递数组
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
const router = new VueRouter({
    routes
})
//登录状态下的一些问题
//1.登录了不能去登录页面和注册页面了,其他的可以去
// 2.未登录不能去交易，订单，个人中心等页面
router.beforeEach(async (to, from, next) => {
    // to:要去的组件
    // from:当前的组件
    //next放行
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    if (token) {
        if (to.path == '/login' || to.path == '/register') {
            next('/')
        } else {
            if (name) {
                next()
            } else {
                try {
                    // 请求用户信息,存储在user的vuex中,dispatch返回的是promise，所以要加await，不然要刷新一下才有
                    await store.dispatch("user/getUserInfo");
                    // console.log('获取用户信息')
                    next()
                } catch (error) {
                    //可能是TOKEN失效，退出登录，重新登录
                    alert(error.message)
                    await store.dispatch('user/getUserlogout')
                    next('/login')
                }
            }
        }
    } else {
        //没登录时候，不能去交易,支付，支付成功，个人中心页面
        //跳转到登录页面
        //登录完了再去这些地方：next('/login?redirect=' + path)
        //把去的路径保存下来，存储于地址栏中
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            console.log(toPath)
            // 将跳转的路由path作为参数，登录成功后跳转到该路由
            next({
                name: 'login',
                params: { redirect: to.fullPath }
            });

        } else {
            //去的不是上面这些路由（home|search|shopCart）---放行
            next();
        }
    }
})

export default router