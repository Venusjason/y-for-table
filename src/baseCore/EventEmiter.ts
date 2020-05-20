export default class {
  events = {}

  on(type: string, listener: Function, isPrepend: Boolean = false) {
    if (this.events[type]) {
      isPrepend
        ? this.events[type].unshift(listener)
        : this.events[type].push(listener)
    } else {
      this.events[type] = [listener]
    }
  }

  off(type: string, listener?: Function) {
    if (Array.isArray(this.events[type])) {
      if (listener) {
        this.events[type] = this.events[type].filter(
          eventlistener => eventlistener !== listener
        )
      } else {
        // 不传事件 则取消该类型下所有事件
        delete this.events[type]
      }
    }
  }

  // 为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器
  once(type: string, listener: Function) {
    // 向事件队列添加事件，只执行一次
    const only = (...args) => {
      listener.apply(this, args)
      this.off(type, listener)
    }
    // only.origin = listener
    this.on(type, only)
  }

  // 推动执行某类事件
  emit(type: string, ...args) {
    if (Array.isArray(this.events[type])) {
      this.events[type].forEach(event => {
        event.apply(this, args)
      })
    }
  }
}
