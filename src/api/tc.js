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
        // 401: 未登录状态，跳转登录页
        case 401:
            store.commit('LOGOUT');
            setTimeout(() => {
                toLogin();
            }, 1000);
            break;

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
// const baseurl = store.getters.clienturl;
const baseurl = 'http://121.69.101.22:9011';
instance.defaults.baseURL = baseurl;
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/**
  * 请求拦截器
  * 每次请求前，如果存在token则在请求头中携带token
  */
instance.interceptors.request.use(
    config => {
        return config;
    },
    error => Promise.error(error))

// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    res => {
        if(res.status === 200) {
            // 状态码判断
            switch (res.data.Response.errorCode) {
                // 200 正确返回
                case 200:
                    Promise.resolve(res.data.Response)
                    break;

                default:
                    iView.Message.error(res.data.Response.Msg);
                    break;
            }
            return res.data.Response;
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