import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Company } from './company.entity';
import { Schedule } from './schedule.entity';

@Entity()
export class Branch extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  lat: string;

  @Column()
  lng: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  district_id: number;

  @Column({ default: true })
  open: boolean;

  @ManyToOne(
    type => Company,
    company => company.branches,
    { eager: false },
  )
  company: Company;

  @OneToMany(
    type => Schedule,
    schedule => schedule.branch,
    { eager: false },
  )
  schedules: Schedule[];
}
