export default {
    methods: {
        formatterData(row, column, cellValue) {
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
        }
    }
}
