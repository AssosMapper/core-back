import { Inject, Injectable } from '@nestjs/common';
import { Permission } from '../../permissions/entities/permission.entity';
import { DataSource, Repository } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

@Injectable()
export class RoleSeedService {
  constructor(
    @Inject('PERMISSION_REPOSITORY')
    private readonly permissionRepository: Repository<Permission>,
    @Inject('ROLE_REPOSITORY')
    private readonly roleRepository: Repository<Role>,
    @Inject('DATA_SOURCE')
    private readonly datasource: DataSource,
  ) {}

  async seed() {
    await this.drop();
    let superPermission = await this.permissionRepository.findOne({
      where: { permission: '*' },
    });
    if (!superPermission) {
      console.log('Permission * not found');
      return;
    }
    //create roles
    let roles = [] as Array<Role>;
    let role = new Role();
    role.name = 'SuperAdmin';
    // assign permission with name * to SuperAdmin
    role.permissions = [superPermission];
    roles.push(role);
    console.log('Seeding roles...');
    await this.roleRepository.save(roles);
    console.log('Seeded roles...');
  }

  async drop() {
    console.log('Dropping roles...');
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(`DELETE FROM user_roles_role`);
      await queryRunner.query(`DELETE FROM role`);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    console.log('Dropped roles...');
  }
}
