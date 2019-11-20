import {post} from "./config/getData";

let basePath = '/AssetWeb'; // 资产管理平台前缀

let prefix = basePath + '/asset/pages/config';
const configM = {


    /**
     * 配置管理相关接口
     */

    /**
     * 金融产品配置
     */

    productquery(p: Object) {
        return post(prefix + '/finProduct/query', p);
    },

    productqueryforUpdate(p: Object) {
        return post(prefix + '/finProduct/queryForUpdate', p);
    },

    productadd(p: Object) {
        return post(prefix + '/finProduct/add', p);
    },

    productupdate(p: Object) {
        return post(prefix + '/finProduct/update', p);
    },


    /**
     * 渠道配置
     */

    channelquery(p: Object) {
        return post(prefix + '/channel/query', p);
    },

    channeladd(p: Object) {
        return post(prefix + '/channel/add', p);
    },

    channelupdate(p: Object) {
        return post(prefix + '/channel/update', p);
    },


    /**
     * 资金方配置
     */

    cashproviderquery(p: Object) {
        return post(prefix + '/contributive/query', p);
    },

    cashprovideradd(p: Object) {
        return post(prefix + '/contributive/add', p);
    },

    cashproviderupdate(p: Object) {
        return post(prefix + '/contributive/update', p);
    },

    /**
     * 拆分规则配置
     */

    splitRulesquery(p: Object) {
        return post(prefix + '/assetSplit/query', p);
    },

    splitRulesadd(p: Object) {
        return post(prefix + '/assetSplit/add', p);
    },

    splitRulesupdate(p: Object) {
        return post(prefix + '/assetSplit/update', p);
    },


    /**
     * 资产输出模板配置
     */

    outputquery(p: Object) {
        return post(prefix + '/outputTem/query', p);
    },

    outputadd(p: Object) {
        return post(prefix + '/outputTem/add', p);
    },

    outputupdate(p: Object) {
        return post(prefix + '/outputTem/update', p);
    },


    /**
     * 资产输出明细配置
     */

    outdetailquery(p: Object) {
        return post(prefix + '/outputFile/query', p);
    },

    outdetailadd(p: Object) {
        return post(prefix + '/outputFile/add', p);
    },

    outdetailupdate(p: Object) {
        return post(prefix + '/outputFile/update', p);
    },


    /**
     * 字典输出查询
     * @param p
     * @returns {*}
     */

    dictQuery(p: Object) {
        return post(prefix + '/dict/query', p);
    },

    //担保费汇总查询
    cpsDetail(p: Object) {
        return post(basePath + '/assure/assureSummaryQuery', p);
    }

};


export default configM;
