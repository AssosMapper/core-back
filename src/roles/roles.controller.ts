import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiPaginationQuery } from '../decorators/ApiPaginationQuery.decorator';
import { Role } from './entities/role.entity';

@ApiTags('Roles')
// @BearAuthToken()
@Controller({
  path: 'roles',
  version: '1',
})
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: Paginated<Role> })
  @ApiPaginationQuery({ canSelect: false })
  findAll(@Paginate() query: PaginateQuery) {
    return this.rolesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
