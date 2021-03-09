export interface TableOptions {
    container: HTMLElement
    data: Array<treeData>
    columns: Array<columns>
}
export interface treeData {
    name: string
    key: string
    children?: Array<treeData>
}
export interface columns {
    key: number
    title: string
}

export interface RuReactOptions {
    container: HTMLElement
}