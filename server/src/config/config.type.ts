import { MailConfig } from 'src/mail/config/mail-config.types';
import { DatabaseConfig } from '../database/config/database-config.type';
import { AppConfig } from './app-config.type';

export type AllConfigType = {
  app: AppConfig;
  // auth: AuthConfig;
  database: DatabaseConfig;
  // file: FileConfig;
  mail: MailConfig;
};
