import { Module, DynamicModule, Global } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DatabaseProvider } from './databaseProvider';

@Global()
@Module({})
export class DatabaseModule {
  static forRoot(entities: any[]): DynamicModule {
    const providers = entities.map((entity) => ({
      provide: `${entity.name.toUpperCase()}_REPOSITORY`,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
      inject: ['DATA_SOURCE'],
    }));

    return {
      module: DatabaseModule,
      providers: [...providers, DatabaseProvider],
      exports: providers,
    };
  }
}
