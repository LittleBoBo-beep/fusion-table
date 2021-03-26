export interface TableOptions {
    container: HTMLElement
    data: Array<treeData>
    columns: Array<columns>
}
export interface treeData {
    name: string
    key: string
    type: string
    options?: treeDataOptions
    group?: Array<group>
    value?: string
    textAlign?: string
    children?: Array<treeData>
}

export interface group {
    value: string
    label: string
}

export interface treeDataOptions {
    disabled: boolean,
    maxlength: string,
    minlength: string,
    mininum: number,
    maxinum: number
}

export interface columns {
    key: number
    title: string
}

export interface RuReactOptions {
    container: HTMLElement
}