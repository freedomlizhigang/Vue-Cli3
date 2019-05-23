/**
  * 菜谱后台的统一入口
  */
import axiosHttp from '.././http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块，把请求字段直接映射过来
import store from '../.././vuex/store'

// 接口请求地址
const api = '/api/';

const dish = {
    // 列表
    list (params) {
        return axiosHttp.get(api + 'admin/list',{params: params})
    },
    time (params) {
        return axiosHttp.get('/api/time')
    },
    // 获取资源包
    resource (params) {
        return axiosHttp.post(api + 'dish/getMenuItemResource',params)
    },
    // 修改
    editinfo (params) {
        return axiosHttp.post(api + 'admin/editinfo',qs.stringify(params))
    },
    // 修改个人资料
    selfeditinfo (params) {
        return axiosHttp.post(api + 'admin/selfeditinfo',qs.stringify(params))
    },
    // 修改状态
    status (params) {
        return axiosHttp.post(api + 'admin/status',qs.stringify(params))
    },
    // 删除
    remove (params) {
        return axiosHttp.post(api + 'admin/remove',qs.stringify(params))
    },
    // 修改密码
    editpassword (params) {
        return axiosHttp.post(api + 'admin/editpassword',qs.stringify(params))
    },
    // 个人修改密码
    selfeditpassword (params) {
        return axiosHttp.post(api + 'admin/selfeditpassword',qs.stringify(params))
    },
    // 单条信息
    detail (params) {
        return axiosHttp.post(api + 'admin/detail',qs.stringify(params))
    },
}


// 导出接口
export default dish