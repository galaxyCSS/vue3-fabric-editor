// 防抖
export const debounce = (fn, delay) => {
  var timer
  return function () {
    var context = this
    var args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}
// 节流
export const throttle = (fn, delay) => {
  var last = 0
  return function () {
    var now = Date.now()
    if (now - last > delay) {
      last = now
      fn.apply(this, arguments)
    }
  }
}
