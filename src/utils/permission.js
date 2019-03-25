/**
 * 说明：当前工具的功能是通过不同的角色获取不同的权限树，然后返回
 */

import asyncRouterMap from '../router/asyncRouter';

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(route, roles) {
    if (route.meta && route.meta.roles) {
        return [roles].some(role => route.meta.roles.includes(role));
    } else {
        return true;
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
    const res = []

    routes.forEach(route => {
        const tmp = {...route}
        if (hasPermission(tmp, roles)) {
            if (tmp.children) {
                tmp.children = filterAsyncRouter(tmp.children, roles);
            }
            res.push(tmp);
        }
    })

    return res;
}

export default function (roles) {
    let accessedRouters;
    if (roles.includes('admin')) {
        accessedRouters = asyncRouterMap;
    } else {
        accessedRouters = filterAsyncRouter(asyncRouterMap, roles);
    }
    return accessedRouters;
}
