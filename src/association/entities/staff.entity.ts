import { EntityStructure } from '../../structures/entity.structure';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Association } from './association.entity';
import { AssociationRole } from '../types';

@Entity()
export class Staff extends EntityStructure {
  @Column()
  userId: number;

  @Column()
  associationId: number;

  @Column()
  role: AssociationRole;

  @ManyToOne(() => User, (user) => user.staffOf)
  user: User;

  @ManyToOne(() => Association, (association) => association.staff)
  association: Association;
}
