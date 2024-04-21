import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async askResetPasswordToken(email: string, token: string) {
    const link =
      this.configService.get('APP_URL') + '/reset-password?token=' + token;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Password reset request',
      template: 'ask-password-reset',
      context: {
        link,
      },
    });
  }
}
