export default {
    methods: {
        formatterData(row, column, cellValue = '') {
            if (cellValue == null) {
                return '';
            }
            return cellValue.split(' ')[0];
        },
        formatterUseYn(row, column, cellValue) {
            return cellValue === 'Y' ? '是' : '否';
        },
        formatterChannelType(row, column, cellValue) {
            return Number(cellValue) === 1 ? '自营' : '三方';
        },
        formatterSplitWay(row, column, cellValue) {
            return cellValue === '01' ? '按比例拆分' : '按固定值拆分';
        },
        getName(data, code) {
            let len = data.length;
            for (let i = 0; i < len; i++) {
                if (data[i].code === code) {
                    return data[i].codeName
                }
            }
        },
        formatRate(row, column, cellValue) {
            return this.formatNumber(cellValue, 6);
        },
        formatAmount(row, column, cellValue) {
            return this.formatNumber(cellValue, 2);
        },
        /**
         * 格式化金额
         */
        /**
         * 格式化数字千分位逗号分割(可限制小数位保留位数)
         * s  金额
         * n  保留位数
         */
        formatNumber(s, n) {
            if (s === undefined) return;
            n = n > 0 && n <= 20 ? n : 2;
            s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
            var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
            var t = "";
            for (var i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            return t.split("").reverse().join("") + "." + r;
        },
        formatterSex(row, column, cellValue) {
            return cellValue;
        }
    }
}
