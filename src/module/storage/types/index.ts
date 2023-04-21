import { Storage } from "../entities/storage.entity";

interface IStorageCreate {
  file_id?: Awaited<Storage["file_id"]>;
  originalname: Awaited<Storage["originalname"]>;
}

export class StorageCreate implements IStorageCreate {
  file_id?: string;
  originalname: string;
}
