import { Inject, Injectable } from '@nestjs/common';
import { Permission } from '../../permissions/entities/permission.entity';
import { DataSource, Repository } from 'typeorm';
import { join } from 'path';
import { readdirSync, readFileSync, statSync } from 'fs';

@Injectable()
export class PermissionSeedService {
  constructor(
    @Inject('PERMISSION_REPOSITORY')
    private readonly permissionRepository: Repository<Permission>,
    @Inject('DATA_SOURCE')
    private readonly datasource: DataSource,
  ) {}

  async seed() {
    await this.drop();
    let entities = this.findEntities(join(__dirname, '../../'));
    console.log('Entities found: ', entities);
    let policies = [] as Array<Permission>;
    let permission = new Permission();
    permission.permission = '*';
    policies.push(permission);
    for (let entity of entities) {
      permission = new Permission();
      permission.permission = (entity + ':create').toLowerCase();
      policies.push(permission);
      permission = new Permission();
      permission.permission = (entity + ':read').toLowerCase();
      policies.push(permission);
      permission = new Permission();
      permission.permission = (entity + ':list').toLowerCase();
      policies.push(permission);
      permission = new Permission();
      permission.permission = (entity + ':update').toLowerCase();
      policies.push(permission);
      permission = new Permission();
      permission.permission = (entity + ':delete').toLowerCase();
      policies.push(permission);
    }
    //create permissions
    console.log('Seeding permissions...');
    await this.permissionRepository.save(policies);
    console.log('Seeded permissions...');
  }

  async drop() {
    console.log('Dropping permissions...');
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(`DELETE FROM role_permissions_permission`);
      await queryRunner.query(`DELETE FROM permission`);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    console.log('Dropped permissions...');
  }

  private findEntities(directory: string): string[] {
    let entities: string[] = [];

    const files = readdirSync(directory);
    for (const file of files) {
      const fullPath = join(directory, file);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        entities = entities.concat(this.findEntities(fullPath));
      } else if (file.match(/\.entity\.(ts|js)$/)) {
        const className = this.getClassName(fullPath);
        if (className) {
          entities.push(className);
        }
      }
    }
    return entities;
  }

  private getClassName(filePath: string): string | null {
    const content = readFileSync(filePath, 'utf8');
    const classMatch = content.match(/class (\w+)/);
    return classMatch ? classMatch[1] : null;
  }
}
