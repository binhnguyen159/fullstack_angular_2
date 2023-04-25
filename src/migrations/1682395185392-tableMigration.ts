import { MigrationInterface, QueryRunner } from "typeorm";

export class TableMigration1682395185392 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS public.user (
        id uuid,
        firstname CHARACTER VARYING(255),
        lastname CHARACTER VARYING(255),
        username CHARACTER VARYING(255),
        password CHARACTER VARYING(255),
        PRIMARY KEY (id)
      )`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS public.product (
        id uuid,
        name CHARACTER VARYING(255),
        price NUMERIC(10, 2),
        category CHARACTER VARYING(255),
        PRIMARY KEY (id)
      )`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS public.order (
        id uuid,
        quantity integer,
        status CHARACTER VARYING(255),
        userId uuid,
        FOREIGN KEY (userId) REFERENCES public.user(id),
        PRIMARY KEY (id)
      )`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS order_product_product (
        orderId uuid,
        productId uuid,
        FOREIGN KEY (orderId) REFERENCES public.order(id),
        FOREIGN KEY (productId) REFERENCES public.product(id),
        PRIMARY KEY (orderId, productId)
      )`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM public.migrations`);

    await queryRunner.query(
      `DROP TABLE public.order_product_product;`
    );
    await queryRunner.query(
      `DROP TABLE public.order;`
    );
    await queryRunner.query(
      `DROP TABLE public.product;`
    );
    await queryRunner.query(
      `DROP TABLE public.user;`
    );
  }
}
