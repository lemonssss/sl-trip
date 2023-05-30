// 函数节流的概念
// 函数节流：规定在一个单位时间内，事件响应函数只能被触发一次。如果单位时间内触发多次，只有一次生效。
export function throttle(fn, interval) {
  var timer;
  return (event) => {
    if (timer) {
      return false;
    }
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      fn(event);
    }, interval);
  };
}

export function debounce(fn, interval) {
  var timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, interval);
  };
}
