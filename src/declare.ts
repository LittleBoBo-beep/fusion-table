export interface TableOptions {
    container: HTMLElement
    data: Array<treeData>
    columns: Array<columns>
}
export interface treeData {
    name: string
    key: string
    type: string
    group?: Array<group>
    value?: string
    children?: Array<treeData>
}

export interface group {
    value: string
    label: string
}

export interface columns {
    key: number
    title: string
}

export interface RuReactOptions {
    container: HTMLElement
}