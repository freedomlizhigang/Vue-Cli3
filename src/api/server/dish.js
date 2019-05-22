/**
  * 菜谱后台的统一入口
  */
import axios from '.././http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块，把请求字段直接映射过来
import store from '../.././vuex/store'

// 接口请求地址
const api = '/c-api/';

const dish = {
    // 列表
    list (params) {
        return axios.get(api + 'admin/list',{params: params})
    },
    time (params) {
        return axios.get('/api/time')
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
export default dish