import Vue from 'vue'
import router from './router/index'
import VueAxios from 'vue-axios'
// 样式
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
// 各API接口
import api from './api/api' // 导入api接口
// 首页模板
import App from './components/App.vue'
// 状态管理
import store from './vuex/store'

// cordova 使用
import VueCordova from 'vue-cordova'
Vue.use(VueCordova)

Vue.config.productionTip = false
Vue.prototype.$api = api; // 将api挂载到vue的原型上

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')