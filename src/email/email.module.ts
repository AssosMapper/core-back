import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as process from 'node:process';
import * as fs from 'fs';

@Module({
  controllers: [EmailController],
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          transport: {
            host: configService.get<string>('SMTP_HOST'),
            port: configService.get<number>('SMTP_PORT'),
            ignoreTLS: configService.get<string>('SMTP_IGNORE_TLS') === 'true',
            secure: configService.get<string>('SMTP_SECURE') === 'true',
            auth: {
              user: configService.get<string>('SMTP_USER') ?? '',
              pass: configService.get<string>('SMTP_PASSWORD') ?? '',
            },
          },
          defaults: {
            from: configService.get<string>('EMAIL_FROM'),
          },
          preview: configService.get<string>('NODE_ENV') !== 'prod',
          template: {
            dir: process.cwd() + '/src/email/templates/pages',
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
          options: {
            partials: {
              dir: process.cwd() + '/src/email/templates/partials',
              options: {
                strict: true,
              },
            },
          },
        };
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
