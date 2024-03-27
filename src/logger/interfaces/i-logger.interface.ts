interface ILogger {
  info(...args: any[]): any;
  log(...args: any[]): any;
  error(...args: any[]): any;
}

export { ILogger };
