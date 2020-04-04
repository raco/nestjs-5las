import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { CompanyRepository } from './company.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchRepository } from './branch.repository';
import { ScheduleRepository } from './schedule.repository';
import { AuthModule } from 'src/auth/auth.module';
import { TurnRepository } from './turn.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyRepository,
      BranchRepository,
      ScheduleRepository,
    ]),
    AuthModule,
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [TurnRepository],
})
export class CompaniesModule {}
