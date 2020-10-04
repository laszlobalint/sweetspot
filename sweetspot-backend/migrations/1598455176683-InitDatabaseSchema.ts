import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDatabaseSchema1598455176683 implements MigrationInterface {
  name = 'InitDatabaseSchema1598455176683';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "order_delivery_enum" AS ENUM('SHIPPING', 'PICK_UP')`);
    await queryRunner.query(
      `CREATE TABLE "order" ("id" SERIAL NOT NULL, "name" text NOT NULL, "phone" text NOT NULL, "email" text NOT NULL, "address" text NOT NULL, "grandTotal" integer NOT NULL, "deliveryDate" text NOT NULL, "delivery" "order_delivery_enum" NOT NULL DEFAULT 'SHIPPING', "notes" text, "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "item" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "picture" text NOT NULL, "price" integer NOT NULL, "glutenfree" boolean NOT NULL, "sugarfree" boolean NOT NULL, "lactosefree" boolean NOT NULL, "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "ordersId" integer, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_b6802ac7fbd37aa71d856a95d8f" UNIQUE ("name"), CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ingredient_items_item" ("ingredientId" integer NOT NULL, "itemId" integer NOT NULL, CONSTRAINT "PK_3bc85f596d2084161e9515550d6" PRIMARY KEY ("ingredientId", "itemId"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_5d0b70b8509eaa5ec6848688db" ON "ingredient_items_item" ("ingredientId") `);
    await queryRunner.query(`CREATE INDEX "IDX_859d0d7265acb9c143bc70fb09" ON "ingredient_items_item" ("itemId") `);
    await queryRunner.query(
      `ALTER TABLE "item" ADD CONSTRAINT "FK_7cfe3863a83e4c00da26e9f330b" FOREIGN KEY ("ordersId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ingredient_items_item" ADD CONSTRAINT "FK_5d0b70b8509eaa5ec6848688dbc" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ingredient_items_item" ADD CONSTRAINT "FK_859d0d7265acb9c143bc70fb094" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ingredient_items_item" DROP CONSTRAINT "FK_859d0d7265acb9c143bc70fb094"`);
    await queryRunner.query(`ALTER TABLE "ingredient_items_item" DROP CONSTRAINT "FK_5d0b70b8509eaa5ec6848688dbc"`);
    await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_7cfe3863a83e4c00da26e9f330b"`);
    await queryRunner.query(`DROP INDEX "IDX_859d0d7265acb9c143bc70fb09"`);
    await queryRunner.query(`DROP INDEX "IDX_5d0b70b8509eaa5ec6848688db"`);
    await queryRunner.query(`DROP TABLE "ingredient_items_item"`);
    await queryRunner.query(`DROP TABLE "ingredient"`);
    await queryRunner.query(`DROP TABLE "item"`);
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TYPE "order_delivery_enum"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
