import { Column, Entity, ManyToMany } from 'typeorm';
import { EntityStructure } from '../../structures/entity.structure';
import { Role } from '../../roles/entities/role.entity';

@Entity()
export class Permission extends EntityStructure {
  @Column({
    unique: true,
  })
  permission: string;

  @ManyToMany(() => Role, (roles) => roles.permissions)
  roles: Array<Role>;
}
