import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedUserImageEntityAndJoinWithUser1729953177919 implements MigrationInterface {
    name = 'CreatedUserImageEntityAndJoinWithUser1729953177919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "photoId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_75e2be4ce11d447ef43be0e374f" UNIQUE ("photoId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "user_image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_75e2be4ce11d447ef43be0e374f"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photoId"`);
    }

}
