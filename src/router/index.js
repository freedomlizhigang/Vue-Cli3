import Vue from 'vue'
import Router from 'vue-router'
import store from '.././vuex/store'
import routers from './routers'


Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: routers
});

// 导航钩子，全局钩子
router.beforeEach((to, from, next) => {
    // 登录页面
    // if (to.name === 'setting') {
    //     next();
    // }
    // // 其它页面
    // else
    // {
    //     if ((store.getters.usercode == null || store.getters.usercode == 'undefined') && to.meta.requiresAuth) {
    //         next('/setting');
    //     }
    //     else
    //     {
    //         next();
    //     }
    // }
    next();
})

export default router