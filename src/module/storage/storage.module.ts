import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CfgModule } from "../configuration/cfg.module";
import { Storage } from "./entities/storage.entity";
import { FileSystemService } from "./file-system.service";
import { StorageRepository } from "./repository/storage.repository";
import { StorageLocalService } from "./storage-local.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Storage,
    ]),
    CfgModule,
  ],
  providers: [
    StorageLocalService,
    StorageRepository,
    FileSystemService,
  ],
  exports: [
    StorageLocalService,
  ],
})
export class StorageModule {}