import { reqRegistercode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'
const state = {
    code: '',
    token: getToken(),//存储到本地，然后获取token，state里的token就可以持久化存储了
    userInfo: {}
}
const getters = {

}
const actions = {
    async getRegistercode({ commit }, phone) {
        let result = await reqRegistercode(phone)
        // console.log(result)
        if (result.code == 200) {
            commit('GETREGISTERCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async getUserRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        console.log(result)
        // if (result.code == 200)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    // 请求用户登录
    async getUserLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        // console.log(result)
        // result.data.token
        // token存储到本地
        if (result.code == 200) {
            setToken(result.data.token)
            commit('GETUSERLOGIN', result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    // 请求用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        // console.log('请求用户信息', result)
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    //请求用户退出登录
    async getUserlogout({ commit }) {
        let result = await reqLogout()
        // console.log(result)
        if (result.code == 200) {
            commit('GETUSERLOG0UT')
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    }

}
const mutations = {
    GETREGISTERCODE(state, code) {
        state.code = code
    },
    GETUSERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    GETUSERLOG0UT(state) {
        removeToken()
        state.token = ''
        state.userInfo = {}
    }
}
export default {
    namespaced: true,
    state, getters, actions, mutations

}