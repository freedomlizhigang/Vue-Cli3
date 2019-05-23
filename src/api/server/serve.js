/**
  * 天财 接口的统一出口
  */
import axiosServe from '.././tcserve'; // 导入http中创建的axiosServe实例
import qs from 'qs'; // 根据需求是否导入qs模块，把请求字段直接映射过来
import store from '../.././vuex/store'

// 接口请求地址
const api = '/c-api/';

const serve = {
    // 列表
    list (params) {
        return axiosServe.get(api + 'admin/list',{params: params})
    },
    // 添加
    create (params) {
        return axiosServe.post(api + 'admin/create',qs.stringify(params))
    },
    // 修改
    editinfo (params) {
        return axiosServe.post(api + 'admin/editinfo',qs.stringify(params))
    },
    // 修改个人资料
    selfeditinfo (params) {
        return axiosServe.post(api + 'admin/selfeditinfo',qs.stringify(params))
    },
    // 修改状态
    status (params) {
        return axiosServe.post(api + 'admin/status',qs.stringify(params))
    },
    // 删除
    remove (params) {
        return axiosServe.post(api + 'admin/remove',qs.stringify(params))
    },
    // 修改密码
    editpassword (params) {
        return axiosServe.post(api + 'admin/editpassword',qs.stringify(params))
    },
    // 个人修改密码
    selfeditpassword (params) {
        return axiosServe.post(api + 'admin/selfeditpassword',qs.stringify(params))
    },
    // 单条信息
    detail (params) {
        return axiosServe.post(api + 'admin/detail',qs.stringify(params))
    },
}


// 导出接口
export default serve