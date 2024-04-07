import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Name of the role',
    default: 'Admin',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the role',
    default: 'This is a role',
  })
  @IsString()
  @IsOptional()
  description: string;
}
