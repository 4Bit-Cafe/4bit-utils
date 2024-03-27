/// <reference types="node" />
import EventEmitter from "events";
import { Logger } from "../logger/logger.index";
import { RetryPromiseParams } from "./interfaces/i-base";
export declare class BaseObject {
    protected _logger: Logger;
    protected _eventEmitter: EventEmitter;
    constructor();
    waitForMs(ms: number): Promise<unknown>;
    retryPromise(dto: RetryPromiseParams): Promise<any>;
    delete(): void;
}
//# sourceMappingURL=base.index.d.ts.map