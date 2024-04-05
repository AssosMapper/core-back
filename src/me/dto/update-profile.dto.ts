import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({
    description: 'Email',
    default: 'john.doe@example.com',
    nullable: true,
  })
  email: string;

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
