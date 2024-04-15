import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateMediaDto {
  @ApiProperty({
    description: 'Title of the media',
    required: false,
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    description: 'Description of the media',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  file: Express.Multer.File;
}
