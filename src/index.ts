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
    }
    createTable() {
        const div: Element = document.createElement('div')
        div.innerHTML = 'hello, world!'
        this.fragment.appendChild(div)
        this.container?.append(this.fragment)
    }
    appendCell(parentNode: HTMLElement, childrenNode: Element) {
        parentNode.appendChild(childrenNode)
    }
    renderTableCell() {

        // return this.appendCell()
    }
    readData() {
        this.data.forEach((item: treeData) => {
            const div = 
        })
    }

}
export default Table
