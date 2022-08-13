// 用来存储、获取、删除服务器给的token
export const setToken = (token) => {
    localStorage.setItem('TOKEN', token)
}

export const getToken = () => {
    return localStorage.getItem('TOKEN')
}

export const removeToken = () => {
    return localStorage.removeItem('TOKEN')
}