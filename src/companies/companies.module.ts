import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { CompanyRepository } from './company.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchRepository } from './branch.repository';
import { ScheduleRepository } from './schedule.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyRepository,
      BranchRepository,
      ScheduleRepository,
    ]),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
