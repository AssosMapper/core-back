import { Controller, Inject, Injectable } from '@nestjs/common';
import { CreateAssociationDto } from './dto/create-association.dto';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { Repository } from 'typeorm';
import { Association } from './entities/association.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { BearAuthToken } from '../decorators/BearerAuth.decorator';
import { NeedPermissions } from '../decorators/need-permission.decorator';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
@ApiTags('Associations')
@Controller({
  path: 'associations',
  version: '1',
})
export class AssociationService {
  constructor(
    @Inject('ASSOCIATION_REPOSITORY')
    private readonly associationRepository: Repository<Association>,
  ) {}

  @BearAuthToken()
  @NeedPermissions('association:create')
  create(createAssociationDto: CreateAssociationDto) {
    return this.associationRepository.save(createAssociationDto);
  }
  findAll(query: PaginateQuery) {
    return paginate(query, this.associationRepository, {
      sortableColumns: [
        'id',
        'name',
        'email',
        'rup',
        'rna',
        'createdAt',
        'updatedAt',
      ],
      defaultSortBy: [['id', 'ASC']],
      relations: ['staff'],
      searchableColumns: [
        'name',
        'email',
        'rup',
        'rna',
        'createdAt',
        'updatedAt',
      ],
      select: [
        'id',
        'name',
        'rna',
        'rup',
        'siret_number',
        'activity',
        'bylaws',
        'country',
        'city',
        'description',
        'email',
        'number_phone',
        'legal_status',
        'postal_code',
        'createdAt',
        'updatedAt',
      ],
      ignoreSelectInQueryParam: true,
    });
  }

  findOne(id: string) {
    return this.associationRepository.findOne({
      where: { id },
      relations: ['staff'],
    });
  }
  @BearAuthToken()
  @NeedPermissions('association:update')
  update(id: string, updateAssociationDto: UpdateAssociationDto) {
    //TODO: Implement update association
    return `This action updates a #${id} association`;
  }
  @BearAuthToken()
  @NeedPermissions('association:delete')
  remove(id: string) {
    return this.associationRepository.delete(id);
  }
}
