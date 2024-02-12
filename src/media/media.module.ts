import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MediaProvider } from './providers/media.provider';
import { DatabaseModule } from '../database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  controllers: [MediaController],
  imports: [
    DatabaseModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
      serveStaticOptions: {
        index: false,
      },
    }),
  ],
  providers: [MediaProvider, MediaService],
})
export class MediaModule {}
