import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AskPasswordResetDto {
  @ApiProperty({
    description: 'The email of the user to ask for a password reset',
    example: 'admin@mail.com',
    default: 'admin@mail.com',
  })
  @IsEmail()
  @IsString()
  email: string;
}
