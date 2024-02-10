import { Module } from '@nestjs/common';
import { DatabaseProvider } from './databaseProvider';

@Module({
  providers: [DatabaseProvider],
  exports: [DatabaseProvider],
})
export class DatabaseModule {}
