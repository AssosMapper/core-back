import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsMatch } from '../../decorators/IsMatchConstraint.decorator';

export class CreateUserDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({
    description: 'Email',
    default: 'john.doe@example.com',
    nullable: true,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Username',
    default: 'username',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @ApiProperty({
    description: 'Password',
    default: 'password123!',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @IsMatch('password')
  @ApiProperty({
    description: 'Confirm Password',
    default: 'Password123!',
  })
  confirm_password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'First name',
    default: 'John',
    nullable: true,
  })
  firstName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Last name',
    default: 'Doe',
    nullable: true,
  })
  lastName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Phone number',
    default: '1234567890',
    nullable: true,
  })
  phone: string;
}
