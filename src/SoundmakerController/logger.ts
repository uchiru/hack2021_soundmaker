let prefix = ''

export function log(...messages: string[]) {
  if (process.env.NODE_ENV !== 'production') {
    if (prefix) {
      console.log(`[${prefix}]:`, ...messages)
    } else {
      console.log(...messages)
    }
  }
}

log.prefix = function (newPrefix: string) {
  prefix = newPrefix
}
