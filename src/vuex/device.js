import { DEVICE,REMOVE } from './mutation_types'

// localStorage 保存数据时间更久，不会因为关闭标签而丢失

const state = {
    uuid: localStorage.getItem("uuid") || null,
    usercode: localStorage.getItem("usercode") || null,
    devicecode: localStorage.getItem("devicecode") || null,
    cropcode: localStorage.getItem("cropcode") || '0000',
    clienturl: localStorage.getItem("clienturl") || null,
    serveurl: localStorage.getItem("serveurl") || null,
}

const getters = {
    uuid: state => {
        return state.uuid
    },
    usercode: state => {
        return state.usercode
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
        if (data.uuid != undefined) {
            localStorage.setItem("uuid",data.uuid);
            state.uuid = data.uuid;
        }
        if (data.usercode != undefined) {
            localStorage.setItem("usercode",data.usercode);
            state.usercode = data.usercode;
        }
        if (data.devicecode != undefined) {
            localStorage.setItem("devicecode",data.devicecode);
            state.devicecode = data.devicecode;
        }
        if (data.cropcode != undefined) {
            localStorage.setItem("cropcode",data.cropcode);
            state.cropcode = data.cropcode;
        }
        if (data.clienturl != undefined) {
            localStorage.setItem("clienturl",data.clienturl);
            state.clienturl = data.clienturl;
        }
        if (data.serveurl != undefined) {
            localStorage.setItem("serveurl",data.serveurl);
            state.serveurl = data.serveurl;
        }
    },
    [REMOVE](state){
        localStorage.removeItem("uuid");  //移除localStorage
        localStorage.removeItem("usercode");
        localStorage.removeItem("devicecode");
        localStorage.removeItem("cropcode");
        localStorage.removeItem("clienturl");
        localStorage.removeItem("serveurl");
        state.uuid = null
        state.usercode = null
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