import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedSizeAndColorToOrderItemTable1730141420068 implements MigrationInterface {
    name = 'AddedSizeAndColorToOrderItemTable1730141420068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_items" ADD "size" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD "color" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "color"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "size"`);
    }

}
