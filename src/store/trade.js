import { reqUserAddress, reqTradeInfo } from "@/api"
const actions = {
    // 获取用户的订单交易页信息
    async getTradeInfo({ commit }) {
        let result = await reqTradeInfo();
        // console.log(result);
        if (result.code == 200) {
            commit('GETTRADEINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    },

    async getUserAddress({ commit }) {
        let result = await reqUserAddress();
        // console.log(result);
        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
}
const mutations = {
    GETTRADEINFO(state, tradeInfo) {
        state.tradeInfo = tradeInfo
    },
    GETUSERADDRESS(state, address) {
        state.address = address
    },
}
const state = {
    tradeInfo: {},
    address: [],
}
const getters = {

}
export default {
    namespaced: true,
    state, getters, actions, mutations

}