import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedTransctionIdFromOrderEntity1730486923892 implements MigrationInterface {
    name = 'RemovedTransctionIdFromOrderEntity1730486923892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "transactionId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "transactionId" character varying NOT NULL`);
    }

}
