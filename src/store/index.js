import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import home from '@/store/home'
import search from '@/store/search'
import detail from '@/store/detail'
import shopcart from '@/store/shopcart'
import user from '@/store/user'
import trade from './trade'
export default new Vuex.Store({
    // Vuex 允许将 store 分割成模块（module）。
    //每个模块拥有自己的 state、mutation、action、getter
    modules: {
        home, search, detail, shopcart, user, trade
    }
})
