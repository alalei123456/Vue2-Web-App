//接口统一管理
// 引入二次封装后的axios(带有请求、响应时的拦截器)
import requests from "./request";
import mockrequest from '@/api/mockrequest'

// 首页三级联动的接口
export const reqCategoryList = () => requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
})
// home首页轮播图的接口
export const reqBannerList = () => mockrequest({
    url: '/banner',
    method: 'get'
})
// home首页floor的接口
export const reqFloorList = () => mockrequest({
    url: '/floor',
    method: 'get'
})

// 搜索页search的接口
export const reqSearchInfo = (params) => requests({
    url: '/list/',
    method: 'post',
    data: params
})


// 商品详情detail的接口
export const reqDetailInfo = (skuId) => requests({
    url: `/item/${skuId}`,
    method: 'get',
})

// 产品添加到购物车(对已有物品进行数量改动)
export const AddCartList = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post',
})

// 获取购物车列表的接口
export const reqCartList = () => requests({
    url: '/cart/cartList',
    method: 'get',
})
// 删除购物车选中的产品的接口
export const deleteCart = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete',
})

// 改变购物车列表商品选中状态的接口
export const updateCartchecked = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get',
})
// 请求获取注册验证码的接口
export const reqRegistercode = (phone) => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get',
})
// 用户注册的接口
export const reqUserRegister = (user) => requests({
    url: '/user/passport/register',
    method: 'post',
    data: user
})
// 用户登录的接口
export const reqUserLogin = (data) => requests({
    url: '/user/passport/login',
    method: 'post',
    data,
})

// 通过token获取用户信息
// /user/passport/auth/getUserInfo
export const reqUserInfo = () => requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get',
})

//退出登录
// / user / passport / logout
export const reqLogout = () => requests({
    url: '/user/passport/logout',
    method: 'get',
})

//获取订单交易页信息
export const reqTradeInfo = () => requests({
    url: '/order/auth/trade',
    method: 'get'
})

//获取用户地址信息
export const reqUserAddress = () => requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get'
})
// /order/auth/submitOrder?tradeNo={tradeNo}
// 获取 提交订单信息 得到的信息
export const reqOrderInfo = (tradeNo, data) => requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: 'post',
    data
})
// /payment/weixin/createNative/{orderId}
// 获取订单支付信息
export const reqPayInfo = (orderId) => requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
})

//获取订单支付的状态
// / payment / weixin / queryPayStatus / { orderId }
export const reqPayState = (orderId) => requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
})
// 获取我的订单列表
// /order/auth/{page}/{limit}
export const reqMyorder = ({ page, limit }) => requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'get'
})