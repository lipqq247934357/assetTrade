import {post} from "./config/getData";

// 所有的不涉及具体的data的接口写到这里，统一维护

let common = {
    // 测试用
    login(p: Object) {
        return post('/login', p);
    },

    // 测试用
    getInfo(p: Object) {
        return post('/userInfo', p);
    },

    /**
     *
     * @param p
     * @returns {*}
     *
     * ticketStatus  票据状态
     * userPriv  用户信息
     * menuPrivList 菜单权限
     * buttonPrivList 按钮权限
     */

    privilegeInfo(p: Object) {
        return post('/ucenter/service/validate/ticket', p);
    }
};

export default common;
