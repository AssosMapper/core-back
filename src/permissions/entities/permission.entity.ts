import { Column, Entity, ManyToMany } from 'typeorm';
import { EntityStructure } from '../../structures/entity.structure';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Permission extends EntityStructure {
  @Column({
    unique: true,
  })
  permission: string;

  @ManyToMany(() => User, (user) => user.permissions)
  users: Array<User>;
}
