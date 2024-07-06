import { DatabaseConfig } from '../database/config/database-config.type';
import { AppConfig } from './app-config.type';

export type AllConfigType = {
  app: AppConfig;
  // auth: AuthConfig;
  database: DatabaseConfig;
  // file: FileConfig;
  // mail: MailConfig;
};
