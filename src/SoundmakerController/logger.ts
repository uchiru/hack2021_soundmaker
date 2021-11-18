export function log(...messages: any[]) {
  if (process.env.NODE_ENV !== 'production' || log.level === 0) {
    console.log(Math.round(Date.now() % 10000), ...messages);
  }
}

log.verbose = function (...messages: any[]) {
  if (log.level > 1) {
    log(...messages);
  }
};

log.level = 1;
