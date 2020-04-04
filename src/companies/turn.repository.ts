import { Repository, EntityRepository } from 'typeorm';
import { Turn } from './turn.entity';

@EntityRepository(Turn)
export class TurnRepository extends Repository<Turn> {}
