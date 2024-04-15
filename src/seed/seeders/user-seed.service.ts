// seed/user.seed.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { OnDev } from '../../decorators/on-dev.decorator';
import { User } from '../../users/entities/user.entity';
import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import { hashPassword } from '../../utils/auth.utils';
import { Role } from '../../roles/entities/role.entity';

@Injectable()
export class UserSeedService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    @Inject('ROLE_REPOSITORY')
    private readonly roleRepository: Repository<Role>,
  ) {}

  @OnDev()
  async seed() {
    await this.drop();
    const users = [];
    for (let i = 0; i < 100; i++) {
      const user = new User();
      user.firstName = faker.person.firstName();
      user.lastName = faker.person.lastName();
      user.email = faker.internet.email();
      user.username = faker.internet.userName();
      user.phone = faker.phone.number();
      user.password = faker.internet.password();
      users.push(user);
    }
    //create custom user
    //find role SuperAdmin
    let superAdminRole = await this.roleRepository.findOne({
      where: { name: 'SuperAdmin' },
    });
    if (!superAdminRole) {
      console.log('Role SuperAdmin not found');
      return;
    }
    const user = new User();
    user.firstName = 'Admin';
    user.lastName = 'Admin';
    user.username = 'username';
    user.password = await hashPassword('Password123!');
    user.roles = [superAdminRole];
    users.push(user);
    console.log('Seeding users...');
    await this.userRepository.save(users);
    console.log('Seeded users...');
  }

  private async drop() {
    console.log('Dropping users...');
    await this.userRepository.delete({});
    console.log('Dropped users...');
  }
}
