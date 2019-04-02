import layout from '../views/layout/Layout';
import dashboard from '../views/dashboard';

import asset from '@/views/assetM/asset';
import assetlistdetails from '@/views/assetM/asset/assetlistdetails'; // 资产列表详情

import credit from '@/views/assetM/credit';
import creditdetails from '@/views/assetM/credit/creditdetails'; // 授信详信息情

import customer from '@/views/assetM/customer';
import customerdetails from '@/views/assetM/customer/customerdetails'; // 客户详情

import channel from '@/views/configM/channel';// 渠道
import addchannel from '@/views/configM/channel/addChannel';

import cashOutput from '@/views/configM/cashOutput';
import outputDetail from '@/views/configM/cashOutput/outputDetail';
import cashProvider from '@/views/configM/cashProvider';
import product from '@/views/configM/product';
import splitRules from '@/views/configM/splitRules';


/**
 *
 * 配置说明：
 *{
 *  name:如果有name属性就会被展示在面包屑中
 *  redirect:菜单中配置redirect文件，生成的目录结构中访问的话会跳转到redirect路由中，如果配置noredirect则不执行跳转
 *  meta {
 *      title代表左侧树的名字和  如果有name属性的话访问的时候会被展示到面包屑中
 *      roles中的数组表示当前路由支持的角色，如果没有该值，那么当前路由所有角色都可以使用，否则判断用户角色是否在当前路由中，满足条件展示
 *  }
 *  hidden:如果存在hidden说明这个路由是在左侧树中不展示的
 *}
 *
 */

export default [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: layout,
        redirect: 'noredirect',
        meta: {
            title: "首页"
        }
    },

    {
        path: '/assetmanage',
        name: 'assetmanage',
        component: layout,
        redirect: 'noredirect',
        children: [

            {
                path: 'assetlist',
                name: 'assetlist',
                component: asset,
                meta: {
                    title: '资产列表'
                }
            },
            {
                path: 'assetlistdetails',
                name: 'assetlistdetails',
                hidden: true,
                component: assetlistdetails,
                meta: {
                    title: '资产列表-详情'
                },
            },
            {
                path: 'customerinfolist',
                name: 'customerinfolist',
                component: customer,
                meta: {
                    title: '客户信息列表'
                }
            },
            {
                path: 'customerdetails',
                name: 'customerdetails',
                hidden: true,
                component: customerdetails,
                meta: {
                    title: '客户信息详情'
                }
            },
            {
                path: 'creditdetails',
                name: 'creditdetails',
                hidden: true,
                component: creditdetails,
                meta: {
                    title: '授权信息详情'
                }
            },
            {
                path: 'authorizationinfolist',
                name: 'authorizationinfolist',
                component: credit,
                meta: {
                    title: '授信信息列表'
                }
            },
        ],
        meta: {
            title: "资产管理"
        }
    },
    {
        path: '/configm',
        name: 'configm',
        component: layout,
        redirect: 'noredirect',
        children: [
            {
                path: 'channelconfig',
                name: 'channelconfig',
                component: channel,
                meta: {
                    title: '渠道配置'
                }
            },
            {
                path: 'addchannel',
                name: 'addchannel',
                hidden: true,
                component: addchannel,
                meta: {
                    title: '渠道配置'
                }
            },
            {
                path: 'updatechannel',
                name: 'updatechannel',
                hidden: true,
                component: addchannel,
                meta: {
                    title: '渠道配置'
                }
            },
            {
                path: 'cashprovider',
                name: 'cashprovider',
                component: cashProvider,
                meta: {
                    title: '资金方配置'
                }
            },
            {
                path: 'splitrules',
                name: 'splitrules',
                component: splitRules,
                meta: {
                    title: '拆分规则配置'
                }
            },
            {
                path: 'productconfig',
                name: 'productconfig',
                component: product,
                meta: {
                    title: '金融产品配置'
                }
            },
            {
                path: 'cashoutput',
                name: 'cashoutput',
                component: cashOutput,
                meta: {
                    title: '资产输出配置'
                }
            },
            {
                path: 'outputDetail',
                name: 'outputDetail',
                hidden: true,
                component: outputDetail,
                meta: {
                    title: '模板明细配置'
                }
            },
        ],
        meta: {
            title: "配置管理"
        }
    },
    {path: '*', redirect: '/404', hidden: true}
];
