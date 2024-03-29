import { Column, Entity, ManyToMany } from 'typeorm';
import { EntityStructure } from '../../structures/entity.structure';
import { Permission } from '../../permissions/entities/permission.entity';

@Entity()
export class User extends EntityStructure {
  @Column({
    nullable: true,
    unique: true,
  })
  email?: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  firstName?: string;

  @Column({
    nullable: true,
  })
  lastName?: string;

  @Column({
    nullable: true,
  })
  phone?: string;

  @ManyToMany(() => Permission, (permission) => permission.users)
  permissions: Array<Permission>;
}
