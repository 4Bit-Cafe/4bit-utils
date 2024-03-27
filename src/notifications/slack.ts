import { IncomingWebhook } from '@slack/webhook';
import { BaseObject } from '../base/base.index';

const NOTIFICATION_URL =
  'https://hooks.slack.com/services/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';

export enum SlackChannels {
  logout = 'https://hooks.slack.com/services/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',
  autologins = 'https://hooks.slack.com/services/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',
  proxyAlerts = 'https://hooks.slack.com/services/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',
}

export class SlackNotification extends BaseObject {
  private _webhook;

  constructor() {
    super();

    this._webhook = new IncomingWebhook(NOTIFICATION_URL);
  }

  send(
    text: string,
    params?: {
      webhookUrl: SlackChannels;
    },
  ) {
    if (params?.webhookUrl) {
      const webhook = new IncomingWebhook(params.webhookUrl);
      return webhook.send({
        text,
      });
    }
    return this._webhook.send({
      text,
    });
  }
}
