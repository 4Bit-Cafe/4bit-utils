import { BaseObject } from '../base/base.index';
export declare enum SlackChannels {
    logout = "https://hooks.slack.com/services/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",
    autologins = "https://hooks.slack.com/services/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",
    proxyAlerts = "https://hooks.slack.com/services/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"
}
export declare class SlackNotification extends BaseObject {
    private _webhook;
    constructor();
    send(text: string, params?: {
        webhookUrl: SlackChannels;
    }): any;
}
//# sourceMappingURL=slack.d.ts.map