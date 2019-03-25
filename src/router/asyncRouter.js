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
        path: '/ywtjcx',
        name: 'ywtjcx',
        component: layout,
        redirect: 'noredirect',
        children: [

            {
                path: 'tzcx',
                name: 'tzcx',
                component: tzcx,
                meta: {
                    title: '台账查询'
                }
            },
            {
                path: 'dkhztj',
                name: 'dkhztj',
                component: customerInfo,
                meta: {
                    title: '贷款汇总统计'
                }
            },
            {
                path: 'kmzzcx',
                name: 'kmzzcx',
                component: customerInfo,
                meta: {
                    title: '科目总账查询'
                }
            },
            {
                path: 'yqdkcx',
                name: 'yqdkcx',
                component: customerInfo,
                meta: {
                    title: '逾期贷款查询'
                }
            },
            {
                path: 'dktqhzxxcx',
                name: 'dktqhzxxcx',
                component: customerInfo,
                meta: {
                    title: '贷款拖欠汇总信息查询'
                }
            },
            {
                path: 'yqhkwjflcx',
                name: 'yqhkwjflcx',
                component: customerInfo,
                meta: {
                    title: '逾期还款五级分类查询'
                }
            }
        ],
        meta: {
            title: "业务统计查询"
        }
    },
    {
        path: '/pzgl',
        name: 'pzgl',
        component: layout,
        redirect: 'noredirect',
        children: [
            {
                path: 'cspz',
                name: 'cspz',
                component: customerInfo,
                meta: {
                    title: '参数配置'
                }
            },
            {
                path: 'cppz',
                name: 'cppz',
                component: customerInfo,
                meta: {
                    title: '产品配置'
                }
            },
            {
                path: 'jqxxpz',
                name: 'jqxxpz',
                component: customerInfo,
                meta: {
                    title: '机器信息配置'
                }
            },
            {
                path: 'kjkmpz',
                name: 'kjkmpz',
                component: customerInfo,
                meta: {
                    title: '会计科目配置'
                }
            },
            {
                path: 'gzkmys',
                name: 'gzkmys',
                component: customerInfo,
                meta: {
                    title: '规则科目映射'
                }
            },
            {
                path: 'kjkmcl',
                name: 'kjkmcl',
                component: customerInfo,
                meta: {
                    title: '会计科目处理'
                }
            },
            {
                path: 'wjflgzpz',
                name: 'wjflgzpz',
                component: customerInfo,
                meta: {
                    title: '五级分类规则配置'
                }
            }
        ],
        meta: {
            title: "配置管理"
        }
    },
    {
        path: '/dsrwgl',
        name: 'dsrwgl',
        component: layout,
        redirect: 'noredirect',
        children: [
            {
                path: 'rwgl',
                name: 'rwgl',
                component: customerInfo,
                meta: {
                    title: '任务管理'
                }
            },
            {
                path: 'plgl',
                name: 'plgl',
                component: customerInfo,
                meta: {
                    title: '批量管理'
                }
            },
            {
                path: 'rwyxjg',
                name: 'rwyxjg',
                component: customerInfo,
                meta: {
                    title: '任务运行结果'
                }
            },
            {
                path: 'plyxjg',
                name: 'plyxjg',
                component: customerInfo,
                meta: {
                    title: '五级分类规则配置'
                }
            }
        ],
        meta: {
            title: "定时任务管理"
        }
    },
    {
        path: '/jkgl',
        name: 'jkgl',
        component: layout,
        redirect: 'noredirect',
        children: [
            {
                path: 'jqzxjk',
                name: 'jqzxjk',
                component: customerInfo,
                meta: {
                    title: '机器执行监控'
                }
            },
            {
                path: 'dsrwmrjk',
                name: 'dsrwmrjk',
                component: customerInfo,
                meta: {
                    title: '定时任务每日监控'
                }
            }
        ],
        meta: {
            title: "监控管理"
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
