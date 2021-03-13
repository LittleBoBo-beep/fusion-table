import { treeData, group } from './declare'
class Additional {
    renderAdditonal(cell: treeData): Element {
        let AdditonCell: Element = document.createElement('div')
        if ((cell.type === 'radio' || cell.type === 'checkbox') && cell.group) {
            AdditonCell = this.createSelectGroup(cell, cell.key)
        } else {
            if (cell.value) AdditonCell = this.createInput(cell)
        }
        return AdditonCell
    }
    createInput(cell: treeData): Element {
        const input: HTMLInputElement = document.createElement('input');
        input.type = 'input'
        input.className = 'ru-input'
        input.onchange = function () {
            cell.value = input.value
        }
        if (cell.value) {
            input.value = cell.value
        }
        return input
    }
    createSelectGroup(cell: treeData, key: string): Element {
        const con: Element = document.createElement('div')
        cell.group && cell.group.forEach(item => con.appendChild(this.createRadioOrCheckbox(cell, item, key)))
        con.className = 'ru-radio-or-checkbox-con'
        return con
    }
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
}
export default Additional