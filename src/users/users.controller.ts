import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { ApiPaginationQuery } from '../decorators/ApiPaginationQuery.decorator';
import { BearAuthToken } from '../decorators/BearerAuth.decorator';
import { NeedPermissions } from '../decorators/need-permission.decorator';

@ApiTags('Users')
@BearAuthToken()
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @NeedPermissions('user:create')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: Paginated<User> })
  @ApiPaginationQuery({ canSelect: false })
  @NeedPermissions('user:list')
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<User>> {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  @NeedPermissions('user:read')
  findOne(@Param('id') id: string): Promise<Omit<User, 'password'>> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @NeedPermissions('user:update')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @NeedPermissions('user:delete')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
