import Table from '@/Table'
import { columns, treeData } from '../mock/example_data1'
import '@/index.less'

// 定义所必需的配置项
const options: any = {
    container: document.getElementById("container"),
    data: treeData,
    columns,
    model: false
};
// 实例化一个表格
new Table(options);
