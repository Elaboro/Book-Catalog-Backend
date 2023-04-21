import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Storage } from "../entities/storage.entity";
import { StorageCreate } from "../types";

@Injectable()
export class StorageRepository {

  constructor(
    @InjectRepository(Storage)
    private readonly storageRepository: Repository<Storage>,
  ) {}

  async create({
    file_id,
    originalname,
  }: StorageCreate): Promise<Storage> {
    let storage: Storage;

    if(file_id) {
      storage = await this.storageRepository.findOneBy({ file_id });
      if(storage) throw new Error("C выбранным ИД уже существует");
    }

    storage = new Storage();
    storage.file_id = file_id;
    storage.originalname = originalname;

    return storage.save();
  }

  async findById(file_id: string): Promise<Storage> {
    const storage = await this.storageRepository.findOneBy({ file_id });

    if(!storage || !!storage?.deleted) {
      throw new Error("Файл не найден");
    }

    return storage;
  }
}