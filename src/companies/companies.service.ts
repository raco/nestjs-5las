import { Injectable, NotFoundException } from '@nestjs/common';
import { Company } from './company.entity';
import { CompanyRepository } from './company.repository';
import { Schedule } from './schedule.entity';
import { ScheduleRepository } from './schedule.repository';

@Injectable()
export class CompaniesService {
  constructor(
    private companyRepository: CompanyRepository,
    private scheduleRepository: ScheduleRepository,
  ) {}

  async getCompaniesByDistrict(district_id: number): Promise<Company[]> {
    const found = await this.companyRepository.find({ where: { district_id } });
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
