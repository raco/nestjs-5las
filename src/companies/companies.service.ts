import { Injectable, NotFoundException } from '@nestjs/common';
import { Company } from './company.entity';
import { CompanyRepository } from './company.repository';

@Injectable()
export class CompaniesService {
  constructor(private companyRepository: CompanyRepository) {}

  async getCompaniesByDistrict(district_id: number): Promise<Company[]> {
    const found = await this.companyRepository.find({ where: { district_id } });
    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }
}
