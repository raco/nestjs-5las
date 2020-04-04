import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { getManager } from 'typeorm';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Get('/districts/:province_id')
  async districts(@Param('province_id', ParseIntPipe) province_id: number) {
    // TODO: filter just districts that has companies and refactor this
    const entityManager = getManager();
    const rawData = await entityManager.query(
      `SELECT id, name FROM ubigeo_peru_districts WHERE province_id = ${province_id}`,
    );
    if (!rawData) {
      throw new NotFoundException();
    }

    return rawData;
  }

  @Get('/byDistrict/:district_id')
  companies(@Param('district_id', ParseIntPipe) district_id: number) {
    return this.companiesService.getCompaniesByDistrict(district_id);
  }

  @Get('/schedule/:branchId')
  schedule(@Param('branchId', ParseIntPipe) branchId: number) {
    return this.companiesService.getSchedule(branchId);
  }
}
