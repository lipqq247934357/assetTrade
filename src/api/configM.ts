import {post} from "./config/getData";

let basePath = '/AssetWeb'; // 资产管理平台前缀

let prefix = basePath +'/asset/pages/config';
const configM = {


    /**
     * 配置管理相关接口
     */

    /**
     * 金融产品配置
     */

    productquery(p: object) {
        return post(prefix + '/finProduct/query', p);
    },

    productqueryforUpdate(p: object) {
        return post(prefix + '/finProduct/queryForUpdate', p);
    },

    productadd(p: object) {
        return post(prefix + '/finProduct/add', p);
    },

    productupdate(p: object) {
        return post(prefix + '/finProduct/update', p);
    },


    /**
     * 渠道配置
     */

    channelquery(p: object) {
        return post(prefix + '/channel/query', p);
    },

    channeladd(p: object) {
        return post(prefix + '/channel/add', p);
    },

    channelupdate(p: object) {
        return post(prefix + '/channel/update', p);
    },


    /**
     * 资金方配置
     */

    cashproviderquery(p: object) {
        return post(prefix + '/contributive/query', p);
    },

    cashprovideradd(p: object) {
        return post(prefix + '/contributive/add', p);
    },

    cashproviderupdate(p: object) {
        return post(prefix + '/contributive/update', p);
    },

    /**
     * 拆分规则配置
     */

    splitRulesquery(p: object) {
        return post(prefix + '/assetSplit/query', p);
    },

    splitRulesadd(p: object) {
        return post(prefix + '/assetSplit/add', p);
    },

    splitRulesupdate(p: object) {
        return post(prefix + '/assetSplit/update', p);
    },


    /**
     * 资产输出模板配置
     */

    outputquery(p: object) {
        return post(prefix + '/outputTem/query', p);
    },

    outputadd(p: object) {
        return post(prefix + '/outputTem/add', p);
    },

    outputupdate(p: object) {
        return post(prefix + '/outputTem/update', p);
    },


    /**
     * 资产输出明细配置
     */

    outdetailquery(p: object) {
        return post(prefix + '/outputFile/query', p);
    },

    outdetailadd(p: object) {
        return post(prefix + '/outputFile/add', p);
    },

    outdetailupdate(p: object) {
        return post(prefix + '/outputFile/update', p);
    },


    /**
     * 字典输出查询
     * @param p
     * @returns {*}
     */

    dictQuery(p: object) {
        return post(prefix + '/dict/query', p);
    },

    //担保费汇总查询
    cpsDetail(p: object) {
        return post(basePath + '/assure/assureSummaryQuery', p);
    }

};


export default configM;
