import { Column, Entity, OneToMany } from 'typeorm';
import { EntityStructure } from '../../structures/entity.structure';
import { Staff } from './staff.entity';

@Entity()
export class Association extends EntityStructure {
  @Column({
    unique: true,
  })
  name: string;

  @Column()
  logo: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  description: string;

  @Column({
    nullable: true,
  })
  rna: Date;

  @Column({
    nullable: true,
  })
  siret_number: string;

  @Column({
    nullable: true,
  })
  legal_status: string;

  @Column({
    nullable: true,
  })
  rup: Date;

  @Column({
    nullable: true,
  })
  tax_eligibility: string;

  @Column({
    nullable: true,
  })
  number_phone: string;

  @Column({
    nullable: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  website: string;

  @Column({
    nullable: true,
  })
  activity: string;

  @Column({
    nullable: true,
  })
  bylaws: string;

  @Column({
    nullable: true,
  })
  street_number: string;

  @Column({
    nullable: true,
  })
  street: string;

  @Column({
    nullable: true,
  })
  postal_code: string;

  @Column({
    nullable: true,
  })
  city: string;

  @Column({
    nullable: true,
  })
  country: string;

  @OneToMany(() => Staff, (staff) => staff.association)
  staff: Staff[];
}
