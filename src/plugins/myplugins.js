import Typenav from '@/components/Typenav.vue'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { MessageBox } from 'element-ui'
export default {
    install(Vue, options) {
        //1.全局混入配置项：定义一些组件共有的配置项
        Vue.mixin({
            methods: {
                test() {
                    console.log('全局混入方法test')
                }
            }
        })
        //2.添加vue实例方法
        Vue.prototype.$mya = function (a) {
            console.log(a)
        }
        Vue.prototype.$msgbox = MessageBox;
        Vue.prototype.$alert = MessageBox.alert;
        Vue.prototype.$confirm = MessageBox.confirm;
        //3.定义全局指令，自定义指令fbind实现v-bind
        Vue.directive(options.name, {
            bind(element, binding) {
                element.value = binding.value
            },
            inserted(element, binding) {
                element.focus()
            },
            updata(element, binding) {
                element.value = binding.value
            }
        })
        //4.全局组件
        Vue.component('Typenav', Typenav)
        Vue.component('Carousel', Carousel)
        Vue.component('Pagination', Pagination)
    }
}