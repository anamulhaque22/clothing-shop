import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedDeletedAtColumnToAddressTable1730040499934 implements MigrationInterface {
    name = 'AddedDeletedAtColumnToAddressTable1730040499934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "deletedAt"`);
    }

}
