import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

export function multerOption(fileTyppes: string[]): MulterOptions {
  const fileFilter = (request, file, callback) => {
    if (!fileTyppes.includes(file.mimetype)) {
      return callback(
        new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: `cantUploadFileType`,
          },
        }),
        false,
      );
    }

    callback(null, true);
  };
  const storage = diskStorage({
    filename: (request, file, callback) => {
      callback(
        null,
        `${randomStringGenerator()}.${file.originalname
          .split('.')
          .pop()
          ?.toLowerCase()}`,
      );
    },
  });
  return {
    fileFilter,
    storage,
  };
}
