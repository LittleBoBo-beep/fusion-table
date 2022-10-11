import * as Events from "events";

/**
 * 实例化表格需要导入的配置项
 */
export interface TableOptions {
  container: HTMLElement
  data: Array<treeData>
  columns: Array<columns>
  config: Config
  events: Events
}

export type Config = {
  theme: string
}

export interface TableCon {

}

export interface TableHeader {

}

export interface TableBody {

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
  placeholder?: string
}

export interface group {
  value: string
  label: string
}

export interface treeDataOptions {
  disabled: boolean,
  maxlength: number,
  minlength: number,
  minimum: number,
  maximum: number
}

export interface columns {
  key: number
  title: string
}
