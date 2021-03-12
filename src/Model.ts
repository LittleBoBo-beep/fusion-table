import { treeData } from './declare'
/**
 * @name: Model
 * @description: 生成model与添加删除修改的操作
 */
export default class Model {
    [x: string]: any
    /**
     * @description: 创建Node节点
     * @return {Element} element
     * @param {string} type
     * @param {string} value
     */
    createEle(type: string, value?: string): Element {
        const ele: Element = document.createElement(type)
        if (value) ele.innerHTML = value
        return ele
    }
    /**
     * @description: 添加子节点
     * @param {Node} parentNode
     * @param {Node} childrenNode
     */
    appendCell(parentNode: Node, childrenNode: Node): void {
        parentNode.appendChild(childrenNode)
    }
    /**
     * @description: 添加监听方法
     * @param {Node} elem
     * @param {string} type
     * @param {EventListener} callback
     */
    addEvent(elem: Node, type: string, callback: EventListener): void {
        elem.addEventListener(type, callback, false)
    }
    /**
     * @description: 渲染Model
     * @param {string} labelName
     * @param {treeData} item
     */
    renderModel(labelName: string, item: treeData): void {
        // TODO: 通过数据方式来创建div 递归的方式添加div [{type: div, className: '', content: '', children: [ { ... } ]}]
        const modelContainer: Element = this.createEle('div') // model -> container
        modelContainer.className = 'ru-model-container'
        const model: Element = this.createEle('divs') // model
        model.className = 'ru-model'
        const header: Element = this.createEle('div') // model-header
        header.className = 'ru-model-header'
        const body: Element = this.createEle('div') // model-body
        body.className = 'ru-model-body'
        const footer: Element = this.createEle('div') // model-footer
        footer.className = 'ru-model-footer'
        const footerLeft: Element = this.createEle('div') // model - footer- left
        footerLeft.className = 'ru-footer-left'
        const addButton: Element = this.createEle('button', '添加') // model -> add -> button
        const deleteButton: Element = this.createEle('button', '删除') // model -> delete -> button
        const changeButton: Element = this.createEle('button', '修改') // model -> delete -> button
        const footerRight: Element = this.createEle('div') // model - footer- right
        footerRight.className = 'ru-footer-right'
        const cancelButton: Element = this.createEle('button', '取消') // model -> delete -> button
        const bodyForm: Element = this.createEle('div') // model-body - form
        bodyForm.className = 'ru-body-form'
        const label: Element = this.createEle('span', labelName + ':') // model -> delete -> button
        label.className = 'ru-body-label'
        const changeInput: Element | any = this.createEle('input') // model -> changeInput -> button
        changeInput.type = 'input'
        this.appendCell(bodyForm, label)
        this.appendCell(bodyForm, changeInput)
        this.appendCell(body, bodyForm)
        this.appendCell(footerLeft, addButton)
        this.appendCell(footerLeft, changeButton)
        this.appendCell(footerLeft, deleteButton)
        this.appendCell(footerRight, cancelButton)
        this.appendCell(footer, footerLeft)
        this.appendCell(footer, footerRight)
        this.appendCell(model, header)
        this.appendCell(model, body)
        this.appendCell(model, footer)
        this.appendCell(modelContainer, model)
        const { key } = item
        const keyArr: Array<string> = key.split("-")
        this.addEvent(addButton, 'click', (): void => { // 添加
            this.changetreeData('add', keyArr, this.data, changeInput.value)
            this.treeData = this.data
            this.removeModel()
        })
        this.addEvent(changeButton, 'click', (): void => { // 修改
            this.changetreeData('change', keyArr, this.data, changeInput.value)
            this.treeData = this.data
            this.removeModel()
        })
        this.addEvent(deleteButton, 'click', (): void => { // 删除
            this.changetreeData('delete', keyArr, this.data, changeInput.value)
            this.treeData = this.data
            this.removeModel()
        })
        this.addEvent(cancelButton, 'click', (): void => { // 取消
            this.removeModel()
        })
        document.body.appendChild(modelContainer)
    }
    /**
     * @description: 类弹窗操作
     */
    removeModel(): void {
        const childNode: any = document.querySelector('.ru-model-container')
        document.body.removeChild(childNode)
    }
    /**
     * @description: 修改数据
     * @param {string} type
     * @param {Array} key
     * @param {Array} data
     * @param {string} value
     */
    changetreeData(type: string, key: Array<string>, data: Array<treeData>, value: string): void {
        let newData: any = data
        for (let i = 0; i < key.length - 1; i++) {
            newData = newData[Number(key[i]) - 1].children
        }
        if (type === 'add') {
            let addKey = JSON.parse(JSON.stringify(key))
            addKey[key.length - 1] = String(newData.length + 1)
            const addData: object = {
                name: value,
                key: addKey.join('-')
            }
            newData.splice(Number(key[key.length - 1]), 0, addData)
        } else if (type === 'change') {
            newData[Number(key[key.length - 1]) - 1].name = value
        } else {
            let parentData: any = data
            for (let i = 0; i < key.length - 1; i++) {
                const element: number = Number(key[i]);
                parentData = parentData[element - 1]
            }
            if (parentData.children.length <= 1) {
                throw new Error("无法删除最后一个");
            } else {
                newData.splice(Number(key[key.length - 1]) - 1, 1)
            }
        }
        this.sortKey(newData)
    }
}