export interface options {
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