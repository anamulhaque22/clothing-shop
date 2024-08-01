import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

import { MailerService } from 'src/mailer/mailer.service';
import { MailData } from './interfaces/mail-data.imterface';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async userSignUp(mailData: MailData<{ hash: string }>): Promise<void> {
    const emailConfirmTitle = 'Confirm email';
    const text1 = 'Hey!';
    const text2 = 'You’re almost ready to start enjoying';
    const text3 =
      'Simply click the big green button below to verify your email address.';

    const url = new URL(
      this.configService.getOrThrow(
        'app.frontendDomain',
        { infer: true } + '/confirm-email',
      ),
    );

    url.searchParams.set('hash', mailData.data.hash);

    await this.mailerService.sendMail({
      to: mailData.to,
      subject: emailConfirmTitle,
      text: `${url.toString()} ${emailConfirmTitle}`,
      templatePath: path.join(
        this.configService.getOrThrow('app.workingDirectory', { infer: true }),
        'src',
        'mail',
        'mail-templates',
        'activation.hbs',
      ),
      context: {
        title: emailConfirmTitle,
        url: url.toString(),
        actionTitle: emailConfirmTitle,
        app_name: this.configService.getOrThrow('app.name', { infer: true }),
        text1,
        text2,
        text3,
      },
    });
  }
}
