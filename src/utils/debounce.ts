interface Func {
  (...args: any[]): any
}

export function debounce(f: Func, ms = 500): Func {
  let timer: any

  return function (this: any, ...args: any): void {
    clearTimeout(timer)
    timer = setTimeout(() => {
      f.apply(this, args)
    }, ms)
  }
}
