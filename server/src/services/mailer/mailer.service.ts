import { Injectable, Inject } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as htmlToText from 'html-to-text';
import { Logger } from 'winston';
import * as path from 'path';
import * as util from 'util';
import * as fs from 'fs';

import { mailConfig } from '@configs/mail.config';

/**
 * SMTP和POP3说明
 * https://www.liaoxuefeng.com/wiki/1016959663602400/1017790556023936
 */

// 尽量中文，内容变化真实点，subject上不要带测试验证码等文字
// 不然容易被当成垃圾邮件，邮件服务器拒绝发送
interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

@Injectable()
export class MailerService {
  templates: string;
  readFile: any;
  transporter: any;

  constructor(@Inject('mamafish') private readonly logger: Logger) {
    try {
      this.transporter = nodemailer.createTransport(mailConfig);
      this.templates = path.resolve(__dirname, './');
      this.readFile = util.promisify(fs.readFile);
    } catch (error) {
      this.logger.error({
        message: 'errror in init template',
      });
    }
  }

  private returnMailOptions({
    to,
    subject, // 主题，这个尽量变化，多次发送相同主题被拒发
    text, // text内容，需要带上，不然大概率被当垃圾邮件
    html, // html内容，以html为准
  }: Partial<MailOptions>): MailOptions {
    return {
      // 最好不带昵称，'麻麻鱼<15215212143@163.com>'，这种163会当垃圾邮件
      from: '15215212143@163.com',
      to,
      subject,
      text,
      html,
    };
  }

  private async prepareTemplate(filename, options): Promise<any> {
    try {
      const templatePath = path.resolve(this.templates, `${filename}.html`);
      const content = await this.readFile(templatePath, 'utf8');
      const template = handlebars.compile(content);
      const html: string = template(options);
      const text: string = htmlToText.fromString(html);
      return await { html, text };
    } catch (error) {
      this.logger.error({
        message: 'errror in prepare template',
      });
    }
  }

  async sendVerificationMail(
    to: string,
    type: string,
    captcha: number,
    account: string,
  ): Promise<any> {
    const { html, text } = await this.prepareTemplate('verification', {
      type,
      account,
      captcha,
    });
    const options = this.returnMailOptions({
      to,
      text,
      html,
      subject: `【麻麻鱼】${account}主人，您此次${type}，请尽快处理`,
    });
    return await this.transporter.sendMail(options);
  }

  async sendNotificationMail(
    to: string,
    notice: string,
    account: string,
  ): Promise<any> {
    const { html, text } = await this.prepareTemplate('notification', {
      notice,
      account,
    });
    const options = this.returnMailOptions({
      to,
      text,
      html,
      subject: `【麻麻鱼】${account}主人，来了一份文件，请您指示`,
    });
    return await this.transporter.sendMail(options);
  }
}
