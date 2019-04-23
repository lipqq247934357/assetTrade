import router from '../router';
import store from '../store';
import {Message} from 'element-ui';
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import {getToken, setToken} from './auth';
import Vue from 'vue';
import {urlParse4Search} from './utils';

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
        let ticket = urlParse4Search().ticket;
        if (getToken() || ticket) { // determine if there has token
            if (!getToken()) setToken(ticket);
            // 校验是否有权限树
            if (store.getters.tree.length === 0) { // 是否已经获取当前用户信息和权限树等
                Vue.prototype.$api.common.privilegeInfo({
                    ticket: getToken(),
                    systemId: 's000008',
                    isReturn: 1
                }).then(res => {
                    let ticketStatus = res.data.ticketStatus;
                    if (ticketStatus !== '01') { // 无效票据
                        NProgress.done();
                        next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
                    } else {
                        //添加store中的tree和userInfo
                        store.commit('SET_TREE', res.data.menuPrivList);
                        store.commit('SET_BTN', res.data.buttonPrivList);
                        store.commit('SET_USERINFO', res.data.username);
                        // 强制刷新路由
                        next({...to, replace: true});
                        NProgress.done();
                    }
                }).catch(function (error) {
                    NProgress.done();
                    Message.error({message: error.toLocaleString(), duration: 5 * 1000});
                });
            } else { // 如果用户已经有权限树和用户信息
                // 通过请求路径设置menuId,btnArr
                store.getters.tree.some(item => {
                    if (item.menuUrl === to.path) {
                        store.commit('SET_MENUID', item.menuId);
                        for (let btn of store.getters.btn) {
                            if (btn.menuId === item.menuId) {
                                store.commit('SET_BUTTONIDARR', btn.buttonIdArr);
                            }
                        }
                        return true;
                    }
                })
                next();
                NProgress.done();
            }
        } else {
            NProgress.done();
            next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
        }
    }
});


