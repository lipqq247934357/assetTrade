import {post} from "./config/getData";

let basePath = '/batch-guar'; // 资产管理平台前缀

let prefix = basePath + '/assure';
const grtCps = {

    // 查询担保代偿
    cpsList(p) {
        return post(prefix + '/compensationList', p);
    },
    // 查询担保代偿账单详情
    billsDetail(p) {
        return post(prefix + '/billsDetail', p);
    },
    //批量申报
    declareList(p) {
        return post(prefix + '/declareList', p);
    },
    //批量代偿
    assureList(p) {
        return post(prefix + '/assureList', p);
    },
    //导出
    exportExcel(p) {
        return post(prefix + '/download', p);
    }
};


export default grtCps;
