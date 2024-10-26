import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedUserImageEntity1729953007176 implements MigrationInterface {
    name = 'CreatedUserImageEntity1729953007176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, CONSTRAINT "PK_4f776c999cfa0294c3c11876c71" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photo"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "photo" character varying`);
        await queryRunner.query(`DROP TABLE "user_image"`);
    }

}
