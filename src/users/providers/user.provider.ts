import { User } from '../entities/user.entity';

export const UserProvider = {
  provide: 'USER_REPOSITORY',
  useFactory: (dataSource: { getRepository: (arg0: typeof User) => any }) =>
    dataSource.getRepository(User),
  inject: ['DATA_SOURCE'],
};
