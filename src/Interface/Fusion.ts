export type EventObject = {
  [key: string] : Set<Function>
}
export type Container = HTMLElement;
export type TableData = {
  key: string
  type: Type
  name: string
  children: Array<TableData> | undefined
}

type Type = "default" | "input" | "checkbox" | "radio" | "custom"

export type TableColumn = {
  key: string
  title: string
}

export type Options = {
  container: Container
  data: Array<TableData>
  column: TableColumn

}
