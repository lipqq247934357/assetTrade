import {post} from "./config/getData";

// 所有的不涉及具体的data的接口写到这里，统一维护

let common = {
    login(p) {
        return post('/login', p);
    },

    getInfo(p) {
        return post('/userInfo', p);
    },

    getRoles(p) {
        return post('/getRoles', p);
    },

    // 获取用户所有权限和用户个人信息
    privilegeInfo(p) {
        return post('/service/validate/ticket', p);
    },

    // 业务异常接口
    flowError() {
        return post('/flowError');
    },

    // 系统异常接口
    systemError() {
        return post('/systemError');
    }
};


