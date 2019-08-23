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

    productquery(p) {
        return post(prefix + '/finProduct/query', p);
    },

    productadd(p) {
        return post(prefix + '/finProduct/add', p);
    },

    productupdate(p) {
        return post(prefix + '/finProduct/update', p);
    },


    /**
     * 渠道配置
     */

    channelquery(p) {
        return post(prefix + '/channel/query', p);
    },

    channeladd(p) {
        return post(prefix + '/channel/add', p);
    },

    channelupdate(p) {
        return post(prefix + '/channel/update', p);
    },


    /**
     * 资金方配置
     */

    cashproviderquery(p) {
        return post(prefix + '/contributive/query', p);
    },

    cashprovideradd(p) {
        return post(prefix + '/contributive/add', p);
    },

    cashproviderupdate(p) {
        return post(prefix + '/contributive/update', p);
    },

    /**
     * 拆分规则配置
     */

    splitRulesquery(p) {
        return post(prefix + '/assetSplit/query', p);
    },

    splitRulesadd(p) {
        return post(prefix + '/assetSplit/add', p);
    },

    splitRulesupdate(p) {
        return post(prefix + '/assetSplit/update', p);
    },


    /**
     * 资产输出模板配置
     */

    outputquery(p) {
        return post(prefix + '/outputTem/query', p);
    },

    outputadd(p) {
        return post(prefix + '/outputTem/add', p);
    },

    outputupdate(p) {
        return post(prefix + '/outputTem/update', p);
    },


    /**
     * 资产输出明细配置
     */

    outdetailquery(p) {
        return post(prefix + '/outputFile/query', p);
    },

    outdetailadd(p) {
        return post(prefix + '/outputFile/add', p);
    },

    outdetailupdate(p) {
        return post(prefix + '/outputFile/update', p);
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
