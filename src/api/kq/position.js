/**
  * 用户角色 接口的统一出口
  */
import axios from '.././http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块，把请求字段直接映射过来


// 接口请求地址
const api = '/c-api/';

const position = {
    // 列表
    list (params) {
        return axios.get(api + 'position/list',{params: params})
    },
    // 添加
    create (params) {
        return axios.post(api + 'position/create',qs.stringify(params))
    },
    // 修改
    edit (params) {
        return axios.post(api + 'position/edit',qs.stringify(params))
    },
    // 修改状态
    status (params) {
        return axios.post(api + 'position/status',qs.stringify(params))
    },
    // 删除
    remove (params) {
        return axios.post(api + 'position/remove',qs.stringify(params))
    },
    // 权限列表
    detail (params) {
        return axios.post(api + 'position/detail',qs.stringify(params))
    },
    // 权限列表
    priv (params) {
        return axios.get(api + 'position/permission',{params: params})
    },
    // 更新权限
    updatepriv (params) {
        return axios.post(api + 'position/permission',qs.stringify(params))
    },
}


// 导出接口
export default position