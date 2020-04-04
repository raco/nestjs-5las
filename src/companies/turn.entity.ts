import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity()
export class Turn extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  duration: number;

  @Column()
  startsAt: string;

  @Column()
  endsAt: string;

  @Column()
  capacity: number;

  @Column()
  total: number;

  @ManyToOne(
    type => Schedule,
    schedule => schedule.turns,
    { eager: false },
  )
  schedule: Schedule;
}
