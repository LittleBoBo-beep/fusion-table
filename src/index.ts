/*
 * @Author: your name
 * @Date: 2021-02-09 19:47:33
 * @LastEditTime: 2021-02-14 08:36:26
 * @LastEditors: Please set LastEditors
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
import action from './action'
interface options {
    container: HTMLElement
    data: Array<treeData>
    columns: Array<columns>
}
interface treeData {
    name: string,
    children?: Array<treeData>
}
interface columns {
    key: number
    title: string
}
/**
 * @description: 生成表格类 
 * @param {*} options { container, data }
 * @return {*} htmlElement Table
 */
class Table {
    private container: HTMLElement | null // 存放表格的组件
    private data: Array<treeData> // 数据
    private columns: Array<columns> // 
    fragment: DocumentFragment

    constructor(options: options) {
        const { container, data, columns } = options
        this.container = container
        this.data = data
        this.columns = columns
        this.fragment = document.createDocumentFragment()
        this.createTable()
        this.setCellWidth()
    }
    createTable() { // 创建表格组件
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
    createColumns () { // 创建表格头部
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
            const cell: HTMLElement = this.createCell()
            const cellCon: HTMLElement = this.createCell()
            cellCon.className = 'cellCon'
            cell.innerHTML = item.name
            cell.className = 'cell'
            this.appendCell(cellCon, cell)
            this.appendCell(parentNode, cellCon)
            if (item.children?.length) {
                const childrenCell: HTMLElement = this.createCell()
                this.readData(item.children, childrenCell)
                this.appendCell(cellCon, childrenCell)
            } else if (this.columns.length) {
                // 如果不够columns的长度就在后面补零
            }
        })
    }
    setCellWidth () {
        const width = document.querySelectorAll('.column')[0].clientWidth
        document.querySelectorAll('.cell').forEach((item: any) => {
                item.style.width = width + 'px'
        })
    }
}
// (   <div>
//         <div>
//             root
//         </div>
//         <div>
//             <div>child1</div>
//             <div>child2</div>
//             <div>child3</div>
//             <div>child4</div>
//             <div>child5</div>
//         </div>
//     </div>
// )
export default Table
