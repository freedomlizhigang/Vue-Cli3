/**
  * 用户角色 接口的统一出口
  */
import axios from '.././http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块，把请求字段直接映射过来


// 接口请求地址
const api = '/c-api/';

const problem = {
    // 标签列表
    taglist (params) {
        return axios.get(api + 'tags/list',{params: params})
    },
    // 标签添加
    tagcreate (params) {
        return axios.post(api + 'tags/create',qs.stringify(params))
    },
    // 标签修改
    tagedit (params) {
        return axios.post(api + 'tags/edit',qs.stringify(params))
    },
    // 标签查看
    tagdetail (params) {
        return axios.post(api + 'tags/detail',qs.stringify(params))
    },
    // 标签删除
    tagremove (params) {
        return axios.post(api + 'tags/remove',qs.stringify(params))
    },
    // 解决方案列表
    solutionlist (params) {
        return axios.get(api + 'solution/list',{params: params})
    },
    // 解决方案添加
    solutioncreate (params) {
        return axios.post(api + 'solution/create',qs.stringify(params))
    },
    // 解决方案修改
    solutionedit (params) {
        return axios.post(api + 'solution/edit',qs.stringify(params))
    },
    // 解决方案查看
    solutiondetail (params) {
        return axios.post(api + 'solution/detail',qs.stringify(params))
    },
    // 解决方案删除
    solutionremove (params) {
        return axios.post(api + 'solution/remove',qs.stringify(params))
    },
    // 其它问题列表
    otherlist (params) {
        return axios.get(api + 'other/list',{params: params})
    },
    // 其它问题添加
    othercreate (params) {
        return axios.post(api + 'other/create',qs.stringify(params))
    },
    // 其它问题修改
    otheredit (params) {
        return axios.post(api + 'other/edit',qs.stringify(params))
    },
    // 其它问题查看
    otherdetail (params) {
        return axios.post(api + 'other/detail',qs.stringify(params))
    },
    // 其它问题删除
    otherremove (params) {
        return axios.post(api + 'other/remove',qs.stringify(params))
    },
    // 答案列表
    answerlist (params) {
        return axios.get(api + 'answer/list',{params: params})
    },
    // 答案添加
    answercreate (params) {
        return axios.post(api + 'answer/create',qs.stringify(params))
    },
    // 答案修改
    answeredit (params) {
        return axios.post(api + 'answer/edit',qs.stringify(params))
    },
    // 答案查看
    answerdetail (params) {
        return axios.post(api + 'answer/detail',qs.stringify(params))
    },
    // 答案删除
    answerremove (params) {
        return axios.post(api + 'answer/remove',qs.stringify(params))
    },
}


// 导出接口
export default problem