import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const destination = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  destination,
  storage: multer.diskStorage({
    destination,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
