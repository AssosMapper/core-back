import { Column, Entity } from 'typeorm';
import { EntityStructure } from '../../structures/entity.structure';

@Entity()
export class Media extends EntityStructure {
  @Column({
    nullable: true,
  })
  title: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    unique: true,
  })
  filepath: string;

  @Column({
    unique: true,
  })
  filename: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;
}
