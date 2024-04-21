import {
  Body,
  Controller,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';
import { AskPasswordResetDto } from './dto/ask-password-reset.dto';
import { AppService } from './app.service';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { PasswordResetDto } from './dto/password-reset.dto';
import { UsersService } from './users/users.service';
import { ApiTags } from '@nestjs/swagger';
import { EmailService } from './email/email.service';

@ApiTags('Public')
@Controller({
  path: 'public',
  version: '1',
})
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  // ask for a password reset
  @Post('ask-password-reset')
  async askPasswordReset(@Body() askPasswordResetDto: AskPasswordResetDto) {
    await this.appService.askPasswordReset(askPasswordResetDto);
  }

  // reset the password
  @Post('reset-password')
  async resetPassword(
    @Query('token') token: string,
    @Body() passwordResetDto: PasswordResetDto,
  ) {
    return await this.appService.resetPassword(token, passwordResetDto);
  }
}
