/**
  * axios封装
  * 请求拦截、响应拦截、错误统一处理
  */
import axios from 'axios';
import router from '.././router';
import store from '.././vuex/store'
import iView from 'iview';



/**
  * 跳转登录页
  * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
  */
const toLogin = () => {
    router.replace({
        path: '/setting'
    });
}

/**
  * 请求失败后的错误统一处理
  * @param {Number} status 请求失败的状态码
  */
const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        // 404请求不存在
        case 404:
            iView.Message.error('请求的资源不存在...');
            break;

        default:
            iView.Message.error('服务器有点忙...');
    }
}

// 创建axios实例
var instance = axios.create({timeout: 1000 * 12});
// 根目录
instance.defaults.baseURL = 'http://jqdc.137idea.com:8089';
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/json';
/**
  * 请求拦截器
  * 每次请求前，如果存在token则在请求头中携带token
  */
instance.interceptors.request.use(
    config => {
        config.headers.appKey = '6b9dee28-8ee9-4e99-8a4c-15864a598b3f';
        return config;
    },
    error => Promise.error(error))

// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    res => {
        if(res.status === 200) {
            Promise.resolve(res)
            return res;
        }
        else
        {
            Promise.reject(res);
        }
    },
    // 请求失败
    error => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            iView.Message.error('请检查您的网络情况...');
        }
    });

export default instance;