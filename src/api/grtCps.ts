import {post} from "./config/getData";

let basePath = '/batch-guar'; // 资产管理平台前缀

let prefix = basePath + '/assure';
const grtCps = {

    // 查询担保代偿
    cpsList(p: object) {
        return post(prefix + '/compensationList', p);
    },
    // 查询担保代偿账单详情
    billsDetail(p: object) {
        return post(prefix + '/billsDetail', p);
    },
    //批量申报
    declareList(p: object) {
        return post(prefix + '/declareList', p);
    },
    //批量代偿
    assureList(p: object) {
        return post(prefix + '/assureList', p);
    },
    //获取担保费
    getAssureAmt(p: object) {
        return post(prefix + '/getGuarFees', p);
    },

    //导出
    exportExcel(p: object) {
        return post(prefix + '/download', p);
    }
};


export default grtCps;
