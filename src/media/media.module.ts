import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [MediaController],
  imports: [
    UsersModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
      serveStaticOptions: {
        index: false,
      },
    }),
  ],
  providers: [MediaService],
})
export class MediaModule {}
