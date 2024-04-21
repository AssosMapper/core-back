import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';
import { IsMatch } from '../decorators/IsMatchConstraint.decorator';

export class PasswordResetDto {
  @ApiProperty({
    description: 'The new password',
    example: 'MyNewPassword123!',
    default: 'MyNewPassword123!',
  })
  @IsStrongPassword()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'The new password confirmation',
    example: 'MyNewPassword123!',
    default: 'MyNewPassword123!MyNewPassword123!',
  })
  @IsStrongPassword()
  @IsString()
  @IsMatch('password')
  passwordConfirmation: string;
}
