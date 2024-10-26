import { BadRequestException } from '@nestjs/common';
import * as path from 'path';

export const imageFileFilter = (req, file, callback) => {
  const ext = path.extname(file.originalname).toLowerCase();
  console.log({ ext });
  if (!['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
    return callback(
      new BadRequestException('Only image files are allowed!'),
      false,
    );
  }

  callback(null, true);
};
