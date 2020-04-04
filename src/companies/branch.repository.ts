import { Repository, EntityRepository } from 'typeorm';
import { Branch } from './branch.entity';

@EntityRepository(Branch)
export class BranchRepository extends Repository<Branch> {}
