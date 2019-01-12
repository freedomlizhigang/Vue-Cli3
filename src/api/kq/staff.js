/**
  * 员工 接口的统一出口
  */
import axios from '.././http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块，把请求字段直接映射过来


// 接口请求地址
const api = '/c-api/';

const staff = {
    // 列表
    list (params) {
        return axios.get(api + 'staff/list',{params: params})
    },
    // 添加
    create (params) {
        return axios.post(api + 'staff/create',qs.stringify(params))
    },
    // 修改
    editinfo (params) {
        return axios.post(api + 'staff/edit',qs.stringify(params))
    },
    // 修改状态
    status (params) {
        return axios.post(api + 'staff/status',qs.stringify(params))
    },
    // 删除
    remove (params) {
        return axios.post(api + 'staff/remove',qs.stringify(params))
    },
    // 修改密码
    editpassword (params) {
        return axios.post(api + 'staff/editpassword',qs.stringify(params))
    },
    // 单条信息
    detail (params) {
        return axios.post(api + 'staff/detail',qs.stringify(params))
    },
    // 门店信息
    stores (params) {
        return axios.post(api + 'staff/stores',qs.stringify(params))
    },
    // 更新门店信息
    updatestore(params) {
        return axios.post(api + 'staff/updatestore',qs.stringify(params))
    },
}


// 导出接口
export default staff