import { MigrationInterface, QueryRunner } from "typeorm"

export class OrderMigration1682406408872 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
