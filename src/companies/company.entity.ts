import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from 'typeorm';
import { Branch } from './branch.entity';

@Entity()
@Unique(['name'])
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  logo_url: string;

  @Column()
  available: boolean;

  @OneToMany(
    type => Branch,
    branch => branch.company,
    { eager: true },
  )
  branches: Branch[];
}
