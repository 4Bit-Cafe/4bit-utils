import EventEmitter from "events";
import { Logger } from "../logger/logger.index";
import { RetryPromiseParams } from "./interfaces/i-base";

export class BaseObject {
  protected _logger: Logger;
  protected _eventEmitter: EventEmitter = new EventEmitter();

  constructor() {
    this._logger = new Logger(this.constructor.name);
    this._eventEmitter.setMaxListeners(Infinity);
  }

  async waitForMs(ms: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }

  async retryPromise(dto: RetryPromiseParams): Promise<any> {
    const { params, func, retryCount, _currentRetryCount } = dto;
    this._logger.info('RetryCount:', _currentRetryCount);

    let shouldRetry = false;
    let result = null;
    try {
      result = await func(params);
    } catch (e) {
      this._logger.error('Failed:', e);
      if (_currentRetryCount >= retryCount) {
        throw e;
      }
      shouldRetry = true;
    }

    if (!shouldRetry) {
      return result;
    }
    this._logger.info('Function failed, going to retry after waiting ' + (dto.retryDelay || 5_000) + ' ms');
    await this.waitForMs(dto.retryDelay || 5_000);
    this._logger.info('Retrying...');
    return this.retryPromise({
      ...dto,
      _currentRetryCount: _currentRetryCount + 1
    });
  }

  delete() {
    this._eventEmitter.removeAllListeners();
  }
}