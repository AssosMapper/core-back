import { EntityStructure } from '../../structures/entity.structure';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ResetToken extends EntityStructure {
  @Column()
  token: string;

  @Column()
  expirationDate: Date;

  @Column({
    default: false,
  })
  used: boolean;

  @ManyToOne(() => User, (user) => user.resetTokens)
  user: User;
}
