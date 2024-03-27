"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseObject = void 0;
const events_1 = __importDefault(require("events"));
const logger_index_1 = require("../logger/logger.index");
class BaseObject {
    constructor() {
        this._eventEmitter = new events_1.default();
        this._logger = new logger_index_1.Logger(this.constructor.name);
        this._eventEmitter.setMaxListeners(Infinity);
    }
    waitForMs(ms) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, ms);
            });
        });
    }
    retryPromise(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { params, func, retryCount, _currentRetryCount } = dto;
            this._logger.info('RetryCount:', _currentRetryCount);
            let shouldRetry = false;
            let result = null;
            try {
                result = yield func(params);
            }
            catch (e) {
                this._logger.error('Failed:', e);
                if (_currentRetryCount >= retryCount) {
                    throw e;
                }
                shouldRetry = true;
            }
            if (!shouldRetry) {
                return result;
            }
            this._logger.info('Function failed, going to retry after waiting ' + (dto.retryDelay || 5000) + ' ms');
            yield this.waitForMs(dto.retryDelay || 5000);
            this._logger.info('Retrying...');
            return this.retryPromise(Object.assign(Object.assign({}, dto), { _currentRetryCount: _currentRetryCount + 1 }));
        });
    }
    delete() {
        this._eventEmitter.removeAllListeners();
    }
}
exports.BaseObject = BaseObject;
