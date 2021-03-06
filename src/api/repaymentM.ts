import {post} from "./config/getData";

let basePath = '/batch-xc'; // 还款管理平台前缀

let prefix = basePath + '/facade/menualRepay';
const configM = {


    /**
     * 逾期贷款查询
     * @param p
     * @returns {AxiosPromise<any>}
     */

    repaymentquery(p: object) {
        return post(prefix + '/getOverDueLoanInfo', p);
    },


    /**
     * 还款计划查询
     * @param p
     * @returns {AxiosPromise<any>}
     */

    repaymentdetail(p: object) {
        return post(prefix + '/queryBills', p);
    },


    /**
     * 还款明细查询
     * @param p
     * @returns {AxiosPromise<any>}
     */

    repaymentrecord(p: object) {
        return post(prefix + '/queryListRepay', p);
    },


    /**
     * 提前结清试算接口
     * @param p
     * @returns {AxiosPromise<any>}
     */

    prepayTrial(p: object) {
        return post(prefix + '/prepayTrial', p);
    },

    /**
     * 还款接口
     * @param p
     * @returns {AxiosPromise<any>}
     */

    repay(p: object) {
        return post(prefix + '/repayHandler', p);
    },

    /**
     * 减免接口
     * @param p
     * @returns {AxiosPromise<any>}
     */

    repayRelief(p: object) {
        return post(prefix + '/reliefHandler', p);
    },


    /**
     * 字典输出查询
     * @param p
     * @returns {*}
     */

    dictQuery(p: object) {
        return post(prefix + '/dict/query', p);
    },

};


export default configM;
