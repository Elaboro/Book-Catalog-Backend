import { Injectable } from "@nestjs/common";
import path from 'path';
import fs, { ReadStream } from 'fs';
import { Readable } from "stream";

/**
 * @Deprecated
 */
@Injectable()
export class FileSystemService {

  get(file_path: string, filename: string): ReadStream {
    const dest = path.join(file_path, filename);
    return fs.createReadStream(dest);
  }

  save(file_path: string, filename: string, data: Express.Multer.File) {
    try {
      if (!fs.existsSync(file_path)) {
        fs.mkdirSync(file_path, { recursive: true });
      }
      const writable: fs.WriteStream = fs.createWriteStream(
        path.join(file_path, filename),
      );
      Readable.from(data.buffer).pipe(writable);
    } catch (e) {
      throw new Error('File not created.');
    }
  }

  delete(file_path: string, filename: string) {
    fs.unlinkSync(path.join(file_path, filename));
  }
}