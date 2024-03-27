import { ILogger } from './interfaces/i-logger.interface';
export declare class Logger implements ILogger {
    private verbose;
    private namespace;
    private debugLogger;
    private useCloudwatch;
    private winstonLogger;
    constructor(namespace: string);
    enableCloudwatch(enable: boolean): void;
    enableConsoleLog(enable: boolean): void;
    setVerbose(verbose: boolean): void;
    setGlobalPrefix(prefix: string): void;
    setNamespace(namespace: string): void;
    debug(...args: any[]): void;
    info(...params: any[]): void;
    log(...params: any[]): void;
    error(...params: any[]): void;
    warn(...params: any[]): void;
}
//# sourceMappingURL=logger.index.d.ts.map