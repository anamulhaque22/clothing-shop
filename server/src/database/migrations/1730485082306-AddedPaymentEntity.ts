import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedPaymentEntity1730485082306 implements MigrationInterface {
    name = 'AddedPaymentEntity1730485082306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "paymentIntentId" TO "transactionId"`);
        await queryRunner.query(`CREATE TYPE "public"."payments_status_enum" AS ENUM('PENDING', 'SUCCESS', 'FAILED', 'CANCELED')`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" SERIAL NOT NULL, "amount" numeric(10,2) NOT NULL, "status" "public"."payments_status_enum" NOT NULL DEFAULT 'PENDING', "transaction_id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "orderId" integer, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_af929a5f2a400fdb6913b4967e1" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_af929a5f2a400fdb6913b4967e1"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TYPE "public"."payments_status_enum"`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "transactionId" TO "paymentIntentId"`);
    }

}
