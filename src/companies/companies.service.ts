import { Injectable, NotFoundException } from '@nestjs/common';
import { Company } from './company.entity';
import { CompanyRepository } from './company.repository';
import { BranchRepository } from './branch.repository';

@Injectable()
export class CompaniesService {
  constructor(
    private companyRepository: CompanyRepository,
    private branchRepository: BranchRepository,
  ) {}

  async getCompaniesByDistrict(district_id: number): Promise<Company[]> {
    const found = await this.companyRepository.find({ where: { district_id } });
    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }
}
