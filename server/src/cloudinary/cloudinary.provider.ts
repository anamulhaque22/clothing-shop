import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'dptt4ycyb',
      api_key: '989818666399175',
      api_secret: 'NlfO15Z1c99my1rmtqnRR3yAEaQ',
    });
  },
};
