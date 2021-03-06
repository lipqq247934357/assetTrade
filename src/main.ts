import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import './icons/iconfont/iconfont.css'; // 字体样式

import App from './App.vue'
import store from './store'
import router from './router'

import $api from './api' // 将所有的接口放到vue原型上
Vue.prototype.$api = $api;

import '@/icons' // icon
import '@/utils/beforeEach' // permission control

// @ts-ignore
import waves from '@/directive/waves/index.js'

Vue.directive('waves', waves); // 注册全局指令

/**
 * This project originally used easy-mock to simulate data,
 * but its official service is very unstable,
 * and you can build your own service if you need it.
 * So here I use Mock.js for local emulation,
 * it will intercept your request, so you won't see the request in the network.
 * If you remove `../mock` it will automatically request easy-mock data.
 */

Vue.use(ElementUI);

Vue.config.productionTip = false;


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
