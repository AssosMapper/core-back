import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class RolesService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private readonly rolesRepository: Repository<Role>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const existingRole = await this.rolesRepository.findOne({
      where: {
        name: createRoleDto.name,
      },
    });
    if (existingRole) {
      // throw duplicate error
      throw new HttpException('Role with this name already exists', 409);
    }
    const role = new Role();
    role.name = createRoleDto.name;
    role.description = createRoleDto.description;
    return await this.rolesRepository.save(role);
  }

  findAll(query: PaginateQuery): Promise<Paginated<Role>> {
    return paginate(query, this.rolesRepository, {
      sortableColumns: ['id', 'name', 'createdAt', 'updatedAt'],
      defaultSortBy: [['id', 'ASC']],
      searchableColumns: ['name'],
      select: ['id', 'name', 'description'],
      ignoreSelectInQueryParam: true,
    });
  }

  async findOne(id: string): Promise<Role | null> {
    return await this.rolesRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: string, updateRoleDto: UpdateRoleDto) {
    let role = this.rolesRepository.findOne({
      where: {
        id,
      },
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return this.rolesRepository.update(id, updateRoleDto);
  }

  remove(id: string) {
    return this.rolesRepository.delete(id);
  }
}
