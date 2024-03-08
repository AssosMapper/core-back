import { Permission } from '../entities/permission.entity';

export const PermissionProvider = {
  provide: 'PERMISSION_REPOSITORY',
  useFactory: (dataSource: {
    getRepository: (arg0: typeof Permission) => any;
  }) => dataSource.getRepository(Permission),
  inject: ['DATA_SOURCE'],
};
