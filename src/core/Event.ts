import {EventObject} from "@/Interface/Fusion";

export default class EventEmitter {
  event: EventObject = {}
  // 订阅
  on (name: string | number, fn: Function) {
    if (!this.event[name]) {
      this.event[name] = new Set();
    }
    this.event[name].add(fn);
  }
  // 解除订阅
  off (name: string | number, fn: Function) {
    if (!this.event[name]) {
      this.event[name] = new Set();
      return
    }
    this.event[name].delete(fn);
  }
  // 触发订阅
  emit (name: string | number, ...arg: any[]) {
    if (!this.event[name]) {
      this.event[name] = new Set();
      return
    }
    this.event[name].forEach(fn => {
      fn.call(this, arg)
    })
  }
}
