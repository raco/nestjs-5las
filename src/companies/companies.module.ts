import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { CompanyRepository } from './company.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyRepository])],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
