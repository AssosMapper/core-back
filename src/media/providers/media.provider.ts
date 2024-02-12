import { Media } from '../entities/media.entity';

export const MediaProvider = {
  provide: 'MEDIA_REPOSITORY',
  useFactory: (dataSource: { getRepository: (arg0: typeof Media) => any }) =>
    dataSource.getRepository(Media),
  inject: ['DATA_SOURCE'],
};
