/*
 * @Author: your name
 * @Date: 2021-02-09 19:47:33
 * @LastEditTime: 2021-02-19 16:55:17
 * @LastEditors: litter-bobo
 * @Description: In User Settings Edit
 * @FilePath: \tree-table\src\index.ts
 */
/*
 * 
 * 　　┏┓　　　┏┓+ +
 * 　┏┛┻━━━┛┻┓ + +
 * 　┃　　　　　　　┃ 　
 * 　┃　　　━　　　┃ ++ + + +
 *  ████━████ ┃+
 * 　┃　　　　　　　┃ +
 * 　┃　　　┻　　　┃
 * 　┃　　　　　　　┃ + +
 * 　┗━┓　　　┏━┛
 * 　　　┃　　　┃　　　　　　　　　　　
 * 　　　┃　　　┃ + + + +
 * 　　　┃　　　┃
 * 　　　┃　　　┃ +  神兽保佑
 * 　　　┃　　　┃    代码无bug　　
 * 　　　┃　　　┃　　+　　　　　　　　　
 * 　　　┃　 　　┗━━━┓ + +
 * 　　　┃ 　　　　　　　┣┓
 * 　　　┃ 　　　　　　　┏┛
 * 　　　┗┓┓┏━┳┓┏┛ + + + +
 * 　　　　┃┫┫　┃┫┫
 * 　　　　┗┻┛　┗┻┛+ + + +
 * 
 */

import { domainToUnicode } from "url"

// import action from './action'
interface options {
    container: HTMLElement
    data: Array<treeData>
    columns: Array<columns>
}
interface treeData {
    name: string
    key: string
    children?: Array<treeData>
}
interface columns {
    key: number
    title: string
}

class Model {
    [x: string]: any
    createEle(type: string, value?: string) {
        const ele = document.createElement(type)
        if (value) ele.innerHTML = value
        return ele
    }

    appendCell(parentNode: Node, childrenNode: Node) { // 添加子节点
        parentNode.appendChild(childrenNode)
    }
    addEvent(elem: Node, type: string, callback: EventListener) {
        elem.addEventListener(type, callback, false)
    }
    renderModel(labelName: string, item: treeData) {
        const modelContainer = this.createEle('div') // model -> container
        modelContainer.className = 'model-container'
        const div = this.createEle('div') // model
        div.className = 'model'
        const header = this.createEle('div') // model-header
        header.className = 'model-header'
        const body = this.createEle('div') // model-body
        body.className = 'model-body'
        const footer = this.createEle('div') // model-footer
        footer.className = 'model-footer'
        const addButton = this.createEle('button', '添加') // model -> add -> button
        const deleteButton = this.createEle('button', '删除') // model -> delete -> button
        const changeButton = this.createEle('button', '修改') // model -> delete -> button
        const cancelButton = this.createEle('button', '取消') // model -> delete -> button
        const label = this.createEle('span', labelName) // model -> delete -> button
        const changeInput = this.createEle('input') // model -> changeInput -> button 
        this.appendCell(body, label)
        this.appendCell(body, changeInput)
        this.appendCell(footer, addButton)
        this.appendCell(footer, changeButton)
        this.appendCell(footer, deleteButton)
        this.appendCell(footer, cancelButton)

        this.appendCell(div, header)
        this.appendCell(div, body)
        this.appendCell(div, footer)
        this.appendCell(modelContainer, div)
        const { key } = item
        const keyArr = key.split("-")
        this.addEvent(addButton, 'click', () => { // 添加
            this.changetreeData('add', keyArr, this.data, changeInput.value)
            this.treeData = this.data
            this.removeModel()
        })
        this.addEvent(changeButton, 'click', () => { // 修改
            this.changetreeData('change', keyArr, this.data, changeInput.value)
            this.treeData = this.data
            this.removeModel()
        })
        this.addEvent(deleteButton, 'click', () => { // 删除
            this.changetreeData('delete', keyArr, this.data, changeInput.value)
            this.treeData = this.data
            this.removeModel()
        })
        this.addEvent(cancelButton, 'click', () => { // 删除
            this.removeModel()
        })
        document.body.appendChild(modelContainer)
    }
    removeModel() { // 类弹窗操作
        document.body.removeChild(document.body.lastChild)
    }
    changetreeData(type: string, key: Array<string>, data: Array<treeData>, value: string) {
        let newData: any = data
        for (let i = 0; i < key.length - 1; i++) {
            newData = data[Number(key[i]) - 1].children
        }
        if (type === 'add') {
            let addKey = JSON.parse(JSON.stringify(key))
            addKey[key.length - 1] = String(newData.length + 1)
            const addData = {
                name: value,
                key: addKey.join('-')
            }
            newData.splice(Number(key[key.length - 1]), 0, addData)
        } else if (type === 'change') {
            newData[Number(key[key.length - 1]) - 1].name = value
        } else {
            newData.splice(Number(key[key.length - 1]) - 1, 1)
        }
    }
}

