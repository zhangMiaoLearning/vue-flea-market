//节流 一定时间内若干次事件只触发一次
type ReFn = (...args: any) => void
//节流函数的类型
type ThFn = (fn: ReFn, timer: number) => ReFn
export const throttle: ThFn = (fn, timer) => {
  let flag = true
  const interval = timer || 500
  return function (this: any, ...args: any) {
    if (flag) {
      fn.apply(this, args) // 执行函数
      flag = false
      setTimeout(() => {
        flag = true
      }, interval)
    }
  }
}
// 防抖
export const debounce: ThFn = (fn, timer) => {
  let timeId: any = null
  const delay = timer || 500
  return function (this: any, ...args: any) {
    if (timeId) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      timeId = null
      fn.apply(this, args)
    }, delay)
  }
}
