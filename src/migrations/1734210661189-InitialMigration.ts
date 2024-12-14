import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1734210661189 implements MigrationInterface {
    name = 'InitialMigration1734210661189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "crop" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_3b0092fe001d72938594cb32bd2" UNIQUE ("name"), CONSTRAINT "PK_f306910b05e2d54ed972a536a12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "farm" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "totalArea" double precision NOT NULL, "agriculturalArea" double precision NOT NULL, "vegetationArea" double precision NOT NULL, CONSTRAINT "PK_3bf246b27a3b6678dfc0b7a3f64" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "producer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cpfCnpj" character varying NOT NULL, "name" character varying NOT NULL, "farmId" uuid, CONSTRAINT "REL_04a2f4a7b89608efd50f95caa8" UNIQUE ("farmId"), CONSTRAINT "PK_4cfe496c2c70e4c9b9f444525a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "farm_crops_crop" ("farmId" uuid NOT NULL, "cropId" uuid NOT NULL, CONSTRAINT "PK_359552d440334a3bbe80b7f33ae" PRIMARY KEY ("farmId", "cropId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_47b9bc4ec91158cae38277c023" ON "farm_crops_crop" ("farmId") `);
        await queryRunner.query(`CREATE INDEX "IDX_51763d54a22b4f602971a7492b" ON "farm_crops_crop" ("cropId") `);
        await queryRunner.query(`ALTER TABLE "producer" ADD CONSTRAINT "FK_04a2f4a7b89608efd50f95caa81" FOREIGN KEY ("farmId") REFERENCES "farm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "farm_crops_crop" ADD CONSTRAINT "FK_47b9bc4ec91158cae38277c0230" FOREIGN KEY ("farmId") REFERENCES "farm"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "farm_crops_crop" ADD CONSTRAINT "FK_51763d54a22b4f602971a7492b5" FOREIGN KEY ("cropId") REFERENCES "crop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farm_crops_crop" DROP CONSTRAINT "FK_51763d54a22b4f602971a7492b5"`);
        await queryRunner.query(`ALTER TABLE "farm_crops_crop" DROP CONSTRAINT "FK_47b9bc4ec91158cae38277c0230"`);
        await queryRunner.query(`ALTER TABLE "producer" DROP CONSTRAINT "FK_04a2f4a7b89608efd50f95caa81"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_51763d54a22b4f602971a7492b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_47b9bc4ec91158cae38277c023"`);
        await queryRunner.query(`DROP TABLE "farm_crops_crop"`);
        await queryRunner.query(`DROP TABLE "producer"`);
        await queryRunner.query(`DROP TABLE "farm"`);
        await queryRunner.query(`DROP TABLE "crop"`);
    }

}
