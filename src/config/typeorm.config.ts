import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3300,
  username: '',
  password: '',
  database: '5lasdb',
  entities: [__dirname + '/../**/*.entity.ts'],
  synchronize: true,
};
