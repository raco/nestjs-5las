import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Turn } from 'src/companies/turn.entity';
import { User } from 'src/auth/user.entity';

@Entity()
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  salt: string;

  @Column()
  startsEnds: string;

  @Column()
  place: string;

  @Column()
  district: string;

  @Column('text')
  qr: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @ManyToOne(
    type => Turn,
    turn => turn.tickets,
    { eager: false },
  )
  turn: Turn;

  @ManyToOne(
    type => User,
    user => user.tickets,
    { eager: false },
  )
  user: User;
}
