import EventEmitter from "@/core/Event";

class Table extends EventEmitter {
  constructor() {
    super();
    this.init()
  }
  init () {
    console.log('init:', 'Fusion-table')
  }
}

export default Table
