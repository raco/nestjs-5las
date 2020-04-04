import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Branch } from './branch.entity';
import { Turn } from './turn.entity';

@Entity()
export class Schedule extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startsAt: string;

  @Column()
  endsAt: string;

  @Column()
  active: boolean;

  @Column()
  capacity: number;

  @Column('date')
  createdAt: string;

  @ManyToOne(
    type => Branch,
    branch => branch.schedules,
    { eager: false },
  )
  branch: Branch;

  @OneToMany(
    type => Turn,
    turn => turn.schedule,
    { eager: true },
  )
  turns: Turn[];
}
