import { DEVICE,REMOVE } from './mutation_types'

// localStorage 保存数据时间更久，不会因为关闭标签而丢失

const state = {
    uuid: localStorage.getItem("uuid") == 'undefined' ? null : localStorage.getItem("uuid"),
    devicecode: localStorage.getItem("devicecode") == 'undefined' ? null : localStorage.getItem("devicecode"),
    cropcode: localStorage.getItem("cropcode") == 'undefined' ? '0000' : localStorage.getItem("cropcode"),
    clienturl: localStorage.getItem("clienturl") == 'undefined' ? null : localStorage.getItem("clienturl"),
    serveurl: localStorage.getItem("serveurl") == 'undefined' ? null : localStorage.getItem("serveurl"),
}

const getters = {
    uuid: state => {
        return state.uuid
    },
    devicecode: state => {
        return state.devicecode
    },
    cropcode: state => {
        return state.cropcode
    },
    clienturl: state => {
        return state.clienturl
    },
    serveurl: state => {
        return state.serveurl
    },
}

const mutations = {
    [DEVICE](state,data){
        if (data.uuid != 'undefined') {
            localStorage.setItem("uuid",data.uuid);
            state.uuid = data.uuid;
        }
        if (data.uuid != 'undefined') {
            localStorage.setItem("devicecode",data.devicecode);
            state.devicecode = data.devicecode;
        }
        if (data.uuid != 'undefined') {
            localStorage.setItem("cropcode",data.cropcode);
            state.cropcode = data.cropcode;
        }
        if (data.uuid != 'undefined') {
            localStorage.setItem("clienturl",data.clienturl);
            state.clienturl = data.clienturl;
        }
        if (data.uuid != 'undefined') {
            localStorage.setItem("serveurl",data.serveurl);
            state.serveurl = data.serveurl;
        }
    },
    [REMOVE](state){
        localStorage.removeItem("uuid");  //移除localStorage
        localStorage.removeItem("devicecode");
        localStorage.removeItem("cropcode");
        localStorage.removeItem("clienturl");
        localStorage.removeItem("serveurl");
        state.uuid = null
        state.devicecode = null;
        state.cropcode = '0000';
        state.clienturl = null;
        state.serveurl = null;
    }
}

export default {
    state,
    mutations,
    getters
}