import { Allow } from 'class-validator';

// <database-block>
// const idType = (databaseConfig() as DatabaseConfig).isDocumentDatabase
//   ? String
//   : Number;
// </database-block>

export class Role {
  @Allow()
  id: number;

  @Allow()
  name?: string;
}
