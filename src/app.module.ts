import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CfgModule } from './module/configuration/cfg.module';
import { CfgService } from './module/configuration/cfg.service';
import { RootModule } from './module/root.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ CfgModule ],
      inject: [ CfgService ],
      useFactory: (cfg: CfgService) => ({
        type: "postgres",
        host: cfg.APP_POSTGRES_HOST,
        port: cfg.APP_POSTGRES_PORT,
        username: cfg.APP_POSTGRES_USERNAME,
        password: cfg.APP_POSTGRES_PASSWORD,
        database: cfg.APP_POSTGRES_DATABASE,
        synchronize: false,
        autoLoadEntities: true,
        subscribers: ["src/subscriber/*.{ts, js}"],
        migrations: ["src/migration/*.{ts, js}"],
        logging: cfg.APP_POSTGRES_LOGGING,
      }),
    }),
    RootModule,
  ],
})
export class AppModule {}
