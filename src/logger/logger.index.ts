import { ILogger } from './interfaces/i-logger.interface';
import chalk from 'chalk';
import debug from 'debug';
import moment from 'moment';

let transport;

let forceConsole: boolean = false;
let globalPrefix: string = '';

export class Logger implements ILogger {
  private verbose: boolean = true;
  private namespace: string = '';
  private debugLogger;
  private useCloudwatch: boolean = process.env.ENABLE_CLOUDWATCH_LOGS === 'true' || false;
  private winstonLogger: any;

  constructor(namespace: string) {
    this.debugLogger = debug(namespace);
    this.debugLogger.transport;
    this.namespace = namespace;
    // if (this.useCloudwatch) {
    //   if (!transport) {
    //     const WinstonCloudWatch = require('winston-cloudwatch');
    //     transport = new WinstonCloudWatch({
    //       level: 'info',
    //       logGroupName: 'client-app',
    //       logStreamName: process.env.LOG_STREAM_NAME || 'frontend-service',
    //       awsOptions: {
    //         credentials: {
    //           accessKeyId: 'AKIA36H3SEFGTY6DD2HG',
    //           secretAccessKey: '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',
    //         },
    //         region: 'us-east-1',
    //       },
    //     });
    //   }
    //   const { createLogger, format } = require('winston');
    //   this.winstonLogger = createLogger({
    //     level: 'debug',
    //     format: format.json(),
    //     transports: [transport],
    //   });
    // }
  }

  enableCloudwatch(enable: boolean) {
    this.useCloudwatch = enable;
  }

  enableConsoleLog(enable: boolean) {
    forceConsole = enable;
  }

  setVerbose(verbose: boolean) {
    this.verbose = verbose;
  }

  setGlobalPrefix(prefix: string) {
    globalPrefix = prefix;
  }

  setNamespace(namespace: string) {
    this.namespace = namespace;
    this.debugLogger = debug(this.namespace);
  }

  debug(...args) {
    if (forceConsole) {
      console.log(...args);
    } else {
      this.debugLogger(...args);
    }
  }

  info(...params: any[]) {
    let timestamp = moment().format('lll');
    if (this.useCloudwatch) {
      this.winstonLogger.log({
        level: 'info',
        message: [globalPrefix, chalk.yellow('[INFO]'), ...params].join(' '),
      });
    }
    this.verbose &&
      this.debug(
        ...[globalPrefix, chalk.greenBright(`[${timestamp}]`), chalk.yellow('[INFO]'), ...params],
      );
  }
  log(...params: any[]) {
    this.verbose && this.debug(...[chalk.blueBright('[LOG]'), ...params]);
  }
  error(...params: any[]) {
    if (this.useCloudwatch) {
      this.winstonLogger.log({
        level: 'error',
        message: [globalPrefix, chalk.red('[ERROR]'), ...params].join(' '),
      });
    }
    this.verbose && this.debug(...[globalPrefix, chalk.red('[ERROR]'), ...params]);
  }
  warn(...params: any[]) {
    if (this.useCloudwatch) {
      this.winstonLogger.log({
        level: 'warn',
        message: [globalPrefix, chalk.yellow('[WARN]'), ...params].join(' '),
      });
    }
    this.verbose && this.debug(...[globalPrefix, chalk.yellow('[WARN]'), ...params]);
  }
}