/**
 * @description: table的操作
 * @param {*} 
 * @return {*} 
 */
// class Action extends Model {
//     constructor() {
//         super()
//     }
//     add(label: string) {
//         console.log('add');
//         // this.renderModel(label)
//     }
//     delete() {
//         console.log('delete');
//     }
//     changeValue() {
//         console.log('changeValue');
//     }
// }
/**
 * @description: 生成表格类 
 * @param {*} options { container, data }
 * @return {*} htmlElement Table
 */
class Table extends Model {
    private container: HTMLElement // 存放表格的组件
    private data!: Array<treeData>; // 数据
    private columns: Array<columns> // 表头的数据
    fragment: DocumentFragment
    set treeData(value: Array<treeData>) {
        this.data = value
        this.createTable()
        this.setCellWidth()
    }
    constructor(options: options) {
        super()
        const { container, data, columns } = options
        this.container = container
        this.columns = columns
        this.fragment = document.createDocumentFragment()
        this.treeData = data
        this.createTable()
        this.setCellWidth()
    }
    createTable() { // 创建表格组件
        while (this.container.lastChild) this.container.removeChild(this.container.lastChild)
        const tableBody = document.createElement('div') // 表格的body
        tableBody.className = 'tableBody'
        this.readData(this.data, tableBody);
        this.appendCell(this.fragment, this.createColumns())
        this.appendCell(this.fragment, tableBody)
        this.container?.append(this.fragment)
    }
    createCell() { // 创建单元格
        const cell = document.createElement('div')
        return cell
    }
    createColumns() { // 创建表格头部
        const columns = document.createElement('div') // 表格的头部
        columns.className = 'columns'
        this.columns.forEach((item: columns) => {
            const column = document.createElement('div') // 表格头部的cell
            column.innerHTML = item.title
            column.className = 'column'
            column.setAttribute('key', String(item.key))
            this.appendCell(columns, column)
        })
        return columns
    }
    appendCell(parentNode: Element | DocumentFragment, childrenNode: Node) { // 添加子节点
        parentNode.appendChild(childrenNode)
    }
    readData(cells: Array<treeData>, parentNode: Element | DocumentFragment): void { // 递归读取数据
        return cells.forEach((item: treeData) => {
            const cellCon: HTMLElement = this.createCell()
            const cell: HTMLElement = this.createCell()
            cellCon.className = 'cellCon'
            cell.innerHTML = item.name
            cell.className = 'cell'
            cell.setAttribute('key', item.key)
            const keyArr = item.key.split('-')
            const keyLength = keyArr.length
            cell.addEventListener('click', (event: MouseEvent | any) => {
                event.target.style.background = '#f99'
            }, false);
            cell.addEventListener('dblclick', (event: MouseEvent | any) => {
                event.target.style.background = ''
                this.renderModel(this.columns[keyLength - 1].title, item)
            }, false);
            this.appendCell(cellCon, cell)
            this.appendCell(parentNode, cellCon)
            if (item.children?.length) {
                const childrenCell: HTMLElement = this.createCell()
                this.readData(item.children, childrenCell)
                this.appendCell(cellCon, childrenCell)
            } else if (this.columns.length > keyLength) {
                // 如果不够columns的长度就在后面补零
                // const childrenCell: HTMLElement = this.createCell()
                this.readData([{ name: '', key: item.key + '-1' }], cellCon)
                // this.appendCell(cellCon, childrenCell)
            }
        })
    }
    setCellWidth() {
        const width = document.querySelectorAll('.column')[0].clientWidth
        document.querySelectorAll('.cell').forEach((item: any) => {
            item.style.width = width + 'px'
        })
    }
}
export default Table
