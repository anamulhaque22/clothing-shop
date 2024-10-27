import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAddressTableAdded1730034538459 implements MigrationInterface {
    name = 'UserAddressTableAdded1730034538459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."address_entity_addresstype_enum" AS ENUM('USER', 'BILLING', 'SHIPPING')`);
        await queryRunner.query(`CREATE TABLE "address_entity" ("id" SERIAL NOT NULL, "firstName" character varying, "lastName" character varying, "streetAddress" character varying NOT NULL, "aptSuiteUnit" character varying, "city" character varying NOT NULL, "phone" character varying NOT NULL, "addressType" "public"."address_entity_addresstype_enum" NOT NULL DEFAULT 'USER', "userId" integer, CONSTRAINT "PK_9caf3f954ed5bc66e3fa35eb7e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "address_entity" ADD CONSTRAINT "FK_9ab5f1a587a098fe9084ee4766e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address_entity" DROP CONSTRAINT "FK_9ab5f1a587a098fe9084ee4766e"`);
        await queryRunner.query(`DROP TABLE "address_entity"`);
        await queryRunner.query(`DROP TYPE "public"."address_entity_addresstype_enum"`);
    }

}
