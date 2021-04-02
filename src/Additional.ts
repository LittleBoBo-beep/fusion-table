import { treeData, group } from './declare'
/**
 * @description: 表格的单元格插入非纯文字操作
 */
class Additional {
    /**
     * @description: 读取特殊单元格的操作
     * @return {Element} div
     * @param {treeData} cell
     */
    renderAdditonal(cell: treeData): Element {
        let AdditonCell: Element = document.createElement('div')
        switch (cell.type) {
            case 'radio':
            case 'checkbox':
                AdditonCell = this.createGroup(cell)
                break;
            case 'select':
                AdditonCell = this.createSelect(cell)
                break;
            default:
                AdditonCell = this.createInput(cell)
                break;
        }
        return AdditonCell
    }
    /**
     * @description: 生成input
     * @return {Input} input
     * @param {treeData} cell
     */
    createInput(cell: treeData): Element {
        const input: HTMLInputElement = document.createElement('input');
        input.type = 'number'
        input.className = 'ru-input'
        if (cell.options) {
            input.disabled = cell.options.disabled
            // input.setAttribute('maxlength', cell.options.maxlength)
            // input.setAttribute('minlength', cell.options.minlength)
            const value = Number(cell.value)
            if (value <= cell.options.maxlength && value >= cell.options.minlength && cell.value) {
              input.value = cell.value
            }
        } else {
            input.value = String(cell.value)
        }
        input.oninput = function () {
            const value = Number(input.value)
            if (!cell.options) {
                cell.value = input.value
            } else {
                if (value >= cell.options.maxlength) {
                    cell.value = String(cell.options.maxlength)
                    input.value = cell.value
                } else if (value <= cell.options.minlength) {
                    cell.value = String(cell.options.minlength)
                    input.value = cell.value
                } else {
                    if (input.value[0] === '0') {
                        input.value = input.value.slice(1)  
                        cell.value = input.value
                    } else {
                        cell.value = input.value
                    }
                }
            }
        }
        return input
    }
    /**
     * @description: 创建radio或checkbox的group
     * @return {Element} div
     * @param {treeData} cell
     */
    createGroup(cell: treeData): Element {
        const con: Element = document.createElement('div')
        cell.group && cell.group.forEach(item => con.appendChild(this.createRadioOrCheckbox(cell, item, cell.key)))
        con.className = 'ru-radio-or-checkbox-con'
        return con
    }
    /**
     * @description: 创建Radio或checkbox
     * @return {Element} div
     * @param {treeData} cell
     * @param {group} groupOne
     * @param {string} key
     */
    createRadioOrCheckbox(cell: treeData, groupOne: group, key: string): Element {
        const radio: HTMLInputElement = document.createElement('input')
        const span: Element = document.createElement('span')
        const div: Element = document.createElement('div')
        radio.type = cell.type
        radio.value = groupOne.value
        span.innerHTML = groupOne.label
        radio.onchange = function () {
            cell.value = radio.value
        }
        if (cell.value === groupOne.value || cell.value?.includes(radio.value)) radio.checked = true
        radio.name = key
        div.appendChild(radio)
        div.appendChild(span)
        return div
    }
    /**
     * @description: 创建select
     * @return {Element} div
     * @param {treeData} cell
     */
    createSelect (cell: treeData) {
        const select: HTMLSelectElement = document.createElement('select');
        select.name = cell.key
        cell.group?.forEach(item => {
            const option: HTMLOptionElement = document.createElement('option')
            option.value = item.label
            option.innerText = item.value
            if (cell.value && cell.value === item.value) {
                option.selected = true
            }
            select.appendChild(option)
        })
        return select
    }
}
export default Additional