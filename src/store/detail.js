import { reqDetailInfo, AddCartList } from '@/api'
import { getUUID } from '@/utils/uuid_token'
const actions = {
    async getDetailInfo({ commit }, skuId) {
        let result = await reqDetailInfo(skuId);
        //先测试一下接口回来的数据
        // console.log(result)
        if (result.code === 200) {
            commit('DETAILINFO', result.data)
        }
    },
    async addToShopcart({ commit }, { skuId, skuNum }) {
        // 在派发请求的时候，参数是对象，所以skuId,skuNum在上面的参数列表里面和commit一样解构出来
        let result = await AddCartList(skuId, skuNum);
        //先测试一下接口回来的数据
        // console.log(result)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
}
const mutations = {
    DETAILINFO(state, detailInfo) {
        state.detailInfo = detailInfo
    }
}
const getters = {
    categoryView() {
        return state.detailInfo.categoryView || {}
    },
    skuInfo() {
        return state.detailInfo.skuInfo || {}
    },
    spuSaleAttrList() {
        return state.detailInfo.spuSaleAttrList || {}
    }
}
const state = {
    detailInfo: {},
    uuid_token: getUUID()
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}