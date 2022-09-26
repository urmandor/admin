import { Request } from 'express';
import * as multer from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const fileUploadOptions = (): any => ({
  storage: multer.diskStorage({
    destination: (_req: Request, _file: Express.Multer.File, cb: DestinationCallback) => {
      return cb(null, `${__dirname}/../../public/uploads`);
    },
    filename: (_req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
      const { originalname } = file;
      const ext = path.extname(originalname);
      const uuid = uuidv4();
      const fileName = uuid + ext;
      cb(null, fileName);
    },
  }),
  limits: {
    fieldNameSize: 255,
    fileSize: 1024 * 1024 * 1,
  },
});
