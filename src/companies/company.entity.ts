import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
  ManyToOne,
} from 'typeorm';
import { Branch } from './branch.entity';
import { Admin } from 'src/admin/admin.entity';

@Entity()
@Unique(['name'])
@Unique(['ruc'])
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  ruc: string;

  @Column({ nullable: true })
  logo_url: string | null;

  @Column({ default: true })
  available: boolean;

  @OneToMany(
    type => Branch,
    branch => branch.company,
    { eager: true },
  )
  branches: Branch[];

  @ManyToOne(
    type => Admin,
    admin => admin.companies,
    { eager: false },
  )
  admin: Admin;
}
