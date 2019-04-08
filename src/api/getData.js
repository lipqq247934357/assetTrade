import Qs from "qs";
import axios from "axios";
import {Message} from 'element-ui';
import router from '../router';
import {requestConf} from './requestConf';
// axios 配置
axios.defaults.timeout = 6969;
if (process.env.NODE_ENV === 'development') {// 根据不同的环境使用不同的接口
    axios.defaults.baseURL = '/mock';
} else {
    axios.defaults.baseURL = '/api';
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

axios.interceptors.request.use(function (config) {
    return requestConf(config);
}, err => {
    Message.error({message: '请求超时!', duration: 5 * 1000});
    return Promise.reject(err);
});

axios.interceptors.response.use(function (response) {
    return response;
}, err => {
    if (!err.response) {
        return Promise.reject(err);
    }
    if (err.response.status === 504) {
        Message.error({message: '服务器未响应', duration: 5 * 1000});
    } else if (err.response.status === 401) {
        router.push({
            path: '/login'
        });
    } else if (err.response.status === 403) {
        Message.error({message: '您没有权限访问', duration: 5 * 1000});
    } else if (err.response.status === 404) {
        Message.error({message: '页面找不到', duration: 5 * 1000});
    } else {
        Message.error({message: '未知错误!', duration: 5 * 1000});
    }
    return Promise.reject(err);
});

export const get = (url, data = {}) => {
    let method = 'get';
    return axios({method, url, data});
}


export const post = (url, data = {}) => {
    let method = 'post';
    data = Qs.stringify(data);
    return axios({method, url, data});
}


