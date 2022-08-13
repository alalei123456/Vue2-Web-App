import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
// 引入三级联动组件为全局组件
// import Typenav from '@/components/Typenav.vue'
// import Carousel from '@/components/Carousel'
// import Pagination from '@/components/Pagination'

import store from './store/index'
import 'swiper/css/swiper.css'

//设置好mock服务器后要找个入口运行
import '@/mock/mockServe'
import _ from "lodash";

//图片懒加载的配置
import dog from '@/assets/images/dog.gif'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, { loading: dog })

//引入接口API对象到vue身上
import * as API from '@/api'

//按需引入，放插件里面了
// import { MessageBox } from 'element-ui'
// 全局组件在main.js里面注册，App里面是共用的头部和尾部组件
//注册全局组件，第一个参数：组件名字；第二个参数：那个组件
// Vue.component('Typenav', Typenav)
// Vue.component('Carousel', Carousel)
// Vue.component('Pagination', Pagination)

//按需引入,放插件里面了
// Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$alert = MessageBox.alert;
// Vue.prototype.$confirm = MessageBox.confirm;
//引入自定义插件
import plugins from '@/plugins/myplugins'
//引入表单验证插件
import '@/plugins/validate'
Vue.use(plugins, {
  name: 'fbind'
})

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store,
  // 配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this,
      Vue.prototype.$API = API
  }
}).$mount('#app')
