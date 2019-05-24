/**
  * 天财 接口的统一出口
  */
import axios from '.././tc'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块，把请求字段直接映射过来
import store from '../.././vuex/store'
import cmd5 from '.././cmd5'

const client = {
    // 列表
    link (params) {
        let jsonObj = cmd5.paramsMd5(params);
        return axios.post('/LINK',JSON.stringify(jsonObj))
    },
    // 登录
    sjdl (params) {
        let jsonObj = cmd5.paramsMd5(params);
        return axios.post('/SJDL',JSON.stringify(jsonObj))
    },
    // 区域
    area () {
        let params = {};
        let jsonObj = cmd5.paramsMd5(params);
        return axios.post('/AREA',JSON.stringify(jsonObj))
    },
    // 制作方法
    mo () {
        let params = {};
        let jsonObj = cmd5.paramsMd5(params);
        return axios.post('/MO',JSON.stringify(jsonObj))
    },
}

// 导出接口
export default client