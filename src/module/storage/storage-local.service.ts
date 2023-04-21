import { Injectable } from "@nestjs/common";
import { ReadStream } from "fs";
import { CfgService } from "../configuration/cfg.service";
import { Storage } from "./entities/storage.entity";
import { FileSystemService } from "./file-system.service";
import { StorageRepository } from "./repository/storage.repository";

@Injectable()
export class StorageLocalService {

  constructor(
    private readonly storageRepository: StorageRepository,
    private readonly fileSystemService: FileSystemService,
    private readonly cfg: CfgService,
  ) {}

  async upload(file: Express.Multer.File): Promise<Storage> {

    // fix https://github.com/expressjs/multer/pull/1102
    if (!/[^\u0000-\u00ff]/.test(file.originalname)) {
      file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
    }

    const storage = await this.storageRepository.create({
      originalname: file.originalname,
    });

    this.fileSystemService.save(
      this.cfg.DIR_STORAGE,
      storage.file_id,
      file,
    );

    return storage;
  }

  async download(file_id: string): Promise<{
    originalname: string;
    file_stream: ReadStream;
  }> {
    const file_stream = this.fileSystemService.get(
      this.cfg.DIR_STORAGE,
      file_id,
    );

    const { originalname } = await this.storageRepository.findById(file_id);

    return {
      originalname,
      file_stream,
    };
  }

}