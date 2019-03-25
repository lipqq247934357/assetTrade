import layout from '../views/layout/Layout';
import dashboard from '../views/dashboard';
import asset from '@/views/assetM/asset';
import credit from '@/views/assetM/credit';
import customer from '@/views/assetM/customer';
import cashOutput from '@/views/configM/cashOutput';
import cashProvider from '@/views/configM/cashProvider';
import channel from '@/views/configM/channel';
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
        path: '/zcgl',
        name: 'zcgl',
        component: layout,
        redirect: 'noredirect',
        children: [

            {
                path: 'zclb',
                name: 'zclb',
                component: asset,
                meta: {
                    title: '资产列表'
                }
            },
            {
                path: 'khxxlb',
                name: 'khxxlb',
                component: customer,
                meta: {
                    title: '客户信息列表'
                }
            },
            {
                path: 'sxxxlb',
                name: 'sxxxlb',
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
        path: '/pzgl',
        name: 'pzgl',
        component: layout,
        redirect: 'noredirect',
        children: [
            {
                path: 'qdpz',
                name: 'qdpz',
                component: channel,
                meta: {
                    title: '渠道配置'
                }
            },
            {
                path: 'zjfpz',
                name: 'zjfpz',
                component: cashProvider,
                meta: {
                    title: '资金方配置'
                }
            },
            {
                path: 'cfgzpz',
                name: 'cfgzpz',
                component: splitRules,
                meta: {
                    title: '拆分规则配置'
                }
            },
            {
                path: 'jrcppz',
                name: 'jrcppz',
                component: product,
                meta: {
                    title: '金融产品配置'
                }
            },
            {
                path: 'zcscpz',
                name: 'zcscpz',
                component: cashOutput,
                meta: {
                    title: '资产输出配置'
                }
            },
        ],
        meta: {
            title: "配置管理"
        }
    },
    {path: '*', redirect: '/404', hidden: true}
];
