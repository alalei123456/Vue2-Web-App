import { reqSearchInfo } from "@/api"
const state = {
    searchInfo: {}
}
const getters = {
    trademarkList(state) {
        return state.searchInfo.trademarkList
    },
    attrsList(state) {
        return state.searchInfo.attrsList
    },
    goodsList(state) {
        return state.searchInfo.goodsList
    },

}
const actions = {
    async getSearchInfo({ commit }, params) {
        // params形参，写在第二个参数，写在第一个不行，会报错
        let result = await reqSearchInfo(params)
        // console.log(result)
        if (result.code == 200) {
            commit('SEARCHINFO', result.data)
        }
    }
}
const mutations = {
    SEARCHINFO(state, searchInfo) {
        state.searchInfo = searchInfo

    }

}
export default {
    namespaced: true,
    actions, mutations, state, getters
}