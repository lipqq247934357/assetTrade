import layout from '../views/layout/Layout';
import customerInfo from '../views/dashboard';
import tzcx from '@/views/business/tzcx';


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
                component: tzcx,
                meta: {
                    title: '资产列表'
                }
            },
            {
                path: 'khxxlb',
                name: 'khxxlb',
                component: customerInfo,
                meta: {
                    title: '客户信息列表'
                }
            },
            {
                path: 'sxxxlb',
                name: 'sxxxlb',
                component: customerInfo,
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
                component: customerInfo,
                meta: {
                    title: '渠道配置'
                }
            },
            {
                path: 'zjfpz',
                name: 'zjfpz',
                component: customerInfo,
                meta: {
                    title: '资金方配置'
                }
            },
            {
                path: 'cfgzpz',
                name: 'cfgzpz',
                component: customerInfo,
                meta: {
                    title: '拆分规则配置'
                }
            },
            {
                path: 'jrcppz',
                name: 'jrcppz',
                component: customerInfo,
                meta: {
                    title: '金融产品配置'
                }
            },
            {
                path: 'zcscpz',
                name: 'zcscpz',
                component: customerInfo,
                meta: {
                    title: '资产输出配置'
                }
            },
        ],
        meta: {
            title: "配置管理"
        }
    },
    {
        path: '/yhgl',
        component: layout,
        children: [
            {
                path: 'yhxx',
                name: 'yhxx',
                component: () => import('@/views/user/manage/userInfo'),
                meta: {
                    title: '用户信息'
                }
            },
            {
                path: 'xgxx',
                name: 'xgxx',
                component: () => import('@/views/user/manage/userInfo'),
                meta: {
                    title: '修改用户信息'
                }
            }

        ],
        meta: {
            title: "用户"
        }
    },
    {
        path: '/qxgl',
        component: layout,
        children: [
            {
                path: 'registUser',
                name: 'registUser',
                component: () => import('@/views/roles/registInfo'),
                meta: {
                    title: '注册用户管理'
                }
            },
            {
                path: 'qxxg',
                name: 'qxxg',
                component: () => import('@/views/roles/registInfo'),
                meta: {
                    title: '修改权限'
                }
            }
        ],
        meta: {
            title: "权限管理"
        }
    },
    {path: '*', redirect: '/404', hidden: true}
];
