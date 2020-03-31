import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { getManager } from 'typeorm';

@Controller('app')
export class AppController {
  @Get('/districts/:province_id')
  async districts(@Param('province_id', ParseIntPipe) province_id: number) {
    const entityManager = getManager();
    const rawData = await entityManager.query(
      `SELECT id, name FROM ubigeo_peru_districts WHERE province_id = ${province_id}`,
    );
    return rawData;
  }
}
