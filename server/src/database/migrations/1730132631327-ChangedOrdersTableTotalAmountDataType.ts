import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedOrdersTableTotalAmountDataType1730132631327 implements MigrationInterface {
    name = 'ChangedOrdersTableTotalAmountDataType1730132631327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "totalAmount"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "totalAmount" numeric(10,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "totalAmount"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "totalAmount" integer NOT NULL`);
    }

}
