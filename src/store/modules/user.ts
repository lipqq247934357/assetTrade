import vue from 'vue'
import {getToken, setToken, removeToken} from '@/utils/auth'

const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        roles: [],
        tree: [], // 树结构
        btn: [], // 按钮权限数组
        userInfo: {},
        menuId: '', // 当前页面所属按钮ID
        buttonArr: [], // 当前页面可以访问的按钮组
        btnId: '' // 点击按钮之后临时存放的btnId,在ajax请求获取这个值之后删除它
    },

    mutations: {
        SET_TOKEN: (state: any, token: any) => {
            state.token = token
        },
        SET_NAME: (state: any, name: any) => {
            state.name = name
        },
        SET_AVATAR: (state: any, avatar: any) => {
            state.avatar = avatar
        },
        SET_ROLES: (state: any, roles: any) => {
            state.roles = roles
        },

        SET_TREE: (state: any, tree: any) => {
            state.tree = tree
        },

        SET_BTN: (state: any, btn: any) => {
            state.btn = btn
        },

        SET_USERINFO: (state: any, userInfo: any) => {
            state.userInfo = userInfo
        },
        SET_MENUID: (state: any, menuId: any) => {
            state.menuId = menuId
        },
        SET_BUTTONIDARR: (state: any, buttonArr: any) => {
            state.buttonArr = buttonArr
        },
        SET_BTNID: (state: any, btnId: any) => {
            state.btnId = btnId
        },
    },

    actions: {
        // 登录
        Login({commit}: any, userInfo: any) {
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                vue.prototype.$api.common.login(username, userInfo.password).then((response: any) => {
                    const data = response.data
                    setToken(data.token) // 设置token值
                    commit('SET_TOKEN', data.token)
                    resolve()
                }).catch((error: any) => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo({commit, state}: any) {
            return new Promise((resolve, reject) => {
                vue.prototype.$api.common.getInfo(state.token).then((response: any) => {
                    const data = response.data
                    if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                        commit('SET_ROLES', data.roles)
                    } else {
                        reject('getInfo: roles must be a non-null array !')
                    }
                    commit('SET_NAME', data.name)
                    commit('SET_AVATAR', data.avatar)
                    resolve(response)
                }).catch((error: any) => {
                    reject(error)
                })
            })
        },

        // 登出
        LogOut({commit}: any) {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
        },

        // 前端 登出
        FedLogOut({commit}: any) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        }
    }
}

export default user
