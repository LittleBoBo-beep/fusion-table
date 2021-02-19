/*
 * @Author: your name
 * @Date: 2021-02-09 19:47:33
 * @LastEditTime: 2021-02-19 10:06:38
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
    renderModel() {
        const div = this.createEle('div') // model -> container
        const addButton = this.createEle('button', '添加') // model -> add -> button
        const deleteButton = this.createEle('button', '删除') // model -> delete -> button
        const changeButton = this.createEle('button', '修改') // model -> delete -> button
        const changeInput = this.createEle('input') // model -> changeInput -> button 
        this.appendCell(div, changeInput)
        this.appendCell(div, addButton)
        this.appendCell(div, deleteButton)
        this.appendCell(div, changeButton)
        this.addEvent(addButton, 'click', (event: MouseEvent | any) => {
            console.log(event);
            this.removeModel()
        })
        this.addEvent(deleteButton, 'click', (event: MouseEvent | any) => {
            console.log(event);
            this.removeModel()
        })
        this.addEvent(changeButton, 'click', (event: MouseEvent | any) => {
            console.log(event);
            console.log(changeInput.value, 'changeInput');
            this.removeModel()
        })
        document.body.appendChild(div)
    }
    removeModel() { // 类弹窗操作
        document.body.removeChild(document.body.lastChild)
    }
}

/**
 * @description: table的操作
 * @param {*} 
 * @return {*} 
 */
class Action extends Model {
    constructor() {
        super()
    }
    add() {
        console.log('add');
        this.renderModel()
    }
    delete() {
        console.log('delete');
    }
    changeValue() {
        console.log('changeValue');
    }
}
/**
 * @description: 生成表格类 
 * @param {*} options { container, data }
 * @return {*} htmlElement Table
 */
class Table extends Action {
    private container: HTMLElement // 存放表格的组件
    private data!: Array<treeData>; // 数据
    private columns: Array<columns> // 表头的数据
    fragment: DocumentFragment
    set treeData(value: Array<treeData>) {
        this.data = value
        this.createTable()
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
            cell.addEventListener('click', (event: MouseEvent | any) => {
                // 
                event.target.style.background = '#f99'
            }, false);
            cell.addEventListener('dblclick', (event: MouseEvent | any) => {
                // 
                event.target.style.background = ''
                this.add()
            }, false);
            const keyArr = item.key.split('-')
            const keyLength = keyArr.length
            this.appendCell(cellCon, cell)
            this.appendCell(parentNode, cellCon)
            if (item.children?.length) {
                const childrenCell: HTMLElement = this.createCell()
                this.readData(item.children, childrenCell)
                this.appendCell(cellCon, childrenCell)
            } else if (this.columns.length > keyLength) {
                // 如果不够columns的长度就在后面补零
                const childrenCell: HTMLElement = this.createCell()
                this.readData([{ name: '', key: item.key + '-1' }], childrenCell)
                this.appendCell(cellCon, childrenCell)
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
