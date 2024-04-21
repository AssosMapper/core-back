import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { EntityStructure } from '../../structures/entity.structure';
import { Role } from '../../roles/entities/role.entity';
import { Staff } from '../../association/entities/staff.entity';
import { ResetToken } from './reset-token.entity';

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

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(() => Role, (role) => role.users, {
    cascade: ['remove'],
  })
  @JoinTable()
  roles: Array<Role>;

  @OneToMany(() => Staff, (staff) => staff.user)
  staffOf: Staff[];

  @OneToMany(() => ResetToken, (resetToken) => resetToken.user)
  resetTokens: ResetToken[];
}
