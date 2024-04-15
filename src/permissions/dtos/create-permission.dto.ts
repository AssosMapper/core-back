import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @IsString()
  @ApiProperty({
    description: 'permission',
    default: 'create:permission',
  })
  permission: string;
}
