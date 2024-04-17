// seed/user.seed.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { OnDev } from '../../decorators/on-dev.decorator';
import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import { Association } from '../../association/entities/association.entity';

@Injectable()
export class AssociationSeedService {
  constructor(
    @Inject('ASSOCIATION_REPOSITORY')
    private readonly associationRepository: Repository<Association>,
  ) {}

  @OnDev()
  async seed() {
    await this.drop();
    const associations = [];
    for (let i = 0; i < 50; i++) {
      const association = new Association();
      association.name = faker.company.name();
      association.description = faker.company.catchPhrase();
      association.rna = faker.date.past();
      association.rup = faker.date.past();
      association.tax_eligibility = faker.string.fromCharacters([
        '2.1',
        '5.5',
        '10',
        '20',
      ]);
      association.bylaws = faker.string.alpha({ length: 10 });
      association.legal_status = faker.string.alpha({ length: 10 });
      association.siret_number = faker.string.numeric({ length: 14 });
      association.email = faker.internet.email();
      association.number_phone = faker.phone.number();
      association.street_number = faker.location.buildingNumber();
      association.street = faker.location.street();
      association.city = faker.location.city();
      association.country = faker.location.state();
      association.postal_code = faker.location.zipCode();
      association.website = faker.internet.url();
      association.activity = faker.company.buzzNoun();
      association.logo = faker.image.url();
      associations.push(association);
    }
    console.log('Seeding associations...');
    await this.associationRepository.save(associations);
    console.log('Seeded associations...');
  }

  private async drop() {
    console.log('Dropping users...');
    await this.associationRepository.delete({});
    console.log('Dropped users...');
  }
}
