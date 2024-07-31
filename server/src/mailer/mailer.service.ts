import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Handlebars from 'handlebars';
import fs from 'node:fs/promises';
import { createTransport, SendMailOptions, Transporter } from 'nodemailer';
import { AllConfigType } from 'src/config/config.type';
@Injectable()
export class MailerService {
  private transporter: Transporter;

  constructor(private readonly configService: ConfigService<AllConfigType>) {
    this.transporter = createTransport({
      host: this.configService.get('mail.host', { infer: true }),
      port: this.configService.get('mail.port', { infer: true }),
      ignoreTLS: this.configService.get('mail.ignoreTLS', { infer: true }),
      secure: this.configService.get('mail.secure', { infer: true }),
      requireTLS: this.configService.get('mail.requireTLS', { infer: true }),
      auth: {
        user: this.configService.get('mail.user', { infer: true }),
        pass: this.configService.get('mail.password', { infer: true }),
      },
    });

    this.transporter
      .verify()
      .then(() => {
        console.log('connnection successful');
      })
      .catch((error) => {
        console.error('Error verifying mail transporter', error);
      });
  }

  async sendMail({
    templatePath,
    context,
    ...mailOptions
  }: SendMailOptions & {
    templatePath: string;
    context: Record<string, unknown>;
  }): Promise<void> {
    let html: string | undefined;

    if (templatePath) {
      const template = await fs.readFile(templatePath, 'utf-8');

      html = Handlebars.compile(template, { strict: true })(context);

      await this.transporter.sendMail({
        ...mailOptions,
        from: mailOptions.from
          ? mailOptions.from
          : `"${this.configService.get('mail.defaultName', {
              infer: true,
            })}" <${this.configService.get('mail.defaultEmail', {
              infer: true,
            })}>`,
        html: mailOptions.html ? mailOptions.html : html,
      });
    }
  }
}
