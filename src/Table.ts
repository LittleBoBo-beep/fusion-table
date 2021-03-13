import { TableOptions, treeData, columns } from './declare'
// import Model from './Model'
import Additional from './Additional'
/**
 * @name: Table
 * @description: 生成表格类 
 * @param {*} options { container, data }
 * @return {*} htmlElement Table
 */
class Table extends Additional {
    private container: HTMLElement // 存放表格的组件
    private data!: Array<treeData> // 数据
    private columns: Array<columns> // 表头的数据
    fragment: DocumentFragment
    set treeData(data: Array<treeData>) {
        this.data = data
        try {
            this.completeData(data)
            this.createTable()
            this.setCellWidth()
        } catch (error) {
            throw new Error(error);
        }
    }
    constructor(options: TableOptions) {
        super()
        const { container, data, columns } = options
        // for (const key in options) if (!Object.prototype.hasOwnProperty.call(options, key)) throw new Error(`${key}是一个必须项哦~~`);
        // for (const key in options) {
                // this[key] = options[key]
        // }
        // this.options = options
        this.container = container
        this.columns = columns
        this.fragment = document.createDocumentFragment()
        this.treeData = data
        // 监听窗口大小的变化，修改cell的大小
        window.onresize = () => {
            this.setCellWidth()
        }
    }
    /**
     * @name: createTable
     * @description: 创建表格组件
     */
    createTable(): void {
        while (this.container.lastChild) this.container.removeChild(this.container.lastChild)
        const tableBody: Element = document.createElement('div')
        tableBody.className = 'ru-tableBody'
        this.readData(this.data, tableBody)
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
        columns.className = 'ru-columns'
        this.columns.forEach((item: columns) => {
            const column: Element = document.createElement('div') // 表格头部的cell
            column.innerHTML = item.title
            column.className = 'ru-column'
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
            cellCon.className = 'ru-cellCon'
            const cell: Element = this.createCell()
            cell.className = 'ru-cell'
            cell.setAttribute('key', item.key)
            if (item.type === 'default') {
                if (!item.name || !item.name.trim()) {
                    item.name = '-'
                }
                cell.innerHTML = item.name
            } else {
                this.appendCell(cell, this.renderAdditonal(item))
            }
            // const keyArr: Array<string> = item.key.split('-')
            // const keyLength: number = keyArr.length
            // this.model && cell.addEventListener('dblclick', () => {
            //     this.renderModel(this.columns[keyLength - 1].title, item)
            // }, false)
            this.appendCell(cellCon, cell)
            this.appendCell(parentNode, cellCon)
            if (item.children?.length) {
                const childrenCell: Element = this.createCell()
                this.readData(item.children, childrenCell)
                this.appendCell(cellCon, childrenCell)
            }
        })
    }
    /**
     * @description: 根据column设置单元格的长度
     */
    setCellWidth(): void {
        const column: Element = document.querySelectorAll('.ru-column')[0]
        const width: string = window.getComputedStyle(column).width
        document.querySelectorAll('.ru-cell').forEach((item: any) => {
            item.style.width = width
        })
    }
    completeData(data: Array<treeData>): void {
            data.forEach(item => {
                const keyArr: Array<string> = item.key.split('-')
                const keyLength: number = keyArr.length
                if (keyLength === this.columns.length) return
                if (!item.children || !item.children.length) {
                    item.children = [
                        {
                            name: '',
                            key: item.key + '-1',
                            type: 'default'
                        }
                    ]
                }
                this.completeData(item.children)
            })
    }
    /**
     * @description: 重新排序key值
     * @return {*}
     * @param {Array} data
     */
    sortKey (data: Array<treeData>) {
        let key: number = 1;
        let preKey: string = ''
        let newKey: string = data[0].key
        if (newKey.includes('-')) {
            preKey = newKey.slice(0, newKey.length - 1)
        }
        data.forEach((cellData: treeData) => {
            cellData.key = preKey + key
            key++
        });
    }
}
export default Table