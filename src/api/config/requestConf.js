import {getToken} from '../../utils/auth';

export const requestConf = function (config) {
    //设置systemId
    config.headers['systemId'] = 's000008';
    //通过cookie获取token并设置token
    config.headers['ticket'] = getToken();
    //TODO 通过vuex获取buttonId和menuId

    /**
     * 1.通过config传递值处理
     *
     * 2.还是通过vuex通用处理
     *
     */

    return config;
}
