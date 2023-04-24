import { MigrationInterface, QueryRunner } from "typeorm";

export class UserMigration1682321226998 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE public.user RENAME COLUMN username TO name`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE public.user RENAME COLUMN name TO username`
    );
  }
}
