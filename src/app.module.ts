import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AppController } from './app.controller';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, CompaniesModule],
  controllers: [AppController],
})
export class AppModule {}
