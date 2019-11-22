import {post} from "./config/getData";

let basePath = '/AssetWeb'; // 资产管理平台前缀

let prefix = basePath + '/list';
const assetM = {

    // 查询资产列表
    assetList(p: object) {
        return post(prefix + '/queryAssetList', p);
    },
    // 查询资产详情
    assetDetail(p: object) {
        return post(prefix + '/queryAssetDetail', p);
    },

    customerList(p: object) {
        return post(prefix + '/queryCustomerInfoList', p);
    },
    customerDetail(p: object) {
        return post(prefix + '/queryCustomerInfoDetail', p);
    },

    creditList(p: object) {
        return post(prefix + '/queryApplyCreditist', p);
    },
    creditDetail(p: object) {
        return post(prefix + '/queryApplyCreditInfoDetail', p);
    },
    assetPayoffList(p: object) {
        return post(prefix + '/queryAssetPayoffList', p);
    }
};


export default assetM;
