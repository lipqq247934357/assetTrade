import {post} from "./config/getData";

// 所有的不涉及具体的data的接口写到这里，统一维护

let common = {
    // 测试用
    login(p: object) {
        return post('/login', p);
    },

    // 测试用
    getInfo(p: object) {
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

    privilegeInfo(p: object) {
        return post('/ucenter/service/validate/ticket', p);
    }
};

export default common;

