import Vue from 'vue'
import router from './router/index'
import VueAxios from 'vue-axios'
// 样式
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
Vue.prototype.$Message.config({
	top: 200,
	duration: 3
});
// 各API接口
import dish from './api/server/dish' // 导入api接口
import client from './api/server/client' // 导入api接口
import serve from './api/server/serve' // 导入api接口
// 首页模板
import App from './components/App.vue'
// 状态管理
import store from './vuex/store'

// cordova 使用
import cordova from 'vue-cordova'
Vue.use(cordova)

Vue.config.productionTip = false
Vue.prototype.$dish = dish; // 将api挂载到vue的原型上
Vue.prototype.$client = client; // 将api挂载到vue的原型上
Vue.prototype.$serve = serve; // 将api挂载到vue的原型上

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
