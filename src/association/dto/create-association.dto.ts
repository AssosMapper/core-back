import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { fakerFR as faker } from '@faker-js/faker';

export class CreateAssociationDto {
  @ApiProperty({
    description: 'Name of the association',
    default: faker.lorem.words(),
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the association',
    default: faker.lorem.paragraph(),
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'RNA number of the association',
    default:
      faker.number.int({ min: 1, max: 28 }) +
      '/' +
      faker.number.int({ min: 1, max: 4 }) +
      '/' +
      faker.number.int({ min: 2000, max: 2024 }),
    required: false,
  })
  @IsString()
  @IsOptional()
  rna: Date;

  @ApiProperty({
    description: 'SIRET number of the association',
    default: faker.string.numeric({ length: 14 }),
    required: false,
  })
  @IsString()
  @MaxLength(14)
  @MinLength(14)
  @IsOptional()
  siret_number: string;

  @ApiProperty({
    description: 'Legal status of the association',
    required: false,
  })
  @IsString()
  @IsOptional()
  legal_status: string;

  @ApiProperty({
    description: 'RUP date of the association',
    default:
      faker.number.int({ min: 1, max: 28 }) +
      '/' +
      faker.number.int({ min: 1, max: 4 }) +
      '/' +
      faker.number.int({ min: 2000, max: 2024 }),
    required: false,
  })
  @IsString()
  @IsOptional()
  rup: Date;

  @ApiProperty({
    description: 'Tax eligibility of the association',
    default: faker.string.fromCharacters(['2.1', '5.5', '10', '20']),
    required: false,
  })
  @IsString()
  @IsOptional()
  tax_eligibility: string;

  @ApiProperty({
    description: 'Phone number of the association',
    required: false,
    default: faker.phone.number(),
  })
  @IsString()
  @IsOptional()
  number_phone: string;

  @ApiProperty({
    description: 'Email of the association',
    default: faker.internet.email(),
    required: false,
  })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'Website of the association',
    default: faker.internet.url(),
    required: false,
  })
  @IsString()
  @IsOptional()
  website: string;

  @ApiProperty({
    description: 'Activity of the association',
    default: faker.lorem.words(),
    required: false,
  })
  @IsString()
  @IsOptional()
  activity: string;

  @ApiProperty({
    description: 'Bylaws of the association',
    default: faker.lorem.paragraph(),
    required: false,
  })
  @IsString()
  @IsOptional()
  bylaws: string;

  @ApiProperty({
    description: 'Street number of the association',
    default: faker.location.buildingNumber(),
    required: false,
  })
  @IsString()
  @IsOptional()
  street_number: string;

  @ApiProperty({
    description: 'Street of the association',
    default: faker.location.street(),
    required: false,
  })
  @IsString()
  @IsOptional()
  street: string;

  @ApiProperty({
    description: 'Postal code of the association',
    default: faker.location.zipCode(),
    required: false,
  })
  @IsString()
  @IsOptional()
  postal_code: string;

  @ApiProperty({
    description: 'City of the association',
    default: faker.location.city(),
    required: false,
  })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty({
    description: 'Country of the association',
    default: faker.location.country(),
    required: false,
  })
  @IsString()
  @IsOptional()
  country: string;

  @ApiProperty({
    description: 'Logo of the association',
    default: faker.image.url(),
    required: true,
  })
  @IsString()
  logo: string;
}
