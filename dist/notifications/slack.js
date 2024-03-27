"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlackNotification = exports.SlackChannels = void 0;
const webhook_1 = require("@slack/webhook");
const base_index_1 = require("../base/base.index");
const NOTIFICATION_URL = 'https://hooks.slack.com/services/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';
var SlackChannels;
(function (SlackChannels) {
    SlackChannels["logout"] = "https://hooks.slack.com/services/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";
    SlackChannels["autologins"] = "https://hooks.slack.com/services/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";
    SlackChannels["proxyAlerts"] = "https://hooks.slack.com/services/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";
})(SlackChannels || (exports.SlackChannels = SlackChannels = {}));
class SlackNotification extends base_index_1.BaseObject {
    constructor() {
        super();
        this._webhook = new webhook_1.IncomingWebhook(NOTIFICATION_URL);
    }
    send(text, params) {
        if (params === null || params === void 0 ? void 0 : params.webhookUrl) {
            const webhook = new webhook_1.IncomingWebhook(params.webhookUrl);
            return webhook.send({
                text,
            });
        }
        return this._webhook.send({
            text,
        });
    }
}
exports.SlackNotification = SlackNotification;
