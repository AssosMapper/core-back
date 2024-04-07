import { EntityStructure } from '../../structures/entity.structure';
import { Column, Entity } from 'typeorm';

@Entity()
export class Role extends EntityStructure {
  @Column({
    unique: true,
  })
  name: string;

  @Column({
    nullable: true,
  })
  description: string;
}
