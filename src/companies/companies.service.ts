import { Injectable, NotFoundException } from '@nestjs/common';
import { Company } from './company.entity';
import { CompanyRepository } from './company.repository';
import { Schedule } from './schedule.entity';
import { ScheduleRepository } from './schedule.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
    private scheduleRepository: ScheduleRepository,
  ) {}

  async getCompaniesByDistrict(district_id: number): Promise<any> {
    const found = await this.companyRepository
      .createQueryBuilder('company')
      .leftJoinAndSelect('company.branches', 'branch')
      .where('branch.district_id = :district_id', { district_id })
      .getOne();

    // const found = await this.companyRepository.find({ where: { district_id } });
    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async getSchedule(branchId: number): Promise<Schedule> {
    const createdAt = new Date().toISOString().slice(0, 10);
    const found = await this.scheduleRepository.findOne({
      where: { branchId, createdAt },
    });
    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }
}
