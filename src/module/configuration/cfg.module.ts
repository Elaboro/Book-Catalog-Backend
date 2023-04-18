import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CfgService } from "./cfg.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      cache: true,
    }),
  ],
  providers: [
    CfgService,
  ],
  exports: [
    CfgService,
  ],
})
export class CfgModule {}