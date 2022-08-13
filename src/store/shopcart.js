import { reqCartList, deleteCart, updateCartchecked } from '@/api'
const state = {
    cartList: []
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}
const actions = {
    async getCartList({ commit }) {
        let result = await reqCartList()
        // console.log(result)
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    // 删除某个产品
    async reqdeleteCart({ commit }, skuId) {
        let result = await deleteCart(skuId)
        // console.log(result)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }

    },
    // 删除所有选中的商品
    reqdeleteAllchecked({ getters, dispatch }) {
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach((item) => {
            if (item.isChecked == 1) {
                let promise = dispatch('reqdeleteCart', item.skuId)
                PromiseAll.push(promise)
            }
        })
        return Promise.all(PromiseAll)
    },
    //改变商品的isCheck状态
    async reqUpdateCartchecked({ commit }, { skuId, isChecked }) {
        let result = await updateCartchecked(skuId, isChecked)
        // console.log(result)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }

    },
    // 改变所有商品的isCheck选中状态
    reqUpdateAllcart({ dispatch, getters }, isChecked) {
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach((item) => {
            let promise = dispatch('reqUpdateCartchecked', {
                skuId: item.skuId,
                isChecked
            })
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)//如果有一个Promise失败，都失败 ，如果都成功，返回成功
    }
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
export default {
    namespaced: true,
    actions, getters, state, mutations
}