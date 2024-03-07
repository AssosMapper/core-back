import { Column, Entity } from 'typeorm';
import { EntityStructure } from '../../structures/entity.structure';

@Entity()
export class Permission extends EntityStructure {
  @Column({
    unique: true,
  })
  permission: string;
}
