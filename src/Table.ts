import { options, treeData, columns } from './declare'
import Model from './Model'
/**
 * @name: Table
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
        console.log(options, 'opitons');
        const { container, data, columns } = options
        this.container = container
        this.columns = columns
        this.fragment = document.createDocumentFragment()
        this.treeData = data
        this.createTable()
        this.setCellWidth()
    }
    /**
     * @name: createTable
     * @description: 创建表格组件
     */
    createTable(): void {
        while (this.container.lastChild) this.container.removeChild(this.container.lastChild)
        const tableBody: Element = document.createElement('div')
        tableBody.className = 'tableBody'
        this.readData(this.data, tableBody);
        this.appendCell(this.fragment, this.createColumns())
        this.appendCell(this.fragment, tableBody)
        this.container?.append(this.fragment)
    }
    /**
     * @description: 创建单元格
     * @params {*} null
     * @return {*} element
     */
    createCell(): Element {
        return document.createElement('div')
    }
    /**
     * @description: 创建表格头部
     * @params {*}
     * @return {*} element
     */
    createColumns(): Element {
        const columns: Element = document.createElement('div') // 表格的头部
        columns.className = 'columns'
        this.columns.forEach((item: columns) => {
            const column: Element = document.createElement('div') // 表格头部的cell
            column.innerHTML = item.title
            column.className = 'column'
            column.setAttribute('key', String(item.key))
            this.appendCell(columns, column)
        })
        return columns
    }
    /**
     * @description: 添加子节点
     * @param {Element} parentNode
     * @param {Node} childrenNode
     * @return {*} null
     */
    appendCell(parentNode: Element | DocumentFragment, childrenNode: Node): void {
        parentNode.appendChild(childrenNode)
    }
    /**
     * @description: 根据数据生成表格组件
     * @return {*} null
     * @param {Array} cells
     * @param {Element} parentNode
     */
    readData(cells: Array<treeData>, parentNode: Element | DocumentFragment): void {
        return cells.forEach((item: treeData): void => {
            const cellCon: Element = this.createCell()
            const cell: Element = this.createCell()
            cellCon.className = 'cellCon'
            cell.innerHTML = item.name
            cell.className = 'cell'
            cell.setAttribute('key', item.key)
            const keyArr: Array<string> = item.key.split('-')
            const keyLength: number = keyArr.length
            cell.addEventListener('dblclick', () => {
                this.renderModel(this.columns[keyLength - 1].title, item)
            }, false);
            this.appendCell(cellCon, cell)
            this.appendCell(parentNode, cellCon)
            if (item.children?.length) {
                const childrenCell: Element = this.createCell()
                this.readData(item.children, childrenCell)
                this.appendCell(cellCon, childrenCell)
            } else if (this.columns.length > keyLength) {
                // 如果不够columns的长度就在后面补零
                // const childrenCell: HTMLElement = this.createCell()
                // cells.push({ name: '', key: item.key + '-1' })
                this.readData([{ name: '', key: item.key + '-1' }], cellCon)
                // this.appendCell(cellCon, childrenCell)
            }
        })
    }
    /**
     * @description: 根据column设置单元格的长度
     */
    setCellWidth(): void {
        const column: Element = document.querySelectorAll('.column')[0]
        const width: string = window.getComputedStyle(column).width
        document.querySelectorAll('.cell').forEach((item: any) => {
            item.style.width = width
        })
    }
}
export default Table