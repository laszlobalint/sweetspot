import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5555,
  username: 'postgres',
  password: 'postgres',
  database: 'sweetspot',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
