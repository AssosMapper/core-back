import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { AskPasswordResetDto } from './dto/ask-password-reset.dto';
import { UsersService } from './users/users.service';
import { EmailService } from './email/email.service';
import { PasswordResetDto } from './dto/password-reset.dto';
import { Repository } from 'typeorm';
import { ResetToken } from './users/entities/reset-token.entity';

@Injectable()
export class AppService {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    @Inject('RESETTOKEN_REPOSITORY')
    private readonly resetTokenRepository: Repository<ResetToken>,
  ) {}
  async askPasswordReset(askPasswordResetDto: AskPasswordResetDto) {
    // find user by email
    const user = await this.usersService.findByEmailWith(
      askPasswordResetDto.email,
      ['resetTokens'],
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }
    let token;
    let hashedToken;
    // check if user has a reset token
    if (user.resetTokens.length > 0) {
      // check if the reset token is still valid
      const resetToken = user.resetTokens.reduce((prev, current) => {
        return prev.createdAt > current.createdAt ? prev : current;
      });
      if (resetToken.expirationDate > new Date() && !resetToken.used) {
        hashedToken = resetToken.token;
      } else {
        token = uuidv4();
        //crypt the token
        hashedToken = await bcrypt.hash(token, 10);
        await this.usersService.addResetToken(user, hashedToken);
      }
    } else {
      token = uuidv4();
      //crypt the token
      hashedToken = await bcrypt.hash(token, 10);
      await this.usersService.addResetToken(user, hashedToken);
    }
    // send email
    await this.emailService.askResetPasswordToken(
      askPasswordResetDto.email,
      encodeURIComponent(hashedToken),
    );
    return {
      hashedToken,
    };
  }

  async resetPassword(token: string, passwordResetDto: PasswordResetDto) {
    //find reset token
    token = decodeURIComponent(token);
    const resetToken = await this.resetTokenRepository.findOne({
      where: { token },
      relations: ['user'],
    });
    if (!resetToken) {
      throw new UnauthorizedException('Invalid token');
    }
    // check if the token is still valid
    if (resetToken.expirationDate < new Date() || resetToken.used) {
      throw new UnauthorizedException('Token expired');
    }
    // update password
    const user = resetToken.user;
    user.password = await bcrypt.hash(passwordResetDto.password, 10);
    await this.usersService.update(user.id, user);
    // update reset token to used status
    resetToken.used = true;
    await this.resetTokenRepository.save(resetToken);
    return {
      message: 'Password updated',
    };
  }
}
