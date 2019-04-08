import {getToken} from '../utils/auth';

export const requestConf = function (config) {
    //设置systemId
    config.headers['systemId'] = '12';
    //通过cookie获取token并设置token
    config.headers['ticket'] = getToken();
    //TODO 通过vuex获取buttonId和menuId
    return config;
}
