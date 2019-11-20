import layout from '../views/layout/Layout';
/**
 * 资产管理
 */
// 资产
import asset from '@/views/assetM/asset';
import assetlistdetail from '@/views/assetM/asset/assetlistdetail';
//客户信息
import customer from '@/views/assetM/customer';
import customerdetail from '@/views/assetM/customer/customerdetail';
//授权信息
import credit from '@/views/assetM/credit';
import creditdetail from '@/views/assetM/credit/creditdetail';

import payoff from '@/views/assetM/payoff/index';

/**
 * 配置管理
 */
//渠道配置
import channel from '@/views/configM/channel';// 渠道
import editChannel from '@/views/configM/channel/editChannel';
//资金方配置
import cashProvider from '@/views/configM/cashProvider';
import editCashProvider from '@/views/configM/cashProvider/editCashProvider';
//拆分规则配置
import product from '@/views/configM/product';
import editProduct from '@/views/configM/product/editProduct';
//金融产品配置
import splitRules from '@/views/configM/splitRules';
import editSplitRules from '@/views/configM/splitRules/editSplitRules';
//资产输出配置
import cashOutput from '@/views/configM/cashOutput';
import editCashOutput from '@/views/configM/cashOutput/editCashOutput';
//资产输出明细配置
import outputDetail from '@/views/configM/cashOutput/outputDetail';
//短信配置
import sms from '@/views/configM/sms/index';
import editSms from '@/views/configM/sms/editSms';



/**
 * 还款管理
 */

import repaymentList from '@/views/repaymentM/index';
import repaymentDetail from '@/views/repaymentM/detail';
import repaymentRecordList from '@/views/repaymentM/recordList';

/**
 *
 * 担保代偿管理
 *
 */
import grtCpslist from '@/views/grtCpsM/grtCps/index';
import grtDetail from '@/views/grtCpsM/grtCps/grtdetail';
import grtFee from '@/views/grtCpsM/grtF/index';



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
 *  注:这个方法在使用后端传过来的树结构之后只是面包屑使用这套语法，左侧树不走这套了
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
                path: 'assetlistdetail',
                name: 'assetlistdetail',
                hidden: true,
                component: assetlistdetail,
                meta: {
                    title: '资产列表详情'
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
                path: 'customerdetail',
                name: 'customerdetail',
                hidden: true,
                component: customerdetail,
                meta: {
                    title: '客户信息详情'
                }
            },
            {
                path: 'creditdetail',
                name: 'creditdetail',
                hidden: true,
                component: creditdetail,
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
            {
                path: 'payofflist',
                name: 'payofflist',
                component: payoff,
                meta: {
                    title: '资产结清列表'
                }
            }

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
                path: 'channel',
                name: 'channel',
                component: channel,
                meta: {
                    title: '渠道配置'
                }
            },
            {
                path: 'addchannel',
                name: 'addchannel',
                hidden: true,
                component: editChannel,
                meta: {
                    title: '渠道配置'
                }
            },
            {
                path: 'updatechannel',
                name: 'updatechannel',
                hidden: true,
                component: editChannel,
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
                path: 'addprovider',
                name: 'addprovider',
                hidden: true,
                component: editCashProvider,
                meta: {
                    title: '资金方配置'
                }
            },
            {
                path: 'updateprovider',
                name: 'updateprovider',
                hidden: true,
                component: editCashProvider,
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
                path: 'addsplitrules',
                name: 'addsplitrules',
                hidden: true,
                component: editSplitRules,
                meta: {
                    title: '拆分规则配置'
                }
            },
            {
                path: 'updatesplitrules',
                name: 'updatesplitrules',
                hidden: true,
                component: editSplitRules,
                meta: {
                    title: '拆分规则配置'
                }
            },
            {
                path: 'product',
                name: 'product',
                component: product,
                meta: {
                    title: '金融产品配置'
                }
            },
            {
                path: 'addproduct',
                name: 'addproduct',
                hidden: true,
                component: editProduct,
                meta: {
                    title: '金融产品配置'
                }
            },
            {
                path: 'updateproduct',
                name: 'updateproduct',
                hidden: true,
                component: editProduct,
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
                path: 'addcashoutput',
                name: 'addcashoutput',
                hidden: true,
                component: editCashOutput,
                meta: {
                    title: '资产输出配置'
                }
            },
            {
                path: 'updatecashoutput',
                name: 'updatecashoutput',
                hidden: true,
                component: editCashOutput,
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
            {
                path: 'sms',
                name: 'sms',
                hidden: true,
                component: sms,
                meta: {
                    title: '短信配置'
                }
            },
            {
                path: 'updateSms',
                name: 'updateSms',
                hidden: true,
                component: editSms,
                meta: {
                    title: '短信配置'
                }
            }
        ],
        meta: {
            title: "配置管理"
        }
    },
    {
        path: '/repayment',
        name: 'repayment',
        component: layout,
        redirect: 'noredirect',
        children: [
            {
                path: 'list',
                name: 'repaymentlist',
                component: repaymentList,
                meta: {
                    title: '还款管理'
                }
            },
            {
                path: 'detail',
                name: 'repaymentdetail',
                component: repaymentDetail,
                meta: {
                    title: '还款详情'
                }
            },
            {
                path: 'recordlist',
                name: 'repaymentrecordlist',
                component: repaymentRecordList,
                meta: {
                    title: '还款明细'
                }
            }
        ],
        meta: {
            title: "还款管理"
        }
    },
    {
        path: '/guaranteeM',
        name: 'guaranteeM',
        component: layout,
        redirect: 'noredirect',
        children: [
            {
                path: 'list',
                name: 'grtlist',
                component: grtCpslist,
                meta: {
                    title: '担保代偿'
                }
            },
            {
                path: 'detail',
                name: 'grtDetail',
                component: grtDetail,
                meta: {
                    title: '担保代偿'
                }
            },
            {
                path: 'fee',
                name: 'grtdetail',
                component: grtFee,
                meta: {
                    title: '担保费汇总查询'
                }
            },
        ],
        meta: {
            title: "担保代偿管理"
        }
    },
    {path: '*', redirect: '/404', hidden: true}
];
