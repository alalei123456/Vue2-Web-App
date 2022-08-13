// 重写axios,对axios二次封装
import axios from "axios";
import nprogress from 'nprogress';
//引入进度条样式
import "nprogress/nprogress.css";
import store from '@/store'
// 1.利用axios对象的方法create
//  request就是axios，只不过稍微配置一下
const requests = axios.create({
    //基础路径，requests发出请求时，默认在端口号后面会跟baseURl
    baseURL: '/api',
    // 代表请求超时时间
    timeout: 200000,
})
// 以下可参考相关文档
//2、配置请求拦截器：在请求发出去之前 做一些事情
requests.interceptors.request.use((config) => {
    //config：配置对象：对象里面有一个属性很重要，请求头headers
    if (store.state.detail.uuid_token) {
        // 给请求头添加一个字段，和后台商量的
        config.headers.userTempId = store.state.detail.uuid_token
    }
    //请求头需要携带token带给服务器
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    nprogress.start();
    return config;
})
// //3、配置响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数
    // nprogress.done()
    //返回res的data字段
    return res.data;
}, (error) => {
    //失败的回调函数
    console.log("响应失败" + error)
    return Promise.reject(new Error('fail'))
})
//4、对外暴露
export default requests;
