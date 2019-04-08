import router from '../router';
import store from '../store';
import {getRoles} from '../api/';
import {Message} from 'element-ui';
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import {getToken} from './auth';

const whiteList = ['/login', '/regist', '/403', '/404'];
NProgress.configure({showSpinner: false})// NProgress Configuration
router.beforeEach((to, from, next) => {
    NProgress.start();
    // 在免登录白名单，直接进入
    if (whiteList.some(item => {
        return item === to.path;
    })) {
        NProgress.done();
        next();
    } else {
        // 是否需要校验token
        if (getToken()) { // determine if there has token
            // 校验是否有权限树
            if (store.getters.roles.length === 0) { // 是否已经获取当前用户角色
                getRoles().then(res => {
                    NProgress.done();
                    const roles = res.data.roles;
                    //添加store中的roles
                    store.commit('SET_ROLES', roles)
                    store.commit('SET_NAME', res.data.name)
                    store.commit('SET_AVATAR', res.data.avatar)
                    if (hasPermission(roles, to)) {
                        next({...to, replace: true}) // 强制刷新路由
                    } else {
                        next({path: '/403', replace: true, query: {noGoBack: true}});
                    }
                    NProgress.done();
                }).catch(function (error) {
                    NProgress.done();
                    Message.error({message: error.toLocaleString(), duration: 5 * 1000});
                });
            } else {
                if (hasPermission(store.getters.roles, to)) {
                    next()
                } else {
                    next({path: '/403', replace: true, query: {noGoBack: true}});
                }
                NProgress.done();
            }
        } else {
            NProgress.done();
            next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
        }
    }
});

function hasPermission(roles, to) {
    if (!Array.isArray(roles)) {
        roles = [roles];
    }

    if (!to.meta || !to.meta.roles) {
        return true;
    }
    return roles.some((item) => {
        return item === to.meta.roles;
    });
}


