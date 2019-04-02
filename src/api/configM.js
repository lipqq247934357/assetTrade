import {get, post} from "./getData";


/**
 * 配置管理相关接口
 */

//金融产品配置

let prefix = '/asset/pages/config';

export const productquery = (prodNo, prodName, channelNo, pageNum, pageSize) => {
    return post(prefix + '/finProduct/query', {prodNo, prodName, channelNo, pageNum, pageSize});
};

export const productadd = (prodNo, prodName, prodDesc, useYn, inputUser) => {
    return post(prefix + '/finProduct/add', {prodNo, prodName, prodDesc, useYn, inputUser});
};

export const productupdate = (prodNo, prodName, prodDesc, useYn, updateUser) => {
    return post(prefix + '/finProduct/update', {prodNo, prodName, prodDesc, useYn, updateUser});
};


//渠道配置

export const channelquery = (channelNo, channelName, pageNum, pageSize) => {
    return post(prefix + '/channel/query', {channelNo, channelName, pageNum, pageSize});
};

export const channeladd = (channelNo, channelName, channelType, useYn, inputUser) => {
    return post(prefix + '/channel/add', {channelNo, channelName, channelType, useYn, inputUser});
};

export const channelupdate = (channelNo, channelName, channelType, useYn, inputUser) => {
    return post(prefix + '/channel/update', {channelNo, channelName, channelType, useYn, inputUser});
};


//资金方配置

export const cashproviderquery = (contributiveNo, contributiveName, pageNum, pageSize) => {
    return post(prefix + '/contributive/query', {contributiveNo, contributiveName, pageNum, pageSize});
};

export const cashprovideradd = (contributiveNo, contributiveName, outputTemNo, useYn, inputUser) => {
    return post(prefix + '/contributive/add', {
        contributiveNo,
        contributiveName,
        outputTemNo,
        useYn,
        inputUser
    });
};

export const cashproviderupdate = (contributiveNo, contributiveName, outputTemNo, useYn, inputUser) => {
    return post(prefix + '/contributive/update', {
        contributiveNo,
        contributiveName,
        outputTemNo,
        useYn,
        inputUser
    });
};

//拆分规则配置

export const splitRulesquery = (assetSplitWay, pageNum, pageSize) => {
    return post(prefix + '/assetSplit/query', {assetSplitWay, pageNum, pageSize});
};

export const splitRulesadd = (assetSplitWay, assetSplitValue, contributiveNo, useYn, inputUser) => {
    return post(prefix + '/assetSplit/add', {
        assetSplitWay,
        assetSplitValue,
        contributiveNo,
        useYn,
        inputUser
    });
};

export const splitRulesupdate = (assetSplitWay, assetSplitValue, contributiveNo, useYn, inputUser) => {
    return post(prefix + '/assetSplit/update', {
        assetSplitWay,
        assetSplitValue,
        contributiveNo,
        useYn,
        inputUser
    });
};


//资产输出模板配置

export const outputquery = (outputTemName, pageNum, pageSize) => {
    return post(prefix + '/outputTem/query', {outputTemName, pageNum, pageSize});
};

export const outputadd = (outputTemName, useYn, inputUser) => {
    return post(prefix + '/outputTem/add', {outputTemName, useYn, inputUser});
};

export const outputupdate = (outputTemName, useYn, inputUser) => {
    return post(prefix + '/outputTem/query', {outputTemName, useYn, inputUser});
};


//资产输出明细配置

export const outdetailquery = (outputTemName, pageNum, pageSize) => {
    return post(prefix + '/outputFile/query', {outputTemName, pageNum, pageSize});
};

export const outdetailadd = (outputTemName, useYn, inputUser) => {
    return post(prefix + '/outputFile/add', {outputTemName, useYn, inputUser});
};

export const outdetailupdate = (outputTemName, useYn, inputUser) => {
    return post(prefix + '/outputFile/udpate', {outputTemName, useYn, inputUser});
};
