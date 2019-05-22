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
    // 添加
    create (params) {
        return axios.post(api + 'admin/create',qs.stringify(params))
    },
    // 修改
    editinfo (params) {
        return axios.post(api + 'admin/editinfo',qs.stringify(params))
    },
    // 修改个人资料
    selfeditinfo (params) {
        return axios.post(api + 'admin/selfeditinfo',qs.stringify(params))
    },
    // 修改状态
    status (params) {
        return axios.post(api + 'admin/status',qs.stringify(params))
    },
    // 删除
    remove (params) {
        return axios.post(api + 'admin/remove',qs.stringify(params))
    },
    // 修改密码
    editpassword (params) {
        return axios.post(api + 'admin/editpassword',qs.stringify(params))
    },
    // 个人修改密码
    selfeditpassword (params) {
        return axios.post(api + 'admin/selfeditpassword',qs.stringify(params))
    },
    // 单条信息
    detail (params) {
        return axios.post(api + 'admin/detail',qs.stringify(params))
    },
}

// 导出接口
export default client