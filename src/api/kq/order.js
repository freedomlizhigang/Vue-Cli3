/**
  * 门店订单 接口的统一出口
  */
import axios from '.././http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块，把请求字段直接映射过来

const api = '/c-api/';

const order = {
    // 列表
    list(params) {
        return  axios.get(api + 'order/list',{params:params});
    },
    // 具体信息
    detail(params) {
        return  axios.get(api + 'order/detail',{params:params});
    },
}


// 导出接口
export default order