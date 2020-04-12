import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Schedule } from './schedule.entity';
import { Ticket } from 'src/tickets/ticket.entity';

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

  @OneToMany(
    type => Ticket,
    ticket => ticket.turn,
    { eager: false },
  )
  tickets: Ticket[];

  startsEnds(): string {
    return `${this.startsAt} - ${this.endsAt}`;
  }

  place(): string {
    return this.schedule.branch.name;
  }
}
