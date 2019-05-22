import Vue from 'vue'
import Vuex from 'vuex'

// 用户状态
import device from './device'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    // 所有要管理的module, 都要列在这里.
    modules: {
        device
    },
    strict: debug,
    middlewares: []
})