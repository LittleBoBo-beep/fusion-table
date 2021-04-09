import Table from '@/Table'
import '@/index.less'
// import Compile from '@/utils/compile'
const treeData = [
  {
    name: "root1",
    textAlign: 'left',
    type: 'default',
    key: "1",
    children: [
      {
        name: "child1",
        textAlign: 'left',
        type: 'default',
        key: "1-1",
        children: [
          {
            name: "child1Child1",
            textAlign: 'left',
            type: 'default',
            key: "1-1-1",
          },
          {
            name: "child1Child2",
            textAlign: 'left',
            type: 'default',
            key: "1-1-2",
          },
          {
            name: "child1Child3",
            textAlign: 'left',
            type: 'default',
            key: "1-1-3",
          },
          {
            name: "child1Child1",
            textAlign: 'left',
            type: 'default',
            key: "1-1-4",
          },
          {
            name: "child1Child2",
            textAlign: 'left',
            type: 'default',
            key: "1-1-5",
          },
          {
            name: "child1Child3",
            textAlign: 'left',
            type: 'default',
            key: "1-1-6",
          },
          {
            name: "child1Child1",
            textAlign: 'left',
            type: 'default',
            key: "1-1-7",
          },
          {
            name: "child1Child2",
            textAlign: 'left',
            type: 'default',
            key: "1-1-8",
          },
          {
            name: "child1Child3",
            textAlign: 'left',
            type: 'default',
            key: "1-1-9",
          },
          {
            name: "child1Child1",
            textAlign: 'left',
            type: 'default',
            key: "1-1-10",
          },
          {
            name: "child1Child2",
            textAlign: 'left',
            type: 'default',
            key: "1-1-11",
          },
          {
            name: "child1Child3",
            textAlign: 'left',
            type: 'default',
            key: "1-1-12",
          },
          {
            name: "child1Child1",
            textAlign: 'left',
            type: 'default',
            key: "1-1-13",
          },
          {
            name: "child1Child2",
            textAlign: 'left',
            type: 'default',
            key: "1-1-14",
          },
          {
            name: "child1Child3",
            textAlign: 'left',
            type: 'default',
            key: "1-1-15",
          },
          {
            name: "child1Child1",
            textAlign: 'left',
            type: 'default',
            key: "1-1-16",
          }
        ],
      },
      {
        name: "child2child2child2child2child2child2child2child2child2child2child2child2child2child2child2child2child2child2child2child2child2child2child2child2child2child2child2child2child2child2child2child2child2child2child2child2child2child2child2child2",
        textAlign: 'left',
        type: 'default',
        key: "1-2",
        children: [],
      },
    ],
  },
  {
    name: "root2",
    textAlign: 'center',
    type: 'default',
    key: "2",
    children: [
      {
        name: "",
        textAlign: 'left',
        type: 'checkbox',
        group: [
          { label: 'Apple', value: 'Apple' },
          { label: 'Pear', value: 'Pear' },
          { label: 'Orange', value: 'Orange' },
        ],
        value: [],
        key: "2-1",
        children: [
          {
            name: '',
            textAlign: 'left',
            type: 'input',
            value: '20',
            key: '2-1-1',
            options: {
              disabled: false,
              minlength: 0,
              maxlength: 20000
            },
          }
        ],
      },
    ],
  },
  {
    name: "root2",
    textAlign: 'center',
    type: 'default',
    key: "3",
    children: [
      {
        name: "",
        textAlign: 'left',
        type: 'select',
        group: [
          { label: 'Apple', value: 'Apple' },
          { label: 'Pear', value: 'Pear' },
          { label: 'Orange', value: 'Orange' },
        ],
        value: 'Apple',
        key: "3-1",
        children: [
          {
            name: '',
            textAlign: 'left',
            type: 'input',
            options: {
              disabled: false,
              minlength: 0,
              maxlength: 100,
              // mininum: 0,
              // maxinum: 100
            },
            value: '100',
            key: '3-1-1'
          }
        ],
      },
    ],
  },
];
// 定义表格头部的数据
const columns = [
  {
    key: 0,
    title: "column1",
  },
  {
    key: 1,
    title: "column2",
  },
  {
    key: 2,
    title: "column3",
  },
];
// 定义所必需的配置项
const options: any = {
  container: document.getElementById("container"),
  data: [],
  columns: [],
  model: false
};
// 实例化一个表格
let table = new Table(options);

const checkout_Data_btn = document.getElementById('checkout_data')
if (checkout_Data_btn) {
  checkout_Data_btn.onclick = function () {
    table.columns = columns
    table.treeData = treeData
  }
}