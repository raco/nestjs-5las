import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Company } from './company.entity';

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

  @Column()
  phone: string;

  @Column()
  open: boolean;

  @ManyToOne(
    type => Company,
    company => company.branches,
    { eager: false },
  )
  company: Company;
}
