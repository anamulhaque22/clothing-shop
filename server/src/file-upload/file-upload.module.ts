// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { MulterModule } from '@nestjs/platform-express';

// @Module({
//   imports: [
//     MulterModule.registerAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (ConfigService: ConfigService) => {
//         return {
//           fileFilter: (req, file, callback) => {
//             if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
//               return callback(new Error());
//             }
//           },
//         };
//       },
//     }),
//   ],
// })
// export class FileUploadModule {}
