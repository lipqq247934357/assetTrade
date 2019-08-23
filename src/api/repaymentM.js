import {post} from "./config/getData";

let basePath = '/batch-xc'; // 还款管理平台前缀

let prefix = basePath + '/facade/menualRepay';
const configM = {


    /**
     * 逾期贷款查询
     * @param p
     * @returns {AxiosPromise<any>}
     */

    repaymentquery(p) {
        return post(prefix + '/getOverDueLoanInfo', p);
    },


    /**
     * 还款计划查询
     * @param p
     * @returns {AxiosPromise<any>}
     */

    repaymentdetail(p) {
        return post(prefix + '/queryBills', p);
    },


    /**
     * 还款明细查询
     * @param p
     * @returns {AxiosPromise<any>}
     */

    repaymentrecord(p) {
        return post(prefix + '/queryListRepay', p);
    },


    /**
     * 提前结清试算接口
     * @param p
     * @returns {AxiosPromise<any>}
     */

    prepayTrial(p) {
        return post(prefix + '/prepayTrial', p);
    },

    /**
     * 还款接口
     * @param p
     * @returns {AxiosPromise<any>}
     */

    repay(p) {
        return post(prefix + '/repayHandler', p);
    },

    /**
     * 减免接口
     * @param p
     * @returns {AxiosPromise<any>}
     */

    repayRelief(p) {
        return post(prefix + '/reliefHandler', p);
    },


    /**
     * 字典输出查询
     * @param p
     * @returns {*}
     */

    dictQuery(p) {
        return post(prefix + '/dict/query', p);
    },

};


export default configM;
