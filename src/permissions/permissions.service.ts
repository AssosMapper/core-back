import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @Inject('PERMISSION_REPOSITORY')
    private readonly permissionRepository: Repository<Permission>,
  ) {}
  async createMany(data: Array<Permission>) {
    //create many permissions
    return this.permissionRepository.save(data);
  }
  async seed() {
    //drop all permissions
    await this.permissionRepository.delete({});
    let entities = this.findEntities(path.join(__dirname, '../'));
    let policies = [] as Array<Permission>;
    for (let entity of entities) {
      let permission = new Permission();
      permission.permission = entity + ':create';
      policies.push(permission);
      permission = new Permission();
      permission.permission = entity + ':readOne';
      policies.push(permission);
      permission = new Permission();
      permission.permission = entity + ':readMany';
      policies.push(permission);
      permission = new Permission();
      permission.permission = entity + ':readOwn';
      policies.push(permission);
      permission = new Permission();
      permission.permission = entity + ':update';
      policies.push(permission);
      permission = new Permission();
      permission.permission = entity + ':delete';
      policies.push(permission);
    }
    //create permissions
    console.log('Seeding permissions...');
    return await this.createMany(policies);
  }

  private findEntities(directory: string): string[] {
    let entities: string[] = [];

    const files = fs.readdirSync(directory);
    for (const file of files) {
      const fullPath = path.join(directory, file);
      const stat = fs.statSync(fullPath);

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
    const content = fs.readFileSync(filePath, 'utf8');
    const classMatch = content.match(/class (\w+)/);
    return classMatch ? classMatch[1] : null;
  }
}
