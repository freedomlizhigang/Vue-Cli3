import Nofound from '.././components/Nofound.vue'
import Setting from '.././components/Setting.vue'
import Home from '.././components/Home.vue'
import Member from '.././components/Member.vue'
import Welcome from '.././components/Welcome.vue'
import Menus from '.././components/Menus.vue'
import CreateOrder from '.././components/CreateOrder.vue'

export default [
    // 首页
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    },
    // 设置
    {
      path: '/setting',
      name: 'setting',
      component: Setting,
      meta: { requiresAuth: false }
    },
    // 会员登录
    {
      path: '/member',
      name: 'member',
      component: Member,
      meta: { requiresAuth: true }
    },
    // 欢迎页
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome,
      meta: { requiresAuth: true }
    },
    // 点餐
    {
      path: '/menus',
      name: 'Menus',
      component: Menus,
      meta: { requiresAuth: true }
    },
    // 提交订单
    {
      path: '/createorder',
      name: 'CreateOrder',
      component: CreateOrder,
      meta: { requiresAuth: true }
    },
    // 其它404
    {
        path: '*',
        name: 'noaccess',
        meta: { requiresAuth: false },
        component: Nofound
    },
]