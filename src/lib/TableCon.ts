import Cell from "@/core/Cell";
import {Container, TableData, TableColumn} from "@/Interface/Fusion";

class TableCon extends Cell {
  container: Container
  data: TableData
  column: TableColumn
  private readonly fragment: DocumentFragment

  constructor(options: { data: any; column: any; container: any; }) {
    super();
    const { data, column, container } = options;
    this.container = container;
    this.data = data;
    this.column = column
    this.fragment = new DocumentFragment();
  }

}
export default TableCon
