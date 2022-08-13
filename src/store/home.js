//home仓库
import { reqCategoryList } from "@/api"
import { reqBannerList } from "@/api"
import { reqFloorList } from "@/api"

const actions = {
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        //先测试一下接口回来的数据
        // console.log(result)
        if (result.code === 200) {
            commit('CATEGORYLIST', result.data)
        }
    },
    async getBannerList({ commit }) {
        let result = await reqBannerList();
        // console.log('getBannerList')
        if (result.code === 200) {
            commit('BANNERLIST', result.data)
        }
    },
    async getFloorList({ commit }) {
        let result = await reqFloorList();
        // console.log('floor获取')
        if (result.code === 200) {
            commit('FLOORLIST', result.data)
        }
    },
}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    BANNERLIST(state, bannerList) {
        // console.log('BannerList')
        state.bannerList = bannerList
    },
    FLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}
const state = {
    categoryList: [],
    bannerList: [],
    floorList: []

}
const getters = {

}
export default {
    //开启命名空间
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}