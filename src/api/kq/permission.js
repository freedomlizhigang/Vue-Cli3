/**
  * 权限菜单 接口的统一出口
  */
import axios from '.././http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块，把请求字段直接映射过来


// 接口请求地址
const api = '/c-api/';

const permission = {
    // 列表
    list () {
        return axios.get(api + 'permission/list')
    },
    // 树形列表
    tree () {
        return axios.get(api + 'permission/tree')
    },
    // 下拉菜单
    select () {
        return axios.get(api + 'permission/select')
    },
    // 左侧菜单
    left () {
        return axios.get(api + 'permission/list')
    },
    // 添加
    create (params) {
        return axios.post(api + 'permission/create',qs.stringify(params))
    },
    // 修改
    edit (params) {
        return axios.post(api + 'permission/edit',qs.stringify(params))
    },
    // 单个查看
    detail (params) {
        return axios.post(api + 'permission/detail',qs.stringify(params))
    },
    // 删除
    remove (params) {
        return axios.post(api + 'permission/remove',qs.stringify(params))
    },
}


// 导出接口
export default permission