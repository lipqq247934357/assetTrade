/**
 * 解析url参数 注意：只支持hash的参数
 * @example /#/?id=12345&a=b
 * @return Object {id:12345,a:b}
 *
 * 备注：vue-router中的this.$route.query可以获取到需要的内容
 *
 */

import _ from 'lodash';

export const urlParse4Search = function (): any {
    let url = window.location.search;
    let obj: { [index: string]: any } = {};
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
    // ['?id=12345', '&a=b']
    if (arr) {
        arr.forEach((item) => {
            let tempArr = item.substring(1).split('=');
            let key: string = decodeURIComponent(tempArr[0]) + '';
            let val: string = decodeURIComponent(tempArr[1]);
            obj[key] = val;
        });
    }
    return obj;
};

export const urlParse = function () {
    let url = window.location.hash;
    let obj: { [index: string]: any } = {};
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
    // ['?id=12345', '&a=b']
    if (arr) {
        arr.forEach((item) => {
            let tempArr = item.substring(1).split('=');
            let key = decodeURIComponent(tempArr[0]);
            let val = decodeURIComponent(tempArr[1]);
            obj[key] = val;
        });
    }
    return obj;
};

/**
 * 将data转化成树结构
 * 支持子节点排序
 *
 * 注：当某个节点的父节点不存在并且不是一级菜单的时候就会进入死循环，待优化
 *
 * @param data
 * @returns {Array}
 */

export const treeUtil = function (data: any) {

    const tree = []; // 树
    const pos = {}; // 一维数组

    // 将数组转化为对象 便于查找
    for (let i = 0; i < data.length; i++) {
        // @ts-ignore
        pos[data[i].menuId] = data[i];
    }
    // 遍历数组建立树
    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        if (item.menuLevel === '1') { //一级菜单
            tree.push(item);// 树的一级菜单
        } else { // 子节点
            let parentId = item['parentMenuId'].trim();
            // @ts-ignore
            let parentMenu = pos[parentId]; // 获取父节点
            pushItem(parentMenu.children || (parentMenu.children = []), item); // 给父亲增加自己
        }
    }

    // @ts-ignore
    function pushItem(children, item) { // 根据menuOrder进行排序
        if (children) {
            let i = 0;
            for (; i < children.length; i++) {
                if (item.menuOrder < children[i].menuOrder) {
                    break;
                }
            }
            children.splice(i, 0, item);
        }
    }
    return tree;
};

/**
 *
 * 运算是为了解决js语言中对浮点数处理的问题
 *
 */
//js加法
export const add = function (arg1: number, arg2: number) {
    let r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
};
//js减法
export const sub = function (arg1: number, arg2: number) {
    let r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
};
//js乘法
export const mul = function (arg1: number, arg2: number) {
    let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {
        console.log(e);
    }
    try {
        m += s2.split(".")[1].length
    } catch (e) {
        console.log(e);
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
};
// //js除法
// export const div =function(arg1, arg2) {
//     let t1 = 0, t2 = 0, r1, r2;
//     try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
//     try { t2 = arg2.toString().split(".")[1].length } catch (e) { }
//     with (Math) {
//         r1 = Number(arg1.toString().replace(".", ""))
//         r2 = Number(arg2.toString().replace(".", ""))
//         return (r1 / r2) * pow(10, t2 - t1);
//     }
// };

/**
 * 提取数组中某个对象的属性为某个值的对象
 * @param data 数据
 * @param prop 属性
 * @param val 值
 * @returns Object || undefined
 */

function getObj(data: Array<{ [index: string]: any }>, prop: string, val: any) {
    let len = data.length;
    for (let i = 0; i < len; i++) {
        if (data[i][prop] === val) {
            return data[i];
        }
    }
}

/**
 *
 * 提取数组中某个对象的属性为某个值的对象的几个属性
 * @param data 数据
 * @param prop 属性
 * @param val 值
 * @param needVal
 */

export const getProp = function (data: Array<{ [index: string]: any }>, prop: string, val: any, needVal: string) {

    let obj = getObj(data, prop, val);
    if (obj) {
        if (Array.isArray(needVal)) {
            return _.values(_.pick(obj, needVal));
        } else {
            return obj[needVal];
        }
    }
};

/**
 * 将url的参数解析成key,val的形式
 * @param url
 * @returns {{}}
 */
export const urlParams = function (url: string) {
    let _url = url.split("?")[1];
    if (!_url) {
        return {};
    }
    let windowHref = _url.split("&");
    let obj: { [index: string]: any } = {};
    for (let i = 0; i < windowHref.length; i++) {
        let arr = windowHref[i].split("=");
        obj[arr[0]] = arr[1]
    }
    return obj;
};
