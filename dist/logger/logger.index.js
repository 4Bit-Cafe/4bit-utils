"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
const debug_1 = __importDefault(require("debug"));
const moment_1 = __importDefault(require("moment"));
let transport;
let forceConsole = false;
let globalPrefix = '';
class Logger {
    constructor(namespace) {
        this.verbose = true;
        this.namespace = '';
        this.useCloudwatch = process.env.ENABLE_CLOUDWATCH_LOGS === 'true' || false;
        this.debugLogger = (0, debug_1.default)(namespace);
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
    enableCloudwatch(enable) {
        this.useCloudwatch = enable;
    }
    enableConsoleLog(enable) {
        forceConsole = enable;
    }
    setVerbose(verbose) {
        this.verbose = verbose;
    }
    setGlobalPrefix(prefix) {
        globalPrefix = prefix;
    }
    setNamespace(namespace) {
        this.namespace = namespace;
        this.debugLogger = (0, debug_1.default)(this.namespace);
    }
    debug(...args) {
        if (forceConsole) {
            console.log(...args);
        }
        else {
            this.debugLogger(...args);
        }
    }
    info(...params) {
        let timestamp = (0, moment_1.default)().format('lll');
        if (this.useCloudwatch) {
            this.winstonLogger.log({
                level: 'info',
                message: [globalPrefix, chalk_1.default.yellow('[INFO]'), ...params].join(' '),
            });
        }
        this.verbose &&
            this.debug(...[globalPrefix, chalk_1.default.greenBright(`[${timestamp}]`), chalk_1.default.yellow('[INFO]'), ...params]);
    }
    log(...params) {
        this.verbose && this.debug(...[chalk_1.default.blueBright('[LOG]'), ...params]);
    }
    error(...params) {
        if (this.useCloudwatch) {
            this.winstonLogger.log({
                level: 'error',
                message: [globalPrefix, chalk_1.default.red('[ERROR]'), ...params].join(' '),
            });
        }
        this.verbose && this.debug(...[globalPrefix, chalk_1.default.red('[ERROR]'), ...params]);
    }
    warn(...params) {
        if (this.useCloudwatch) {
            this.winstonLogger.log({
                level: 'warn',
                message: [globalPrefix, chalk_1.default.yellow('[WARN]'), ...params].join(' '),
            });
        }
        this.verbose && this.debug(...[globalPrefix, chalk_1.default.yellow('[WARN]'), ...params]);
    }
}
exports.Logger = Logger;
