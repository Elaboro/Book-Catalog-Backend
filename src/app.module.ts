import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourcePostgres } from './config/datasource';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        autoLoadEntities: true
      }),
      dataSourceFactory: async () => dataSourcePostgres
    }),
  ],
})
export class AppModule {}
