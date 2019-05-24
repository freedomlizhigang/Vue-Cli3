import { MENUS,REMOVEMENUS } from './mutation_types'

// localStorage 保存数据时间更久，不会因为关闭标签而丢失

const state = {
    menus: localStorage.getItem("menus") || null
}

const getters = {
    menus: state => {
        return state.menus
    }
}

const mutations = {
    [MENUS](state,data){
        localStorage.setItem("menus",data.menus);
        state.menus = data.menus;
    },
    [REMOVEMENUS](state){
        localStorage.removeItem("menus");  //移除localStorage
        state.menus = null
    }
}

export default {
    state,
    mutations,
    getters
}