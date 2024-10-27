import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAddressTableAdded1730034757825 implements MigrationInterface {
    name = 'UserAddressTableAdded1730034757825'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."addresses_addresstype_enum" AS ENUM('USER', 'BILLING', 'SHIPPING')`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "firstName" character varying, "lastName" character varying, "streetAddress" character varying NOT NULL, "aptSuiteUnit" character varying, "city" character varying NOT NULL, "phone" character varying NOT NULL, "addressType" "public"."addresses_addresstype_enum" NOT NULL DEFAULT 'USER', "userId" integer, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_95c93a584de49f0b0e13f753630" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_95c93a584de49f0b0e13f753630"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TYPE "public"."addresses_addresstype_enum"`);
    }

}
