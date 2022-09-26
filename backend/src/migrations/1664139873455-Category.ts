import { MigrationInterface, QueryRunner } from 'typeorm';

export class Category1664139873455 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE categories (' +
        'id int NOT NULL AUTO_INCREMENT,' +
        'store_id int NOT NULL,' +
        'url varchar(255) NOT NULL,' +
        'name varchar(255) NOT NULL,' +
        'image_url varchar(255),' +
        'CONSTRAINT PK_category PRIMARY KEY (id),' +
        'FOREIGN KEY (store_id) REFERENCES stores(id),' +
        'CONSTRAINT UC_category_url UNIQUE (store_id, url),' +
        'CONSTRAINT UC_category_name UNIQUE (store_id, name)' +
        ')',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE categories`);
  }
}
