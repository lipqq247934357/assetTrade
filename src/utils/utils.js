/**
 * 解析url参数 注意：只支持hash的参数
 * @example /#/?id=12345&a=b
 * @return Object {id:12345,a:b}
 *
 * 备注：vue-router中的this.$route.query可以获取到需要的内容
 *
 */

export const urlParse4Search = function () {
    let url = window.location.search;
    let obj = {};
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

export const urlParse = function () {
    let url = window.location.hash;
    let obj = {};
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

export const treeUtil = function (data) {

    let i = 0;
    let tree = [];
    let pos = [];
    while (data.length !== 0) {
        let item = data[i];
        item.children = [];
        if (item.menuLevel === '1') { //一级菜单
            tree.push(item);// 树的一级菜单
            pos[item['menuId']] = tree[tree.length - 1];
            data.splice(i, 1);
        } else { // 子节点
            let parentId = item['parentMenuId'].trim();
            let obj = pos[parentId]; // 获取父节点
            if (obj !== undefined) {
                obj.children.push(item); // 给父亲增加自己
                pos[item['menuId']] = obj.children[obj.children.length - 1]; // 将自己的引用放到对应一维数组中
                sort(obj.children);
                data.splice(i, 1);
            } else { // 父节点没有设置，下一轮就可以找到父节点
                i++;
            }
        }
        if (i > data.length - 1) { // 一轮遍历完成
            i = 0;
        }
    }

    function sort(obj) { // 根据menuOrder进行排序
        obj.sort(function (a, b) {
            return a.menuOrder - b.menuOrder
        })
    }

    return tree;
};

/**
 *
 * 运算是为了解决js语言中对浮点数处理的问题
 *
 */
//js加法
export const add =function(arg1, arg2) {
    let r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
};
//js减法
export const sub =function(arg1, arg2) {
    let r1, r2, m, n;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
};
//js乘法
export const mul =function(arg1, arg2) {
    let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
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
