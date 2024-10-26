import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedPublicIdColumnToUserImageEntity1729957675396 implements MigrationInterface {
    name = 'AddedPublicIdColumnToUserImageEntity1729957675396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "publicId" character varying NOT NULL, CONSTRAINT "PK_4f776c999cfa0294c3c11876c71" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "user_image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`);
        await queryRunner.query(`DROP TABLE "user_image"`);
    }

}
