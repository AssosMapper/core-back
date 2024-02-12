import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MediaProvider } from './providers/media.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [MediaController],
  imports: [DatabaseModule],
  providers: [MediaProvider, MediaService],
})
export class MediaModule {}
