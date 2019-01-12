/**
  * 菜品 接口的统一出口
  */
import axios from '.././http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块，把请求字段直接映射过来

const api = '/c-api/';

const dish = {
    // 列表
    list(params) {
        return  axios.get(api + 'dish/list',{params:params});
    },
    // 大分类
    bigclass() {
        return  axios.get(api + 'dish/bigclass');
    },
    // 小分类
    smallclass(params) {
        return  axios.get(api + 'dish/smallclass',{params:params});
    },
}


// 导出接口
export default dish