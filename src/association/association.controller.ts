import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AssociationService } from './association.service';
import { CreateAssociationDto } from './dto/create-association.dto';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { ApiPaginationQuery } from '../decorators/ApiPaginationQuery.decorator';
import { Association } from './entities/association.entity';
import { NeedPermissions } from '../decorators/need-permission.decorator';
import { BearAuthToken } from '../decorators/BearerAuth.decorator';

@ApiTags('Associations')
@Controller({
  path: 'associations',
  version: '1',
})
export class AssociationController {
  constructor(private readonly associationService: AssociationService) {}

  @NeedPermissions('association:create')
  @BearAuthToken()
  @Post()
  create(@Body() createAssociationDto: CreateAssociationDto) {
    return this.associationService.create(createAssociationDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: Paginated<Association> })
  @ApiPaginationQuery({ canSelect: false })
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Association>> {
    return this.associationService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.associationService.findOne(id);
  }

  @Patch(':id')
  @NeedPermissions('association:update')
  @BearAuthToken()
  update(
    @Param('id') id: string,
    @Body() updateAssociationDto: UpdateAssociationDto,
  ) {
    return this.associationService.update(id, updateAssociationDto);
  }

  @Delete(':id')
  @NeedPermissions('association:delete')
  @BearAuthToken()
  remove(@Param('id') id: string) {
    return this.associationService.remove(id);
  }
}
