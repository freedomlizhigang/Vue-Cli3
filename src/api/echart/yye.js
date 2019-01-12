/**
  * 用户角色 接口的统一出口
  */
import axios from '.././http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块，把请求字段直接映射过来


// 接口请求地址
const api = '/c-api/echart/';

const yye = {
    // 菜品标签排行
    d1009 (params) {
        return axios.post(api + 'dish1009',qs.stringify(params))
    },
    // 菜品评价排行
    d1008 (params) {
        return axios.post(api + 'dish1008',qs.stringify(params))
    },
    // 总体解决方案及占比
    s1007 (params) {
        return axios.post(api + 'solution1007',qs.stringify(params))
    },
    // 环境标签及占比/解决方案
    p1006 (params) {
        return axios.post(api + 'problem1006',qs.stringify(params))
    },
    // 服务标签及占比/解决方案
    p1005 (params) {
        return axios.post(api + 'problem1005',qs.stringify(params))
    },
    // 男女老少与用餐性质比例、会员非会员比例、新老客比例
    c1004 (params) {
        return axios.post(api + 'customer1004',qs.stringify(params))
    },
    // 菜品分类排行
    d1003 (params) {
        return axios.post(api + 'dish1003',qs.stringify(params))
    },
    // 各门店营业额情况
    a1001 (params) {
        return axios.post(api + 'yye1001',qs.stringify(params))
    },
    // 各门店营业额趋势
    a1002 (params) {
        return axios.post(api + 'yye1002',qs.stringify(params))
    },
}


// 导出接口
export default yye